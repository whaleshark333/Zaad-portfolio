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

// Latest Works data
const latestWorksData = [
  { id: 1, title: "Branding", description: "Complete brand identity and visual systems" },
  { id: 2, title: "Analytics", description: "Data-driven marketing performance insights" },
  { id: 3, title: "Content", description: "Engaging content for all digital platforms" },
  { id: 4, title: "Strategy", description: "Comprehensive marketing strategy development" },
  { id: 5, title: "Creative", description: "Innovative creative campaigns and concepts" },
  { id: 6, title: "Digital", description: "Digital marketing and online presence optimization" },
  { id: 7, title: "Social", description: "Social media management and growth strategies" },
  { id: 8, title: "Video", description: "Video content production and advertising" },
  { id: 9, title: "Design", description: "Visual design for marketing materials" },
  { id: 10, title: "Growth", description: "Business growth through strategic marketing" }
];

// Privacy Policy Component
const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-white py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
        <div className="prose prose-lg max-w-none">
          <p className="text-gray-600 mb-6 text-lg">Last updated: December 2024</p>
          
          <div className="space-y-8">
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Information We Collect</h2>
              <p className="text-gray-700 leading-relaxed">
                We collect information you provide directly to us, such as when you contact us through our website, 
                subscribe to our newsletter, or interact with our portfolio content. This may include your name, 
                email address, phone number, and any messages you send to us.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">How We Use Your Information</h2>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>To respond to your inquiries and provide customer support</li>
                <li>To improve our website and portfolio presentation</li>
                <li>To analyze website usage patterns and performance</li>
                <li>To send you updates about our work (with your consent)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Analytics and Cookies</h2>
              <p className="text-gray-700 leading-relaxed">
                We use Google Analytics to understand how visitors interact with our website. This service uses 
                cookies to collect anonymous information about your visit, including pages viewed, time spent on 
                the site, and traffic sources. You can opt out of Google Analytics tracking at any time.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Data Security</h2>
              <p className="text-gray-700 leading-relaxed">
                We implement appropriate technical and organizational measures to protect your personal information 
                against unauthorized access, alteration, disclosure, or destruction.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Contact Us</h2>
              <p className="text-gray-700 leading-relaxed">
                If you have any questions about this Privacy Policy, please contact us at hello@portfolio.com 
                or use the contact form on our website.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

// Admin Panel Component
const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('content');
  const [logoFile, setLogoFile] = useState(null);
  const [portfolioItems, setPortfolioItems] = useState([]);

  const handleFileUpload = (event, type) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (type === 'logo') {
          setLogoFile(e.target.result);
          localStorage.setItem('customLogo', e.target.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="bg-black text-white p-6">
            <h1 className="text-3xl font-bold">Portfolio Admin Panel</h1>
            <p className="text-gray-300 mt-2">Customize your portfolio content and settings</p>
          </div>

          <div className="flex border-b">
            {['content', 'media', 'settings'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-4 text-sm font-medium capitalize ${
                  activeTab === tab
                    ? 'border-b-2 border-black text-black'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="p-6">
            {activeTab === 'content' && (
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Logo Management</h3>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileUpload(e, 'logo')}
                      className="hidden"
                      id="logo-upload"
                    />
                    <label htmlFor="logo-upload" className="cursor-pointer">
                      <div className="text-gray-600">
                        <div className="text-4xl mb-2">📷</div>
                        <p>Click to upload new logo</p>
                        <p className="text-sm text-gray-500 mt-1">PNG, JPG up to 2MB</p>
                      </div>
                    </label>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Portfolio Items</h3>
                  <div className="space-y-4">
                    <button className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors">
                      Add New Portfolio Item
                    </button>
                    <div className="grid gap-4">
                      <div className="border rounded-lg p-4">
                        <h4 className="font-semibold">Sample Portfolio Item</h4>
                        <p className="text-gray-600 text-sm">Click to edit content, upload new images, or modify details</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'media' && (
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-gray-900">Media Library</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                    <span className="text-gray-400 text-4xl">+</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-gray-900">Site Settings</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Site Title
                    </label>
                    <input
                      type="text"
                      defaultValue="Marketing Portfolio"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Contact Email
                    </label>
                    <input
                      type="email"
                      defaultValue="hello@portfolio.com"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Latest Works Item Component
const LatestWorkItem = ({ work, onClick }) => {
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
      onClick={() => onClick(work)}
      className={`latest-work-item bg-white rounded-lg shadow-md hover:shadow-xl p-6 cursor-pointer transition-all duration-500 transform ${
        isVisible 
          ? 'translate-y-0 opacity-100 scale-100' 
          : 'translate-y-4 opacity-0 scale-95'
      } hover:scale-105`}
    >
      <h4 className="font-bold text-gray-900 text-lg mb-2">{work.title}</h4>
      <p className="text-gray-600 text-sm">{work.description}</p>
    </div>
  );
};

// Latest Works Section Component
const LatestWorksSection = () => {
  const [selectedWork, setSelectedWork] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleWorkClick = (work) => {
    setSelectedWork(work);
  };

  const closeModal = () => {
    setSelectedWork(null);
  };

  return (
    <section 
      ref={sectionRef}
      className={`py-20 bg-gray-50 transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">Latest Works</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore our most recent marketing projects and creative solutions
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          {latestWorksData.map((work, index) => (
            <LatestWorkItem 
              key={work.id} 
              work={work} 
              onClick={handleWorkClick}
            />
          ))}
        </div>
      </div>

      {/* Modal for work details */}
      {selectedWork && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-8 max-w-md mx-4 shadow-2xl transform animate-pulse">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-2xl font-bold text-gray-900">{selectedWork.title}</h3>
              <button 
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>
            <p className="text-gray-600 mb-6 leading-relaxed">
              {selectedWork.description}
            </p>
            <div className="text-center">
              <button 
                onClick={closeModal}
                className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors duration-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

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
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
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

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSubmitMessage('Thank you! Your message has been sent successfully.');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      setSubmitMessage('Sorry, there was an error sending your message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

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

        {/* Contact Form */}
        <div className="max-w-md mx-auto">
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
            />
            <textarea
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleInputChange}
              required
              rows="4"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
            ></textarea>
            
            <button 
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-black text-white px-8 py-4 rounded-lg font-semibold hover:bg-gray-800 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Sending...' : 'Start a Conversation'}
            </button>

            {submitMessage && (
              <p className={`text-center ${submitMessage.includes('error') ? 'text-red-600' : 'text-green-600'}`}>
                {submitMessage}
              </p>
            )}
          </form>
        </div>
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
          {/* Logo Section */}
          <div className="mb-8">
            <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden shadow-lg">
              <img 
                src="https://images.unsplash.com/photo-1694878982147-e52097b660ec" 
                alt="Portfolio Logo" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="space-y-8 animate-fade-in">
            <div>
              <h1 className="text-5xl md:text-7xl font-bold text-gray-600 tracking-tight leading-none mb-4">
                Marketing
              </h1>
              <h1 className="text-7xl md:text-9xl font-bold text-gray-900 tracking-tight leading-none">
                Portfolio
              </h1>
            </div>
            
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Creative marketing campaigns that drive engagement, 
              build brands, and deliver measurable results across all digital platforms.
            </p>

            <div className="flex items-center justify-center space-x-12 text-sm text-gray-500 uppercase tracking-wider">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-2 rounded-lg overflow-hidden shadow-md">
                  <img 
                    src="https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg" 
                    alt="Social Media" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <span>Social Media</span>
              </div>
              <div className="w-px h-20 bg-gray-300"></div>
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-2 rounded-lg overflow-hidden shadow-md">
                  <img 
                    src="https://images.unsplash.com/photo-1460925895917-afdab827c52f" 
                    alt="Video Ads" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <span>Video Ads</span>
              </div>
              <div className="w-px h-20 bg-gray-300"></div>
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-2 rounded-lg overflow-hidden shadow-md">
                  <img 
                    src="https://images.unsplash.com/photo-1593062096033-9a26b09da705" 
                    alt="Brand Strategy" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <span>Brand Strategy</span>
              </div>
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

      {/* Latest Works Section */}
      <LatestWorksSection />

      {/* Contact Section */}
      <ContactSection />

      {/* Footer */}
      <footer className="bg-black text-white py-12">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h3 className="text-3xl font-bold mb-4">2025 Portfolio</h3>
          <p className="text-gray-400 mb-8">Creating impactful marketing experiences</p>
          
          <div className="flex justify-center space-x-8 mb-8">
            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Instagram</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">LinkedIn</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Twitter</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Behance</a>
          </div>
          
          <div className="border-t border-gray-800 pt-8">
            <p className="text-gray-500 text-sm">
              © 2025 Portfolio. All rights reserved. | 
              <a href="/privacy-policy" className="ml-2 hover:text-white transition-colors duration-300">Privacy Policy</a>
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
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;