import Cart from "../models/CartModel.js"
import Users from "../models/UserModel.js"
import Products from "../models/ProductModel.js"

export const getCart  = async(req, res) => {
    //tes
}

export const getCartbyId  = async(req, res) => {
    //tes
}

export const createCart  = async(req, res) => {
    const {user_id, product_id, quantity} = req.body;
    try {
        await Cart.create({
            user_id: user_id,
            product_id: product_id,
            quantity: quantity,
        })
        res.status(201).json({msg: "Cart telah ditambahkan"})
    } catch (error) {
        res.status(400).json({msg: error.message})
    }
}

export const updateCart  = async(req, res) => {
    //tes
}

export const deleteCart  = async(req, res) => {
    //tes
}