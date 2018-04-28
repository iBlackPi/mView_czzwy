/**
 * User对象与表的映射
 */
const seq = require('../db/connectDB');
let User = seq.sequelize.define(
    'api',
    {
        id: {
            type: seq.Sequelize.STRING, // 字段类型
            allowNull: false,         // 是否允许为NULL
            primaryKey: true,
            unique: true
        },
        apiname: {
            type: seq.Sequelize.STRING,
            allowNull: true
        },
        apisrc: {
            type: seq.Sequelize.STRING,
            allowNull: true
        },
        apidesc: {
            type: seq.Sequelize.STRING,
            allowNull: true
        }
    }
);

module.exports = User;