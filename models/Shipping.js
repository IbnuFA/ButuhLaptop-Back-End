import db from "../config/Database.js";
import Sequelize  from "sequelize";

const DataTypes = Sequelize.DataTypes

const Shipping = db.define('shippings', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    receipt: {
        type: DataTypes.STRING,
        validate: {
            notEmpty: true
        },
    },
    shipping_price: {
        type: DataTypes.BIGINT,
        validate: {
            notEmpty: true
        },
    },
    reciever_postal: {
        type: DataTypes.INTEGER,
        validate: {
            notEmpty: true
        },
    },
    receiver_address: {
        type: DataTypes.STRING,
        validate: {
            notEmpty: true
        },
    },
    receiver_province: {
        type: DataTypes.STRING,
        validate: {
            notEmpty: true
        },
    },
    receiver_city:{
        type: DataTypes.STRING,
        validate: {
            notEmpty: true
        },
    },
    provider: {
        type: DataTypes.STRING,
        validate: {
            notEmpty: true
        },
    }
});

export default Shipping;