
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      maxlength: [50, 'Name cannot exceed 50 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters'],
      select: false, // Don't return password in queries by default
    },
    // User's selected interests for content generation
    interests: {
      type: [String],
      default: [],
      enum: ['technology', 'sports', 'business', 'entertainment', 'health', 'science', 'politics', 'travel', 'food', 'fashion'],
    },
    // User's preferred tone for generated content
    defaultTone: {
      type: String,
      default: 'professional',
      enum: ['professional', 'funny', 'motivational', 'casual', 'inspirational'],
    },
    // Track total posts generated
    postsGenerated: { type: Number, default: 0 },
    // Dark mode preference
    darkMode: { type: Boolean, default: true },
  },
  { timestamps: true } // Adds createdAt and updatedAt automatically
);

// ── Hash password before saving ──────────────
UserSchema.pre('save', async function (next) {
  // Only hash if password was modified
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// ── Method to compare passwords ──────────────
UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);
