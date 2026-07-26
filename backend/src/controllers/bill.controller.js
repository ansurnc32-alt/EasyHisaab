import mongoose from 'mongoose';
import { Bill } from '../models/Bill.model.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const escapeRegex = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const createBill = asyncHandler(async (req, res) => {
  const { customerName, billNumber, billDate, businessType, items, totalAmount } = req.body;

  if (!customerName?.trim() || !billNumber?.trim() || !billDate || !Array.isArray(items) || items.length === 0 || totalAmount === undefined) {
    throw new ApiError(400, 'Customer name, bill number, date, items, and total amount are required.');
  }

  const bill = await Bill.create({
    owner: req.user._id,
    customerName,
    billNumber,
    billDate,
    businessType,
    items,
    totalAmount,
  });

  return res.status(201).json(new ApiResponse(201, bill, 'Bill saved successfully.'));
});

const getBills = asyncHandler(async (req, res) => {
  const page = Math.max(Number.parseInt(req.query.page, 10) || 1, 1);
  const limit = Math.min(Math.max(Number.parseInt(req.query.limit, 10) || 10, 1), 100);
  const search = req.query.search?.trim();
  const filter = { owner: req.user._id };

  if (search) {
    const searchPattern = new RegExp(escapeRegex(search), 'i');
    filter.$or = [{ customerName: searchPattern }, { billNumber: searchPattern }];
  }

  const [bills, total] = await Promise.all([
    Bill.find(filter).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit),
    Bill.countDocuments(filter),
  ]);

  return res.status(200).json(new ApiResponse(200, {
    bills,
    pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
  }, 'Bills retrieved successfully.'));
});

const getBillById = asyncHandler(async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    throw new ApiError(400, 'Invalid bill id.');
  }

  const bill = await Bill.findOne({ _id: req.params.id, owner: req.user._id });
  if (!bill) {
    throw new ApiError(404, 'Bill not found.');
  }

  return res.status(200).json(new ApiResponse(200, bill, 'Bill retrieved successfully.'));
});

const deleteBill = asyncHandler(async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    throw new ApiError(400, 'Invalid bill id.');
  }

  const bill = await Bill.findOneAndDelete({ _id: req.params.id, owner: req.user._id });
  if (!bill) {
    throw new ApiError(404, 'Bill not found.');
  }

  return res.status(200).json(new ApiResponse(200, null, 'Bill deleted successfully.'));
});

export { createBill, deleteBill, getBillById, getBills };
