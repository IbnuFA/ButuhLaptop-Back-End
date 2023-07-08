// import Keranjangs from "../models/KeranjangModel.js"
import User from "../models/UserModel.js";
import Product from "../models/ProductModel.js";
import Cart from "../models/CartModel.js";

export const getKeranjang  = async(req, res) => {
    //tes
}

export const getKeranjangbyId  = async(req, res) => {
    //tes
}

export const createKeranjang  = async(req, res) => {
    const {user_id, product_id, quantity} = req.body;
    try {
        await Cart.create({
            user_id: user_id,
            product_id: product_id,
            quantity: quantity,
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