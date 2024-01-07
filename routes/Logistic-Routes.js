import express from "express";

import {
  getProvincesController,
  getCitiesController,
} from "../controllers/Logistic.js"

const router = express.Router();

router.get('/logistic/test', (req, res) => {
  res.send("Test Router logistic")
}) 

router.get('/logistic/provinces', getProvincesController);
router.get('/logistic/cities', getCitiesController);

export default router