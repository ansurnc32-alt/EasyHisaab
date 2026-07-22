import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import {
  getClearCookieOptions,
  getCookieName,
  getSafeUser,
  loginUser,
  registerUser,
} from '../services/auth.service.js';

const register = asyncHandler(async (req, res) => {
  const { user, session } = await registerUser(req.body);

  return res
    .status(201)
    .cookie(session.cookieName, session.token, session.cookieOptions)
    .json(new ApiResponse(201, user, 'Account created successfully.'));
});

const login = asyncHandler(async (req, res) => {
  const { user, session } = await loginUser(req.body);

  return res
    .status(200)
    .cookie(session.cookieName, session.token, session.cookieOptions)
    .json(new ApiResponse(200, user, 'Logged in successfully.'));
});

const logout = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .clearCookie(getCookieName(), getClearCookieOptions())
    .json(new ApiResponse(200, null, 'Logged out successfully.'));
});

const getCurrentUser = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .json(new ApiResponse(200, getSafeUser(req.user), 'Authenticated user retrieved successfully.'));
});

export { getCurrentUser, login, logout, register };
