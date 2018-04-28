/**
 * 连接数据库 返回sequelize构造及数据库实例
 * 数据库：mysql
 */
const Sequelize = require('sequelize');
const sequelize = new Sequelize('mview', 'root', '20101111zhlj', {
    host : '127.0.0.1',
    port : '3306',
    dialect : 'mysql',
    define: {
        timestamps: false,
        'freezeTableName': true,
        autoIncrement: true
    }
});
module.exports = {
    sequelize,
    Sequelize
};

