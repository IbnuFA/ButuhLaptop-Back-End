import db from "../config/Database.js";
import Sequelize  from "sequelize";
import User from "./User.js";
import Product from "./Product.js";

const DataTypes = Sequelize.DataTypes

const Cart = db.define('carts', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    quantity: {
        type: DataTypes.SMALLINT,
    },
    status: {
        type: DataTypes.SMALLINT
        //status => 0: still in cart; 1: checkedout 
    }
});

User.hasMany(Cart);
Cart.belongsTo(User);

Product.hasMany(Cart);
Cart.belongsTo(Product);

export default Cart;