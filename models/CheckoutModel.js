import Sequelize  from "sequelize";
import db from "../config/Database.js";
import Users from "./UserModel.js";
import CheckoutProducts from "./CheckoutProductsModel.js";
import Keranjangs from "./KeranjangModel.js";

const Datatypes = Sequelize.DataTypes

const Checkouts = db.define('checkout', {
    checkout_id:{
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
Users.hasMany(Checkouts)
Checkouts.belongsTo(Users)

Keranjangs.hasOne(Checkouts)
Checkouts.belongsTo(Keranjangs)

export default Checkouts