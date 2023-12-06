import express from 'express';
import { verifyUser } from '../../middleware/AuthUser.js';
import { checkOrder, createOrder, getMyOrders } from '../../controllers/Order.js';

const UserOrderRouter = express.Router();

UserOrderRouter.get('/my-orders', verifyUser, getMyOrders);
UserOrderRouter.get('/check-order', verifyUser, checkOrder);
UserOrderRouter.post('/order', verifyUser, createOrder);
// UserOrderRouter.delete('/cart/:id', verifyUser, removeItemCart);

export default UserOrderRouter;
