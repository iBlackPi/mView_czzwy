/**
 * User对象与表的映射
 */
const seq = require('../db/connectDB');
let User = seq.sequelize.define(
    'user',
    {
        id: {
            type: seq.Sequelize.STRING, // 字段类型
            allowNull: false,         // 是否允许为NULL
            primaryKey: true,
            unique: true
        },
        username: {
            type: seq.Sequelize.STRING,
            allowNull: true
        },
        password: {
            type: seq.Sequelize.STRING,
            allowNull: true
        }
    }
);

module.exports = User;