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

bot.command('cat', async ctx => {
  let input = ctx.message.text
  let inputArray = input.split(' ')

  // '/cat'
  if (inputArray.length == 1) {
    let res = await axios.get('https://aws.random.cat/meow')
    ctx.replyWithPhoto(res.data.file)
  } else {
    inputArray.shift()
    input = inputArray.join(' ')
    ctx.replyWithPhoto(`https://cataas.com/cat/says/${input}`)
  }
})

bot.launch()