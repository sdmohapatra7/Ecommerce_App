import React, { useState } from "react";
import "./Contact.css";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Here you can connect to backend API
    // Example:
    // axios.post('/api/contact', formData).then(...)

    console.log("Form submitted:", formData);

    setSubmitted(true); // show success message
    setFormData({ name: "", email: "", subject: "", message: "" }); // reset form
  };

  return (
    <div className="contactContainer">
      <h1 className="contactTitle">Contact Us</h1>
      <p className="contactSubtitle">
        Have a question or need help? Fill out the form below and we will get
        back to you as soon as possible.
      </p>

      <form className="contactForm" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="subject"
          placeholder="Subject"
          value={formData.subject}
          onChange={handleChange}
          required
        />
        <textarea
          name="message"
          placeholder="Your Message"
          value={formData.message}
          onChange={handleChange}
          required
        />
        <button type="submit">Send Message</button>
      </form>

      {submitted && (
        <p className="successMessage">
          ✅ Your message has been sent successfully!
        </p>
      )}
    </div>
  );
}
