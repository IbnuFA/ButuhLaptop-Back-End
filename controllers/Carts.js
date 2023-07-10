import User from "../models/UserModel.js";
import Product from "../models/ProductModel.js";
import Cart from "../models/CartModel.js";

export const getCart = async(req, res) => {
    try {
        const response = await Product.findAll({
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

export const getCartbyId  = async(req, res) => {
    //tes
}

export const createCart = async(req, res) => {
    const {userUuid, productId, quantity} = req.body;
    try {
        await Cart.create({
            userUuid: userUuid,
            productId: productId,
            quantity: quantity,
        })
        res.status(201).json({msg: "Cart telah ditambahkan"})
    } catch (error) {
        res.status(400).json({msg: error.message})
    }
}

export const updateCart = async(req, res) => {
    //tes
}

export const deleteCart = async(req, res) => {
    //tes
}