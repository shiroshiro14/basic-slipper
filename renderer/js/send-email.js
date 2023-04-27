const nodemailer = require('nodemailer');


// Email options

module.exports = {
    sendPayslip: function(email, password, recipient, payslipPath, name)  {
        const transporter = nodemailer.createTransport({
            host: 'smtp.adnovum.ch',
            port: 25,
            secure: false,
            auth: {
                user: email,
                pass: password
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        const mailOptions = {
            from: email,
            to: recipient,
            subject: 'Test email from payslip app',
            text: 'Hi ' + name + ',\n' + 'This is a mail from the automated payslip sending app.\n If possible, please kindly check the attached pdf and check if it is accuratedly password-protected. The password should be your login name + 123. ex: thanhle123. File content should be part of your name.',
            attachments: {
                path: payslipPath,
            }
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

