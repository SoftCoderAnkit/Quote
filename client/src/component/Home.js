
import React from "react";
import axios from 'axios';
import "./Home.css"; // Make sure you have appropriate styles
import { useNavigate } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa"; // Import icons
const handleFormSubmit = (e) => {
  e.preventDefault();
  
  const formData = {
    name: e.target.name.value,
    email: e.target.email.value,
    message: e.target.message.value,
  };

  axios.post('http://localhost:5000/contact', formData)
  
};
const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      <div>
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
          <div className="container-fluid">
            <a className="navbar-brand" href="Home">
              QuoteCreation
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <a className="nav-link" href="#about">
                    About Us
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#contact">
                    Contact
                  </a>
                </li>
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="/"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Quote
                  </a>
                  <ul className="dropdown-menu">
                    <li>
                      <a className="dropdown-item" href="/Quotes">
                        Write Quote
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="/read-Post">
                        Read Quote
                      </a>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                  </ul>
                </li>
              </ul>
              <form className="d-flex" role="search">
                <button
                  className="btn btn-outline-success"
                  type="button"
                  onClick={() => navigate("/")}
                >
                  Logout
                </button>
              </form>
            </div>
          </div>
        </nav>

        {/* Motivational Quotes Section */}
        <section class="motivational-section">
  <div class="quotes-container">
    
  

    <blockquote class="quote">
      "The only way to do great work is to love what you do."
      <cite>- Steve Jobs</cite>
    </blockquote>

    <blockquote class="quote">
      "Success is not the key to happiness. Happiness is the key to success."
      <cite>- Albert Schweitzer</cite>
    </blockquote>
  </div>

  <div class="right-image">
    <img src="C:/Users/vivek/OneDrive/Desktop/project1/src/Images/inspirational-image.jpg" alt="Inspiration"/>
  </div>
</section>


        {/* About Section */}
        <section id="about" className="about-section">
        <h2>About Us</h2>
<p>
  Welcome to <strong>QuoteCreation</strong>, your ultimate source of inspiration and motivation. We believe that a single quote has the power to inspire a lifetime of change, growth, and success. At QuoteCreation, our mission is to create a platform where the magic of words can be explored, shared, and cherished.
</p>
<p>
  Whether you’re looking for daily motivation, or seeking to share your own thoughts, QuoteCreation is here to help. We offer an extensive collection of inspiring quotes, covering topics like perseverance, love, leadership, success, and much more. Not only can you discover powerful quotes, but our platform allows you to easily create your own, add your personal touch, and share them with the world.
</p>
<p>
  <strong>Why QuoteCreation?</strong> We provide an all-in-one platform that’s simple to use and packed with features. You can:
  <ul>
    <li><strong>Download quotes:</strong> Save your favorite quotes for offline use, whether for personal motivation or to share later.</li>
    <li><strong>Share instantly:</strong> Easily share your quotes across social media platforms, with your friends, or with your followers.</li>
    <li><strong>Create personalized quotes:</strong> Add your favorite text, choose fonts and designs, and make your own custom quote images.</li>
  </ul>
</p>
<p>
  At QuoteCreation, we aim to inspire people every day and give them the tools to express themselves through the power of words. Join us on a journey of motivation and creativity—where every quote could be the spark that changes someone's life.
</p>

          <div className="social-media-icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <FaFacebookF />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <FaTwitter />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <FaInstagram />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <FaLinkedin />
            </a>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="contact-section">
  <h2>Contact Us</h2>
  <p>If you have any questions or suggestions, feel free to reach out!</p>
  <div className="contact-container">
    {/* Left side: Map */}
    <div className="map" >
  
      <iframe
         src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3428.466284802714!2d76.6184829!3d30.76149000000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ffab879da0041%3A0x12efbe2a8c0a7973!2sGGS%20College%20of%20Modern%20Technology!5e0!3m2!1sen!2sin!4v1729851315664!5m2!1sen!2sin"
        width="100%"
        height="450"
        style={{ border: 10 }}
        allowFullScreen=""
        loading="lazy"
        title="Location Map"
      ></iframe>
    </div>
    
    {/* Right side: Contact Form */}
    <div className="contact-form">
      <form onSubmit={handleFormSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" required />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" required />
        </div>
        <div>
          <label htmlFor="message">Message:</label>
          <textarea id="message" name="message" required></textarea>
        </div>
        <button type="submit">Send</button>
      </form>
    </div>
  </div>
  <p className="copyright">© 2024 QuoteCreation. All Rights Reserved.</p>
</section>

      </div>
    </>
  );
};

export default Home;
