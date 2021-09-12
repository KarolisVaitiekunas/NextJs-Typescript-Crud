import nodemailer from "nodemailer";
import config from "config";
import log from "../utils/logger";

const EMAIL_SERVICE = config.get<string>("EMAIL_SERVICE");
const EMAIL_USERNAME = config.get<string>("EMAIL_USERNAME");
const EMAIL_PASSWORD = config.get<string>("EMAIL_PASSWORD");
const EMAIL_FROM = config.get<string>("EMAIL_FROM");

interface IOptions {
  to: string;
  subject: string;
  text: string;
  html?: string;
}

const sendEmail = (options: IOptions) => {
  const transporter = nodemailer.createTransport({
    service: EMAIL_SERVICE,
    auth: {
      user: EMAIL_USERNAME,
      pass: EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: EMAIL_FROM,
    to: options.to,
    subject: options.subject,
    html: options.text,
  };

  transporter.sendMail(mailOptions, function (err, info) {
    if (err) {
      log.error(err);
    }
  });
};

export default sendEmail;
