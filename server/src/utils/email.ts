import nodemailer from 'nodemailer';
import PDFDocument from 'pdfkit';

interface SendBookingEmailData {
  bookingId: string;
  name: string;
  email: string;
  roomName: string;
  checkInDate: string;
  checkOutDate: string;
  numberOfRooms: number;
  roomPrice: number;
  totalPrice: number;
}

export const sendBookingConfirmationEmail = async (data: SendBookingEmailData) => {
  try {
    console.log('Attempting to send email to:', data.email, 'for booking ID:', data.bookingId);
    console.log('Using EMAIL_USER:', process.env.EMAIL_USER);

    // Create PDF document
    const doc = new PDFDocument();
    let buffers: Buffer[] = [];
    doc.on('data', buffers.push.bind(buffers));
    doc.on('end', () => {});

    // Add content to PDF
    doc.fontSize(20).text('Booking Confirmation', { align: 'center' });
    doc.moveDown();
    doc.fontSize(14).text(`Dear ${data.name},`);
    doc.moveDown();
    doc.text('Your booking is confirmed. Please find the details below:');
    doc.moveDown();
    doc.fontSize(12);
    doc.text(`Booking ID: ${data.bookingId}`);
    doc.text(`Room: ${data.roomName}`);
    doc.text(`Check-in: ${data.checkInDate || 'Not specified'}`);
    doc.text(`Check-out: ${data.checkOutDate || 'Not specified'}`);
    doc.text(`Number of Rooms: ${data.numberOfRooms}`);
    doc.text(`Price per Rooms: ${data.roomPrice.toFixed(2)}`);
    doc.text(`Total Price: ${data.totalPrice.toFixed(2)}`);
    doc.moveDown();
    doc.text('Thank you for choosing us!');
    doc.text('Best regards,');
    doc.text('Hotel Team');
    doc.end();

    // Wait for PDF buffer to be ready
    const pdfBuffer = await new Promise<Buffer>((resolve) => {
      doc.on('end', () => resolve(Buffer.concat(buffers)));
    });

    // Create email transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Email options with PDF attachment
    const mailOptions = {
      from: `"Hotel Booking" <${process.env.EMAIL_USER}>`,
      to: data.email,
      subject: 'Booking Confirmation',
      text: `Dear ${data.name},\n\nYour booking is confirmed. Please find the booking details attached as a PDF.\n\nBest regards,\nHotel Team`,
      html: `<p>Dear ${data.name},</p><p>Your booking is confirmed. Please find the booking details attached as a PDF.</p><p>Best regards,<br>Hotel Team</p>`,
      attachments: [
        {
          filename: `Booking_Confirmation_${data.bookingId}.pdf`,
          content: pdfBuffer,
          contentType: 'application/pdf',
        },
      ],
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully to:', data.email, 'Message ID:', info.messageId);
    return { success: true, message: 'Email sent successfully', messageId: info.messageId };
  } catch (error: any) {
    console.error('Email Sending Error:', error.message, error.stack);
    throw new Error(`Failed to send email: ${error.message}`);
  }
};
