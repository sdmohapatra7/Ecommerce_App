import React from "react";
import "./PrivacyPolicy.css";

const privacyData = [
  {
    title: "Information Collection",
    content:
      "We collect personal information such as your name, email, phone number, and payment details when you use our services or make a purchase.",
  },
  {
    title: "Use of Information",
    content:
      "Your information is used to process orders, provide customer support, improve our services, and send updates or promotional offers with your consent.",
  },
  {
    title: "Information Sharing",
    content:
      "We do not sell, trade, or rent your personal information to third parties. We may share information with service providers only to fulfill orders or provide services on our behalf.",
  },
  {
    title: "Cookies & Tracking",
    content:
      "We use cookies and similar technologies to enhance your browsing experience, analyze site traffic, and personalize content and ads.",
  },
  {
    title: "Data Security",
    content:
      "We implement security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction.",
  },
  {
    title: "Your Rights",
    content:
      "You can request access to, correction, or deletion of your personal information. You may also opt out of marketing communications at any time.",
  },
  {
    title: "Changes to Policy",
    content:
      "We may update this Privacy Policy from time to time. Changes will be posted on this page with the updated date.",
  },
];

export default function PrivacyPolicy() {
  return (
    <div className="privacyContainer">
      <h1 className="privacyTitle">Privacy Policy</h1>
      <p className="privacyText">
        At <strong>ESmart</strong>, we value your privacy and are committed to protecting your personal information. Please read the following to understand how we collect, use, and safeguard your data.
      </p>

      {privacyData.map((item, index) => (
        <div key={index}>
          <h2 className="privacySubtitle">{index + 1}. {item.title}</h2>
          <p className="privacyText">{item.content}</p>
        </div>
      ))}

      <p className="privacyText">
        By using our website, you agree to the terms outlined in this Privacy Policy.
      </p>
    </div>
  );
}
