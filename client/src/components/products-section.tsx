import { Button } from "@/components/ui/button";

export default function ProductsSection() {
  const products = [
    {
      name: "FlowAnalytics",
      description: "Advanced analytics platform that transforms your data into actionable insights with real-time dashboards and predictive modeling.",
      features: [
        "Real-time data visualization",
        "Machine learning predictions",
        "Custom dashboard builder",
        "API integrations"
      ],
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
      category: "Featured Product",
      categoryIcon: "fas fa-star",
      primaryColor: "primary-custom",
      reverse: false
    },
    {
      name: "TeamSync",
      description: "All-in-one collaboration platform that brings teams together with integrated chat, video calls, and project management.",
      features: [
        "HD video conferencing",
        "Real-time messaging",
        "Task management",
        "File sharing & storage"
      ],
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
      category: "Collaboration",
      categoryIcon: "fas fa-users",
      primaryColor: "accent-custom",
      reverse: true
    }
  ];

  return (
    <section id="products" className="section-padding bg-white dark:bg-slate-800">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-secondary-custom dark:text-white mb-6">Our Products</h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            Innovative solutions designed to solve real-world problems and accelerate business growth.
          </p>
        </div>
        
        <div className="space-y-16">
          {products.map((product, index) => (
            <div key={index} className={`grid lg:grid-cols-2 gap-12 items-center ${product.reverse ? 'lg:grid-flow-col-dense' : ''}`}>
              <div className={`${product.reverse ? 'lg:col-start-2' : 'order-2 lg:order-1'}`}>
                <div className={`inline-flex items-center px-4 py-2 bg-${product.primaryColor}/10 text-${product.primaryColor} rounded-full text-sm font-semibold mb-4`}>
                  <i className={`${product.categoryIcon} mr-2`}></i>
                  {product.category}
                </div>
                <h3 className="text-3xl font-bold text-secondary-custom dark:text-white mb-6">{product.name}</h3>
                <p className="text-xl text-slate-600 dark:text-slate-300 mb-6">{product.description}</p>
                <ul className="space-y-3 mb-8">
                  {product.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-slate-600 dark:text-slate-300">
                      <i className="fas fa-check-circle text-emerald-500 mr-3"></i>
                      {feature}
                    </li>
                  ))}
                </ul>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button className={`bg-${product.primaryColor} text-white px-8 py-3 rounded-lg hover:bg-${product.primaryColor}/90 transition-colors duration-200 font-semibold`}>
                    Start Free Trial
                  </Button>
                  <Button variant="outline" className="border-2 border-slate-300 text-slate-700 hover:border-primary-custom hover:text-primary-custom transition-colors duration-200 font-semibold">
                    Learn More
                  </Button>
                </div>
              </div>
              <div className={`${product.reverse ? 'lg:col-start-1' : 'order-1 lg:order-2'}`}>
                <img 
                  src={product.image} 
                  alt={`${product.name} interface`}
                  className="rounded-2xl shadow-2xl w-full h-auto"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
