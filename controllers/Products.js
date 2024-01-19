import Product from "../models/Product.js";
import multer from "multer";

import { ErrorResponseMessage, SuccessResponseMessage } from "../utils/response-message.js";
import { uploadFile, getFileURL, deleteFile } from "../services/file-upload-service.js";


export const getProducts  = async(req, res) => {
    try {
        let response = await Product.findAll({
            attributes: ['id', 'name', 'description', 'category', 'price', 'stock', 'image', 'weight'],
        })
        response = response.map(({ dataValues }) => dataValues);
        response = await Promise.all(response.map(async (product) => {
            let imageURL;
            try {
                imageURL = await getFileURL(product.image);
            } catch (error) {
                imageURL = product.image;
            }
            
            return {
                ...product,
                image: imageURL
            };
        }));
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message})
        console.log(error)
    }
}

export const getProductsbyId  = async(req, res) => {
    try {
        const product = await Product.findOne({
            attributes: ['id', 'name', 'description', 'category', 'price', 'stock', 'image', 'weight'],
            where:{
                id: req.params.id
            }
        })
        if(!product) {
            res.status(400).json({msg: ErrorResponseMessage[404]})
            return 
        }

        const imageURL = await getFileURL(product.image);
            
        res.status(200).json({
            ...product.dataValues,
            image: imageURL
        });
    } catch (error) {
        res.status(500).json({msg: error.message})
        console.log(error)
    }
}

export const createProducts  = async(req, res) => {
    const {name, description, category, price, stock, weight } = req.body;
    try {
        const image = await uploadFile(req.file, 'products');
        const data = {
            name: name,
            description: description,
            category: category,
            price: price,
            stock: stock,
            image: image,
            weight: weight,
        }
        await Product.create(data);

        const imageURL = await getFileURL(data.image);
        
        res.status(201).json({msg: SuccessResponseMessage[201], data: {
            ...data,
            image: imageURL,
        } })
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
        const {name, description, category, price, stock } = req.body;

        try {
            const data = {
                name: name,
                description: description,
                category: category,
                price: price,
                stock: stock,
            }

            let imageURL;
            if (req.file) {
                const image = await uploadFile(req.file, 'products');
                data.image = image;
                imageURL = await getFileURL(data.image);
            } else {
                imageURL = await getFileURL(product.dataValues.image);
            }
            const updRes = await Product.update(data,{
                where:{
                    id: product.id
                }
            })

            if (req.file) {
                await deleteFile(product.dataValues.image);
            }

            res.status(200).json({msg: SuccessResponseMessage[200], data: {
                ...data,
                image: imageURL,
            }})
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
            await deleteFile(product.dataValues.image);

            res.status(200).json({msg: SuccessResponseMessage[200]})
        } catch (error) {
            res.status(400).json({msg: error.message})
        }
    }
}