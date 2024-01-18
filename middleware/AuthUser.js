import jwt from 'jsonwebtoken'
import User from "../models/User.js"

//cek user login atau belum
export const verifyUser = async (req, res, next) => {
    const authHeader = req.headers['authorization']
    if (!authHeader || !authHeader?.startsWith('Bearer')) {
        return res.status(401).json({ msg: 'No token given.' });
    }
    const token = authHeader && authHeader.split(' ')[1]
  
    if (!token) return res.status(401).json({ msg: 'No token given.' });

    try {
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
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            return res.status(401).json({ msg: 'Token expired.' });
        }

        if (error instanceof jwt.JsonWebTokenError) {
            return res.status(401).json({ msg: 'Token error.', error_message: error.message });
        }

        console.log(error);
        return res.status(500).json({ msg: 'Internal Server Error '});
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