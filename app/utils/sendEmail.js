const nodemailer = require("nodemailer");

const sendEmail = async (email, subject, text) => {
    try {
        const transporter = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            secureConnection: false,
            auth: {
                user: "2fa9a071df5676",
                pass: "29560d67a72dae"
            },
            tls: {
                ciphers:'SSLv3'
            }
        });

        await transporter.sendMail({
            from: "2fa9a071df5676",
            to: email,
            subject: subject,
            text: text,

        });

    } catch (error) {
        console.log(error, "email not sent");
    }
};


module.exports = sendEmail;

//const sendEmail = async (email, subject, text) => {
//     try {
//         const transporter = nodemailer.createTransport({
//             host: "sandbox.smtp.mailtrap.io",
//             port: 2525,
//             secureConnection: false,
//             auth: {
//                 user: "2fa9a071df5676",
//                 pass: "29560d67a72dae"
//             },
//             tls: {
//                 ciphers:'SSLv3'
//             },
//             send:true
//         });
//
//         const mailOptions = {
//             from: '2fa9a071df5676',
//             to: 'email',
//             subject: 'Invoices due',
//             text: 'Dudes, we really need your money.',
//         };
//
//         await transporter.sendMail(mailOptions, function (error,info){
//
//             if (error) {
//                 console.log(error);
//             } else {
//                 console.log('Email sent: ' + info.response);
//             }
//         });
//         console.log("email sent sucessfully");
//     } catch (error) {
//         console.log(error, "email not sent");
//     }
// };