export interface SendEmailData {
  subject: string;
  body: string;
}
export interface MailAdapter {
  sendEmail: (data:SendEmailData) => Promise<void>;
}
