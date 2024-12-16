import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Quotes.css';

const Quotes = () => {
  const [text, setText] = useState('');
  const [author, setAuthor] = useState('');
  const [textColor, setTextColor] = useState('#ffffff');
  const [backgroundImage, setBackgroundImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [backgroundColor, setBackgroundColor] = useState('#cccccc');
  const [isImageBackground, setIsImageBackground] = useState(true);
  const [isEditing, setIsEditing] = useState(true);
  const canvasRef = useRef(null);
  const navigate = useNavigate();

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBackgroundImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const generateImage = () => {

   

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = 800;
    canvas.height = 600;

    if (isImageBackground && backgroundImage) {
      const img = new Image();
      img.src = backgroundImage;
      img.onload = () => {
        ctx.filter = 'blur(5px)';
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        ctx.filter = 'none';
        drawText(ctx);
        updatePreview(canvas);
      };
    } else {
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      drawText(ctx);
      updatePreview(canvas);
    }
  };

  const drawText = (ctx) => {
  const canvasWidth = canvasRef.current.width;
  const maxTextWidth = canvasWidth - 40;  // Leave padding on the sides

  ctx.font = 'bold 40px "Georgia", serif';
  ctx.textAlign = 'center';
  ctx.fillStyle = textColor;
  ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
  ctx.shadowBlur = 10;

  // Function to wrap text
  const wrapText = (text, x, y, maxWidth, lineHeight) => {
    const words = text.split(' ');
    let line = '';
    let yPos = y;

    for (let i = 0; i < words.length; i++) {
      const testLine = line + words[i] + ' ';
      const metrics = ctx.measureText(testLine);
      const testWidth = metrics.width;

      if (testWidth > maxWidth && i > 0) {
        ctx.fillText(line, x, yPos);
        line = words[i] + ' ';
        yPos += lineHeight;
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line, x, yPos);  // Last line
  };

  // Draw the main text, centered horizontally, and wrapped if necessary
  wrapText(text, canvasWidth / 2, canvasRef.current.height / 2 - 40, maxTextWidth, 50);

  // Draw the author text
  ctx.font = 'italic 24px "Arial", sans-serif';
  ctx.fillText(`- ${author}`, canvasWidth / 2, canvasRef.current.height / 2 + 50);

  ctx.shadowColor = 'transparent';
};


  const updatePreview = (canvas) => {
    setImagePreview(canvas.toDataURL());
  };

  const saveImage = () => {
    const canvas = canvasRef.current;
    const link = document.createElement('a');
    link.download = 'quote.png';
    link.href = canvas.toDataURL();
    link.click();
  };

  const shareOnSocialMedia = (platform) => {
    const canvas = canvasRef.current;
    const dataURL = encodeURIComponent(canvas.toDataURL());

    let shareUrl = '';
    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${dataURL}`;
        break;
      case 'whatsapp':
        shareUrl = `https://api.whatsapp.com/send?text=${dataURL}`;
        break;
      case 'instagram':
        shareUrl = `https://www.instagram.com//send?text=${dataURL}`;
        break;
      default:
        alert('Unsupported platform');
        return;
    }
    window.open(shareUrl, '_blank');
  };

  return (
    <>
      {/* Navbar */}
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
    
      {/* Quote Generator */}
      <div class="parent">
      <div class="container">
      <div className="quote-generator" >
        <h1>Quote Generator</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            generateImage();
            setIsEditing(false);
          }}
        >
     <textarea
  placeholder="Enter quote"
  value={text}
  onChange={(e) => setText(e.target.value)}
  style={{ width: '100%', resize: 'vertical', minHeight: '50px' }}
  required
/>

          <input
            type="text"
            placeholder="Enter author name"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />

          <label>
            <input
              type="radio"
              value="image"
              checked={isImageBackground}
              onChange={() => setIsImageBackground(true)}
            />
            Choose Image Background
          </label>
          <input type="file" accept="image/*" onChange={handleImageChange} />

          <label>
            <input
              type="radio"
              value="color"
              checked={!isImageBackground}
              onChange={() => setIsImageBackground(false)}
            />
            Choose Color Background
          </label>
          <input
            type="color"
            value={backgroundColor}
            onChange={(e) => setBackgroundColor(e.target.value)}
           
          />

          <input
            type="color"
            value={textColor}
            onChange={(e) => setTextColor(e.target.value)}
          />
          <button type="submit">Generate</button>
        </form>

        <canvas ref={canvasRef} style={{ display: 'none' }} />
      </div>
      </div>

      {/* Image Preview Section */}
      <div class="container1">
      {imagePreview && (
        <div className="image-preview-section">
          
          <img
            src={imagePreview}
            alt="Preview"
            style={
                { 
                    maxWidth: '600px',
                    border: '5px solid #000',
                    boxShadow: '5px 5px 15px rgba(0, 0, 0, 0.5)',
                    borderRadius: '50px',
                 }}
          />
          <div className="button-group">
            <button onClick={() => setIsEditing(true)}>Edit</button>
            <button onClick={saveImage}>Save</button>
            <div className="share-dropdown">
              <button className="share-btn">Share</button>
              <div className="dropdown-content">
                <button onClick={() => shareOnSocialMedia('facebook')}>Facebook</button>
                <button onClick={() => shareOnSocialMedia('whatsapp')}>WhatsApp</button>
                <button onClick={() => shareOnSocialMedia('instagram')}>Instagram</button>
              </div>
            </div>
          </div>
        </div>
        
      )}
      </div>
      </div>
    </>
  );
};

export default Quotes;
