import Sequelize  from "sequelize";
import db from "../config/Database.js";
import Users from "./UserModel.js";
import Products from "./ProductModel.js";

const Datatypes = Sequelize.DataTypes

const Keranjang = db.define('keranjang', {
    keranjang_id:{
        type: Datatypes.STRING,
        defaultValue: Datatypes.UUIDV4,
        allowNull: false,
        validate:{
            notEmpty: true
        },
        primaryKey: true,
    },
    // user_id:{
    //     type: Datatypes.INTEGER,   
    //     allowNull: false,
    //     validate:{
    //         notEmpty: true,
    //     }
    // },
    // product_id:{
    //     type: Datatypes.INTEGER,   
    //     allowNull: false,
    //     validate:{
    //         notEmpty: true,
    //     }
    // },
    quantity:{
        type: Datatypes.INTEGER,   
        allowNull: false,
        validate:{
            notEmpty: true,
        }
    },
}, {
    freezeTableName: true,
});

// Relasi Table 
Users.hasMany(Keranjang)
Keranjang.belongsTo(Users, {foreignKey: 'user_id'})

// Products.hasOne(Keranjangs)
// Keranjangs.belongsTo(Products, {foreignKey: 'product_id'})

export default Keranjang