const nodemailer = require('nodemailer');


// Email options
const mailOptions = {
    from: 'your-email-address@gmail.com',
    to: ['recipient1@example.com', 'recipient2@example.com'],
    subject: 'Subject line',
    text: 'This is a test email',
    attachment: 'path/to/your/file.pdf'
};
module.exports = {
    sendPayslip: function(email, password, recipient, payslipPath)  {
        const transporter = nodemailer.createTransport({
            service: 'localhost',
            host: 'smtp.adnovum.ch',
            port: 25,
            auth: {
            user: email,
            pass: password
            }
        });

        const mailOptions = {
            from: 'your-email-address@gmail.com',
            to: [recipient, 'recipient2@example.com'],
            subject: 'Subject line',
            text: 'This is a test email',
            attachment: payslipPath
        };
        transporter.sendMail(mailOptions, function(error, info) {
            if (error) {
            console.log(error);
            } else {
            console.log('Email sent: ' + info.response);
            }
        });
    }
}

