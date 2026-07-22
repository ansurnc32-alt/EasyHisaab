import jwt from 'jsonwebtoken';
import { getCookieName, getJwtSecret } from '../services/auth.service.js';
import { User } from '../models/User.model.js';
import { ApiError } from '../utils/ApiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const requireAuth = asyncHandler(async (req, res, next) => {
  const token = req.cookies?.[getCookieName()];

  if (!token) {
    throw new ApiError(401, 'Authentication is required.');
  }

  try {
    const payload = jwt.verify(token, getJwtSecret());
    const user = await User.findById(payload.sub);

    if (!user) {
      throw new ApiError(401, 'Authentication is no longer valid.');
    }

    req.user = user;
    return next();
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }

    throw new ApiError(401, 'Authentication is invalid or has expired.');
  }
});

export { requireAuth };
