const {Sequelize} = require('sequelize')

module.exports = new Sequelize(

'', // Имя базы данных
'', // Логин
'',  // Пароль от базы
{
        host: '', // Хост
        port: '', // Порт
        dialect: 'mysql' // База
}
)

