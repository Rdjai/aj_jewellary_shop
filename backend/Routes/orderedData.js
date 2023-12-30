const express = require('express');
const router = express.Router();
const Order = require('../Models/orderModel');

router.post('/orderData', async (req, res) => {
  // console.log('Received orderData request:', req.body);
    try {
      const userEmail = req.body.email;
  
      if (!userEmail) {
        return res.status(400).json({ error: "Email is required." });
      }
  
      let data = [...req.body.order_data];
      data.unshift({ order_date: req.body.order_date });
  
      // console.log("User Email:", userEmail);
  
      let existingOrder = await Order.findOne({ 'email': userEmail });
  
      if (!existingOrder) {
        // If the email does not exist, create a new order
        await Order.create({
          email: userEmail,
          order_data: [data]
        });
  
        return res.status(200).json({ success: true });
      } else {
        // If the email exists, update the existing order
        await Order.findOneAndUpdate(
          { email: userEmail },
          { $push: { order_data: data } }
        );
  
        return res.status(200).json({ success: true });
      }
    } catch (error) {
      console.error("Server Error:", error.message);
      return res.status(500).json({ error: "Server Error" });
    }
  });
  
module.exports = router;
