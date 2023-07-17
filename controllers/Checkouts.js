import Checkout from "../models/CheckoutModel.js"
import Cart from "../models/CartModel.js"
import User from "../models/UserModel.js"

export const getCheckouts  = async(req, res) => {
    try {
        const response = await Checkout.findAll({
            //relasi User
            attributes: ['id'],
            include:[{
                model: User,
            }]
        })
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
        console.log(error)
    }
}

export const getCheckoutsbyId  = async(req, res) => {
    try {
        const response = await Checkout.findOne({
            //relasi User
            attributes: ['id'],
            where:{
                id: req.params.id
            }, include:[{
                model: User,
            }]
        })
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
        console.log(error)
    }
}

export const getCheckoutbyUserUuid = async(req, res) => {
    res.send("Test Router getCheckoutbyUserUuid")
}

export const createCheckouts  = async(req, res) => {
    const {status, userUuid, cartId} = req.body;
    try {
        await Checkout.create({
            status: status,
            userUuid: userUuid,
            cartId: cartId
        })
        res.status(201).json({msg: "Checkout telah dibuat"})
    } catch (error) {
        res.status(400).json({msg: error.message})
        console.log(error);
    }
}

export const updateCheckouts  = async(req, res) => {
    const checkout = await Checkout.findOne({
        where:{
            id: req.params.id
        }
    })

    if(!checkout){
        return res.status(404).json({msg: "Checkout tidak ditemukan"})
    }else{
        const {checkout} = req.body
        try {
            await Checkout.update({
                checkout: checkout
            },{
                where:{
                    id: checkout.id
                }
            })
            res.status(201).json({msg: "Checkout telah diupdate"})
        } catch (error) {
            res.status(400).json({msg: error.message})
        }
    }
}

export const deleteCheckouts  = async(req, res) => {
    const checkout = await Checkout.findOne({
        where:{
            id: req.params.id
        }
    })

    if(!checkout){
        return res.status(404).json({msg: "Checkout tidak ditemukan"})
    }else{
        try {
            await Checkout.destroy({
                where:{
                    id: checkout.id
                }
            })
            res.status(201).json({msg: "Checkout telah diupdate"})
        } catch (error) {
            res.status(400).json({msg: error.message})
        }
    }
}