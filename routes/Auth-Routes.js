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

const AuthRouter = express.Router();

AuthRouter.use((req, res, next) => {
  console.log('Time : ', Date.now())
  next()
})

AuthRouter.get('/users/test', (req, res) => {
  res.send("Test Router User")
}) 

//Auth Route
AuthRouter.get('/authusers', getUserLogin);
AuthRouter.post('/register', createUser);
AuthRouter.post('/login', Login);
AuthRouter.delete('/logout', Logout);

export default AuthRouter