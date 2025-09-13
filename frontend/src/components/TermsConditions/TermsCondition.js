import React from "react";
import "./TermsConditions.css";

const termsData = [
  {
    title: "Use of Website",
    content:
      "You agree to use this website only for lawful purposes. You must not engage in any activity that may harm, disrupt, or interfere with the website or its users.",
  },
  {
    title: "Account Responsibility",
    content:
      "You are responsible for maintaining the confidentiality of your account information, including your password. Any activity under your account is your responsibility.",
  },
  {
    title: "Product Information",
    content:
      "We strive to provide accurate information about products, pricing, and availability. However, we do not guarantee the completeness or accuracy of such information.",
  },
  {
    title: "Orders & Payments",
    content:
      "By placing an order, you agree to provide accurate billing and shipping information. Payment must be completed using the methods provided on our website.",
  },
  {
    title: "Returns & Refunds",
    content:
      "Our return and refund policy applies to all purchases. Please review our Return Policy page for detailed instructions on how to request a return or refund.",
  },
  {
    title: "Limitation of Liability",
    content:
      "ESmart is not liable for any indirect, incidental, or consequential damages arising from the use of this website or any products purchased from it.",
  },
  {
    title: "Changes to Terms",
    content:
      "We reserve the right to update or modify these terms at any time. Any changes will be posted on this page with the updated date.",
  },
];

export default function TermsConditions() {
  return (
    <div className="termsContainer">
      <h1 className="termsTitle">Terms & Conditions</h1>
      <p className="termsText">
        Welcome to <strong>ESmart</strong>. By accessing or using our website,
        you agree to comply with and be bound by the following terms and
        conditions.
      </p>

      {termsData.map((item, index) => (
        <div key={index}>
          <h2 className="termsSubtitle">{index + 1}. {item.title}</h2>
          <p className="termsText">{item.content}</p>
        </div>
      ))}

      <p className="termsText">
        By using our website, you acknowledge that you have read, understood,
        and agree to these terms and conditions.
      </p>
    </div>
  );
}
