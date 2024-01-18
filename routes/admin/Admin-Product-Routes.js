import express from "express";
import multer from 'multer';
import path from 'path';
import * as url from 'url';

import {
  getProducts,
  getProductsbyId,
  createProducts,
  updateProducts,
  deleteProducts
} from "../../controllers/Products.js"

import { adminOnly, verifyUser } from "../../middleware/AuthUser.js";

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const AdminProductRoute = express.Router();
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

AdminProductRoute.get('/products/admin/test', (req, res) => {
  res.send("Test Router Products Admin")
})

AdminProductRoute.get('/admin/products', verifyUser, adminOnly, getProducts);
AdminProductRoute.get('/admin/product/:id', verifyUser, adminOnly, getProductsbyId);
AdminProductRoute.post('/admin/product', verifyUser, adminOnly, upload.single('image'), createProducts);
AdminProductRoute.patch('/admin/product/:id', verifyUser, adminOnly, upload.single('image'), updateProducts);
AdminProductRoute.delete('/admin/product/:id', verifyUser, adminOnly, deleteProducts);

export default AdminProductRoute;