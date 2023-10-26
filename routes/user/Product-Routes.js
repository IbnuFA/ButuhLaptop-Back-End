import express from "express";

import {
    getProducts,
    getProductsbyId,
    createProducts,
    updateProducts,
    deleteProducts
} from "../../controllers/Products.js"

import { verifyUser } from "../../middleware/AuthUser.js";

const router = express.Router();

router.use(verifyUser)

router.get('/products/test', (req, res) => {
  res.send("Test Router Products")
}) 

router.get('/products' ,getProducts);
router.get('/products/:id', getProductsbyId);

export default router