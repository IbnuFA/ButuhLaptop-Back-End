import express from "express";
import cors from "cors"
import session, { Store } from "express-session";
import dotenv from "dotenv"
import db from "./config/Database.js";
import SequelizeStore from "connect-session-sequelize"

//import model
import User from "./models/UserModel.js";
import Product from "./models/ProductModel.js";
import Cart from "./models/CartModel.js";
import Feedbacks from "./models/FeedbackModel.js";
import Checkout from "./models/CheckoutModel.js";
import CartItem from "./models/CartItemModel.js"

//import route
import UsersRoute from "./routes/UserRoutes.js"
import ProductRoute from "./routes/ProductRoutes.js"
import FeedbacksRoute from "./routes/FeedbackRoutes.js";
import CheckoutRoute from "./routes/CheckoutRoutes.js"
import CartRoute from "./routes/CartRoute.js"
import CartItemRoute from "./routes/CartItemRoute.js"

dotenv.config()

var app = express()

//session storage
const sessionStore = SequelizeStore(session.Store)

const store = new sessionStore({
    db: db
})

//sync db
try {
    //connect db
    await db.authenticate();
    
    //connect and create table

    await db.sync();
    //opsi force: true bakal maksa sequelize utk menyamakan keseluruhan field db
    
    //awal2 tetap harus ditulis satu per satu
    // await User.sync();
    // await Product.sync();
    // await Cart.sync();
    // await CartItem.sync();
    // await Checkout.sync();
    // await Feedbacks.sync();


    console.log('Database Connected!');
} catch (err) {
    console.error(`Error => ${err}`);
}

//session
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
        secure: 'auto'
    }
}))

//FE request cookie + credentials
app.use(cors({
    credentials: true,
    origin: [
        "http://localhost:3000",
    ],
}))

app.use(express.json())

//middleware
app.use(UsersRoute)
app.use(ProductRoute)
app.use(CartRoute)
// app.use(CartItemRoute)
app.use(FeedbacksRoute)
app.use(CheckoutRoute)

store.sync()

app.listen(process.env.APP_PORT, () => {
    console.log('Server is Running')
})