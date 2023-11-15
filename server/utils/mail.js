import Mailgen from "mailgen";
import nodemailer from 'nodemailer';


export const sendEmail = async (option) => {
    
    const mailGenerator = new Mailgen({
        theme: 'salted',
        product: {
            name: "FreeAPI",
            link: "https://to-do-app-sand-chi.vercel.app/",
        }
    });

    const emailText = mailGenerator.generatePlaintext(option.mailgenContent);
    const emailHtml = mailGenerator.generate(option.mailgenContent);
    

    const transporter = nodemailer.createTransport({
        host: process.env.MAILTRAP_SMTP_HOST,
        port: process.env.MAILTRAP_SMTP_PORT,
        auth: {
            user: process.env.MAILTRAP_SMTP_USER,
            pass: process.env.MAILTRAP_SMTP_PASS,
        }
    });
    const mail = {
        from: "mail.freeapi@gmail.com",
        to:option.email ,
        subject: option.subject,
        text: emailText,
        html: emailHtml,
    };

    try {
        await transporter.sendMail(mail);
    } catch (error) {
        console.log(
            "Email service failed silently. Make sure you have provided your MAILTRAP credentials in the .env file"
        );
        console.log("Error: ", error);

    }

};

export const emailVerificationMailgenContent = (username, verificationUrl) => {
    return {
      body: {
        name: username,
        intro: "Welcome to our app! We're very excited to have you on board.",
        action: {
          instructions:
            "To verify your email please click on the following button:",
          button: {
            color: "#22BC66", 
            text: "Verify your email",
            link: verificationUrl,
          },
        },
        outro:
          "Need help, or have questions? Just reply to this email, we'd love to help.",
      },
    };
  };