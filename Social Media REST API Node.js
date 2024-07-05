const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
 
  module.exports = app;
  const mongoose = require('mongoose');
module.exports = connectDB;
 
const connectDB = require('./db');
require('dotenv').config();
connectDB();

const authorize = (role) => {
  return (req, res, next) => {
    // Fetch user information from JWT
    const user = req.user; // Assuming you've extracted user info from JWT
    if (user.role !== role) {
      return res.status(403).json({ error: 'Forbidden' });
    }
    next();
  };
};
//  Authentication Routes
app.post('/api/login', (req, res) => {
  //  authenticate user with credentials
  if (user) {
    // Generate JWT
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach user information to request object
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
});

// Example Protected Route
app.get('/api/protected/profile', (req, res) => {
  res.json({ message: 'Protected route accessed successfully', user: req.user });
});

{
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }]
}

{
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description:{
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }

  const mongoose = require('mongoose');
  const bcrypt = require('bcrypt');
  const userSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },

    email: {
      type: String,
      required: true,
      unique: true,
      match: [/^[^s@]+@[^s@]+.[^s@]+$/, 'Please enter a valid email address'] 
    }

    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }]
  });
  userSchema.pre('save', async function (next) {
      const user = this;
      if (user.isModified('password') || user.isNew) {
        try {
          const hash = await bcrypt.hash(user.password, 10);
          user.password = hash;
        } catch (error) {
          return next(error);
        }
      }
      next();
    });
   
  const express = require('express');
  const connectDB = require('./db');
  const authRouter = require('./routes/auth');
  const userRouter = require('./routes/users');
  const postRouter = require('./routes/posts');
  const app = express();
  const PORT = process.env.PORT || 3000;
  
  require('dotenv').config();
  connectDB();
  
  app.use(express.json());
  app.use('/api',userRouter);
  app.use('/api',authRouter);
  app.use('/api',postRouter);
  app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
    
   
