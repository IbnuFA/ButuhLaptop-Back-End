import express from "express";

import {
    getProducts,
    getProductsbyId,
    createProducts,
    updateProducts,
    deleteProducts
} from "../../controllers/Products.js"

import { adminOnly, verifyUser } from "../../middleware/AuthUser.js";

const AdminProductRoute = express.Router();

AdminProductRoute.use(verifyUser, adminOnly)

AdminProductRoute.get('/products/admin/test', (req, res) => {
  res.send("Test Router Products Admin")
}) 

AdminProductRoute.get('/admin/products', getProducts);
AdminProductRoute.get('/admin/product/:id', getProductsbyId);
AdminProductRoute.post('/admin/product', createProducts);
AdminProductRoute.patch('/admin/product/:id', updateProducts);
AdminProductRoute.delete('/admin/product/:id', deleteProducts);

export default AdminProductRoute;