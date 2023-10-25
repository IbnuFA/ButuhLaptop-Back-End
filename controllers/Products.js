import Product from "../models/Product.js";


export const getProducts  = async(req, res) => {
    try {
        const response = await Product.findAll({
            // relasi user
            attributes: ['id', 'name', 'description', 'category', 'price', 'stock', 'image'],
            // user bisa melihat daya yang dia inputkan
            // where: {
            //     UserId: req.UserId
            // },
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

export const getProductsbyId  = async(req, res) => {
    try {
        const response = await Product.findOne({
            attributes: ['id', 'name', 'description', 'category', 'price', 'stock', 'image'],
            where:{
                id: req.params.id
            }
        })
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({msg: error.message})
        console.log(error)
    }
}

export const createProducts  = async(req, res) => {
    const {name, description, category, price, stock, image } = req.body;
    try {
        await Product.create({
            name: name,
            description: description,
            category: category,
            price: price,
            stock: stock,
            image: image,
            userId: req.userId
        })
        res.status(201).json({msg: "Produk telah Ditambahkan"})
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
        return res.status(404).json({msg: "Products tidak ditemukan"})
    } else{
        const {name, description, category, price, stock, image } = req.body
        try {
            await Product.update({
                name: name,
                description: description,
                category: category,
                price: price,
                stock: stock,
                image: image
            },{
                where:{
                    id: product.id
                }
            })
            res.status(201).json({msg: "Produk telah diupdate"})
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
        return res.status(404).json({msg: "Product tidak ditemukan"})
    } else {
        try {
            await Product.destroy({
                where: {
                    id: product.id
                }
            })
            res.status(200).json({msg: "Product telah dihapus"})
        } catch (error) {
            res.status(400).json({msg: error.message})
        }
    }
}