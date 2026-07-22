import jwt from 'jsonwebtoken';
import { ApiError } from '../utils/ApiError.js';
import { User } from '../models/User.model.js';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PASSWORD_PATTERN = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

const getJwtSecret = () => {
  if (!process.env.JWT_SECRET) {
    throw new ApiError(500, 'JWT_SECRET is not configured.');
  }

  return process.env.JWT_SECRET;
};

const getJwtExpiry = () => process.env.JWT_EXPIRY || '7d';
const getCookieName = () => process.env.AUTH_COOKIE_NAME || 'easyhisaab_token';

const getCookieBaseOptions = () => ({
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: process.env.COOKIE_SAME_SITE || 'lax',
  path: '/',
});

const getSafeUser = (user) => ({
  id: user._id.toString(),
  fullName: user.fullName,
  email: user.email,
});

const validateRegistrationInput = ({ fullName, email, password, shopName, mobile }) => {
  if (!String(fullName || '').trim()) {
    throw new ApiError(400, 'Full name is required.');
  }

  if (!EMAIL_PATTERN.test(String(email || '').trim())) {
    throw new ApiError(400, 'Please provide a valid email address.');
  }

  if (!PASSWORD_PATTERN.test(String(password || ''))) {
    throw new ApiError(
      400,
      'Password must be at least 8 characters and include an uppercase letter, a lowercase letter, and a number.'
    );
  }

  if (shopName && String(shopName).trim().length > 100) {
    throw new ApiError(400, 'Shop name cannot exceed 100 characters.');
  }

  if (mobile && !/^\+?[0-9]{10,15}$/.test(String(mobile).trim())) {
    throw new ApiError(400, 'Please provide a valid mobile number.');
  }
};

const createSession = (user) => {
  const token = jwt.sign({ sub: user._id.toString() }, getJwtSecret(), {
    expiresIn: getJwtExpiry(),
  });
  const { exp } = jwt.decode(token);

  return {
    token,
    cookieName: getCookieName(),
    cookieOptions: {
      ...getCookieBaseOptions(),
      maxAge: Math.max(0, exp * 1000 - Date.now()),
    },
  };
};

const registerUser = async (input) => {
  validateRegistrationInput(input);

  const email = input.email.trim().toLowerCase();
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new ApiError(409, 'An account with this email already exists.');
  }

  try {
    const user = await User.create({
      fullName: input.fullName.trim(),
      email,
      password: input.password,
      shopName: input.shopName?.trim(),
      mobile: input.mobile?.trim(),
    });

    return { user: getSafeUser(user), session: createSession(user) };
  } catch (error) {
    if (error?.code === 11000) {
      throw new ApiError(409, 'An account with this email or mobile number already exists.');
    }

    throw error;
  }
};

const loginUser = async ({ identifier, password }) => {
  const normalizedIdentifier = String(identifier || '').trim();

  if (!normalizedIdentifier) {
    throw new ApiError(400, 'Email or mobile number is required.');
  }

  if (!password) {
    throw new ApiError(400, 'Password is required.');
  }

  const user = await User.findOne({
    $or: [
      { email: normalizedIdentifier.toLowerCase() },
      { mobile: normalizedIdentifier },
    ],
  }).select('+password');

  if (!user || !(await user.isPasswordCorrect(password))) {
    throw new ApiError(401, 'Invalid email/mobile number or password.');
  }

  return { user: getSafeUser(user), session: createSession(user) };
};

const getClearCookieOptions = () => getCookieBaseOptions();

export {
  createSession,
  getClearCookieOptions,
  getCookieName,
  getSafeUser,
  getJwtSecret,
  loginUser,
  registerUser,
};
