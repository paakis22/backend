

// export const sendEmail = async (to, subject, html) => {
//   try {
//     const transporter = nodemailer.createTransport({
//       service: 'gmail', // or use host + port + secure if using a custom SMTP
//       auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS,
//       },
//     });

//     const mailOptions = {
//       from: `"Clasio Admin" <${process.env.EMAIL_USER}>`,
//       to,
//       subject,
//       html,
//     };

//     await transporter.sendMail(mailOptions);
//     console.log(`📧 Email sent to ${to}`);
//   } catch (err) {
//     console.error('❌ Error sending email:', err.message);
//   }
// };




import nodemailer from 'nodemailer';

export const sendEmail = async (to, subject, html) => {
  try {
    // You can use 'service' or 'host/port/secure' based on your SMTP provider
    const transporter = nodemailer.createTransport({
      service: 'gmail', // For Gmail. For other providers, use host/port/secure.
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"Clasio Admin" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`📧 Email sent to ${to}. Message ID: ${info.messageId}`);
  } catch (err) {
    console.error('❌ Error sending email:', err);
  }
};

