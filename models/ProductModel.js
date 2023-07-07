import Sequelize  from "sequelize";
import db from "../config/Database.js";
import Users from "./UserModel.js";

const Datatypes = Sequelize.DataTypes

const Products = db.define('products', {
    product_id:{
        type: Datatypes.STRING,
        defaultValue: Datatypes.UUIDV4,
        allowNull: false,
        validate:{
            notEmpty: true
        },
        primaryKey: true,
    },
    product_name:{
        type: Datatypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true,
            len: [3, 100]
        }
    },
    product_description:{
        type: Datatypes.CHAR,
        allowNull: false,
        validate:{
            notEmpty: true,
        }
    },
    category:{
        type: Datatypes.CHAR,
        allowNull: false,
        validate:{
            notEmpty: true,
        }
    },
    price:{
        type: Datatypes.FLOAT,   
        allowNull: false,
        validate:{
            notEmpty: true,
        }
    },
    product_image:{
        type: Datatypes.BLOB,   
        allowNull: true,
        validate:{
            notEmpty: true,
        }
    },
    stock:{
        type: Datatypes.INTEGER,   
        allowNull: false,
        validate:{
            notEmpty: true,
        }
    },
}, {
    freezeTableName: true,
});

//Relasi Table 
// Users.hasMany(Products)
// Products.belongsTo(Users, {foreignKey: 'user_id'})

export default Products