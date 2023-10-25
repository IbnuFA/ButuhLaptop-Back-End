import db from "../config/Database.js";
import Sequelize  from "sequelize";
import Product from "./Product.js";
import Order from "./Order.js";

const DataTypes = Sequelize.DataTypes

const OrderDetail = db.define('order_details', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
})

Product.hasMany(OrderDetail);
OrderDetail.belongsTo(Product);

Order.hasMany(OrderDetail);
OrderDetail.belongsTo(Order);

export default OrderDetail;