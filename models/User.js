import db from "../config/Database.js";
import Sequelize  from "sequelize";

const Datatypes = Sequelize.DataTypes

const User = db.define('users', {
    uuid:{
        type: Datatypes.STRING,
        defaultValue: Datatypes.UUIDV4,
        allowNull: false,
        validate:{
            notEmpty: true
        },
        primaryKey: true,
    },
    first_name: {
        type: Datatypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true,
            len: [3, 30]
        }
    },
    last_name:{
        type: Datatypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true,
            len: [3, 100]
        }
    },
    email:{
        type: Datatypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true,
            isEmail: true
        }
    },
    password:{
        type: Datatypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true,
        }
    },
    role:{
        type: Datatypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true,
        }
    },
    address: {
        type: Datatypes.STRING,
        allowNull: true,
        validate:{
            notEmpty: true,
        }
    },
    postal_code: {
        type: Datatypes.INTEGER,
        allowNull: false,
        validate:{
            notEmpty: true,
        }
    },
    province_id: {
        type: Datatypes.INTEGER,
        allowNull: false,
        validate:{
            notEmpty: true,
        }
    },
    province: {
        type: Datatypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true,
        }
    },
    city_id: {
        type: Datatypes.INTEGER,
        allowNull: false,
        validate:{
            notEmpty: true,
        }
    },
    city: {
        type: Datatypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true,
        }
    },
});

export default User;