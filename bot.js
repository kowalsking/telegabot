const { Telegraf } = require('telegraf')

const bot = new Telegraf('1895899439:AAGq3yivTVoApAG5NLAyddj_zUZBjbI3gxI') //bujigua_bot

const axios = require('axios')
const fs = require('fs')

const apikey = '7712a525b44f22e9e26ce8400ddfd6c992fbb4a24d8accdd68c4c6845581baa2' // test key

bot.command('start', ctx => {
  let startMessage = `Welcome to cryptocurrency bot!`
  bot.telegram.sendMessage(ctx.chat.id, startMessage, {
    reply_markup: {
      inline_keyboard: [
        [ { text: 'Crypto Prices', callback_data: 'price' } ],
        [ { text: 'CoinMarketCap', url: 'https://www.cryptocompare.com/' } ]
      ]
    }
  })
})

bot.action('price', ctx => {
  const priceMessage = `Get price Information. Select one of the cryptocurrecnies below`
  ctx.deleteMessage()
  bot.telegram.sendMessage(ctx.chat.id, priceMessage, {
    reply_markup: {
      inline_keyboard: [
        [ 
          { text: 'BTC', callback_data: 'price-BTC' },
          { text: 'ETH', callback_data: 'price-ETH' }
        ],
        [ 
          { text: 'BCH', callback_data: 'price-BCH' },
          { text: 'LTC', callback_data: 'price-LTC' }
        ],
        [ { text: 'Back to Menu', callback_data: 'start' } ]
      ]
    }
  })
})

bot.launch()