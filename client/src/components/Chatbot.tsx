import { useState, useRef, useEffect } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { MessageCircle, X, Send, Loader2, Sparkles, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";

interface Message {
  role: "user" | "model";
  text: string;
  showMap?: boolean;
}

interface Service {
  id: string;
  title: string;
  description: string;
  detailedDescription: string;
  features: string[];
  technologies: string[];
  deliverables: string[];
}

interface Product {
  id: string;
  name: string;
  description: string;
  shortDescription: string;
  features: string[];
  technologies: string[];
}

interface TeamMember {
  id: number;
  name: string;
  role: string;
  bio: string;
  longBio: string;
  expertise: string[];
  experience: string;
  location: string;
  social: { email?: string; linkedin?: string };
}

interface PortfolioItem {
  id: number;
  title: string;
  category: string;
  description: string;
  technologies: string[];
  client: string;
  results: string[];
}

// Izyane office location for map embed
const IZYANE_LOCATION = {
  address: "iZyane InovSolutions, Lusaka, Zambia",
  // Direct link to the official iZyane location on Google Maps
  mapsLink: "https://www.google.com/maps/place/iZyane+InovSolutions/@-15.3953533,28.3195656,16z/data=!4m6!3m5!1s0x19408be262a33ec5:0xcc7121ba1cc55fec!8m2!3d-15.3954016!4d28.3198545!16s%2Fg%2F11vs8s0hnh"
};

// Simple markdown-like text formatter
const formatMessageText = (text: string) => {
  // Split by lines and process
  return text.split('\n').map((line, i) => {
    // Bold text: **text**
    let formatted = line.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    // Italic text: *text*
    formatted = formatted.replace(/\*(.+?)\*/g, '<em>$1</em>');
    // Bullet points
    if (formatted.startsWith('- ') || formatted.startsWith('* ')) {
      formatted = '• ' + formatted.slice(2);
    }
    // Numbered lists
    formatted = formatted.replace(/^(\d+)\.\s/, '$1. ');
    
    return (
      <span key={i}>
        <span dangerouslySetInnerHTML={{ __html: formatted }} />
        {i < text.split('\n').length - 1 && <br />}
      </span>
    );
  });
};

// Map embed component - uses official iZyane InovSolutions location
const LocationMap = () => (
  <div className="mt-3 overflow-hidden rounded-lg border">
    <div className="px-3 py-2 flex items-center gap-2 text-xs" style={{ backgroundColor: "#e5e7eb", color: "#374151" }}>
      <MapPin className="h-3 w-3" />
      <span>iZyane InovSolutions - Lusaka, Zambia</span>
    </div>
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1923.0!2d28.3195656!3d-15.3953533!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x19408be262a33ec5%3A0xcc7121ba1cc55fec!2siZyane%20InovSolutions!5e0!3m2!1sen!2szm!4v1701619200000"
      width="100%"
      height="180"
      style={{ border: 0 }}
      allowFullScreen
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      title="iZyane InovSolutions Office Location"
    />
    <a
      href={IZYANE_LOCATION.mapsLink}
      target="_blank"
      rel="noopener noreferrer"
      style={{ backgroundColor: "#dbeafe", color: "#2563eb" }}
      className="block px-3 py-2 text-xs hover:opacity-80 transition-opacity text-center font-medium"
    >
      📍 Open in Google Maps for directions →
    </a>
  </div>
);

// Build dynamic system prompt from website data
const buildSystemPrompt = (
  services: Service[],
  products: Product[],
  team: TeamMember[],
  portfolio: PortfolioItem[]
) => {
  const servicesText = services
    .map(
      (s) =>
        `- **${s.title}**: ${s.description}\n  Technologies: ${s.technologies.join(", ")}\n  Deliverables: ${s.deliverables.join(", ")}`
    )
    .join("\n");

  const productsText = products
    .map(
      (p) =>
        `- **${p.name}**: ${p.description}\n  Features: ${p.features.join(", ")}`
    )
    .join("\n");

  const teamText = team
    .map(
      (t) =>
        `- **${t.name}** - ${t.role}: ${t.bio} (${t.experience} experience, based in ${t.location})`
    )
    .join("\n");

  const portfolioText = portfolio
    .slice(0, 5)
    .map(
      (p) =>
        `- **${p.title}** (${p.category}): ${p.description} - Client: ${p.client}`
    )
    .join("\n");

  return `
You are the AI assistant for Izyane (iZyane), a technology company headquartered in Lusaka, Zambia.
Your goal is to help customers understand our services, products, team, and company values.

IMPORTANT: Answer questions using the information provided below from the official Izyane website.
If the user asks about something not covered below, use your Google Search capability to find 
accurate, up-to-date information about Izyane online.

=== COMPANY INFORMATION ===
- **Company Name**: Izyane (also written as iZyane)
- **Website**: https://www.izyane.com
- **Headquarters**: Lusaka, Zambia
- **Focus**: Digital transformation, fintech solutions, enterprise software, and innovative technology services

=== OUR SERVICES ===
${servicesText}

=== OUR PRODUCTS ===
${productsText}

=== OUR TEAM ===
${teamText}

=== PORTFOLIO / CASE STUDIES ===
${portfolioText}

=== CONTACT INFORMATION ===
- Website: https://www.izyane.com
- Address: Engineering House, Engineering Institute of Zambia, 3rd Floor, Kelvin Siwale Road, Lusaka, Zambia
- Phone: +260 958 169 735
- Email: info@izyane.com
- For specific inquiries, customers can reach out through the contact form on our website

=== LOCATION INSTRUCTIONS ===
When users ask about location, directions, or where Izyane is located:
1. Provide the full address: Engineering House, Engineering Institute of Zambia, 3rd Floor, Kelvin Siwale Road, Lusaka, Zambia
2. Always end your location response with exactly this marker on its own line: [SHOW_MAP]
This marker will trigger a map display in the chat.

=== RESPONSE GUIDELINES ===
- Be professional, friendly, and helpful
- When answering about services, products, or team, use the specific details provided above
- If asked about pricing, mention that we provide custom quotes based on project requirements
- If you cannot find information in the data above, use Google Search to look up current information about Izyane
- Always be accurate - don't make up information not provided here or found online
- If you truly cannot find an answer, politely suggest the user contact us through the website
`;
};

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "model",
      text: "Hi! I'm the Izyane AI assistant. I have access to information from our official website and can also search online for the latest updates. How can I help you today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [websiteData, setWebsiteData] = useState<{
    services: Service[];
    products: Product[];
    team: TeamMember[];
    portfolio: PortfolioItem[];
  } | null>(null);
  const [dataLoading, setDataLoading] = useState(true);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const hasApiKey = Boolean(import.meta.env.VITE_GEMINI_API_KEY);

  // Load website data on mount
  useEffect(() => {
    const loadWebsiteData = async () => {
      try {
        const [servicesRes, productsRes, teamRes, portfolioRes] =
          await Promise.all([
            fetch("/data/services.json"),
            fetch("/data/products.json"),
            fetch("/data/team.json"),
            fetch("/data/portfolio.json"),
          ]);

        const [services, products, team, portfolio] = await Promise.all([
          servicesRes.json(),
          productsRes.json(),
          teamRes.json(),
          portfolioRes.json(),
        ]);

        setWebsiteData({ services, products, team, portfolio });
      } catch (error) {
        console.error("Error loading website data:", error);
        // Set empty arrays as fallback
        setWebsiteData({
          services: [],
          products: [],
          team: [],
          portfolio: [],
        });
      } finally {
        setDataLoading(false);
      }
    };

    loadWebsiteData();
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector(
        "[data-radix-scroll-area-viewport]"
      );
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", text: userMessage }]);
    setIsLoading(true);

    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      if (!apiKey) {
        console.warn(
          "VITE_GEMINI_API_KEY missing. Please set VITE_GEMINI_API_KEY in .env"
        );
        setMessages((prev) => [
          ...prev,
          {
            role: "model",
            text: "AI assistant is disabled: VITE_GEMINI_API_KEY is not configured.\nPlease add `VITE_GEMINI_API_KEY=your_key` to `.env` and restart the dev server.",
          },
        ]);
        setIsLoading(false);
        return;
      }

      // Build system prompt from loaded website data
      const systemPrompt = websiteData
        ? buildSystemPrompt(
            websiteData.services,
            websiteData.products,
            websiteData.team,
            websiteData.portfolio
          )
        : "You are the Izyane AI assistant. Please help customers with their questions.";

      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({
        model: "gemini-2.0-flash",
        tools: [
          {
            googleSearch: {},
          } as any,
        ],
      });

      const chat = model.startChat({
        history: [
          {
            role: "user",
            parts: [{ text: systemPrompt }],
          },
          {
            role: "model",
            parts: [
              {
                text: "Understood. I am ready to assist as the Izyane AI assistant. I have access to the official website data and can also search online for additional information.",
              },
            ],
          },
          ...messages.map((m) => ({
            role: m.role === "user" ? "user" : "model",
            parts: [{ text: m.text }],
          })),
        ],
      });

      const result = await chat.sendMessage(userMessage);
      const response = result.response;
      let text = response.text();
      
      // Check if response contains map marker
      const showMap = text.includes("[SHOW_MAP]");
      text = text.replace("[SHOW_MAP]", "").trim();

      setMessages((prev) => [...prev, { role: "model", text, showMap }]);
    } catch (error: any) {
      console.error("Error sending message:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "model",
          text:
            error.message ||
            "Sorry, I encountered an error. Please try again later or check your API key configuration.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end sm:bottom-8 sm:right-8">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="mb-4 w-[350px] overflow-hidden rounded-2xl border bg-background shadow-2xl sm:w-[400px]"
          >
            {/* Header */}
            <div className="flex items-center justify-between bg-primary p-4 text-primary-foreground">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-foreground/20">
                  <Sparkles className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="font-semibold">Izyane AI</h3>
                  <p className="text-xs text-primary-foreground/80">
                    {dataLoading
                      ? "Loading website data..."
                      : "Powered by Gemini + Website Data"}
                  </p>
                  {!hasApiKey && (
                    <p className="mt-1 text-xs text-red-200">
                      API key not configured — add `VITE_GEMINI_API_KEY` to
                      `.env`
                    </p>
                  )}
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-primary-foreground hover:bg-primary-foreground/20"
                onClick={() => setIsOpen(false)}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Messages */}
            <ScrollArea className="h-[400px]" ref={scrollAreaRef}>
              <div className="flex flex-col gap-4 p-4">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={cn(
                      "rounded-2xl px-4 py-3 text-sm break-words",
                      message.role === "user"
                        ? "ml-auto max-w-[80%]"
                        : "mr-auto max-w-[90%]"
                    )}
                    style={
                      message.role === "user"
                        ? { backgroundColor: "rgb(24, 104, 159)", color: "#ffffff", wordWrap: "break-word", overflowWrap: "break-word" }
                        : { backgroundColor: "#f3f4f6", color: "#1f2937", wordWrap: "break-word", overflowWrap: "break-word" }
                    }
                  >
                    <div style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
                      {formatMessageText(message.text)}
                    </div>
                    {message.showMap && message.role === "model" && (
                      <LocationMap />
                    )}
                  </div>
                ))}
                {isLoading && (
                  <div 
                    className="mr-auto max-w-[90%] rounded-2xl px-4 py-3 text-sm"
                    style={{ backgroundColor: "#f3f4f6", color: "#1f2937" }}
                  >
                    <div className="flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Thinking...
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>

            {/* Input */}
            <div className="border-t p-4">
              <div className="flex gap-2">
                <Input
                  placeholder={dataLoading ? "Loading website data..." : "Ask me anything..."}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-1"
                  disabled={isLoading || !hasApiKey || dataLoading}
                />
                <Button
                  size="icon"
                  onClick={handleSend}
                  disabled={isLoading || !input.trim() || !hasApiKey || dataLoading}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Button
        size="lg"
        className={cn(
          "h-14 w-14 rounded-full shadow-lg transition-all duration-300",
          isOpen ? "rotate-90 scale-0 opacity-0" : "scale-100 opacity-100"
        )}
        onClick={() => setIsOpen(true)}
      >
        <MessageCircle className="h-6 w-6" />
      </Button>

      {/* Re-render button when open to handle closing animation smoothly if needed, 
          but the absolute positioning might overlap. 
          Actually, let's just keep the open button hidden when open. 
          The close button is in the header. 
      */}
    </div>
  );
}
