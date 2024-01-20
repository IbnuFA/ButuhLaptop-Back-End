import express from 'express';
import { adminOnly, verifyUser } from '../../middleware/AuthUser.js';
import { adminFillShippingInfo, adminAcceptOrder, adminVerifyPaymentOrder, adminUpdatePackageSent, getAllOrders } from '../../controllers/Order.js';

const AdminOrderRoute = express.Router();

AdminOrderRoute.get('/admin/order', verifyUser, adminOnly, getAllOrders);
AdminOrderRoute.patch('/order/approval/accept/:id', verifyUser, adminOnly, adminAcceptOrder);
AdminOrderRoute.patch('/order/approval/payment/:id', verifyUser, adminOnly, adminVerifyPaymentOrder);
AdminOrderRoute.patch('/order/shipping/info/:id', verifyUser, adminOnly, adminFillShippingInfo);
AdminOrderRoute.patch('/order/shipping/sent/:id', verifyUser, adminOnly, adminUpdatePackageSent);
// UserOrderRouter.delete('/cart/:id', verifyUser, removeItemCart);

export default AdminOrderRoute;
