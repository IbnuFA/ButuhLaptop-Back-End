import Sequelize  from "sequelize";
import db from "../config/Database.js";
import User from "./UserModel.js";

const Datatypes = Sequelize.DataTypes

const Product = db.define('product', {
    id:{
        type: Datatypes.STRING,
        defaultValue: Datatypes.UUIDV4,
        allowNull: false,
        validate:{
            notEmpty: true
        },
        primaryKey: true,
    },
    name:{
        type: Datatypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true,
            len: [3, 100]
        }
    },
    description:{
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
    image:{
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
});

//Relasi Table 
User.hasMany(Product)
Product.belongsTo(User)

export default Product;