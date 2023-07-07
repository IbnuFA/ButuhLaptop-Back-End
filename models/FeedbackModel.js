import Sequelize from "sequelize";
import db from "../config/Database.js";

const Datatypes = Sequelize.DataTypes

const Feedbacks = db.define('feedback', {
    feedback_id:{
        type: Datatypes.STRING,
        defaultValue: Datatypes.UUIDV4,
        allowNull: false,
        validate:{
            notEmpty: true
        },
        primaryKey: true,
    },
    feedback:{
        type: Datatypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true,
        }
    },
    rate:{
        type: Datatypes.INTEGER,   
        allowNull: false,
        validate:{
            notEmpty: true,
        }
    },
}, {
    freezeTableName: true,
});

//Relasi Table 

export default Feedbacks