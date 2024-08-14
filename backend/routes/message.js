// routes/message.js
const express = require('express');
const router = express.Router();
const Message = require('../models/Message');
const User = require('../models/User');
const { protect } = require('../middleware/authMiddleware');
// POST /api/messages/:uniqueLink
router.post('/:uniqueLink', async (req, res) => {
  try {
    const user = await User.findOne({ uniqueLink: req.params.uniqueLink });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const newMessage = new Message({
      receiver: user._id,
      message: req.body.message
    });

    await newMessage.save();
    res.status(201).json({ message: 'Message sent successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/:uniqueLink', async (req, res) => {
  try {
    const user = await User.findOne({ uniqueLink: req.params.uniqueLink });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ username: user.username });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
});


// routes/message.js (Add this to the existing file)
router.get('/user/messages', protect, async (req, res) => {
  try {
    const messages = await Message.find({ receiver: req.user._id }).sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    console.error("Error", err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
