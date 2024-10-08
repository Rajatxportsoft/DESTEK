
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');

exports.saveUser = async (req, res) => {
  try {
    const { name, mobile, referralCode, gender, technologies, dob, password } = req.body;
    let profilePic = req.files ? req.files.map(file => file.filename) : [];
    const existingUser = await User.findOne({ mobile });
    if (existingUser) {
      return res.status(400).json({ message: 'User already registered with this mobile number.' });
    }

    let referralUser = null;
    if (referralCode) {
      referralUser = await User.findById(referralCode); 
      if (!referralUser) {
        return res.status(400).json({ message: 'Invalid referral code.' });
      }
    }

    const user = new User({
      name,
      mobile,
      referralCode,
      gender,
      technologies: Array.isArray(technologies) ? technologies : technologies.split(','), 
      dob,
      password,
      profilePic: profilePic, 
    });

    await user.save();

    if (referralUser) {
      referralUser.points += 20; 
      await referralUser.save();
      user.points += 10; 
      await user.save();
    }

    res.status(201).json({ message: 'User registered successfully', user });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'An error occurred during registration', error: err.message });
  }
};

exports.loginUser = async (req, res) => {
  const { mobile, password } = req.body;
  
  const user = await User.findOne({ mobile });
  console.log("user",user);
  
  if (!user) {
    return res.status(401).json({ message: 'Invalid mobile number or password' });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: 'Invalid mobile number or password' });
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  
  res.json({ message: 'Login successful', token ,id: user._id});
};

exports.getReferralUsers = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  const token = req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET); 
  const loggedInUserId = decoded.id; 

  const referralUsers = await User.find({ referralCode: loggedInUserId })
                                  .skip((page - 1) * limit)
                                  .limit(limit);

  const totalUsers = await User.countDocuments({ referralCode: loggedInUserId });

  res.json({ users: referralUsers, totalPages: Math.ceil(totalUsers / limit) });
};
exports.deleteReferralUser = async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) return res.status(404).json({ message: 'User not found' });

  res.status(200).json({ message: 'User deleted' });
};

exports.updateProfile = async (req, res) => {
  const { name, mobile } = req.body;
  const updates = { name, mobile };

  if (req.file) {
    updates.profilePic = req.file.path
  }

  const user = await User.findByIdAndUpdate(req.user.id, updates, { new: true });

  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json({ message: 'Profile updated', user });
};

exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password'); 

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ user });
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ message: 'Server error' });
  }
};