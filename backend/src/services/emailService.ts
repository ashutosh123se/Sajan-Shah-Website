import nodemailer from 'nodemailer';

interface EmailOptions {
  to: string | string[];
  subject: string;
  text?: string;
  html?: string;
  attachments?: Array<{
    filename: string;
    content: Buffer;
    contentType?: string;
  }>;
}

import { getSmtpConfig } from '../utils/config';

export class EmailService {
  private static async getTransporter() {
    const config = await getSmtpConfig();
    
    // @ts-ignore - nodemailer typing might vary
    return nodemailer.createTransport({
      host: config.host,
      port: config.port,
      secure: config.secure,
      auth: {
        user: config.user,
        pass: config.pass,
      },
    });
  }

  static async sendEmail(options: EmailOptions): Promise<void> {
    try {
      const config = await getSmtpConfig();
      const transporter = await this.getTransporter();
      
      const mailOptions = {
        from: config.from,
        to: options.to,
        subject: options.subject,
        text: options.text,
        html: options.html,
        attachments: options.attachments,
      };

      await transporter.sendMail(mailOptions);
      console.log('Email sent successfully to:', options.to);
    } catch (error) {
      console.error('Failed to send email:', error);
      throw error;
    }
  }

  static sendWelcomeEmail(email: string, name: string): Promise<void> {
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome to Sajan Shah Community</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { text-align: center; margin-bottom: 30px; }
          .logo { width: 120px; height: 60px; }
          .content { background: #f8f9fa; padding: 30px; border-radius: 8px; }
          .button { display: inline-block; background: #007bff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: bold; }
          .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <img src="https://via.placeholder.com/120x60" alt="Sajan Shah" class="logo">
          </div>
          
          <div class="content">
            <h1>Welcome to the Community, ${name}!</h1>
            <p>Thank you for joining Sajan Shah's community. We're excited to have you on board and look forward to helping you unlock your full potential.</p>
            <p>Here's what you can expect:</p>
            <ul>
              <li>Exclusive access to memory techniques and study materials</li>
              <li>Early bird access to new programs and events</li>
              <li>Personalized learning recommendations</li>
              <li>Community support and networking opportunities</li>
            </ul>
            <p>Get started by exploring our programs and resources.</p>
            <div style="text-align: center; margin-top: 30px;">
              <a href="${process.env.NEXT_PUBLIC_SITE_URL}/programs" class="button">Explore Programs</a>
            </div>
          </div>
          
          <div class="footer">
            <p>Best regards,<br>The Sajan Shah Team</p>
            <p>Memory Man of India • Global Youth Speaker</p>
          </div>
        </div>
      </body>
      </html>
    `;

    return this.sendEmail({
      to: email,
      subject: 'Welcome to Sajan Shah Community!',
      html,
    });
  }

  static sendOrderConfirmation(email: string, orderDetails: any): Promise<void> {
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Order Confirmation - Sajan Shah</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { text-align: center; margin-bottom: 30px; }
          .order-details { background: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px; }
          .item { display: flex; justify-content: space-between; margin-bottom: 10px; }
          .total { font-weight: bold; font-size: 18px; color: #007bff; }
          .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Order Confirmation</h1>
            <p>Thank you for your order! We've received your payment and will process it shortly.</p>
          </div>
          
          <div class="order-details">
            <h2>Order Details</h2>
            <div class="item">
              <span>Order ID:</span>
              <span>${orderDetails.id}</span>
            </div>
            <div class="item">
              <span>Date:</span>
              <span>${new Date(orderDetails.createdAt).toLocaleDateString()}</span>
            </div>
            <div class="item">
              <span>Items:</span>
              <span>${orderDetails.items.map((item: any) => item.name).join(', ')}</span>
            </div>
            <div class="item total">
              <span>Total:</span>
              <span>₹${orderDetails.amount}</span>
            </div>
          </div>
          
          <div class="footer">
            <p>We'll send you tracking information once your order ships.</p>
            <p>Best regards,<br>The Sajan Shah Team</p>
          </div>
        </div>
      </body>
      </html>
    `;

    return this.sendEmail({
      to: email,
      subject: 'Order Confirmation - Sajan Shah',
      html,
    });
  }

  static sendProgramEnrollment(email: string, programDetails: any): Promise<void> {
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Program Enrollment - Sajan Shah</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { text-align: center; margin-bottom: 30px; }
          .program-details { background: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px; }
          .button { display: inline-block; background: #007bff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: bold; }
          .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Program Enrollment Confirmed!</h1>
            <p>Congratulations on enrolling in our program!</p>
          </div>
          
          <div class="program-details">
            <h2>Program Details</h2>
            <div class="item">
              <span>Program:</span>
              <span>${programDetails.title}</span>
            </div>
            <div class="item">
              <span>Duration:</span>
              <span>${programDetails.duration || 'Self-paced'}</span>
            </div>
            <div class="item">
              <span>Start Date:</span>
              <span>${new Date().toLocaleDateString()}</span>
            </div>
            <div style="text-align: center; margin-top: 20px;">
              <a href="${process.env.NEXT_PUBLIC_SITE_URL}/member/dashboard" class="button">Access Program</a>
            </div>
          </div>
          
          <div class="footer">
            <p>We're excited to have you join our learning community!</p>
            <p>Best regards,<br>The Sajan Shah Team</p>
          </div>
        </div>
      </body>
      </html>
    `;

    return this.sendEmail({
      to: email,
      subject: 'Program Enrollment Confirmed - Sajan Shah',
      html,
    });
  }

  static sendEventRegistration(email: string, eventDetails: any): Promise<void> {
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Event Registration - Sajan Shah</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { text-align: center; margin-bottom: 30px; }
          .event-details { background: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px; }
          .button { display: inline-block; background: #007bff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: bold; }
          .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Event Registration Confirmed!</h1>
            <p>You're all set for the event!</p>
          </div>
          
          <div class="event-details">
            <h2>Event Details</h2>
            <div class="item">
              <span>Event:</span>
              <span>${eventDetails.title}</span>
            </div>
            <div class="item">
              <span>Date:</span>
              <span>${new Date(eventDetails.eventDate).toLocaleDateString()}</span>
            </div>
            ${eventDetails.city ? `
            <div class="item">
              <span>Location:</span>
              <span>${eventDetails.city}</span>
            </div>
            ` : ''}
            <div style="text-align: center; margin-top: 20px;">
              <a href="${eventDetails.webinarUrl}" class="button">Join Event</a>
            </div>
          </div>
          
          <div class="footer">
            <p>We look forward to seeing you at the event!</p>
            <p>Best regards,<br>The Sajan Shah Team</p>
          </div>
        </div>
      </body>
      </html>
    `;

    return this.sendEmail({
      to: email,
      subject: 'Event Registration Confirmed - Sajan Shah',
      html,
    });
  }

  static sendContactNotification(contactData: any): Promise<void> {
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Contact Message - Sajan Shah</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { text-align: center; margin-bottom: 30px; }
          .message-details { background: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px; }
          .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>New Contact Message</h1>
            <p>You have received a new message through the contact form.</p>
          </div>
          
          <div class="message-details">
            <h2>Message Details</h2>
            <div class="item">
              <span>Name:</span>
              <span>${contactData.name}</span>
            </div>
            <div class="item">
              <span>Email:</span>
              <span>${contactData.email}</span>
            </div>
            <div class="item">
              <span>Phone:</span>
              <span>${contactData.phone || 'Not provided'}</span>
            </div>
            <div class="item">
              <span>Subject:</span>
              <span>${contactData.subject}</span>
            </div>
            <div class="item">
              <span>Message:</span>
              <span>${contactData.message}</span>
            </div>
            <div class="item">
              <span>Date:</span>
              <span>${new Date().toLocaleDateString()}</span>
            </div>
          </div>
          
          <div class="footer">
            <p>Please respond to this inquiry at your earliest convenience.</p>
            <p>Best regards,<br>The Sajan Shah Team</p>
          </div>
        </div>
      </body>
      </html>
    `;

    return this.sendEmail({
      to: process.env.ADMIN_EMAIL || 'admin@sajanshah.com',
      subject: 'New Contact Message - Sajan Shah',
      html,
    });
  }

  static sendPasswordSetupEmail(email: string, name: string, token: string): Promise<void> {
    const setupUrl = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/set-password?token=${token}`;
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Set Your Password - Sajan Shah</title>
        <style>
          body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; line-height: 1.6; color: #1a1a1a; margin: 0; padding: 0; }
          .container { max-width: 600px; margin: 40px auto; padding: 40px; border: 1px solid #eee; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
          .header { text-align: center; margin-bottom: 40px; }
          .logo { font-size: 24px; font-weight: bold; color: #000; letter-spacing: -1px; }
          .logo span { color: #f26522; }
          .content { margin-bottom: 40px; }
          h1 { font-size: 28px; font-weight: 800; margin-bottom: 24px; letter-spacing: -0.5px; }
          p { margin-bottom: 20px; color: #4a4a4a; font-size: 16px; }
          .button-container { text-align: center; margin: 40px 0; }
          .button { display: inline-block; background: #000; color: #fff !important; padding: 18px 36px; text-decoration: none; border-radius: 4px; font-weight: bold; text-transform: uppercase; font-size: 14px; letter-spacing: 2px; }
          .footer { text-align: center; margin-top: 40px; color: #999; font-size: 12px; border-top: 1px solid #eee; padding-top: 30px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="logo">sajan<span>shah</span></div>
          </div>
          
          <div class="content">
            <h1>Welcome to the inner circle, ${name.split(' ')[0]}.</h1>
            <p>Your account has been successfully created following your recent interaction with our platform.</p>
            <p>To access your purchased products, programs, and personalized dashboard, you need to establish a secure password.</p>
            
            <div class="button-container">
              <a href="${setupUrl}" class="button">Set Your Password</a>
            </div>
            
            <p>This link will remain active for 24 hours. If it expires, please contact our support team.</p>
          </div>
          
          <div class="footer">
            <p>&copy; ${new Date().getFullYear()} Sajan Shah. All rights reserved.</p>
            <p>Memory Man of India • Global Youth Speaker</p>
          </div>
        </div>
      </body>
      </html>
    `;

    return this.sendEmail({
      to: email,
      subject: 'Action Required: Set Your Password - Sajan Shah',
      html,
    });
  }

  static sendPasswordSuccessEmail(email: string, name: string): Promise<void> {
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Password Set Successfully - Sajan Shah</title>
        <style>
          body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; line-height: 1.6; color: #1a1a1a; margin: 0; padding: 0; }
          .container { max-width: 600px; margin: 40px auto; padding: 40px; border: 1px solid #eee; border-radius: 12px; }
          .header { text-align: center; margin-bottom: 40px; }
          .logo { font-size: 24px; font-weight: bold; color: #000; letter-spacing: -1px; }
          .logo span { color: #f26522; }
          .content { margin-bottom: 40px; text-align: center; }
          h1 { font-size: 28px; font-weight: 800; margin-bottom: 24px; }
          .button { display: inline-block; background: #000; color: #fff !important; padding: 18px 36px; text-decoration: none; border-radius: 4px; font-weight: bold; text-transform: uppercase; font-size: 14px; }
          .footer { text-align: center; margin-top: 40px; color: #999; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="logo">sajan<span>shah</span></div>
          </div>
          <div class="content">
            <h1>Success!</h1>
            <p>Hi ${name.split(' ')[0]}, your password has been successfully set.</p>
            <p>You can now login to your dashboard using your email address and the new password.</p>
            <div style="margin-top: 40px;">
              <a href="${process.env.FRONTEND_URL || 'http://localhost:3000'}/login" class="button">Login to Dashboard</a>
            </div>
          </div>
          <div class="footer">
            <p>&copy; ${new Date().getFullYear()} Sajan Shah. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    return this.sendEmail({
      to: email,
      subject: 'Password Set Successfully - Sajan Shah',
      html,
    });
  }
}
