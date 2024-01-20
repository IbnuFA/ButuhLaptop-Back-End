import express from "express";

import {
    getFeedbacks,
    getFeedbacksbyId,
    createFeedbacks,
    updateFeedbacks,
    deleteFeedbacks
} from "../controllers/Feedbacks.js"

const router = express.Router();

router.get('/feedbacks/test', (req, res) => {
  res.send("Test Router Feedbacks")
}) 

router.get('/feedbacks', getFeedbacks);
router.get('/feedback/:id', getFeedbacksbyId);
router.post('/feedback', createFeedbacks);
router.patch('/feedback/:id', updateFeedbacks);
router.delete('/feedback/:id', deleteFeedbacks);

export default router