const TelegramBot = require('node-telegram-bot-api')
const express = require('express')
require('dotenv/config.js')

const webAppUrl = process.env.WEB_APP_URL
const greeting = `🎉 Добро пожаловать в интернет-магазин электронной техники! Здесь вы найдете товары по самым лучшим ценам!`

const bot = new TelegramBot(process.env.TG_BOT_TOKEN, {polling: true}) 
const app = express()

app.use(express.json())

let products = []
let totalSum = 0
let customerFCS = ''
let customerPhone = ''
let customerPickUpPoint = ''

bot.on('message', async (msg) => {
  const chatId = msg.chat.id
  const text = msg.text

  if (text == '/start') {
    console.log(`Новый пользователь: Имя: ${msg.chat.first_name}, Ник: ${msg.chat.username}, Айди: ${msg.chat.id} `)
    await bot.sendMessage(chatId, greeting, {
      reply_markup: {
        resize_keyboard: true,
        keyboard: [
          [{text: "Сделать заказ", web_app: {url: webAppUrl}}]
        ]
      }
    })
  }

  if (msg?.web_app_data?.button_text == "Сделать заказ") {
    try {
      const data = JSON.parse(msg?.web_app_data?.data)
      let date = new Date()
      products = data.products
      totalSum = data.totalPrice

      await bot.sendMessage(chatId, 
      `MTS.KCHR - Ваш заказ
      \n${date.toLocaleDateString() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()} - Вы оформили заказ
      ${showCart(data)}`, {
        reply_markup: {
          inline_keyboard: [
            [{text: "Продолжить", callback_data: 'botContinue'}], 
            [{text: "Очистить корзину", callback_data: 'cartClean'}]
          ]
        }
      }
    )
    } catch (e) {
      bot.sendMessage(chatId, `Не удалось получить данные.\nОшибка: ${e.message}. Попробуйте перезапустить бота командой /start`)
    }
  } else if (msg?.web_app_data?.button_text == "Заполнить форму") {
    try {
      const data = JSON.parse(msg?.web_app_data?.data)
      customerFCS = data?.name
      customerPhone = data?.phoneNumber
      customerPickUpPoint = data?.PickUpPoint

      await bot.sendMessage(chatId, 
        `Спасибо за обратную связь!
        \nВаше имя: ${data?.name}
        \nВаш номер телефона: ${data?.phoneNumber}
        \nВаш пункт выдачи: ${data?.pickUpPoint}`)

        const invoiceItems = products.map(product => ({
          label: product.title,
          amount: product.price * 100
        }))

        await bot.sendInvoice(chatId, 'Покупка', 'Оплата заказа', 'payload', process.env.PAYMENT_TOKEN, 
          'RUB', invoiceItems,
          {
          need_name: false,
          need_phone_number: false,
          is_flexible: false,
          need_shipping_address: false,
          }) 

          await bot.sendMessage(chatId, 'Если вдруг вы сделали ошибку в форме, то можете заполнить ее заново ⬇️')
    } catch (e) {
      console.log(e)
      bot.sendMessage(chatId, `Не удалось получить данные.\nОшибка: ${e.message}. Попробуйте перезапустить бота командой /start`)
    }
  }
})

app.listen(process.env.PORT, () => console.log("Server has been started"))