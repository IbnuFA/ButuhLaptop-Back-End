import Sequelize  from "sequelize";
import db from "../config/Database.js";

const Datatypes = Sequelize.DataTypes

const User = db.define('user', {
    uuid:{
        type: Datatypes.STRING,
        defaultValue: Datatypes.UUIDV4,
        allowNull: false,
        validate:{
            notEmpty: true
        },
        primaryKey: true,
    },
    first_name:{
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
});

export default User;