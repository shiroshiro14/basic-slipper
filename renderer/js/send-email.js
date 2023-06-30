const nodemailer = require('nodemailer');

const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];

const logArea = document.getElementById('TerminalTextArea');

module.exports = {
    sendPayslip: function(email, password, recipient, payslipPath, name)  {

        const d = new Date();
        let thisMonth = month[d.getMonth()];
        let thisYear = d.getFullYear();
        console.log(thisMonth);
        console.log(thisYear);
        var senderName   = email.substring(0, email.lastIndexOf("@"));
        console.log(senderName);
        var splitName = senderName.split('.');
        console.log(splitName);
        const firstName = splitName[0].charAt(0).toUpperCase() + splitName[0].slice(1);
        const lastName = splitName[1].charAt(0).toUpperCase() + splitName[1].slice(1);

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
            from: firstName + ' ' + lastName + ' <'+ email +'>',
            to: recipient,
            cc: 'hr-salary@adnovum.ch',
            subject: 'Payslip - ' + thisMonth + ' ' + thisYear,
            text: 'Hi ' + name + ',\n' + 'On behalf of Adnovum Vietnam, I would like to send you the monthly pay-slip of ' + thisMonth + ', ' + thisYear+ '. Please refer to the attached file.\n\n If you have any unclear information,please reach out to me for explanation.\n\nBest regards,\n' + firstName,
            attachments: {
                path: payslipPath,
            }
        };

        transporter.sendMail(mailOptions, function(error, info) {
            if (error) {
            logArea.append('[Error]' + error + '\n');
            } else {
            logArea.append('[Success] Email sent successfully: ' + recipient +'\n');
            }
        });

        return new Promise(async (resolve, reject) => {
            setTimeout(async () => {
                resolve();
            }, 1000);
        });
    }
}

