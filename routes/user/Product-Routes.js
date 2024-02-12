import express from "express";

import {
    getProducts,
    getProductsbyId,
    createProducts,
    updateProducts,
    deleteProducts
} from "../../controllers/Products.js"

import { verifyUser } from "../../middleware/AuthUser.js";

const ProductRouter = express.Router();

ProductRouter.get('/products/test', (req, res) => {
  res.send("Test Router Products")
}) 

ProductRouter.get('/products', getProducts);
ProductRouter.get('/products/:id', getProductsbyId);

export default ProductRouter;