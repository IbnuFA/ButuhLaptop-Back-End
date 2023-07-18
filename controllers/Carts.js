import User from "../models/UserModel.js";
import Product from "../models/ProductModel.js";
import Cart from "../models/CartModel.js";
import CartItem from "../models/CartItemModel.js";

export const getCart = async(req, res) => {
    try {
        const response = await Cart.findAll({
            // relasi user
            attributes: ['id', 'quantity'],
            include:[{
                model: User,
                // include: ['first_name', 'last_name', 'role' ]
            }]
        })
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message})
        console.log(error)
    }
}

export const getCartbyId  = async(req, res) => {
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

export const getCartItembyCartId = async (req, res) => {
    try {
        const {id} = req.params;
        const response = await Cart.findByPk(id, {include: CartItem});
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({msg: error.message})
        console.log(error)
    }
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
        console.log(error);
    }
}

export const updateCart = async(req, res) => {
    const cart = await Cart.findOne({
        where:{
            id: req.params.id
        }
    })

    if(!cart){
        return res.status(404).json({msg: "Cart tidak ditemukan"})
    }else{
        const {quantity} = req.body
        try {
            await Cart.update({
                quantity: quantity
            },{
                where:{
                    id: cart.id
                }
            })
            res.status(201).json({msg: "Cart telah diupdate"})
        } catch (error) {
            res.status(400).json({msg: error.message})
        }
    }
}

export const deleteCart = async(req, res) => {
    const cart = await Cart.findOne({
        where:{
            id: req.params.id
        }
    })

    if(!cart){
        return res.status(404).json({msg: "Cart tidak ditemukan"})
    }else{
        try {
            await Cart.destroy({
                where:{
                    id: cart.id
                }
            })
            res.status(201).json({msg: "Cart telah dihapus"})
        } catch (error) {
            res.status(400).json({msg: error.message})
        }
    }
}