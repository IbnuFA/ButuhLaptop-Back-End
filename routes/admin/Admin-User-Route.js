import express from "express";
import { verifyUser, adminOnly } from "../../middleware/AuthUser.js";
import {
    getUser,
    getUserbyId,
    getCheckoutbyUserUuid,
    getCartbyUserUuid,
    createUser,
    updateUser,
    deleteUser,
} from "../../controllers/Users.js"

const AdminUserRoute = express.Router()

AdminUserRoute.use((req, res, next) => {
  console.log('Time : ', Date.now())
  next()
})

AdminUserRoute.get('/admin/users', verifyUser, adminOnly, getUser);
AdminUserRoute.get('/admin/users/:id', verifyUser, adminOnly, getUserbyId);
AdminUserRoute.get('/admin/users/:id/checkout', getCheckoutbyUserUuid)
AdminUserRoute.get('/admin/users/:id/cart', getCartbyUserUuid)
AdminUserRoute.post('/admin/users', verifyUser, adminOnly, createUser);
AdminUserRoute.patch('/admin/users/:id', verifyUser, adminOnly, updateUser);
AdminUserRoute.delete('/admin/users/:id', verifyUser, adminOnly, deleteUser);

export default AdminUserRoute