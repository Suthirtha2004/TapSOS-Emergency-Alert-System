import React, { useRef, useState, useEffect } from 'react';
import { Phone, Shield, Heart, Users, AlertTriangle, MapPin, Clock, Star } from 'lucide-react';
import Header from '../Components/Header';
import '../Components/UI/LandingPage.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { useNotification } from '../Components/NotificationProvider';

const LandingPage = () => {
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    state: '',
    city: '',
    message: ''
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { showNotification } = useNotification();

  // Section refs for smooth scroll
  const homeRef = useRef(null);
  const aboutRef = useRef(null);
  const emergencyRef = useRef(null);
  const contactRef = useRef(null);

  useEffect(() => {
    // Example: check login status from localStorage
    setIsLoggedIn(!!localStorage.getItem('tapsos_logged_in'));
    // Scroll to section if coming from another page
    if (location.state && location.state.scrollTo) {
      const refs = {
        home: homeRef,
        about: aboutRef,
        emergency: emergencyRef,
        contact: contactRef
      };
      const ref = refs[location.state.scrollTo];
      if (ref && ref.current) {
        setTimeout(() => {
          ref.current.scrollIntoView({ behavior: 'smooth' });
        }, 100); // slight delay to ensure DOM is ready
      }
    }
  }, [location]);

  const handleNav = (section) => {
    const refs = {
      home: homeRef,
      about: aboutRef,
      emergency: emergencyRef,
      contact: contactRef
    };
    const ref = refs[section];
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleBackToTap = () => {
    navigate('/tap');
  };

  // States and Cities data
  const statesAndCities = {
    'Maharashtra': ['Mumbai', 'Pune', 'Nagpur', 'Thane', 'Nashik', 'Aurangabad', 'Solapur', 'Kolhapur'],
    'Delhi': ['New Delhi', 'North Delhi', 'South Delhi', 'East Delhi', 'West Delhi', 'Central Delhi'],
    'Karnataka': ['Bangalore', 'Mysore', 'Hubli', 'Mangalore', 'Belgaum', 'Gulbarga'],
    'Tamil Nadu': ['Chennai', 'Coimbatore', 'Madurai', 'Salem', 'Tiruchirappalli', 'Vellore'],
    'Gujarat': ['Ahmedabad', 'Surat', 'Vadodara', 'Rajkot', 'Bhavnagar', 'Jamnagar'],
    'Uttar Pradesh': ['Lucknow', 'Kanpur', 'Varanasi', 'Agra', 'Prayagraj', 'Ghaziabad'],
    'West Bengal': ['Kolkata', 'Howrah', 'Durgapur', 'Asansol', 'Siliguri', 'Bardhaman'],
    'Telangana': ['Hyderabad', 'Warangal', 'Karimnagar', 'Nizamabad', 'Khammam', 'Adilabad'],
    'Rajasthan': ['Jaipur', 'Jodhpur', 'Udaipur', 'Kota', 'Bikaner', 'Ajmer'],
    'Andhra Pradesh': ['Visakhapatnam', 'Vijayawada', 'Guntur', 'Nellore', 'Kurnool', 'Anantapur']
  };

  const emergencyNumbers = [
    {
      id: 1,
      title: 'Police',
      number: '100',
      description: 'Emergency Police Response',
      icon: Shield,
      color: '#3b82f6'
    },
    {
      id: 2,
      title: 'Fire Station',
      number: '101',
      description: 'Fire Emergency Services',
      icon: AlertTriangle,
      color: '#ef4444'
    },
    {
      id: 3,
      title: 'Ambulance',
      number: '102',
      description: 'Medical Emergency Services',
      icon: Heart,
      color: '#10b981'
    },
    {
      id: 4,
      title: 'Women Helpline',
      number: '1091',
      description: 'Women Safety & Support',
      icon: Users,
      color: '#ec4899'
    },
    {
      id: 5,
      title: 'Child Helpline',
      number: '1098',
      description: 'Child Protection Services',
      icon: Heart,
      color: '#f59e0b'
    },
    {
      id: 6,
      title: 'Senior Citizen Helpline',
      number: '14567',
      description: 'Elder Care Support',
      icon: Users,
      color: '#8b5cf6'
    }
  ];

  const features = [
    {
      icon: Shield,
      title: '24/7 Emergency Response',
      description: 'Round-the-clock emergency services at your fingertips'
    },
    {
      icon: MapPin,
      title: 'Location Tracking',
      description: 'Accurate GPS location sharing for faster response'
    },
    {
      icon: Clock,
      title: 'Quick Response Time',
      description: 'Average response time of under 5 minutes'
    },
    {
      icon: Star,
      title: 'Verified Services',
      description: 'All emergency numbers are verified and reliable'
    }
  ];

  const handleEmergencyCall = (number) => {
    window.open(`tel:${number}`, '_self');
  };

  const handleContactInputChange = (e) => {
    const { name, value } = e.target;
    setContactForm(prev => ({
      ...prev,
      [name]: value
    }));
    // Reset city when state changes
    if (name === 'state') {
      setContactForm(prev => ({
        ...prev,
        city: ''
      }));
    }
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    showNotification('Thank you for your message! We will get back to you soon.', 'success');
    setContactForm({
      name: '',
      email: '',
      state: '',
      city: '',
      message: ''
    });
  };

  return (
    <div className="landing-page">
      <Header onNav={handleNav} isLoggedIn={isLoggedIn} />
      {isLoggedIn && (
        <button className="back-to-tap-home-btn" onClick={handleBackToTap}>
          <span className="arrow-left">&#8592;</span> Back to Tap
        </button>
      )}
      {/* Hero Section */}
      <section id="home" className="hero-section" ref={homeRef}>
        <div className="hero-container">
          <div className="hero-content">
            <h1 className="hero-title">
              Emergency Response
              <span className="gradient-text"> Made Simple</span>
            </h1>
            <p className="hero-description">
              TapSOS connects you instantly to emergency services. 
              One tap, immediate help. Your safety is our priority.
            </p>
            <div className="hero-buttons">
              <button className="cta-button primary" onClick={() => navigate('/login')}>
                <Phone size={20} />
                Get Started
              </button>
              <button className="cta-button secondary" onClick={() => handleNav('about')}>
                Learn More
              </button>
            </div>
          </div>
          <div className="hero-image">
            <div className="hero-card">
              <div className="emergency-preview">
                <h3>Quick Access</h3>
                <div className="emergency-grid">
                  {emergencyNumbers.slice(0, 4).map((item) => (
                    <div key={item.id} className="emergency-item">
                      <item.icon size={24} color={item.color} />
                      <span>{item.number}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about-section" ref={aboutRef}>
        <div className="container">
          <div className="section-header">
            <h2>About TapSOS</h2>
            <p>Your trusted emergency response platform</p>
          </div>
          <div className="about-content">
            <div className="about-text">
              <h3>What is TapSOS?</h3>
              <p>
                TapSOS is a comprehensive emergency response platform designed to provide 
                immediate access to emergency services. Our mission is to ensure that help 
                is always just one tap away, making emergency response faster, more reliable, 
                and more accessible for everyone.
              </p>
              <p>
                Whether you need police assistance, medical help, fire services, or specialized 
                support for women and children, TapSOS connects you directly to the right 
                emergency service with verified contact numbers and real-time location sharing.
              </p>
            </div>
            <div className="features-grid">
              {features.map((feature, index) => (
                <div key={index} className="feature-card">
                  <div className="feature-icon">
                    <feature.icon size={32} />
                  </div>
                  <h4>{feature.title}</h4>
                  <p>{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Numbers Section */}
      <section id="emergency" className="emergency-section" ref={emergencyRef}>
        <div className="container">
          <div className="section-header">
            <h2>Emergency Numbers</h2>
            <p>Quick access to all emergency services</p>
          </div>
          <div className="emergency-grid">
            {emergencyNumbers.map((item) => (
              <div key={item.id} className="emergency-card" onClick={() => handleEmergencyCall(item.number)}>
                <div className="emergency-icon" style={{ backgroundColor: `${item.color}20` }}>
                  <item.icon size={32} color={item.color} />
                </div>
                <div className="emergency-info">
                  <h3>{item.title}</h3>
                  <p className="emergency-number">{item.number}</p>
                  <p className="emergency-description">{item.description}</p>
                </div>
                <div className="call-button">
                  <Phone size={20} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact-section" ref={contactRef}>
        <div className="container">
          <div className="section-header">
            <h2>Get in Touch</h2>
            <p>We're here to help and support you</p>
          </div>
          <div className="contact-content">
            <div className="contact-info">
              <div className="contact-item">
                <Phone size={24} />
                <div>
                  <h4>Support Line</h4>
                  <p>+91 1800-TAPSOS</p>
                </div>
              </div>
              <div className="contact-item">
                <MapPin size={24} />
                <div>
                  <h4>Headquarters</h4>
                  <p>Mumbai, Maharashtra, India</p>
                </div>
              </div>
              <div className="contact-item">
                <Clock size={24} />
                <div>
                  <h4>Available 24/7</h4>
                  <p>Round the clock support</p>
                </div>
              </div>
            </div>
            <div className="contact-form">
              <h3>Send us a Message</h3>
              <form onSubmit={handleContactSubmit}>
                <input 
                  type="text" 
                  name="name"
                  value={contactForm.name}
                  onChange={handleContactInputChange}
                  placeholder="Your Name" 
                  required
                />
                <input 
                  type="email" 
                  name="email"
                  value={contactForm.email}
                  onChange={handleContactInputChange}
                  placeholder="Your Email" 
                  required
                />
                <select 
                  name="state" 
                  value={contactForm.state}
                  onChange={handleContactInputChange}
                  required
                >
                  <option value="">Select State</option>
                  {Object.keys(statesAndCities).map(state => (
                    <option key={state} value={state}>{state}</option>
                  ))}
                </select>
                <select 
                  name="city" 
                  value={contactForm.city}
                  onChange={handleContactInputChange}
                  required
                  disabled={!contactForm.state}
                >
                  <option value="">Select City</option>
                  {contactForm.state && statesAndCities[contactForm.state].map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
                <textarea 
                  name="message"
                  value={contactForm.message}
                  onChange={handleContactInputChange}
                  placeholder="Your Message" 
                  rows="4"
                  required
                ></textarea>
                <button type="submit" className="submit-btn">Send Message</button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <div className="logo">
                <Shield size={32} />
                <h3>TapSOS</h3>
              </div>
              <p>Your trusted emergency response platform</p>
            </div>
            <div className="footer-section">
              <h4>Quick Links</h4>
              <ul>
                <li><a href="#home">Home</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#emergency">Emergency</a></li>
                <li><a href="#contact">Contact</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h4>Emergency Services</h4>
              <ul>
                <li>Police: 100</li>
                <li>Fire: 101</li>
                <li>Ambulance: 102</li>
                <li>Women Helpline: 1091</li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2024 TapSOS. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
