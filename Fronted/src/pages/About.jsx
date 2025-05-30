import React from 'react';

const About = () => {
  return (
    <div className="about-container">
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
  );
};

export default About;
