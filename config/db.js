const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log('MongoDB connected');
}).catch((err) => {

  console.error('process.env.MONGO_URI:', process.env.MONGO_URI);
  console.error('MongoDB connection failed:', err.message);
});

module.exports = mongoose;
