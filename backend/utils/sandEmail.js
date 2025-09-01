const nodeMailer = require('nodemailer');

const sandEmail = async(options)=>{
    const transporter = nodeMailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        service: process.env.SMTP_SERVICE,
        auth:{
            user: process.env.SMTP_MAIL,
            pass: process.env.SMTP_PASSWORD
        }
    });

    const mailOption = {
        from: process.env.SMTP_MAIL,
        to: options.email,
        subject: options.subject,
        // text: options.message //shows HTML as plain text
        html: options.message //render HTML properly
    };

    await transporter.sendMail(mailOption);
};

module.exports = sandEmail;