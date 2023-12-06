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

AdminProductRoute.get('/products/admin/test', (req, res) => {
  res.send("Test Router Products Admin")
}) 

AdminProductRoute.get('/admin/products', verifyUser, adminOnly, getProducts);
AdminProductRoute.get('/admin/product/:id', verifyUser, adminOnly, getProductsbyId);
AdminProductRoute.post('/admin/product', verifyUser, adminOnly, createProducts);
AdminProductRoute.patch('/admin/product/:id', verifyUser, adminOnly, updateProducts);
AdminProductRoute.delete('/admin/product/:id', verifyUser, adminOnly, deleteProducts);

export default AdminProductRoute;