const TelegramApi = require('node-telegram-bot-api')
const {gameOptions, againOptions} = require('./options') // Импорт файла options.js
const sequelize = require('./db');
const UserModel = require('./modoles');


const token = '' //токен telegram

const bot = new TelegramApi(token, {polling: true})

const chats = {}



const startGame = async (chatId) => { // Логика игры
  await bot.sendMessage(chatId, `Сейчас я загадываю цифру от 0 до 9, а ты должен ее угадать!`)
  const rundomNumber = Math.floor(Math.random() * 10) // Получаем рандомную цифру от 0 до 10. floor -  ее округляет
  chats[chatId] = rundomNumber;
  await bot.sendMessage(chatId, 'Отгадывай', gameOptions);
}

const start = async () => {

  try {
    await sequelize.authenticate()
    await sequelize.sync()
  } catch(e) {
    console.log('Подключение к бд сломалось',  e)
  }

  bot.setMyCommands ([ // Меню предложенное пользователю
  {command:'/start',  description: 'Начальное приветствие'},
  {command:'/info',  description: 'Получить информацию о пользователе'},
  {command:'/game',  description: 'Игра угадай цифру'},
])

bot.on('message', async msg => {
  const text =msg.text;
  const chatId = msg.chat.id;

  try { // Делаем в try что бы ошибка выводилась в консоль
  if(text === "/start") { 
    await bot.sendSticker(chatId, 'https://tlgrm.ru/_/stickers/ea5/382/ea53826d-c192-376a-b766-e5abc535f1c9/2.jpg') // Отправка стикера
      bot.sendMessage(chatId, 'Добро пожаловать в телеграмм бот');
      }
      if (text === '/info') { 
          const user =  await UserModel.findOne({chatId}) // Делаем поиск по id в базе данных и выводим количество правильных и не правильных ответов
    return bot.sendMessage(chatId, `Тебя зовут ${msg.from.first_name}, в игре у тебя правильных ответов ${user.right}, неправельных ${user.wrong}`);
     }
     if (text === '/game') {    // Игра 
       return startGame(chatId);

     }
return bot.sendMessage(chatId, 'Я тебя не понимаю попробуй еще раз!)') // Сообщение если написана команда которой нет в коде
  } catch (e) { //  Вывод ошибки в консоль
    return bot.sendMessage(chatId, 'Произошла какая, то ошибочка!')
  } 


  
})

bot.on('callback_query', async msg => {
  const data = msg.data; // Получаем цифру
  const chatId = msg.message.chat.id;
  if(data === '/again') { // Для запуска повтороной игры
        return startGame(chatId)
  }

  const user = await UserModel.findOne({chatId}) // Ищем из бд пользователя по id чата
  if(data == chats[chatId]) {
    user.right += 1; // Увеличиваем на единицу right(Количество побед)
    await bot.sendMessage(chatId, `Поздравляю, ты отгадал цифру ${chats[chatId]}`, againOptions) // againOptions - кнопка выхода
  } else {
    user.wrong += 1; // Увеличиваем на единицу wrong(Количество порожний)
    await  bot.sendMessage(chatId, `К сожалению ты не угадал, бот загадал цифру ${chats[chatId]}`, againOptions) // againOptions - кнопка выхода
  }




  await user.save(); // Сохраняем user в базу
})
}

start()