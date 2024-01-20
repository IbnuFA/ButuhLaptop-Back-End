import express from 'express';
import { verifyUser } from '../../middleware/AuthUser.js';
import { checkOrder, createOrder, getMyOrders, payOrder, userConfirmPackageReceived } from '../../controllers/Order.js';
import multer from 'multer';
// const upload = multer({ dest: 'uploads/' });
const upload = multer({
  // dest: path.join(__dirname, '../../uploads'),
  // storage: multer.diskStorage({
  //   destination: (req, file, cb) => {
  //     cb(null, path.join(__dirname, '../../uploads'));
  //   },
  //   filename: (req, file, cb) => {
  //     cb(null, file.fieldname + '-' + Date.now());
  //   },
  // }),
  storage: multer.memoryStorage(),
});
const UserOrderRouter = express.Router();

UserOrderRouter.get('/order/me/list', verifyUser, getMyOrders);
UserOrderRouter.get('/order/check', verifyUser, checkOrder);
UserOrderRouter.post('/order', verifyUser, createOrder);
UserOrderRouter.put('/order/payment/:id', verifyUser, upload.single('file'), payOrder);
UserOrderRouter.put('/order/confirmation/receive/:id', verifyUser, userConfirmPackageReceived);
// UserOrderRouter.delete('/cart/:id', verifyUser, removeItemCart);

export default UserOrderRouter;
