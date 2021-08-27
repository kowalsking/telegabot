const { Telegraf } = require('telegraf')

const bot = new Telegraf('1895899439:AAGq3yivTVoApAG5NLAyddj_zUZBjbI3gxI') //bujigua_bot

const axios = require('axios')
const fs = require('fs')

bot.command('test', ctx => {
  bot.telegram.sendMessage(ctx.chat.id, 'Welcome', {
    reply_markup: {
      inline_keyboard: [
        [
          { text: 'Click me', callback_data: 'one' }
        ]
      ]
    }
  })
})

bot.action('one', ctx => {
  ctx.answerCbQuery('Hellow!')
  ctx.reply('You clicked the button')
})

bot.launch()