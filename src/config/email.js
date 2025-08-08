const nodemailer = require('nodemailer');

// Log email configuration status
console.log('📧 Initializing email transport with Gmail');
console.log('📧 Email User:', process.env.EMAIL_USER);
console.log('📧 Using App Password:', process.env.EMAIL_PASSWORD ? 'Yes (hidden)' : 'No');

const transporter = nodemailer.createTransporter({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // Use TLS
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    },
    tls: {
        rejectUnauthorized: false
    },
    debug: process.env.NODE_ENV === 'development', // Only debug in development
    logger: process.env.NODE_ENV === 'development'
});

// Verify the connection configuration
transporter.verify(function(error, success) {
    if (error) {
        console.error('❌ SMTP connection verification failed:', error.message);
        console.error('🔧 Please check your Gmail App Password configuration');
    } else {
        console.log('✅ SMTP server is ready to take our messages');
    }
});

const sendEmail = async (to, subject, html) => {
    try {
        console.log(`📧 Attempting to send email to: ${to}`);
        console.log(`📧 Subject: ${subject}`);
        
<<<<<<< HEAD
        const info = await transporter.sendMail({
            from: `"Flavor Heaven support" <${process.env.EMAIL_USER}>`,
=======
        const mailOptions = {
            from: {
                name: 'Flavor Heaven Restaurant',
                address: process.env.EMAIL_USER
            },
>>>>>>> a35d9e50d8dcbdd601d4a3aba0c4b959ca63bc56
            to,
            subject,
            html,
            // Add text version as fallback
            text: html.replace(/<[^>]*>/g, '')
        };
        
        const info = await transporter.sendMail(mailOptions);
        
        console.log(`✅ Email sent successfully: ${info.messageId}`);
        console.log(`📧 Response: ${info.response}`);
        return { success: true, messageId: info.messageId };
    } catch (error) {
        console.error('❌ Email sending failed:', error.message);
        
        // Provide specific error guidance
        if (error.code === 'EAUTH') {
            console.error('🔐 Authentication Error: Please ensure you are using a Gmail App Password, not your regular password');
            console.error('📝 Steps to fix:');
            console.error('   1. Enable 2-Factor Authentication on your Gmail account');
            console.error('   2. Generate an App Password for this application');
            console.error('   3. Use the App Password in your EMAIL_PASSWORD environment variable');
        } else if (error.code === 'ECONNECTION') {
            console.error('🌐 Connection Error: Please check your internet connection');
        } else if (error.code === 'ETIMEDOUT') {
            console.error('⏰ Timeout Error: Gmail server took too long to respond');
        }
        
        return { success: false, error: error.message };
    }
};

module.exports = { sendEmail };