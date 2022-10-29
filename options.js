module.exports = {
     gameOptions:{
        reply_markup: JSON.stringify({ // Делаем JSON строку
        inline_keyboard: [ // Добовление кнопок
          [{text: '1', callback_data: '1'},{text: '2', callback_data: '2'},{text: '3', callback_data: '3'}],
          [{text: '4', callback_data: '4'},{text: '5', callback_data: '5'},{text: '6', callback_data: '6'}],
          [{text: '7', callback_data: '7'},{text: '8', callback_data: '8'},{text: '9', callback_data: '9'}],
      
          [{text: '0', callback_data: '0'}],
        ]
        })
      },
      
       againOptions:{ // Для запуска повтороной игры
        reply_markup: JSON.stringify({ // Делаем JSON строку
        inline_keyboard: [ // Копка выхода
         
          [{text: 'Играть еще раз', callback_data: '/again'}],
        ]
        })
      }
}