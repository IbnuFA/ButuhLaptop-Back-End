import express from "express";
import cors from "cors"
import session, { Store } from "express-session";
import dotenv from "dotenv"
import db from "./config/Database.js";
import SequelizeStore from "connect-session-sequelize"

//import model
import Cart from "./models/Cart.js";
import Feedbacks from "./models/Feedback.js";
import OrderDetail from "./models/Order-Detail.js";
import Order from "./models/Order.js";
import User from "./models/User.js";
import Product from "./models/Product.js";

//import route
import AuthRouter from "./routes/Auth-Routes.js"
import ProductRoute from "./routes/user/Product-Routes.js"
import FeedbacksRoute from "./routes/Feedback-Routes.js";
import AdminProductRoute from "./routes/admin/Admin-Product-Routes.js";
import AdminUserRoute from "./routes/admin/Admin-User-Route.js";
import UserCartRoutes from "./routes/user/Cart-Routes.js";
import UserOrderRouter from "./routes/user/Order-Routes.js";
import AdminOrderRoute from "./routes/admin/Admin-Order-Route.js";
import Shipping from "./models/Shipping.js";

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
    await Promise.all([
        User.sync(),
        Feedbacks.sync(),
        Product.sync(),
        Cart.sync(),
        OrderDetail.sync(),
        Order.sync(),
        Shipping.sync()
    ])
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

//route auth
app.use(AuthRouter)

//route user
app.use(ProductRoute)
app.use(FeedbacksRoute)
app.use(UserCartRoutes)
app.use(UserOrderRouter)

//route admin
app.use(AdminProductRoute)
app.use(AdminUserRoute)
app.use(AdminOrderRoute)

store.sync()

app.listen(process.env.APP_PORT, () => {
    console.log('Server is running at port', process.env.APP_PORT)
})