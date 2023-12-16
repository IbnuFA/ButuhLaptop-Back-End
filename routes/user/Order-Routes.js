import express from 'express';
import { verifyUser } from '../../middleware/AuthUser.js';
import { checkOrder, createOrder, getMyOrders, payOrder, userConfirmPackageReceived } from '../../controllers/Order.js';
import multer from 'multer';
const upload = multer({ dest: 'uploads/' });
const UserOrderRouter = express.Router();

UserOrderRouter.get('/order/me/list', verifyUser, getMyOrders);
UserOrderRouter.get('/order/check', verifyUser, checkOrder);
UserOrderRouter.post('/order', verifyUser, createOrder);
UserOrderRouter.patch('/order/payment/:id', verifyUser, upload.single('file'), payOrder);
UserOrderRouter.patch('/order/confirmation/receive/:id', verifyUser, userConfirmPackageReceived);
// UserOrderRouter.delete('/cart/:id', verifyUser, removeItemCart);

export default UserOrderRouter;
