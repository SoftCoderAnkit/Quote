import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import "./Signup.css"; // Assuming you have CSS in an App.css file
import image1 from "../Images/image1.jpg";
import image2 from "../Images/image2.jpg";
import image3 from "../Images/image3.jpg";
import Slider from "react-slick"; // Import react-slick for carousel
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Signup() {
  const [isLogin, setIsLogin] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate(); // Initialize useNavigate

  // Toggle to show the login or signup form
  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission for both login and signup
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Select the correct endpoint
    const endpoint = isLogin ? "/login" : "/signup";

    try {
      const response = await axios.post(`http://localhost:5000${endpoint}`, formData);
      if (response.status === 200 || response.status === 201) {
        alert(`${isLogin ? "Login" : "Signup"} successful`);
        console.log(response.data);

        // Redirect to Home page on successful login
        if (isLogin) {
          navigate("/home");
        }
      }
    } catch (error) {
      console.error("There was an error submitting the form!", error);
      alert(`${isLogin ? "Login" : "Signup"} failed!`);
    }
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const books = [
    {
      title: "Life Of The Wild",
      image: image1,  // Use the imported image
      description: "A captivating journey into the wild.",
    },
    {
      title: "Journey Through Nature",
      image: image2,  // Use the imported image
      description: "Explore the beauty of nature.",
    },
    {
      title: "Secrets of the Forest",
      image: image3,  // Use the imported image
      description: "Unveil the mysteries of the deep forest.",
    },
  ];

  return (
    <div className="container">
      
      {/* Signup Form */}
      {!isLogin && (
        <div className="form-container active">
          <h2>Signup Form</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />

            <button type="submit">Signup</button>
          </form>
          <div className="toggle-link" onClick={toggleForm}>
            Already have an account? Login
          </div>
        </div>
      )}

      {/* Login Form */}
      {isLogin && (
        <div className="form-container">
          <h2>Login Form</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="login-email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="login-password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />

            <button type="submit">Login</button>
          </form>
          <div className="toggle-link" onClick={toggleForm}>
            Don't have an account? Signup
          </div>
        </div>
      )}

      {/* Carousel */}
      <div className="carousel-container">
        <Slider {...settings}>
          {books.map((book, index) => (
            <div className="carousel-slide" key={index}>
              <img src={book.image} alt={book.title} className="carousel-image" />
              <div className="carousel-content">
                <h2>{book.title}</h2>
                <p>{book.description}</p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}

export default Signup;
