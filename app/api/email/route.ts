import { type NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

export async function POST(request: NextRequest) {
  const { email, name, country, subject, message } = await request.json();

  const transport = nodemailer.createTransport(new SMTPTransport({
    name: 'myfcloudsg',
    host: "node120.myfcloudsg.com",
    // service: 'gmail',
    port: 465,
    secure: true, // upgrade later with STARTTLS
    auth: {
      user: process.env.NEXT_PUBLIC_MY_EMAIL,
      pass: process.env.NEXT_PUBLIC_MY_PASSWORD,
    },
    // service: 'gmail',
    // auth: {
    //   user: process.env.NEXT_PUBLIC_MY_EMAIL,
    //   pass: process.env.NEXT_PUBLIC_MY_PASSWORD,
    // },
  }));

  const mailOptions: Mail.Options = {
    from: 'SB Acoustics',
    to: [`${process.env.NEXT_PUBLIC_MY_EMAIL}`, "backup@sbacoustics.com", "test-djlatw3nk@srv1.mail-tester.com", "alfonskerja@gmail.com"],
    replyTo: `${email}`,
    subject: `${subject}`,
    html: `<div><b>Name:</b> ${name}</div>
    <div><b>Email:</b> ${email}</div>
    <div><b>Country:</b> ${country}</div>
    <div><b>Subject:</b> ${subject}</div>
    <div><b>Message:</b> ${message}</div>`,
  };

  const sendMailPromise = () =>
    new Promise<string>((resolve, reject) => {
      transport.sendMail(mailOptions, function (err) {
        if (!err) {
          resolve('Email sent');
        } else {
          reject(err.message);
        }
      });
    });

  try {
    await sendMailPromise();
    return NextResponse.json({ message: 'Email sent' });
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 500 });
  }
}

