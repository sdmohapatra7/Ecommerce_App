import twilio from "twilio";

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

export const sendSMS = async (to, body) => {
  try {
    await client.messages.create({
      body,
      from: process.env.TWILIO_PHONE_NUMBER, // Your Twilio number
      to, // Customer phone number with country code
    });
    console.log("✅ SMS sent successfully to", to);
  } catch (err) {
    console.error("❌ Failed to send SMS:", err.message);
  }
};

export const sendWhatsApp = async (to, body) => {
  try {
    await client.messages.create({
      body,
      from: "whatsapp:" + process.env.TWILIO_WHATSAPP_NUMBER,
      to: "whatsapp:" + to,
    });
    console.log("✅ WhatsApp message sent successfully to", to);
  } catch (err) {
    console.error("❌ Failed to send WhatsApp message:", err.message);
  }
};
