import express from 'express';
import CryptoJS from 'crypto-js';
import User from '../model/User.js';
import {
  veryfyTokenAndAdmin,
  veryfyTokenAndAuthorization,
} from './verifyToken.js';

const router = express.Router();

// Add User Address
router.post('/address/:id', veryfyTokenAndAuthorization, async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.params.id },
      {
        $push: {
          'address.list': req.body,
        },
      },
      { new: true }
    );
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Update User Address
router.put('/address/:id', veryfyTokenAndAuthorization, async (req, res) => {
  try {
    // const user = await User.findOneAndUpdate(
    //   { _id: req.params.id, "address.list._id": req.body._id },
    //   {
    //     $set: {
    //       "address.list.$": req.body,
    //     },
    //   },
    //   { new: true }
    // );
    const user = await User.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          'address.list': req.body,
        },
      },
      { new: true }
    );
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
});
// Delete User Address
router.delete('/address/:id', veryfyTokenAndAuthorization, async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.params.id, 'address.list._id': req.body.id },
      {
        $pull: {
          'address.list': { _id: req.body.id },
        },
      },
      { new: true }
    );
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Update User Profile
router.put('/:id', veryfyTokenAndAuthorization, async (req, res) => {
  const userExist = await User.findOne({ email: req.body.email });
  if (userExist) res.status(400).json('User Email Already Exists');

  if (req.body.password) {
    req.body.password = CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString();
  }

  try {
    const user = await User.findById(req.params.id);
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;
    user.password = req.body.password || user.password;
    const updatedUser = await user.save();
    const { password, ...others } = updatedUser._doc;

    // const updatedUser = await User.findByIdAndUpdate(
    //   req.params.id,
    //   {
    //     $set: req.body,
    //   },
    //   { new: true }
    // );
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete User
router.delete('/:id', veryfyTokenAndAuthorization, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json('User deleted');
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get User
router.get('/profile/:id', veryfyTokenAndAuthorization, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...otheres } = user._doc;
    res.status(200).json(otheres);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get All User
router.get('/find', veryfyTokenAndAdmin, async (req, res) => {
  const query = req.query.new;
  try {
    const users = query
      ? await User.find().sort({ _id: -1 }).limit(5)
      : await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET USER STATS
router.get('/stats', veryfyTokenAndAdmin, async (req, res) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

  try {
    const data = await User.aggregate([
      { $match: { createdAt: { $gte: lastYear } } },
      {
        $project: {
          month: { $month: '$createdAt' },
        },
      },
      {
        $group: {
          _id: '$month',
          total: { $sum: 1 },
        },
      },
    ]);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;
