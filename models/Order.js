import db from "../config/Database.js";
import Sequelize  from "sequelize";
import Shipping from "./Shipping.js";
import User from "./User.js";

const DataTypes = Sequelize.DataTypes

const Order = db.define('orders', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    products_price: {
        type: DataTypes.BIGINT,
    },
    total_price: {
        type: DataTypes.BIGINT,
    },
    currency: {
        type: DataTypes.STRING
    },
    status: {
       type: DataTypes.TINYINT
    },
    payment_prove: {
        type: DataTypes.STRING
    },
});

Shipping.hasOne(Order);
Order.belongsTo(Shipping);

User.hasMany(Order);
Order.belongsTo(User);

export default Order;