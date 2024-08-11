import nodemailer from 'nodemailer';
import Logger from '../../lib/logger';

export const sendEmail = async (
  to: string,
  subject: string,
  text: string,
  html: any
) => {
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 456,
    secure: true,
    auth: {
      user: 'shubhamrajjoshi69@gmail.com',
      pass: 'ulqa tixh kvjm hyht',
    },
  });

  let methodOptions: string | undefined | {} = {
    from: {
      name: 'Linkend Backend',
      address: 'shubhamrajjoshi69@gmail.com',
    },
    to,
    subject,
    text,
    html,
  };

  return transporter
    .sendMail(methodOptions)
    .then((res) => {
      Logger.info(res.response);
    })
    .catch((err) => {
      Logger.error(err);
    });
};
