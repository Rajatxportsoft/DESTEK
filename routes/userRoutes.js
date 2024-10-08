const express = require('express');
const {
  saveUser,
  getReferralUsers,
  deleteReferralUser,
  updateProfile,
  loginUser,
  getUserProfile, 
} = require('../controllers/userController');
const { protect } = require('../middlewares/authMiddleware');
const upload = require('../utils/upload');
const router = express.Router();

router.post('/save',upload.array('profilePic', 10) ,saveUser);

router.get('/referrals', protect, getReferralUsers);

router.delete('/referrals/:id', protect, deleteReferralUser);

router.put('/update', protect, upload.single('profilePic'), updateProfile);

router.get('/profile', protect, getUserProfile); 

router.post('/login', loginUser); 

module.exports = router;
