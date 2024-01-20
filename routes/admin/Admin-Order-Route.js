import express from 'express';
import { adminOnly, verifyUser } from '../../middleware/AuthUser.js';
import { adminFillShippingInfo, adminAcceptOrder, adminVerifyPaymentOrder, adminUpdatePackageSent, getAllOrders, checkOrder } from '../../controllers/Order.js';

const AdminOrderRoute = express.Router();

AdminOrderRoute.get('/admin/order', verifyUser, adminOnly, getAllOrders);
AdminOrderRoute.get('/admin/order/checkOrder', verifyUser, adminOnly, checkOrder);
AdminOrderRoute.put('/order/approval/accept/:id', verifyUser, adminOnly, adminAcceptOrder);
AdminOrderRoute.put('/order/approval/payment/:id', verifyUser, adminOnly, adminVerifyPaymentOrder);
AdminOrderRoute.put('/order/shipping/info/:id', verifyUser, adminOnly, adminFillShippingInfo);
AdminOrderRoute.put('/order/shipping/sent/:id', verifyUser, adminOnly, adminUpdatePackageSent);
// UserOrderRouter.delete('/cart/:id', verifyUser, removeItemCart);

export default AdminOrderRoute;
