import express from "express";

import { 
    getCart,
    getCartbyId,
    createCart,
    updateCart,
    deleteCart,
} from "../controllers/Carts.js";

const router = express.Router();

router.get('/Cart/test', (req, res) => {
  res.send("Test Router Cart")
}) 

router.get('/cart', getCart);
router.get('/cart/:id', getCartbyId);
router.post('/createcart', createCart);
router.patch('/cart/:id', updateCart);
router.delete('/cart/:id', deleteCart);

export default router