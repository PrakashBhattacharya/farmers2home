const Order = require('../Models/Order');
const Product = require('../Models/Product');
const { sendEmail, verifyEmailConfig } = require('../services/emailService');

const createOrder = async (req, res) => {
  try {
    const { items, totalPrice, deliveryType } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: 'No items in order' });
    }

   
    let computedTotalPrice = totalPrice;
    if (!computedTotalPrice) {
      computedTotalPrice = 0;
      for (const item of items) {
        const product = await Product.findById(item.product);
        if (!product) return res.status(404).json({ message: 'Product not found' });
        computedTotalPrice += product.price * item.quantity;
      }
    }

    const firstProduct = await Product.findById(items[0].product).populate('createdBy');
    if (!firstProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const farmerId = firstProduct.createdBy._id;

    const order = new Order({
      customer: req.user._id,
      items,
      totalPrice: computedTotalPrice,
      deliveryType,
      farmer: farmerId,
    });

    await order.save();
    res.status(201).json(order);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ message: 'Failed to create order' });
  }
};



const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ customer: req.user._id })
      .populate('items.product', 'name price image') 
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (err) {
    console.error('Error fetching orders:', err); 
    res.status(500).json({ error: 'Failed to fetch your orders' });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({ farmer: req.user._id })
      .populate('customer', 'name email')
      .populate('items.product', 'name price')
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const { status, rejectionReason } = req.body;

    const order = await Order.findById(req.params.id)
      .populate('customer', 'name email')
      .populate('items.product', 'name price');

    if (!order) return res.status(404).json({ message: 'Order not found' });

    const oldStatus = order.status;
    order.status = status;
    if (status === 'rejected' && rejectionReason) {
      order.rejectionReason = rejectionReason;
    }
    await order.save();

    // Prepare order details for email
    const orderDetails = {
      orderId: order._id,
      customerName: order.customer.name,
      productName: order.items[0].product.name,
      quantity: order.items[0].quantity,
      totalAmount: order.totalPrice,
      orderDate: order.createdAt.toLocaleDateString(),
      deliveryDate: status === 'delivered' ? new Date().toLocaleDateString() : null,
      rejectionReason: order.rejectionReason
    };

    // Send email based on status change
    let emailTemplate;
    switch (status.toLowerCase()) {
      case 'accepted':
        emailTemplate = 'orderAccepted';
        break;
      case 'rejected':
        emailTemplate = 'orderRejected';
        break;
      case 'delivered':
        emailTemplate = 'orderDelivered';
        break;
      default:
        emailTemplate = null;
    }

    if (emailTemplate && order.customer.email) {
      try {
        // Verify email configuration before sending
        const isEmailConfigValid = await verifyEmailConfig();
        if (!isEmailConfigValid) {
          console.error('Email configuration is invalid. Please check your .env file.');
          return res.status(500).json({ 
            message: 'Order status updated but email notification failed',
            order 
          });
        }

        await sendEmail(order.customer.email, emailTemplate, orderDetails);
      } catch (emailError) {
        console.error('Failed to send email notification:', emailError);
        return res.status(500).json({ 
          message: 'Order status updated but email notification failed',
          error: emailError.message,
          order 
        });
      }
    }

    res.json({ 
      message: 'Order status updated successfully',
      order 
    });
  } catch (err) {
    console.error('Error updating order status:', err);
    res.status(500).json({ error: 'Failed to update order status' });
  }
};


const getFarmerOrders = async (req, res) => {
  try {
    const orders = await Order.find({ farmer: req.user._id })
      .populate('customer', 'name email')
      .populate('items.product', 'name image price')
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
};
module.exports = { createOrder, getUserOrders, getAllOrders, updateOrderStatus,getFarmerOrders };