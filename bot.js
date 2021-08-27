const { Telegraf } = require('telegraf')

const bot = new Telegraf('1895899439:AAGq3yivTVoApAG5NLAyddj_zUZBjbI3gxI') //bujigua_bot

const axios = require('axios')
const fs = require('fs')

bot.command('test', ctx => {
  bot.telegram.sendMessage(ctx.chat.id, 'Menu', {
    reply_markup: {
      inline_keyboard: [
        [
          { text: 'See Fruits List', callback_data: 'fruits' }
        ],
        [
          { text: 'See Meats List', callback_data: 'meats' }
        ],
      ]
    }
  })
})

bot.action('fruits', ctx => {
  ctx.deleteMessage()
  bot.telegram.sendMessage(ctx.chat.id, 'List of fruits:\n-Apples\n-Oranges\n-Pears', {
    reply_markup: {
      inline_keyboard: [
        [
          { text: 'Back to menu', callback_data: 'menu' }
        ]
      ]
    }
  })
})

bot.action('menu', ctx => {
  ctx.deleteMessage()
  bot.telegram.sendMessage(ctx.chat.id, 'Menu', {
    reply_markup: {
      inline_keyboard: [
        [
          { text: 'See Fruits List', callback_data: 'fruits' }
        ],
        [
          { text: 'See Meats List', callback_data: 'meats' }
        ],
      ]
    }
  })
})

bot.launch()