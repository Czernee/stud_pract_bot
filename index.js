const TelegramBot = require('node-telegram-bot-api')
const express = require('express')
require('dotenv/config.js')

const webAppUrl = process.env.WEB_APP_URL
const greeting = `🎉 Добро пожаловать в интернет-магазин электронной техники! Здесь вы найдете товары по самым лучшим ценам!`

const bot = new TelegramBot(process.env.TG_BOT_TOKEN, {polling: true}) 
const app = express()

app.use(express.json())

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
})

app.listen(process.env.PORT, () => console.log("Server has been started"))