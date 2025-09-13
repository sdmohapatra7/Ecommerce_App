import React, { useState } from "react";
import "./FAQs.css";

const faqsData = [
  {
    question: "How can I place an order?",
    answer:
      "You can browse products, add them to your cart, and proceed to checkout. Follow the on-screen instructions to complete your purchase.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept credit/debit cards, net banking, UPI, and popular wallets for secure transactions.",
  },
  {
    question: "How can I track my order?",
    answer:
      "Once your order is shipped, we will provide a tracking number via email or SMS. You can track it on our website or the courier website.",
  },
  {
    question: "What is your return policy?",
    answer:
      "We offer easy returns within 7 days of delivery for eligible products. Please check our Return Policy page for detailed instructions.",
  },
  {
    question: "How can I contact customer support?",
    answer:
      "You can contact us via email at support@esmart.com or call us at +91 98765 43210. Our support team is available 24/7.",
  },
];

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="faqsContainer">
      <h1 className="faqsTitle">Frequently Asked Questions</h1>
      {faqsData.map((faq, index) => (
        <div
          key={index}
          className={`faqItem ${activeIndex === index ? "active" : ""}`}
        >
          <div className="faqQuestion" onClick={() => toggleFAQ(index)}>
            {faq.question}
            <span className="faqIcon">{activeIndex === index ? "-" : "+"}</span>
          </div>
          {activeIndex === index && <div className="faqAnswer">{faq.answer}</div>}
        </div>
      ))}
    </div>
  );
}
