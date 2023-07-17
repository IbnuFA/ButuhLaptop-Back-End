import Sequelize  from "sequelize";
import db from "../config/Database.js";
import Cart  from "./CartModel.js";
import User from "./UserModel.js";
// import Users from "./UserModel.js";


const Datatypes = Sequelize.DataTypes

export const Checkout = db.define('checkout', {
    id:{
        type: Datatypes.STRING,
        defaultValue: Datatypes.UUIDV4,
        allowNull: false,
        validate:{
            notEmpty: true
        },
        primaryKey: true,
    },
    status:{
        type: Datatypes.CHAR,
        allowNull: false,
        validate:{
            notEmpty: true,
        }
    },
}, {
    freezeTableName: true,
});

//Relasi Table 
Cart.hasOne(Checkout);
Checkout.belongsTo(Cart);

//Relasi User
User.hasMany(Checkout);
Checkout.belongsTo(User)

export default Checkout;