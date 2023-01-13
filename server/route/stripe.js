import express from 'express';
import Stripe from 'stripe';
import dotenv from 'dotenv';
import Order from '../model/Order.js';
import { veryfyTokenAndAuthorization } from './verifyToken.js';

dotenv.config();

const router = express.Router();
const stripe = Stripe(process.env.STRIPE_SEC);

router.post('/webhook', async (req, res) => {
  const event = req.body;

  console.log('Got payload: ' + event.type);

  if (event.type === 'checkout.session.completed') {
    const session = await stripe.checkout.sessions.retrieve(
      event.data.object.id,
      {
        expand: ['line_items.data.price.product'],
      }
    );

    const products = session.line_items.data.map((item) => {
      return {
        title: item.price.product.name,
        price: item.price.unit_amount / 100,
        quantity: item.quantity,
        image: item.price.product.images[0],
      };
    });

    // CREATE ORDER
    const newOrder = new Order({
      _id: event.data.object.id,
      userId: event.data.object.metadata.userId,
      useremail: event.data.object.metadata.useremail,
      username: event.data.object.metadata.username,
      products: products,
      address: {
        country: event.data.object.metadata.country,
        city: event.data.object.metadata.city,
        detail: event.data.object.metadata.detail,
      },
      total_price: event.data.object.amount_total / 100,
    });

    try {
      const savedOrder = await newOrder.save();
    } catch (err) {
      res.status(500);
    }

    res.status(200);
  }
});

router.post('/payment/:id', veryfyTokenAndAuthorization, async (req, res) => {
  const { user, selectedAddress, cartItems } = req.body;
  const items = cartItems.map((item) => ({
    quantity: item.amount,
    price_data: {
      currency: 'usd',
      unit_amount: item.price * 100,
      product_data: {
        name: item.title,
        images: [item.image],
      },
    },
  }));
  try {
    const session = await stripe.checkout.sessions.create({
      line_items: items,
      mode: 'payment',
      metadata: {
        userId: user._id,
        useremail: user.email,
        username: user.username,
        country: selectedAddress.country,
        city: selectedAddress.city,
        detail: selectedAddress.detail,
      },
      // success_url: `${YOUR_DOMAIN}?success=true`,
      // cancel_url: `${YOUR_DOMAIN}?canceled=true`,
      success_url: `${process.env.MY_DOMAIN}/order/{CHECKOUT_SESSION_ID}`,
      cancel_url: process.env.MY_DOMAIN,
    });
    res.status(200).json({ session_url: session.url });
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;
