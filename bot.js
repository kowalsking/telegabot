const { Telegraf } = require('telegraf')

const bot = new Telegraf('1895899439:AAGq3yivTVoApAG5NLAyddj_zUZBjbI3gxI') //bujigua_bot

const axios = require('axios')
const fs = require('fs')

const apikey = '7712a525b44f22e9e26ce8400ddfd6c992fbb4a24d8accdd68c4c6845581baa2' // test key

bot.command('start', ctx => {
  sendStartMessage(ctx)
})

bot.action('start', ctx => {
  ctx.deleteMessage()
  sendStartMessage(ctx)
})

function sendStartMessage (ctx) {
  let startMessage = `Welcome to cryptocurrency bot!`
  bot.telegram.sendMessage(ctx.chat.id, startMessage, {
    reply_markup: {
      inline_keyboard: [
        [ { text: 'Crypto Prices', callback_data: 'price' } ],
        [ { text: 'CoinMarketCap', url: 'https://www.cryptocompare.com/' } ]
      ]
    }
  })
}

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

const priceActionList = ['price-BTC', 'price-ETH', 'price-LTC', 'price-BCH']

bot.action(priceActionList, async ctx => {
  const symbol = ctx.match[0].split('-')[1]
  bot.telegram.sendMessage(ctx.chat.id, symbol)
  try {
    const res = await axios.get(`https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${symbol}&tsyms=USD&api_key=${apikey}`)
    const data = res.data.DISPLAY[symbol].USD
    console.log(data)

    let message = `
Symbol: ${symbol}   ${data.FROMSYMBOL}
Price: ${data.PRICE}
Open: ${data.OPENDAY}
Hight: ${data.HIGHTDAY}
Low: ${data.LOWDAY}
Supply: ${data.SUPPLY}
Market Cap: ${data.MKTCAP}
`
ctx.deleteMessage()
bot.telegram.sendMessage(ctx.chat.id, message, {
  reply_markup: {
    inline_keyboard: [
      [
        { text: 'Back to price', callback_data: 'price' }
      ]
    ]
  }
})
  } catch (err) {
    console.log(err)
    ctx.reply('Error Encountered')
  }
})

bot.command('info', ctx => {
  bot.telegram.sendMessage(ctx.chat.id, 'Bot info', {
    reply_markup: {
      keyboard: [
        [ 
          { text: 'Credits' },
          { text: 'API' },
        ]
      ],
      resize_keyboard: true,
      one_time_keyboard: true
    }
  })
})

bot.launch()