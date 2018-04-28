/**
 * User对象与表的映射
 */
const seq = require('../db/connectDB');
let Menu = seq.sequelize.define(
    'menu',
    {
        id: {
            type: seq.Sequelize.STRING, // 字段类型
            allowNull: false,         // 是否允许为NULL
            primaryKey: true,
            unique: true
        },
        title: {
            type: seq.Sequelize.STRING,
            allowNull: true
        },
        location: {
            type: seq.Sequelize.STRING,
            allowNull: true
        },
        parentId: {
            type: seq.Sequelize.STRING,
            allowNull: true
        },
        type: {
            type: seq.Sequelize.STRING,
            allowNull: true
        },
        icon: {
            type: seq.Sequelize.STRING,
            allowNull: true
        }
    }
);

module.exports = Menu;