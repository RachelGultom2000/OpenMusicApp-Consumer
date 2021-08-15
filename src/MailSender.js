const nodemailer = require('nodemailer');

class MailSender {
    constructor(){
        this._transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: process.env.MAIL_ADDRESS,
                pass: process.env.MAIL_PASSWORD,
            },
        });
    }

    sendEmail(targetEmail, content){
        const message = {
            from: 'Open Music App',
            to: targetEmail,
            subject: 'Ekspor Playlist',
            text: 'Terlampir hasil dari eksport Playlist',
            attachments: [
                {
                    filename : 'playlist.json',
                    content,
                },
            ],
        };

        return this._transporter.sendMail(message);
    }
}

module.exports = MailSender;