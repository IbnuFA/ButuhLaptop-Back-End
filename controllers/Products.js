import Product from "../models/Product.js";
import { ErrorResponseMessage, SuccessResponseMessage } from "../utils/response-message.js";


export const getProducts  = async(req, res) => {
    try {
        const response = await Product.findAll({
            attributes: ['id', 'name', 'description', 'price', 'stock', 'image'],
        })
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message})
        console.log(error)
    }
}

export const getProductsbyId  = async(req, res) => {
    try {
        const product = await Product.findOne({
            attributes: ['id', 'name', 'description', 'price', 'stock', 'image'],
            where:{
                id: req.params.id
            }
        })
        if(!product) {
            res.status(400).json({msg: ErrorResponseMessage[404]})
            return 
        }
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({msg: error.message})
        console.log(error)
    }
}

export const createProducts  = async(req, res) => {
    const {name, description, price, stock, image } = req.body;
    try {
        const data = {
            name: name,
            description: description,
            price: price,
            stock: stock,
            image: image,
        }
        await Product.create(data)
        res.status(201).json({msg: SuccessResponseMessage[201], data })
    } catch (error) {
        res.status(400).json({msg: error.message})
    }
}

export const updateProducts  = async(req, res) => {
    const product = await Product.findOne({
        where:{
            id: req.params.id
        }
    })

    if(!product){
        return res.status(404).json({msg: ErrorResponseMessage[404]})
    } else{
        const {name, description, category, price, stock, image } = req.body
        try {
            const data = {
                name: name,
                description: description,
                category: category,
                price: price,
                stock: stock,
                image: image
            }
            const updRes = await Product.update(data,{
                where:{
                    id: product.id
                }
            })
            res.status(200).json({msg: SuccessResponseMessage[200], data})
        } catch (error) {
            res.status(400).json({msg: error.message})
        }
    }
}

export const deleteProducts  = async(req, res) => {
    const product = await Product.findOne({
        where:{
            id: req.params.id
        }
    })

    if(!product){
        return res.status(404).json({msg: ErrorResponseMessage[404]})
    } else {
        try {
            await Product.destroy({
                where: {
                    id: product.id
                }
            })
            res.status(200).json({msg: SuccessResponseMessage[200]})
        } catch (error) {
            res.status(400).json({msg: error.message})
        }
    }
}