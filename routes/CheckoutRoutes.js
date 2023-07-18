import express from "express";

import {
    getCheckouts,
    getCheckoutsbyId,
    createCheckouts,
    updateCheckouts,
    deleteCheckouts
} from "../controllers/Checkouts.js"

const router = express.Router();

router.get('/checkouts/test', (req, res) => {
  res.send("Test Router Checkouts")
}) 

router.get('/checkout', getCheckouts);
router.get('/checkout/:id', getCheckoutsbyId);
router.post('/checkout', createCheckouts);
router.patch('/checkout/:id', updateCheckouts);
router.delete('/checkout/:id', deleteCheckouts);

export default router