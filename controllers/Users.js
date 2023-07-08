import User from "../models/UserModel.js"
import argon2 from "argon2"

export const getUsers  = async(req, res) => {
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

export const getUsersbyId  = async(req, res) => {
    try {
        const response = await Users.findOne({
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

export const createUsers  = async(req, res) => {
    const {first_name, last_name, email, password, confirmPassword, role} = req.body
    if(password !== confirmPassword) {
        return res.status(400).json({msg: "Password dan Confirm Password tidak cocok"})
    } else {
        const hassPassword = await argon2.hash(password)

        try {
            await Users.create({
                first_name: first_name,
                last_name: last_name,
                email: email,
                password: hassPassword,
                role: role,
            })
            res.status(201).json({msg: "Register Berhasil"})
        } catch (error) {
            res.status(400).json({msg: error.message})
        }
    }
}

export const updateUsers = async(req, res) => {
    const user = await Users.findOne({
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
                await Users.update({
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

export const deleteUsers  = async(req, res) => {
    const user = await Users.findOne({
        where:{
            uuid: req.params.id
        }
    })

    if(!user){
        return res.status(404).json({msg: "User tidak ditemukan"})
    } else {
        try {
            await Users.destroy({
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
    const user = await Users.findOne({
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
            req.session.userId = user.uuid
            const uuid = user.uuid
            const first_name = user.first_name
            const last_name = user.last_name
            const email = user.email
            const role = user.role
            return res.status(200).json({uuid, first_name, last_name, email, role})
        }
    }
}

export const getUserLogin = async (req, res) => {
    if(!req.session.userId){
        return res.status(401).json({msg: "Mohon Login Terlebih Dahulu!"})
    } else {
        const user = await Users.findOne({
            attributes: ['uuid', 'first_name', 'last_name', 'email', 'role'],
            where: {
                uuid: req.session.userId
            }
        })
    
        if(!user){
            return res.status(404).json({msg: "User tidak ditemukan"})
        } else {
            return res.status(200).json(user)
        }
    }
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