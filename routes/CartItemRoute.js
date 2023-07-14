import express from "express";

import { 
    getCartItem,
    getCartItembyId,
    getCartItembyCartId,
    createCartItem,
    updateCartItem,
    deleteCartItem
} from "../controllers/CartItem.js";

import { verifyUser, adminOnly } from "../middleware/AuthUser.js";

const router = express.Router()

router.get('/cartitem/test', (req, res) => {
    res.send("Test Router Cart")
})

router.get('/cartItem', getCartItem)
router.get('/cartItem/id', getCartItembyId)
router.get('/cartItembyCartId/id', getCartItembyCartId)
router.post('/cartItem', createCartItem)
router.patch('/cartItem', updateCartItem)
router.delete('/cartItem', deleteCartItem)

export default router