// import Keranjangs from "../models/KeranjangModel.js"
import User from "../models/UserModel.js";
import Product from "../models/ProductModel.js";
import Cart from "../models/CartModel.js";

export const getKeranjang  = async(req, res) => {
    try {
        const response = await Cart.findAll({
            // relasi user
            attributes: ['id', 'quantity'],
            include:[{
                model: User
            }]
        })
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message})
        console.log(error)
    }
}

export const getKeranjangbyId  = async(req, res) => {
    try {
        const response = await Cart.findOne({
            attributes: ['id', 'quantity'],
            where:{
                id: req.params.id
            },
            include:[{
                model: User
            }]
        })
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({msg: error.message})
        console.log(error)
    }
}

export const createKeranjang  = async(req, res) => {
    const {userUuid, productId, quantity} = req.body;
    try {
        await Cart.create({
            userUuid: userUuid,
            productId: productId,
            quantity: quantity
        })
        res.status(201).json({msg: "Keranjang telah ditambahkan"})
    } catch (error) {
        res.status(400).json({msg: error.message})
    }
}

export const updateKeranjang  = async(req, res) => {
    //tes
}

export const deleteKeranjang  = async(req, res) => {
    //tes
}