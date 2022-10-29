const sequelize = require('./db');
const {DataTypes} = require('sequelize');

const User = sequelize.define('user', { 
    id: {type: DataTypes.INTEGER, primaryKey: true, unique: true, autoIncrement: true}, // Делаем id  в базе
    chatId: {type: DataTypes.STRING, unique: true}, // Делаем id уникальным
    right: {type: DataTypes.INTEGER, defaultValue: 0}, // Количество правильных ответов
    wrong: {type: DataTypes.INTEGER, defaultValue: 0}, // Количество не правильных ответов

})


module.exports = User; //Создаем таблицу
