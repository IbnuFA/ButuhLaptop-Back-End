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

router.get('/checkouts', getCheckouts);
router.get('/checkouts/:id', getCheckoutsbyId);
router.post('/checkouts', createCheckouts);
router.patch('/checkouts/:id', updateCheckouts);
router.delete('/checkouts/:id', deleteCheckouts);

export default router