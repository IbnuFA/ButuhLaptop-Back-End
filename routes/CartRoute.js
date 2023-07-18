import express from "express";

import { 
    getCart,
    getCartbyId,
    createCart,
    updateCart,
    deleteCart,
    getCartItembyCartId
} from "../controllers/Carts.js";

import { verifyUser, adminOnly } from "../middleware/AuthUser.js";

const router = express.Router();

router.get('/Cart/test', (req, res) => {
  res.send("Test Router Cart")
}) 

router.get('/cart', getCart);
router.get('/cart/:id', getCartbyId);
router.get('/cart/:id/cartItem', getCartItembyCartId)
router.post('/createcart', createCart);
router.patch('/cart/:id', updateCart);
router.delete('/cart/:id', deleteCart);

export default router