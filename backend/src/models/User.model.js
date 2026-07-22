import bcrypt from 'bcrypt';
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, 'Full name is required.'],
      trim: true,
      maxlength: [100, 'Full name cannot exceed 100 characters.'],
    },
    email: {
      type: String,
      required: [true, 'Email is required.'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required.'],
      select: false,
    },
    shopName: {
      type: String,
      trim: true,
      maxlength: [100, 'Shop name cannot exceed 100 characters.'],
    },
    mobile: {
      type: String,
      trim: true,
      sparse: true,
      unique: true,
    },
  },
  { timestamps: true }
);

userSchema.pre('save', async function hashPassword(next) {
  if (!this.isModified('password')) {
    return next();
  }

  this.password = await bcrypt.hash(this.password, 12);
  return next();
});

userSchema.methods.isPasswordCorrect = function isPasswordCorrect(password) {
  return bcrypt.compare(password, this.password);
};

export const User = mongoose.model('User', userSchema);
