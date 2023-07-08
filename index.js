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

//import route
import UsersRoute from "./routes/UserRoutes.js"
import ProductRoute from "./routes/ProductRoutes.js"
import KeranjangRoute from "./routes/KeranjangRoutes.js"
import FeedbacksRoute from "./routes/FeedbackRoutes.js";
import CheckoutRoute from "./routes/CheckoutRoutes.js"
import CartItem from "./models/CartItemModel.js";

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
    await db.sync({force: true});
 
    //opsi force: true bakal maksa sequelize utk menyamakan keseluruhan field db

    await User.sync();
    await Product.sync();
    await Cart.sync();
    await CartItem.sync();
    await Checkout.sync();
    await Feedbacks.sync();
    //awal2 tetap harus ditulis satu per satu

    //table relation
    // Users.Products = Users.hasMany(Products)
    // Users.Keranjangs = Users.hasMany(Keranjangs)
    // Products.Keranjangs = Products.hasOne(Keranjangs)
    // Users.Checkouts = Users.hasMany(Checkouts)
    // Keranjangs.Checkouts = Keranjangs.hasOne(Checkouts)

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

// app.use(cors({
//     origin: 'https://localhost:3000',
//     methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE", "OPTIONS"],
//     preflightContinue: false,
//     optionsSuccessStatus: 204,
// }))

app.use(express.json())

//middleware
app.use(UsersRoute)
app.use(ProductRoute)
app.use(KeranjangRoute)
app.use(FeedbacksRoute)
app.use(CheckoutRoute)

store.sync()

app.listen(process.env.APP_PORT, () => {
    console.log('Server is Running')
})