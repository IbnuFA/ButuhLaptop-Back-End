import CartItem from "../models/CartItemModel.js";
import Cart from "../models/CartModel.js";
import Product from "../models/ProductModel.js";

export const getCartItem = async(req, res) => {
    try {
        const response = await CartItem.findAll({
            // relasi Cart
            attributes: ['id'],
            include:[{
                model: Cart,
            }]
        })
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
        console.log(error);
    }
    
}

export const getCartItembyId = async(req, res) => {
    try {
        const response = await CartItem.findOne({
            attributes: ['id'],
            where:{
                id: req.params.id
            }, include:[{
                model: Cart,
            }]
        })
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
        console.log(error);
    }
}

export const getCartItembyCartId = async(req, res) => {
    res.send("Test Router getCartItembyCartId")
}

export const createCartItem = async(req, res) => {
    const {productId, cartId} = req.body;

    try {
        //KOK MALAH ERROR ANJAY
        //search productId
        // const product = await Product.findOne({ where:{ id: productId }})
        // if(!product){
        //     return res.status(400).json({msg: "Produk tidak ditemukan"})
        // }

        // //search productId
        // const cart = await Cart.findOne({ where:{ id: cartId }})
        // if(!cart){
        //     return res.status(400).json({msg: "Produk tidak ditemukan"})
        // }

        //create cartItem
        await CartItem.create({
            productId: productId,
            cartId: cartId
        })
        res.status(201).json({msg: "Produk telah ditambahkan ke Cart"})
    } catch (error) {
        res.status(400).json({msg: error.message})
        console.log(error);
    }
}

export const updateCartItem = async(req, res) => {
    const cartItem = await CartItem.findOne({
        where:{
            id: req.params.id
        }
    })

    if(!cartItem){
        return res.status(404).json({msg: "Produk tidak ditemukan"})
    }else{
        const {productId, cartId} = req.body
        try {
            await CartItem.update({
                productId: productId,
                cartId: cartId
            },{
                where:{
                    id: cartItem.id
                }
            })
            res.status(201).json({msg: "Produk telah diupdate"})
        } catch (error) {
            res.status(400).json({msg: error.message})
        }
    }
}

export const deleteCartItem = async(req, res) => {
    const cartItem = await CartItem.findOne({
        where:{
            id: req.params.id
        }
    })

    if(!cartItem){
        return res.status(404).json({msg: "Produk tidak ditemukan"})
    }else{
        try {
            await CartItem.destroy({
                where:{
                    id: cartItem.id
                }
            })
            res.status(201).json({msg: "Produk telah dihapus dari keranjang"})
        } catch (error) {
            res.status(400).json({msg: error.message})
        }
    }
}