import React from 'react';
import "./Footer.css";
import logo from "../../images/logo.png";

export default function Footer() {
  return (
    <footer id="footer">
      {/* Column 1 - About */}
      <div className="leftFooter">
        <h4>About ESmart</h4>
        <p>
          ESmart is your one-stop online store for electronics, fashion,
          and daily essentials. We aim to provide quality products with
          trusted service.
        </p>
        <p>
          From gadgets to clothing, we bring you the best deals, fast delivery,
          and a seamless shopping experience. Our mission is to make
          everyday shopping smarter and simpler.
        </p>
      </div>

      {/* Column 2 - Brand */}
      <div className="midFooter">
        <img src={logo} alt="ESmart Logo" className="footerLogo" />
        <p>
          High Quality is our first priority. Every product you purchase from
          us goes through strict quality checks before reaching you.
        </p>
        <p>
          We value our customers and focus on providing 24/7 support,
          secure payment methods, and hassle-free returns.
        </p>
        <p>© {new Date().getFullYear()} ESmart. All Rights Reserved.</p>
      </div>

      {/* Column 3 - Quick Links */}
      <div className="rightFooter">
        <h4>Quick Links</h4>
        <a href="/about">About Us</a>
        <a href="/contact">Contact</a>
        <a href="/faqs">FAQs</a>
        <a href="/terms">Terms & Conditions</a>
        <a href="/privacy">Privacy Policy</a>
      </div>

      {/* Column 4 - Social */}
      <div className="fourthFooter">
        <h4>Follow Us</h4>
        <a
          href="https://www.linkedin.com/in/shaktidhar-mohapatra"
          target="_blank"
          rel="noreferrer"
        >
          LinkedIn
        </a>
        <a
          href="https://sdmohapatra7.github.io/My-Portfolio/"
          target="_blank"
          rel="noreferrer"
        >
          Portfolio
        </a>
        <a
          href="https://github.com/sdmohapatra7"
          target="_blank"
          rel="noreferrer"
        >
          GitHub
        </a>
        <a
          href="https://www.instagram.com/shaktidhar_mohapatra/"
          target="_blank"
          rel="noreferrer"
        >
          Instagram
        </a>
        <a
          href="https://www.facebook.com/shaktidhar.mohapatra"
          target="_blank"
          rel="noreferrer"
        >
          Facebook
        </a>
      </div>
    </footer>
  );
}
