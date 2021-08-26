const { Telegraf } = require('telegraf')

const bot = new Telegraf('1895899439:AAGq3yivTVoApAG5NLAyddj_zUZBjbI3gxI') //bujigua_bot

const axios = require('axios')

bot.command('fortune', ctx => {
  axios.get('http://yerkee.com/api/fortune')
  .then(res => {
    console.log(res)
    ctx.reply(res.data.fortune)
  }).catch(e => {
    console.log(e)
  })
})

bot.launch()