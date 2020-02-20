require('dotenv').config()
const nodemailer = require(`nodemailer`);

module.exports = (to, subject, html) => {

    const transporter = nodemailer.createTransport({
        service: process.env.SERVICE,
        auth: {
            user: process.env.MAIL,
            pass: process.env.EMAIL_PASSWORD
        }
    });

    const mailOptions = {
        from: process.env.MAIL,
        to: to,
        subject: subject,
        text: 'Нова заявка',
        html: html
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });

}