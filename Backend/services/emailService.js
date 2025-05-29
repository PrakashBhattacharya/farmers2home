const nodemailer = require('nodemailer');
const winston = require('winston');
const path = require('path');

// Determine if running in production (like Vercel)
const isProduction = process.env.NODE_ENV === 'production';

// Configure logger
const transports = [
  new winston.transports.Console({
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.simple()
    )
  })
];

// Only add file transport if NOT in production
if (!isProduction) {
  transports.push(
    new winston.transports.File({
      filename: path.join(__dirname, '../logs/email.log'),
      maxsize: 5242880, // 5MB
      maxFiles: 5
    })
  );
}

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports
});

// Create reusable transporter
const createTransporter = () => {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
    logger.error('Email configuration missing. Please check your .env file.');
    throw new Error('Email configuration missing');
  }

  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
    }
  });
};

// Email templates
const emailTemplates = {
  orderAccepted: (orderDetails) => ({
    subject: '🎉 Order Accepted!',
    html: `
      <h2>Your Order Has Been Accepted!</h2>
      <p>Dear ${orderDetails.customerName},</p>
      <p>Great news! Your order has been accepted by the farmer.</p>
      <h3>Order Details:</h3>
      <ul>
        <li>Order ID: ${orderDetails.orderId}</li>
        <li>Product: ${orderDetails.productName}</li>
        <li>Quantity: ${orderDetails.quantity}</li>
        <li>Total Amount: ₹${orderDetails.totalAmount}</li>
        <li>Order Date: ${orderDetails.orderDate}</li>
      </ul>
      <p>We'll keep you updated on the delivery status.</p>
      <p>Thank you for choosing Farm2Home!</p>
    `
  }),

  orderRejected: (orderDetails) => ({
    subject: '❌ Order Update',
    html: `
      <h2>Order Status Update</h2>
      <p>Dear ${orderDetails.customerName},</p>
      <p>We regret to inform you that your order has been rejected.</p>
      <p>Reason: ${orderDetails.rejectionReason || 'No reason provided'}</p>
      <h3>Order Details:</h3>
      <ul>
        <li>Order ID: ${orderDetails.orderId}</li>
        <li>Product: ${orderDetails.productName}</li>
        <li>Quantity: ${orderDetails.quantity}</li>
        <li>Total Amount: ₹${orderDetails.totalAmount}</li>
        <li>Order Date: ${orderDetails.orderDate}</li>
      </ul>
      <p>If you have any questions, please contact our support team.</p>
    `
  }),

  orderDelivered: (orderDetails) => ({
    subject: '📦 Order Delivered!',
    html: `
      <h2>Your Order Has Been Delivered!</h2>
      <p>Dear ${orderDetails.customerName},</p>
      <p>Your order has been successfully delivered.</p>
      <h3>Order Details:</h3>
      <ul>
        <li>Order ID: ${orderDetails.orderId}</li>
        <li>Product: ${orderDetails.productName}</li>
        <li>Quantity: ${orderDetails.quantity}</li>
        <li>Total Amount: ₹${orderDetails.totalAmount}</li>
        <li>Delivery Date: ${orderDetails.deliveryDate}</li>
      </ul>
      <p>Thank you for shopping with Farm2Home!</p>
    `
  })
};

// Send email function
const sendEmail = async (to, templateName, orderDetails) => {
  try {
    if (!to) {
      throw new Error('Recipient email address is required');
    }

    if (!emailTemplates[templateName]) {
      throw new Error(`Email template '${templateName}' not found`);
    }

    const template = emailTemplates[templateName](orderDetails);
    const transporter = createTransporter();
    
    const mailOptions = {
      from: `"Farm2Home" <${process.env.EMAIL_USER}>`,
      to,
      subject: template.subject,
      html: template.html
    };

    logger.info('Attempting to send email', {
      to,
      template: templateName,
      orderId: orderDetails.orderId
    });

    const info = await transporter.sendMail(mailOptions);
    
    logger.info('Email sent successfully', {
      messageId: info.messageId,
      to,
      template: templateName,
      orderId: orderDetails.orderId
    });
    
    return { success: true, messageId: info.messageId };
  } catch (error) {
    logger.error('Error sending email', {
      error: error.message,
      stack: error.stack,
      to,
      template: templateName,
      orderId: orderDetails.orderId
    });
    throw error;
  }
};

// Verify email configuration
const verifyEmailConfig = async () => {
  try {
    const transporter = createTransporter();
    await transporter.verify();
    logger.info('Email configuration verified successfully');
    return true;
  } catch (error) {
    logger.error('Email configuration verification failed', {
      error: error.message,
      stack: error.stack
    });
    return false;
  }
};

module.exports = {
  sendEmail,
  emailTemplates,
  verifyEmailConfig
};
