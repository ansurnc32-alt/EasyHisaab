import mongoose from 'mongoose';

const billItemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    quantity: { type: Number, required: true, min: 0 },
    price: { type: Number, required: true, min: 0 },
    amount: { type: Number, required: true, min: 0 },
  },
  { _id: false }
);

const billSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    customerName: { type: String, required: true, trim: true, maxlength: 100 },
    billNumber: { type: String, required: true, trim: true, maxlength: 50 },
    billDate: { type: Date, required: true },
    businessType: { type: String, trim: true, maxlength: 50 },
    items: { type: [billItemSchema], required: true, validate: [(items) => items.length > 0, 'At least one item is required.'] },
    totalAmount: { type: Number, required: true, min: 0 },
  },
  { timestamps: true }
);

billSchema.index({ owner: 1, createdAt: -1 });
billSchema.index({ owner: 1, customerName: 1 });
billSchema.index({ owner: 1, billNumber: 1 });

export const Bill = mongoose.model('Bill', billSchema);
