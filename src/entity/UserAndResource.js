/**
 * User对象与表的映射
 */
const seq = require('../db/connectDB');
let UserAndResource = seq.sequelize.define(
    'user_and_resource',
    {
        id: {
            type: seq.Sequelize.STRING, // 字段类型
            allowNull: false,         // 是否允许为NULL
            primaryKey: true,
            unique: true
        },
        userid: {
            type: seq.Sequelize.STRING,
            allowNull: true
        },
        resourceid: {
            type: seq.Sequelize.STRING,
            allowNull: true
        }
    }
);

module.exports = UserAndResource;