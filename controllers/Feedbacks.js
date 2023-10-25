import Feedbacks from "../models/Feedback.js"


export const getFeedbacks  = async(req, res) => {
    try {
        const response = await Feedbacks.findAll({
            attributes:['feedback_id', 'feedback', 'rate']
        })
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({msg: error.message})
        console.log(error)
    }
}

export const getFeedbacksbyId  = async(req, res) => {
    try {
        const response = await Feedbacks.findOne({
            attributes:['feedback_id', 'feedback', 'rate']
        })
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({msg: error.message})
        console.log(error)
    }
}

export const createFeedbacks  = async(req, res) => {
    const {feedback, rate} = req.body

    try {
        await Feedbacks.create({
            feedback: feedback,
            rate: rate
        })
        res.status(201).json({msg: "Feedback telah ditambahkan"})
    } catch (error) {
        res.status(400).json({msg: error.message})
    }
}

export const updateFeedbacks  = async(req, res) => {
    const feedbacks = await Feedbacks.findOne({
        where:{
            feedback_id: req.params.id
        }
    })
    console.log(req.params)

    if(!feedbacks){
        return res.status(404).json({msg: "feedbacks tidak ditemukan"})
    } else{
        const {feedback, rate} = req.body

        try {
            await Feedbacks.update({
                feedback: feedback,
                rate: rate
            },{
                where:{
                    id: feedbacks.id
                }
            })
            res.status(201).json({msg: "feedback telah diupdate"})
        } catch (error) {
            res.status(400).json({msg: error.message})
        }
    }
}

export const deleteFeedbacks  = async(req, res) => {
    const feedbacks = await Feedbacks.findOne({
        feedback_id: req.params.id
    })

    if(!feedbacks){
        return res.status(404).json({msg: "feedbacks tidak ditemukan"})
    } else{
        try {
            await Feedbacks.destroy({
                where:{
                    id: feedbacks.id
                }
            })
            res.status(201).json({msg: "feedback telah dihapus"})
        } catch (error) {
            res.status(400).json({msg: error.message})
        }
    }
}