import express from 'express';
import { verifyUser } from '../../middleware/AuthUser.js';
import {
  addProductToCart,
  getCartByUser,
  removeProductFromCart,
} from '../../controllers/Cart.js';

const UserCartRoutes = express.Router();

UserCartRoutes.get('/cart', verifyUser, getCartByUser);
UserCartRoutes.post('/cart', verifyUser, addProductToCart);
UserCartRoutes.delete('/cart/:id', verifyUser, removeProductFromCart);

export default UserCartRoutes;
