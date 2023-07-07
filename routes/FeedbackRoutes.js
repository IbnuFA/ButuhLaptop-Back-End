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
router.get('/feedbacks/:id', getFeedbacksbyId);
router.post('/feedbacks', createFeedbacks);
router.patch('/feedbacks/:id', updateFeedbacks);
router.delete('/feedbacks/:id', deleteFeedbacks);

export default router