import express from "express";

import {
    getUsers,
    getUsersbyId,
    createUsers,
    updateUsers,
    Login,
    Logout,
    getUserLogin,
    deleteUsers
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

router.get('/users', verifyUser, adminOnly, getUsers);
router.get('/users/:id', verifyUser, adminOnly, getUsersbyId);
router.post('/users', verifyUser, adminOnly, createUsers);
router.patch('/users/:id', verifyUser, adminOnly, updateUsers);
router.delete('/users/:id', verifyUser, adminOnly, deleteUsers);

//Auth Route
router.get('/authusers', getUserLogin);;
router.post('/register', verifyUser, adminOnly, createUsers);
router.post('/login', Login);
router.delete('/logout', Logout);

export default router