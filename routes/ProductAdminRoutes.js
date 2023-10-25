import express from "express";

import {
    getProducts,
    getProductsbyId,
    createProducts,
    updateProducts,
    deleteProducts
} from "../controllers/Products.js"

import { adminOnly, verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();

router.use(verifyUser, adminOnly)

router.get('/products/admin/test', (req, res) => {
  res.send("Test Router Products Admin")
}) 

router.get('/admin/products' ,getProducts);
router.get('/admin/product/:id', getProductsbyId);
router.post('/admin/product', createProducts);
router.patch('/admin/product/:id', updateProducts);
router.delete('/admin/product/:id', deleteProducts);

export default router