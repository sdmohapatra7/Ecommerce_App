import React from "react";
import "./AboutUs.css";

export default function AboutUs() {
  return (
    <div className="aboutContainer">
      <h1 className="aboutTitle">About Us</h1>
      <p className="aboutText">
        Welcome to <span className="highlight">ESmart</span> — your trusted
        ecommerce destination.  
        <br />
        <br />
        At ESmart, we believe shopping should be <strong>simple</strong>,{" "}
        <strong>secure</strong>, and <strong>smart</strong>. Our platform
        provides high-quality products, seamless checkout, and reliable customer
        service to ensure your satisfaction every step of the way.
      </p>

      <h2 className="aboutSubtitle">Our Mission</h2>
      <p className="aboutText">
        To deliver premium quality products with a smooth online shopping
        experience. We are committed to customer happiness and building lasting
        trust.
      </p>

      <h2 className="aboutSubtitle">Why Choose Us?</h2>
      <ul className="aboutList">
        <li>✔ High quality products at the best prices</li>
        <li>✔ Secure payments and fast delivery</li>
        <li>✔ 24/7 customer support</li>
        <li>✔ Easy returns and hassle-free shopping</li>
      </ul>

      <h2 className="aboutSubtitle">Get in Touch</h2>
      <p className="aboutText">
        📍 Location: Bhubaneswar, India  
        <br />
        📧 Email: support@esmart.com  
        <br />
        📞 Phone: +91 97778 87204
      </p>
    </div>
  );
}
