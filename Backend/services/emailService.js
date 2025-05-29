const nodemailer = require('nodemailer');
const winston = require('winston');
const path = require('path');

// ✅ Logger using /tmp (safe for AWS Lambda)
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({
      filename: path.join('/tmp', 'email.log'),
      maxsize: 5242880,
      maxFiles: 5,
    }),
    new winston.transports.Console({
      format: winston.format.simple()
    })
  ]
});

// ✅ Create transporter
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

// ✅ Email templates
const emailTemplates = {
  orderAccepted: (orderDetails) => ({
    subject: '🎉 Order Accepted!',
    html: `
      <h2>Your Order Has Been Accepted!</h2>
      <p>Dear ${orderDetails.customerName},</p>
      <ul>
        <li>Order ID: ${orderDetails.orderId}</li>
        <li>Product: ${orderDetails.productName}</li>
        <li>Quantity: ${orderDetails.quantity}</li>
        <li>Total Amount: ₹${orderDetails.totalAmount}</li>
        <li>Order Date: ${orderDetails.orderDate}</li>
      </ul>
    `
  }),

  orderRejected: (orderDetails) => ({
    subject: '❌ Order Rejected',
    html: `
      <h2>Order Rejected</h2>
      <p>Dear ${orderDetails.customerName},</p>
      <p>Reason: ${orderDetails.rejectionReason || 'No reason provided'}</p>
      <ul>
        <li>Order ID: ${orderDetails.orderId}</li>
        <li>Product: ${orderDetails.productName}</li>
        <li>Quantity: ${orderDetails.quantity}</li>
        <li>Total Amount: ₹${orderDetails.totalAmount}</li>
        <li>Order Date: ${orderDetails.orderDate}</li>
      </ul>
    `
  }),

  orderDelivered: (orderDetails) => ({
    subject: '📦 Order Delivered!',
    html: `
      <h2>Your Order Has Been Delivered!</h2>
      <p>Dear ${orderDetails.customerName},</p>
      <ul>
        <li>Order ID: ${orderDetails.orderId}</li>
        <li>Product: ${orderDetails.productName}</li>
        <li>Quantity: ${orderDetails.quantity}</li>
        <li>Total Amount: ₹${orderDetails.totalAmount}</li>
        <li>Delivery Date: ${orderDetails.deliveryDate}</li>
      </ul>
    `
  })
};

// ✅ Send email
const sendEmail = async (to, templateName, orderDetails) => {
  try {
    if (!to) throw new Error('Recipient email address is required');
    if (!emailTemplates[templateName]) throw new Error(`Template '${templateName}' not found`);

    const template = emailTemplates[templateName](orderDetails);
    const transporter = createTransporter();

    const mailOptions = {
      from: `"Farm2Home" <${process.env.EMAIL_USER}>`,
      to,
      subject: template.subject,
      html: template.html
    };

    logger.info('Sending email', { to, templateName, orderId: orderDetails.orderId });
    const info = await transporter.sendMail(mailOptions);
    logger.info('Email sent successfully', { messageId: info.messageId });

    return { success: true, messageId: info.messageId };
  } catch (error) {
    logger.error('Email sending failed', {
      error: error.message,
      stack: error.stack,
      to,
      template: templateName,
      orderId: orderDetails.orderId
    });
    throw error;
  }
};

// ✅ Verify email config
const verifyEmailConfig = async () => {
  try {
    const transporter = createTransporter();
    await transporter.verify();
    logger.info('Email configuration verified');
    return true;
  } catch (error) {
    logger.error('Email config verification failed', {
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
