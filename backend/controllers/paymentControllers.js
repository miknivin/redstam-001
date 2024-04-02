import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import Order from "../models/order.js";
import Razorpay from "razorpay";
import dotenv from 'dotenv';
import crypto from 'crypto'
// Load .env file
dotenv.config({ path: 'backend/config/config.env' });

// Initialize Razorpay with the key ID and secret key
const razorpay_key_id = process.env.RAZORPAY_SECRET_ID;
const razorpay_secret_key = process.env.RAZORPAY_SECRET_KEY;

if (!razorpay_key_id || !razorpay_secret_key) {
  console.error("Razorpay key ID or secret key is not provided.");
}

const razorpay = new Razorpay({
  key_id: razorpay_key_id,
  key_secret: razorpay_secret_key
});

// Create Razorpay orde
export const stripeCheckoutSession = catchAsyncErrors(
  async (req, res, next) => {
    const body = req?.body;
    const orderItems = body?.orderItems;
    const currency = "INR"; // Assuming the currency is INR for Razorpay

    const options = {
      amount: body?.itemsPrice * 100, // Razorpay expects amount in paisa, hence * 100
      currency: currency,
      receipt: `order_${Date.now()}`,
      payment_capture: 1 // Auto-capture payment
    };

    try {
      const order = await razorpay.orders.create(options);

      res.status(200).json({
        id: order.id,
        currency: order.currency,
        amount: order.amount,
        receipt: order.receipt
      });
      // console.error(`order data is ${order}`);
    } catch (error) {
      console.error("Error creating Razorpay order:", error);
      res.status(500).json({ error: "Failed to create Razorpay order" });
    }
  }
);

export const stripeWebhook = catchAsyncErrors(async (req, res, next) => {
  const { razorpay_order_id, 
          razorpay_payment_id, 
          razorpay_signature, 
          shippingInfo, cartItems, user, 
          itemsPrice, shippingPrice, 
          totalPrice, taxPrice } = req.body;

  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_SECRET_KEY)
    .update(body, "utf-8") // Specify encoding as UTF-8
    .digest("hex");

  const isAuthentic = expectedSignature == razorpay_signature;

  if (isAuthentic) {
    try {
      const order = await Order.create({
        shippingInfo,
        user:user._id,
        orderItems: cartItems,
        paymentMethod: "Online",
        paymentInfo: {
          id: razorpay_payment_id,
          status: "Paid",
        },
        itemsPrice,
        shippingAmount: shippingPrice,
        taxAmount: taxPrice,
        totalAmount: totalPrice,
      });
      console.log("Order-created");
      // Redirect to the specified URL after successful order creation
      res.redirect(`${process.env.FRONTEND_URL}/order_placed?order_success=true`);
    } catch (error) {
      console.error("Error creating order:", error);
      res.status(500).json({
        success: false,
        error: "Internal Server Error",
      });
    }
  } else {
    // Payment data is not authentic, handle error
    console.error("Received invalid payment data:", req.body);
    
    // Send error response to frontend
    res.status(500).json({
      success: false,
      error: "Invalid payment data",
    });
  }
});



