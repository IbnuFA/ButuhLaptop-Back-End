import argon2 from "argon2"
import User from "../models/User.js"
import jwt from 'jsonwebtoken';
import axios from "axios"
import { getCityById, getProvinceById } from "../services/logistic-service.js"

export const getUser  = async(req, res) => {
    try {
        const response = await User.findAll({
            attributes: ['uuid', 'first_name', 'last_name', 'email', 'role' ]
        })
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({msg: error.message})
        console.log(error)
    }
}

export const getUserbyId  = async(req, res) => {
    try {
        const response = await User.findOne({
            attributes: ['uuid', 'first_name', 'last_name', 'email', 'role'],
            where:{
                uuid: req.params.id
            }
        })
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({msg: error.message})
        console.log(error)
    }
}

export const getCheckoutbyUserUuid = async(req, res) => {
    try {
        const {id} = req.params;
        const response = await User.findByPk(id, {include: Checkout})
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({msg: error.message})
        console.log(error)
    }
}

export const getCartbyUserUuid = async(req, res) => {
    try {
        const {id} = req.params;
        // const response = await User.findByPk(id, {include: Cart})

        res.status(200).json("test")
    } catch (error) {
        res.status(500).json({msg: error.message})
        console.log(error)
    }
}

export const createUser  = async(req, res) => {
    const {first_name, last_name, email, password, confirmPassword, role, province_id, postal_code, city_id, address} = req.body;
    if(password !== confirmPassword) {
        return res.status(400).json({msg: "Password dan Confirm Password tidak cocok"})
    } else {
        const hashPassword = await argon2.hash(password)
        try {
            const [province, city] = await Promise.all([
                getProvinceById(province_id),
                getCityById(city_id)
            ])
            await User.create({
                ...req.body,
                postal_code,
                province,
                city,
                password: hashPassword,
            })
            res.status(201).json({msg: "Register Berhasil"})
        } catch (error) {
            res.status(400).json({msg: error.message})
        }
    }
}

export const updateUser = async(req, res) => {
    const user = await User.findOne({
        where:{
            uuid: req.params.id
        }
    })

    if(!user){
        return res.status(404).json({msg: "User tidak ditemukan"})
    } else {
        const {first_name, last_name, email, password, confirmPassword, role} = req.body
        //cek user input password atau tidak
        let hassPassword;

        if(password === "" || password === null ) {
            hassPassword = user.password
        } else {
            hassPassword = await argon2.hash(password)
        }
        
        if(password !== confirmPassword) {
            return res.status(400).json({msg: "Password dan Confirm Password tidak cocok"})
        } else {
            try {
                await User.update({
                    first_name: first_name,
                    last_name: last_name,
                    email: email,
                    password: hassPassword,
                    role: role,
                },{
                    where: {
                        id: user.id
                    }
                })
                res.status(200).json({msg: "Update Berhasil"})
            } catch (error) {
                res.status(400).json({msg: error.message})
            }
        }
    }
    // ini dihapus, error
}

export const deleteUser  = async(req, res) => {
    const user = await User.findOne({
        where:{
            uuid: req.params.id
        }
    })

    if(!user){
        return res.status(404).json({msg: "User tidak ditemukan"})
    } else {
        try {
            await User.destroy({
                where: {
                    id: user.id
                }
            })
            res.status(200).json({msg: "User telah dihapus"})
        } catch (error) {
            res.status(400).json({msg: error.message})
        }
    }
}

export const Login  = async(req, res) => {
    const user = await User.findOne({
        where:{
            email: req.body.email
        }
    })

    if(!user){
        return res.status(404).json({msg: "User tidak ditemukan"})
    } else {
        const match = await argon2.verify(user.password, req.body.password)

        if(!match){
            return res.status(400).json({msg: "Password Salah"})
        } else {
            const uuid = user.uuid
            const first_name = user.first_name
            const last_name = user.last_name
            const email = user.email
            const role = user.role
            const accessToken = jwt.sign({ uuid }, process.env.JWT_SECRET, {
                expiresIn: '7d',
            }); 
            return res.status(200).json({
                uuid, first_name, last_name, email, role, accessToken,
            })
        }
    }
}

export const getUserLogin = async (req, res) => {
    const { user } = req;

    if(!user){
        return res.status(404).json({msg: "User tidak ditemukan"})
    }

    const { createdAt, updatedAt, password, ...result } = user;
    return res.status(200).json(result)
}

export const Logout = (req, res) => {
    req.session.destroy((err) => {
        if(err){
            return res.status(400).json({msg: "Tidak Dapat Logout"})
        } else {
            return res.status(200).json({msg: "Anda telah logout"})
        }
    })
}