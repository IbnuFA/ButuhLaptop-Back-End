import Sequelize from "sequelize";
import db from "../config/Database.js";
import Users from "./UserModel.js";
import Products from "./ProductModel.js";

const DataTypes = Sequelize.DataTypes;

const Carts = db.define('cart', {
    cart_id:{
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
        validate:{
            notEmpty: true
        }
    },
    user_id:{
        type: DataTypes.INTEGER,   
        allowNull: false,
        validate:{
            notEmpty: true,
        }
    },
    product_id:{
        type: DataTypes.INTEGER,   
        allowNull: false,
        validate:{
            notEmpty: true,
        }
    },
    quantity:{
        type: DataTypes.INTEGER,   
        allowNull: false,
        validate:{
            notEmpty: true,
        }
    },
},{
    freezeTableName: true,
});

//Relasi Table
// Users.hasMany(Carts)
// Carts.belongsTo(Users, {foreignKey: 'user_id'})

// Products.hasOne(Carts)
// Carts.belongsTo(Products, {foreignKey: 'product_id'})

export default Carts;