const player = require('play-sound')(opts = {})
const nodemailer = require('nodemailer');

function consoleNotify(location, date) {
    console.log(`NOTIFICATION: [${location}] - [${date}]`);
}

async function soundNotify() {
    return await new Promise((resolve, reject) => {
        player.play('notification.mp3', function(err){
            if (err === null) {
                resolve();
            } else {
                reject(err);
            }
        });
    });
}

class EmailNotification {
    constructor(sender, password, receivers) {
        this.transporter = nodemailer.createTransport({
            host: "smtp-mail.outlook.com",
            secureConnection: false,
            port: 587,
            auth: {
                user: sender,
                pass: password
            },
            tls: {
                ciphers:'SSLv3'
            }
        });

        this.sender = sender;
        this.receivers = receivers;
    }

    async notify(content) {
        console.log(`Sending email to ${JSON.stringify(this.receivers)}...`);
        const mailOptions = {
            from: this.sender,
            to: this.receivers,
            subject: 'UPDATE from ais.usvisa-info.com !!!',
            text: content
        };

        return new Promise((resolve, reject) => {
            this.transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                    reject(error);
                } else {
                    resolve(info);
                }
            });
        });
    }
}

module.exports.consoleNotify = consoleNotify;
module.exports.soundNotify = soundNotify;
module.exports.EmailNotification = EmailNotification;
