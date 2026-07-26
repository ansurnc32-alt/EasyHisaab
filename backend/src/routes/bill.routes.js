import { Router } from 'express';
import { createBill, deleteBill, getBillById, getBills } from '../controllers/bill.controller.js';
import { requireAuth } from '../middlewares/auth.middleware.js';

const router = Router();

router.use(requireAuth);
router.route('/').post(createBill).get(getBills);
router.route('/:id').get(getBillById).delete(deleteBill);

export default router;
