import React, { useState, useEffect } from 'react';
import '../styles/HomePage.css';

export default function HomePage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const categories = [
    { 
      id: 1, 
      name: 'Fruits', 
      image: 'https://media.istockphoto.com/id/529664572/photo/fruit-background.jpg?s=612x612&w=0&k=20&c=K7V0rVCGj8tvluXDqxJgu0AdMKF8axP0A15P-8Ksh3I=',
      description: 'Fresh and seasonal fruits from local farms'
    },
    { 
      id: 2, 
      name: 'Vegetables', 
      image: 'https://agricultureguruji.com/wp-content/uploads/2021/05/best-vegetable-grow-in-greenhouse-scaled.jpeg.webp',
      description: 'Organic vegetables grown with care'
    },
    { 
      id: 3, 
      name: 'Grains', 
      image: 'https://static.toiimg.com/thumb/msid-71866680,width-1280,height-720,resizemode-4/71866680.jpg',
      description: 'Premium quality grains and cereals'
    },
  ];

  const steps = [
    { id: 1, title: 'Browse Products', icon: '🔍' },
    { id: 2, title: 'Add to Cart', icon: '🛒' },
    { id: 3, title: 'Place Order', icon: '📦' },
    { id: 4, title: 'Get Delivered', icon: '🚚' },
  ];

  const testimonials = [
    { id: 1, name: 'John Doe', text: 'Amazing fresh produce!', rating: 5, image: 'https://randomuser.me/api/portraits/men/1.jpg' },
    { id: 2, name: 'Jane Smith', text: 'Best quality vegetables!', rating: 5, image: 'https://randomuser.me/api/portraits/women/1.jpg' },
    { id: 3, name: 'Mike Johnson', text: 'Great service!', rating: 4, image: 'https://randomuser.me/api/portraits/men/2.jpg' },
  ];

  return (
    <div className="home-page">
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="navbar-title">FarmConnect</div>
        <div className="nav-right">
          <ul className="nav-links">
            <li><a href="#">Home</a></li>
            <li><a href="#">Farmer</a></li>
            <li><a href="#">Buyer</a></li>
            <li><a href="#" onClick={(e) => {
              e.preventDefault();
              setIsAboutModalOpen(true);
            }}>About</a></li>
            <li><a href="/register">Register</a></li>
            <li><a href="/login">Login</a></li>
            <li><a href="#" className="cart-icon">🛒</a></li>
          </ul>
        </div>
      </nav>

      <div className="hero-section">
        <div className="hero-content">
          <h1>Fresh Farm Products Delivered to You</h1>
          <p>
            FarmConnect helps you buy fresh produce directly from the source — local farmers.
            Cut the middlemen, support local agriculture, and enjoy fresh, affordable produce.
          </p>
          <a href="/register" className="hero-button">
            Shop Now
          </a>
        </div>
        <div className="hero-image">
          <img
            src="https://img.freepik.com/free-vector/organic-farming-concept_23-2148433516.jpg?semt=ais_hybrid&w=740"
            alt="Farmer"
            className="hero-image"
          />
        </div>
      </div>

      {isAboutModalOpen && (
        <div 
          className={`about-modal-overlay ${isAboutModalOpen ? 'active' : ''}`}
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setIsAboutModalOpen(false);
            }
          }}
        >
          <div className="about-modal">
            <button 
              className="modal-close-btn"
              onClick={(e) => {
                e.stopPropagation();
                setIsAboutModalOpen(false);
              }}
            >
              ×
            </button>
            <div className="about-content">
              <h2>Our Mission</h2>
              <p>
                At FarmConnect, our mission is to revolutionize the agricultural supply chain by directly connecting farmers with consumers. 
                We aim to eliminate middlemen, reduce costs, and ensure fair prices for both farmers and buyers.
              </p>

              <h2>Our Vision</h2>
              <p>
                We envision a sustainable future where farmers receive fair compensation for their hard work, 
                consumers get fresh and authentic produce, and the environment benefits from reduced carbon footprint.
              </p>

              <h2>What We Do</h2>
              <div className="about-grid">
                <div className="about-card">
                  <h3>Direct Connection</h3>
                  <p>
                    We provide a platform that directly connects farmers with consumers, 
                    allowing them to buy fresh produce directly from the source.
                  </p>
                </div>
                
                <div className="about-card">
                  <h3>Quality Assurance</h3>
                  <p>
                    We ensure that all our farmers follow sustainable farming practices and 
                    maintain high standards of quality in their produce.
                  </p>
                </div>
                
                <div className="about-card">
                  <h3>Support Local</h3>
                  <p>
                    By supporting local farmers, we help strengthen the local economy and 
                    promote sustainable agricultural practices.
                  </p>
                </div>
                
                <div className="about-card">
                  <h3>Transparency</h3>
                  <p>
                    We provide complete transparency about the source of the produce, 
                    farming practices, and pricing structure.
                  </p>
                </div>
              </div>

              <h2>Our Impact</h2>
              <div className="impact-stats">
                <div className="stat-card">
                  <h3>1000+</h3>
                  <p>Local Farmers Connected</p>
                </div>
                
                <div className="stat-card">
                  <h3>5000+</h3>
                  <p>Satisfied Customers</p>
                </div>
                
                <div className="stat-card">
                  <h3>100%</h3>
                  <p>Fresh Produce</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <section className="categories-section">
        <h2>Shop by Category</h2>
        <div className="categories-grid">
          {categories.map(category => (
            <a key={category.id} href={`/category/${category.name.toLowerCase()}`} className="category-card">
              <img src={category.image} alt={category.name} />
              <h3>{category.name}</h3>
            </a>
          ))}
        </div>
      </section>

      <section className="how-it-works">
        <h2>How It Works</h2>
        <div className="steps-container">
          {steps.map(step => (
            <div key={step.id} className="step-card">
              <div className="step-icon">{step.icon}</div>
              <h3>{step.title}</h3>
            </div>
          ))}
        </div>
      </section>

      <section className="testimonials">
        <h2>What Our Customers Say</h2>
        <div className="testimonials-grid">
          {testimonials.map(testimonial => (
            <div key={testimonial.id} className="testimonial-card">
              <img src={testimonial.image} alt={testimonial.name} className="testimonial-image" />
              <p>{testimonial.text}</p>
              <div className="testimonial-meta">
                <span className="testimonial-name">{testimonial.name}</span>
                <div className="rating">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="star">⭐</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>About FarmConnect</h3>
            <p>Connecting farmers and buyers directly for a sustainable future.</p>
          </div>
          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul>
              <li><a href="#">About Us</a></li>
              <li><a href="#">Contact</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms of Service</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Connect With Us</h3>
            <div className="social-links">
              <a href="#">📱</a>
              <a href="#">📘</a>
              <a href="#">📸</a>
              <a href="#">🐦</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 FarmConnect. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}