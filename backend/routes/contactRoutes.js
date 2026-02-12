import express from 'express';
import Contact from '../models/Contact.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// @route   GET /api/contacts
// @desc    Get all contacts for logged in user
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    const contacts = await Contact.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/contacts/:id
// @desc    Get single contact
// @access  Private
router.get('/:id', protect, async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    if (contact.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    res.json(contact);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   POST /api/contacts
// @desc    Create new contact
// @access  Private
router.post('/', protect, async (req, res) => {
  try {
    const { name, email, phone, address, company, notes } = req.body;

    const contact = await Contact.create({
      user: req.user._id,
      name,
      email,
      phone,
      address,
      company,
      notes
    });

    res.status(201).json(contact);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @route   PUT /api/contacts/:id
// @desc    Update contact
// @access  Private
router.put('/:id', protect, async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    if (contact.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    const updatedContact = await Contact.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.json(updatedContact);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @route   DELETE /api/contacts/:id
// @desc    Delete contact
// @access  Private
router.delete('/:id', protect, async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    if (contact.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    await Contact.findByIdAndDelete(req.params.id);
    res.json({ message: 'Contact removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
