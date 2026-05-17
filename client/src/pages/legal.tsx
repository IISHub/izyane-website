import { useEffect } from "react";
import { Link, useLocation, useParams } from "wouter";
import Footer from "@/components/footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  legalDocuments,
  getLegalTabFromParam,
  type LegalTabId,
  type LegalDocument,
} from "@/lib/legal-content";

function LegalDocumentBody({ document }: { document: LegalDocument }) {
  return (
    <div>
      <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
        {document.intro}
      </p>
      <p className="text-sm text-slate-500 dark:text-slate-400 mt-4">
        Last updated: {document.lastUpdated}
      </p>
      <div className="mt-8 space-y-8">
        {document.sections.map((section) => (
          <section key={section.title}>
            <h3 className="text-xl font-semibold text-responsive mb-3">
              {section.title}
            </h3>
            {section.paragraphs.map((paragraph, index) => (
              <p
                key={index}
                className="text-slate-600 dark:text-slate-300 leading-relaxed mb-3"
              >
                {paragraph}
              </p>
            ))}
            {section.list && (
              <ul className="list-disc pl-6 space-y-2 text-slate-600 dark:text-slate-300">
                {section.list.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            )}
          </section>
        ))}
      </div>
    </div>
  );
}

export default function Legal() {
  const params = useParams<{ tab?: string }>();
  const [location, setLocation] = useLocation();
  const activeTab = getLegalTabFromParam(params.tab);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const handleTabChange = (value: string) => {
    const tab = value as LegalTabId;
    setLocation(`/legal/${tab}`);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <section className="pt-24 pb-12 lg:pt-32 lg:pb-16 bg-gradient-to-br from-blue-50 via-indigo-50 to-slate-100 dark:bg-gradient-to-br dark:from-slate-900 dark:via-blue-900/20 dark:to-slate-800">
        <div className="container-custom">
          <div className="max-w-3xl">
            <div className="inline-block px-4 py-2 bg-primary-accent-light text-primary-custom rounded-full text-sm font-semibold mb-4">
              Legal
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-responsive leading-tight mb-4">
              Policies & <span className="gradient-text">Legal</span>
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
              Review our privacy, terms, data protection, cookie, and acceptable
              use policies for iZyane InovSolutions.
            </p>
            <Link href="/">
              <button className="btn-outline mt-6 px-6 py-2 inline-flex items-center gap-2">
                <i className="fas fa-arrow-left text-sm" />
                Back to Home
              </button>
            </Link>
          </div>
        </div>
      </section>

      <section className="section-padding pt-8">
        <div className="container-custom max-w-5xl">
          <Tabs value={activeTab} onValueChange={handleTabChange}>
            <TabsList className="flex h-auto w-full flex-wrap justify-start gap-1 bg-white dark:bg-slate-800 p-2 shadow-sm border border-slate-200 dark:border-slate-700 rounded-xl">
              {legalDocuments.map((doc) => (
                <TabsTrigger
                  key={doc.id}
                  value={doc.id}
                  className="data-[state=active]:bg-primary-custom data-[state=active]:text-white px-3 py-2 text-xs sm:text-sm rounded-lg"
                >
                  {doc.label}
                </TabsTrigger>
              ))}
            </TabsList>

            {legalDocuments.map((doc) => (
              <TabsContent
                key={doc.id}
                value={doc.id}
                className="mt-8 bg-white dark:bg-slate-800 rounded-2xl p-6 sm:p-10 shadow-sm border border-slate-200 dark:border-slate-700"
              >
                <h2 className="text-2xl lg:text-3xl font-bold text-responsive mb-6">
                  {doc.label}
                </h2>
                <LegalDocumentBody document={doc} />
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      <Footer />
    </div>
  );
}
