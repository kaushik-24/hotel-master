import nodemailer from "nodemailer";
import { DotenvConfig } from "../config/env.config";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: DotenvConfig.EMAIL_USER,
    pass: DotenvConfig.EMAIL_PASS,
  },
});

interface BookingEmailData {
  bookingId: string;
  name: string;
  email: string;
  roomName: string;
  checkInDate: string;
  checkOutDate: string;
  numberOfRooms: number;
}

export const sendBookingConfirmationEmail = async (data: BookingEmailData) => {
  const { bookingId, name, email, roomName, checkInDate, checkOutDate, numberOfRooms } = data;

  const mailOptions = {
    from: DotenvConfig.EMAIL_USER,
    to: email,
    subject: "Booking Confirmation",
    html: `
      <h2>Booking Confirmation</h2>
      <p>Dear ${name},</p>
      <p>Thank you for your booking! Here are your booking details:</p>
      <ul>
        <li><strong>Booking ID:</strong> ${bookingId}</li>
        <li><strong>Room:</strong> ${roomName}</li>
        <li><strong>Check-In Date:</strong> ${checkInDate}</li>
        <li><strong>Check-Out Date:</strong> ${checkOutDate}</li>
        <li><strong>Number of Rooms:</strong> ${numberOfRooms}</li>
      </ul>
      <p>We look forward to welcoming you!</p>
      <p>Best regards,<br>Your Hotel Team</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true, message: "Email sent successfully" };
  } catch (error) {
    console.error("Error sending email:", error);
    return { success: false, message: "Failed to send email" };
  }
};
