import Sequelize  from "sequelize";
import db from "../config/Database.js";
import Checkouts from "./CheckoutModel.js";
import Products from "./ProductModel.js";

const Datatypes = Sequelize.DataTypes

const CheckoutProducts = db.define('checkoutProducts', {
    checkoutProducts_id:{
        type: Datatypes.STRING,
        defaultValue: Datatypes.UUIDV4,
        allowNull: false,
        validate:{
            notEmpty: true
        },
        primaryKey: true,
    },
    checkout_id:{
        type: Datatypes.INTEGER,   
        allowNull: false,
        validate:{
            notEmpty: true,
        }
    },
    product_id:{
        type: Datatypes.INTEGER,   
        allowNull: false,
        validate:{
            notEmpty: true,
        }
    },
    payment_status:{
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

export default CheckoutProducts