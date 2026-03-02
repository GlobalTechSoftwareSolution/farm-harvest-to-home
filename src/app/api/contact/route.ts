import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
    try {
        const { name, email, message } = await req.json();

        if (!name || !email || !message) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        // Email to company
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: 'farmharvest@gmail.com', // As seen in contact page
            subject: `New Contact Message from ${name}`,
            html: `
        <h2>New Contact Inquiry</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
        });

        // Confirmation Email to user
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Message received - Farm Harvest to Home',
            html: `
        <h2>Hi ${name},</h2>
        <p>Thank you for contacting us! We've received your message and will get back to you within 24 hours.</p>
        <p>Your message:</p>
        <p><em>${message}</em></p>
        <br/>
        <p>Best regards,</p>
        <p>Farm Harvest to Home Team</p>
      `,
        });

        return NextResponse.json({ success: true, message: 'Message sent successfully' }, { status: 200 });
    } catch (error: any) {
        console.error('Contact API Error:', error);
        return NextResponse.json({ error: 'Failed to send message', details: error.message }, { status: 500 });
    }
}
