import Sequelize from "sequelize";
import db from "../config/Database.js";
import Product from "./ProductModel.js";
import Cart from "./CartModel.js";

const Datatypes = Sequelize.DataTypes;

const CartItem = db.define('cartItem', {
    id: {
        type: Datatypes.STRING,
        defaultValue: Datatypes.UUIDV4,
        allowNull: false,
        validate:{
            notEmpty: true
        },
        primaryKey: true,
    },
});

Product.hasMany(CartItem);
CartItem.belongsTo(Product);

Cart.hasMany(CartItem);
CartItem.belongsTo(Cart);

export default CartItem
