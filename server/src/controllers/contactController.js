const Contact = require('../models/contactModel');

const createContactMessage = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required',
      });
    }

    const newMessage = await Contact.create({
      name,
      email,
      subject,
      message,
    });

    res.status(201).json({
      success: true,
      message: 'Message sent successfully',
      data: newMessage,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: 'Server Error',
    });
  }
};

const getMessages = async (req, res) => {
  try {
    const messages = await Contact.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      messages,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: 'Server Error',
    });
  }
};

module.exports = {
  createContactMessage,
  getMessages,
};
