import React from 'react';
import './ReadQuote.css';
import { useNavigate } from 'react-router-dom';

// Function to import all images from a folder
function importAll(r) {
  let images = {};
  r.keys().forEach((item, index) => { images[item.replace('./', '')] = r(item); });
  return images;
}

// Import all images in the folder
const images = importAll(require.context('../Images', false, /\.(png|jpe?g|svg)$/));

const ReadQuote = () => {
  const navigate = useNavigate();

  // Download image function
  const handleDownload = (src) => {
    const link = document.createElement('a');
    link.href = src;
    link.download = src.split('/').pop(); // Extracts image name
    document.body.appendChild(link); // Append link to body
    link.click();
    document.body.removeChild(link); // Remove link after download
  };

  // Share function with links to social media
  const handleShare = (src) => {
    const encodedSrc = encodeURIComponent(src);
    const shareLinks = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedSrc}`,
      instagram: `https://www.instagram.com/?url=${encodedSrc}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodedSrc}`,
    };

    // Open each link in a new window
    Object.keys(shareLinks).forEach(platform => {
      window.open(shareLinks[platform], '_blank');
    });
  };

  // Render images with Download and Share buttons
  const imageElements = Object.keys(images).map((key, index) => {
    const ImageSrc = images[key];
    return (
      <div key={index} className="quote-image-wrapper">
        <img src={ImageSrc} alt={`Quote ${index + 1}`} className="quote-image" />
        <div className="button-group">
          <button onClick={() => handleDownload(ImageSrc)} className="download-button">Download</button>
          <button onClick={() => handleShare(ImageSrc)} className="share-button">Share</button>
        </div>
      </div>
    );
  });

  return (
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
                <a className="nav-link" href="#about">About Us</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#contact">Contact</a>
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
                    <a className="dropdown-item" href="/Quotes">Write Quote</a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="/read-Post">Read Quote</a>
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
      
      <div className="quote-container">
        {imageElements}
      </div>
    </div>
  );
};

export default ReadQuote;
