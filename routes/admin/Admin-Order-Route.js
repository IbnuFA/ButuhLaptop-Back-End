import express from 'express';
import { adminOnly, verifyUser } from '../../middleware/AuthUser.js';
import { adminFillShippingInfo, adminOrderApproval } from '../../controllers/Order.js';


const AdminOrderRoute = express.Router();

AdminOrderRoute.put('/order-add-shipping/:id', verifyUser, adminOnly, adminFillShippingInfo);
AdminOrderRoute.patch('/order-approval/:id', verifyUser, adminOnly, adminOrderApproval);
// UserOrderRouter.delete('/cart/:id', verifyUser, removeItemCart);

export default AdminOrderRoute;
