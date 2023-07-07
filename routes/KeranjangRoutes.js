import express from "express";

import {
    getKeranjang,
    getKeranjangbyId,
    createKeranjang,
    updateKeranjang,
    deleteKeranjang
} from "../controllers/Keranjangs.js"

const router = express.Router();

router.get('/keranjang/test', (req, res) => {
  res.send("Test Router Keranjang")
}) 

router.get('/keranjang', getKeranjang);
router.get('/keranjang/:id', getKeranjangbyId);
router.post('/createkeranjang', createKeranjang);
router.patch('/keranjang/:id', updateKeranjang);
router.delete('/keranjang/:id', deleteKeranjang);

export default router