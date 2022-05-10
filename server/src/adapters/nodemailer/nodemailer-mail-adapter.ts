import { MailAdapter, SendEmailData } from "../mail-adapter";
import nodemailer from "nodemailer";

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "65867025bba5cd",
    pass: "8aa878bc09f3c1",
  },
});

export class NodemailerMailAdapter implements MailAdapter {
  async sendMail({ subject, body }: SendEmailData) {
    await transport.sendMail({
      from: "Equipe Feedget <oi@feedget.com>",
      to: "Willian Amaro Gomes <wamarotest@gmail.com>",
      subject: subject,
      html: body,
    });
  }
}
