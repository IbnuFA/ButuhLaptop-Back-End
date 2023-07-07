import express from "express";
import cors from "cors"
import session, { Store } from "express-session";
import dotenv from "dotenv"
import db from "./config/Database.js";
import SequelizeStore from "connect-session-sequelize"

//import models
import Users from "./models/UserModel.js";
import Products from "./models/ProductModel.js";
import Keranjangs from "./models/KeranjangModel.js";
import Feedbacks from "./models/FeedbackModel.js";
import Checkouts from "./models/CheckoutModel.js";
import Carts from "./models/CartModel.js";

//import route
import UsersRoute from "./routes/UserRoutes.js"
import ProductRoute from "./routes/ProductRoutes.js"
import KeranjangRoute from "./routes/KeranjangRoutes.js"
import FeedbacksRoute from "./routes/FeedbackRoutes.js";
import CheckoutRoute from "./routes/CheckoutRoutes.js"
import CartRoute from "./routes/CartRoute.js"

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
    await Users.sync();
    await Feedbacks.sync()
    await Products.sync()
    await Keranjangs.sync()
    await Checkouts.sync()

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