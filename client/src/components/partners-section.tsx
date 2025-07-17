export default function PartnersSection() {
  const partners = [
    { name: "Microsoft", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/microsoft.svg" },
    { name: "Google", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/google.svg" },
    { name: "Amazon", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/amazon.svg" },
    { name: "Netflix", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/netflix.svg" },
    { name: "Apple", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/apple.svg" },
    { name: "Meta", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/meta.svg" },
    { name: "Tesla", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/tesla.svg" },
    { name: "Spotify", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/spotify.svg" }
  ];

  return (
    <section className="section-padding bg-white dark:bg-slate-800">
      <div className="container-custom">
        <div className="text-center mb-12 animate-fadeInUp">
          <h2 className="text-3xl font-bold text-secondary-custom dark:text-white mb-4">
            Trusted by Industry <span className="gradient-text">Leaders</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            We're proud to work with some of the world's most innovative companies to deliver cutting-edge solutions.
          </p>
        </div>

        <div className="relative overflow-hidden">
          <div className="flex animate-scroll space-x-12">
            {/* First set of logos */}
            {partners.map((partner, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-32 h-16 flex items-center justify-center bg-slate-50 dark:bg-slate-700 rounded-lg hover:shadow-lg transition-shadow duration-300"
              >
                <img
                  src={partner.logo}
                  alt={`${partner.name} logo`}
                  className="w-20 h-8 object-contain filter grayscale hover:grayscale-0 transition-all duration-300 dark:invert"
                />
              </div>
            ))}
            {/* Duplicate for seamless scrolling */}
            {partners.map((partner, index) => (
              <div
                key={`duplicate-${index}`}
                className="flex-shrink-0 w-32 h-16 flex items-center justify-center bg-slate-50 dark:bg-slate-700 rounded-lg hover:shadow-lg transition-shadow duration-300"
              >
                <img
                  src={partner.logo}
                  alt={`${partner.name} logo`}
                  className="w-20 h-8 object-contain filter grayscale hover:grayscale-0 transition-all duration-300 dark:invert"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-12 animate-fadeInUp">
          <p className="text-slate-600 dark:text-slate-400 mb-6">
            Ready to join our growing list of satisfied clients?
          </p>
          <button className="bg-primary-custom text-white px-8 py-3 rounded-lg hover:bg-[hsl(221,83%,45%)] transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1">
            Become a Partner
          </button>
        </div>
      </div>
    </section>
  );
}