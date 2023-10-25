import express from "express";

import {
    getUser,
    getUserbyId,
    getCheckoutbyUserUuid,
    getCartbyUserUuid,
    createUser,
    updateUser,
    Login,
    Logout,
    getUserLogin,
    deleteUser,
} from "../controllers/Users.js"

import { verifyUser, adminOnly } from "../middleware/AuthUser.js";

const router = express.Router();

router.use((req, res, next) => {
  console.log('Time : ', Date.now())
  next()
})

router.get('/users/test', (req, res) => {
  res.send("Test Router User")
}) 

router.get('/users', verifyUser, adminOnly, getUser);
router.get('/users/:id', verifyUser, adminOnly, getUserbyId);
router.get('/users/:id/checkout', getCheckoutbyUserUuid)
router.get('/users/:id/cart', getCartbyUserUuid)
router.post('/users', verifyUser, adminOnly, createUser);
router.patch('/users/:id', verifyUser, adminOnly, updateUser);
router.delete('/users/:id', verifyUser, adminOnly, deleteUser);

//Auth Route
router.get('/authusers', getUserLogin);
router.post('/register', createUser);
router.post('/login', Login);
router.delete('/logout', Logout);

export default router