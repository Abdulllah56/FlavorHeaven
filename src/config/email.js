const nodemailer = require('nodemailer');

// Log email configuration status
console.log('📧 Initializing email transport with Gmail');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    },
    debug: true, // Enable debugging
    logger: true, // Log transport activity
    tls: {
        // Do not fail on invalid certificates
        rejectUnauthorized: false
    }
});

const sendEmail = async (to, subject, html) => {
    try {
        console.log(`📧 Attempting to send email to: ${to}`);
        
        const info = await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to,
            subject,
            html
        });
        
        console.log(`📧 Email sent successfully: ${info.messageId}`);
        return true;
    } catch (error) {
        console.error('❌ Email sending failed:', error);
        console.error('Error details:', JSON.stringify(error, null, 2));
        return false;
    }
};

module.exports = { sendEmail };
