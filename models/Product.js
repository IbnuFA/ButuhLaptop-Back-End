import db from "../config/Database.js";
import Sequelize  from "sequelize";

const DataTypes = Sequelize.DataTypes

const Product = db.define('products', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        validate: {
            notEmpty: true
        },
    },
    description: {
        type: DataTypes.TEXT,
        validate: {
            notEmpty: true
        }
    },
    category: {
        type: DataTypes.STRING,
        validate: {
            notEmpty: true
        },
    },
    price: {
        type: DataTypes.BIGINT,
        validate: {
            notEmpty: true
        },
    },
    weight: {
        type: DataTypes.BIGINT,
        validate: {
            notEmpty: true
        },
    },
    image: {
        type: DataTypes.STRING,
        validate: {
            notEmpty: true
        },
    },
    stock: {
        type: DataTypes.INTEGER,
        validate: {
            notEmpty: true
        },
    }
})

export default Product;