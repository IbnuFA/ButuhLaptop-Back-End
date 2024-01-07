import jwt from 'jsonwebtoken'
import User from "../models/UserModel.js"

//cek user login atau belum
export const verifyUser = async (req, res, next) => {
    const authHeader = req.headers['authorization']
    if (!authHeader.startsWith('Bearer')) {
        return res.sendStatus(401)
    }
    const token = authHeader && authHeader.split(' ')[1]
  
    if (!token) return res.sendStatus(401)

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
   
    const user = await User.findOne({
        where: {
            uuid: decodedToken.uuid
        }
    })

    if(!user){
        return res.status(404).json({msg: "User tidak ditemukan"})
    } else {
        req.user = user.dataValues
        next()
    }
}

export const adminOnly = async (req, res, next) => {
    const { user } = req;

    if(!user){
        return res.status(404).json({msg: "User tidak ditemukan"})
    } else {
        if(user.role !== "admin"){
            return res.status(403).json({msg: "Akses Ditolak"})
        } else {
            next()
        }
    }
}