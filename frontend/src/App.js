import React, { useEffect, useState, useRef } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

// Portfolio data with placeholder marketing campaigns
const portfolioItems = [
  {
    id: 1,
    title: "Social Media Campaign Strategy",
    description: "Comprehensive brand awareness campaign across multiple platforms",
    image: "https://images.unsplash.com/photo-1613759612065-d5971d32ca49",
    type: "strategy",
    category: "Social Media"
  },
  {
    id: 2,
    title: "Content Creation & Planning",
    description: "Strategic content planning and creative development",
    image: "https://images.unsplash.com/photo-1501556466850-7c9fa1fccb4c",
    type: "content",
    category: "Content Strategy"
  },
  {
    id: 3,
    title: "Multi-Platform Social Campaigns",
    description: "Integrated campaigns across Twitter, Facebook, Pinterest & Google",
    image: "https://images.unsplash.com/photo-1566458383719-239ca2d59a37",
    type: "campaign",
    category: "Social Media"
  },
  {
    id: 4,
    title: "Digital Content Marketing",
    description: "Creative content development for social media engagement",
    image: "https://images.pexels.com/photos/5993303/pexels-photo-5993303.jpeg",
    type: "content",
    category: "Content Marketing"
  },
  {
    id: 5,
    title: "Mobile-First Advertising",
    description: "Digital advertising optimized for mobile and tablet experiences",
    image: "https://images.unsplash.com/photo-1522204523234-8729aa6e3d5f",
    type: "video",
    category: "Digital Ads"
  },
  {
    id: 6,
    title: "Modern Digital Advertising",
    description: "Contemporary approach to digital advertising and brand positioning",
    image: "https://images.pexels.com/photos/7663192/pexels-photo-7663192.jpeg",
    type: "video",
    category: "Digital Ads"
  }
];

// Animated Portfolio Item Component
const PortfolioItem = ({ item, index }) => {
  const [isVisible, setIsVisible] = useState(false);
  const itemRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (itemRef.current) {
      observer.observe(itemRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={itemRef}
      className={`portfolio-item group cursor-pointer transition-all duration-700 transform ${
        isVisible 
          ? 'translate-y-0 opacity-100 scale-100' 
          : 'translate-y-8 opacity-0 scale-95'
      }`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      <div className="relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500 group-hover:scale-105">
        <div className="aspect-[4/3] overflow-hidden">
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        </div>
        
        <div className="p-6">
          <div className="flex items-center justify-between mb-3">
            <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm font-medium rounded-full">
              {item.category}
            </span>
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-gray-300 rounded-full group-hover:bg-black transition-colors duration-300"></div>
              <div className="w-2 h-2 bg-gray-300 rounded-full group-hover:bg-gray-400 transition-colors duration-300" style={{ transitionDelay: '100ms' }}></div>
              <div className="w-2 h-2 bg-gray-300 rounded-full group-hover:bg-gray-300 transition-colors duration-300" style={{ transitionDelay: '200ms' }}></div>
            </div>
          </div>
          
          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-black transition-colors duration-300">
            {item.title}
          </h3>
          <p className="text-gray-600 leading-relaxed">
            {item.description}
          </p>
        </div>

        <div className="absolute inset-0 border-2 border-transparent group-hover:border-gray-200 rounded-2xl transition-colors duration-500"></div>
      </div>
    </div>
  );
};

// Contact Section Component
const ContactSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className={`py-20 bg-gray-50 transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-6">
          Let's Create Something Amazing
        </h2>
        <p className="text-xl text-gray-600 mb-12 leading-relaxed">
          Ready to elevate your brand with compelling marketing campaigns? 
          Let's discuss your vision and bring it to life.
        </p>
        
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="text-center">
            <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-2xl">📧</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Email</h3>
            <p className="text-gray-600">hello@portfolio.com</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-2xl">📱</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Phone</h3>
            <p className="text-gray-600">+1 (555) 123-4567</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-2xl">🌐</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Social</h3>
            <p className="text-gray-600">@portfolio</p>
          </div>
        </div>

        <button className="bg-black text-white px-8 py-4 rounded-full font-semibold hover:bg-gray-800 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
          Start a Conversation
        </button>
      </div>
    </section>
  );
};

const Home = () => {
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);

  useEffect(() => {
    // Show privacy modal on first visit
    const hasVisited = localStorage.getItem('hasVisitedPortfolio');
    if (!hasVisited) {
      setShowPrivacyModal(true);
      localStorage.setItem('hasVisitedPortfolio', 'true');
    }

    // Google Analytics
    if (window.gtag) {
      window.gtag('config', '491096590');
    }
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Privacy Modal */}
      {showPrivacyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-8 max-w-md mx-4 shadow-2xl transform animate-pulse">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Privacy Notice</h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              We use cookies and analytics to improve your experience and understand how you interact with our portfolio. 
              Your privacy is important to us.
            </p>
            <div className="flex space-x-4">
              <button 
                onClick={() => setShowPrivacyModal(false)}
                className="flex-1 bg-black text-white py-3 px-4 rounded-lg hover:bg-gray-800 transition-colors duration-300"
              >
                Accept
              </button>
              <button 
                onClick={() => setShowPrivacyModal(false)}
                className="flex-1 border border-gray-300 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors duration-300"
              >
                Learn More
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-100"></div>
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-20 w-32 h-32 bg-gray-100 rounded-full opacity-20 animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-48 h-48 bg-gray-200 rounded-full opacity-10 animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-10 w-24 h-24 bg-gray-150 rounded-full opacity-15 animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
          <div className="space-y-8 animate-fade-in">
            <h1 className="text-7xl md:text-9xl font-bold text-gray-900 tracking-tight leading-none">
              Portfolio
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Creative marketing campaigns that drive engagement, 
              build brands, and deliver measurable results across all digital platforms.
            </p>

            <div className="flex items-center justify-center space-x-12 text-sm text-gray-500 uppercase tracking-wider">
              <span>Social Media</span>
              <div className="w-px h-6 bg-gray-300"></div>
              <span>Video Ads</span>
              <div className="w-px h-6 bg-gray-300"></div>
              <span>Brand Strategy</span>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-900 mb-6">Featured Work</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A collection of successful marketing campaigns that showcase creativity, 
              strategy, and measurable impact across various digital platforms.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolioItems.map((item, index) => (
              <PortfolioItem key={item.id} item={item} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <ContactSection />

      {/* Footer */}
      <footer className="bg-black text-white py-12">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h3 className="text-3xl font-bold mb-4">Portfolio</h3>
          <p className="text-gray-400 mb-8">Creating impactful marketing experiences</p>
          
          <div className="flex justify-center space-x-8 mb-8">
            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Instagram</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">LinkedIn</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Twitter</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Behance</a>
          </div>
          
          <div className="border-t border-gray-800 pt-8">
            <p className="text-gray-500 text-sm">
              © 2024 Portfolio. All rights reserved. | 
              <button className="ml-2 hover:text-white transition-colors duration-300">Privacy Policy</button>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

function App() {
  useEffect(() => {
    // Load Google Analytics
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=491096590';
    document.head.appendChild(script);

    script.onload = () => {
      window.dataLayer = window.dataLayer || [];
      function gtag(){window.dataLayer.push(arguments);}
      window.gtag = gtag;
      gtag('js', new Date());
      gtag('config', '491096590');
    };
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;