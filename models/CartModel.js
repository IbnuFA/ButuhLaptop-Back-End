import Sequelize from "sequelize";
import db from "../config/Database.js";
import User from "./UserModel.js";
import Product from "./ProductModel.js";

const Datatypes = Sequelize.DataTypes;

const Cart = db.define('cart', {
    id: {
        type: Datatypes.STRING,
        defaultValue: Datatypes.UUIDV4,
        allowNull: false,
        validate:{
            notEmpty: true
        },
        primaryKey: true,
    },
    isActive:{
        type: Datatypes.BOOLEAN,   
        allowNull: false,
        validate:{
            notEmpty: true,
        }
    },
    // quantity:{
    //     type: Datatypes.INTEGER,   
    //     allowNull: false,
    //     validate:{
    //         notEmpty: true,
    //     }
    // },
}, {freezeTableName: true});

// Users.hasMany(Cart);
// Cart.belongsTo(Users, {foreignKey: "user_id"});
User.hasMany(Cart);
Cart.belongsTo(User)

Product.hasMany(Cart);
Cart.belongsTo(Product)

export default Cart;





