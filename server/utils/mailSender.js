import nodemailer from "nodemailer"

export const mailSender = async (sendTo, subject, body) => {
    try {

        const transporter = nodemailer.createTransport(
            {
                host: "smtp.forwardemail.net",
                port: 465,
                secure: true,
                auth: {
                    user: process.env.MAIL_USER,
                    pass: process.env.MAIL_PASS,
                },
            }
        );

        const res = await transporter.sendMail(
            {
                from: process.env.MAIL_USER,
                to: sendTo,
                subject: subject,
                html: body,
            }
        );

        console.log("MAIL RES: ", res);

    } catch (error) {

        console.log("Email sending error: ");
        console.log(error)
    }
}