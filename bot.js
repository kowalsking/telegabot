const { Telegraf } = require('telegraf')

const bot = new Telegraf('1895899439:AAGq3yivTVoApAG5NLAyddj_zUZBjbI3gxI') //bujigua_bot

const axios = require('axios')
const fs = require('fs')

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

bot.command('dogbreeds', ctx => {
  const rawdata = fs.readFileSync('dogbreeds.json', 'utf8')
  let data = JSON.parse(rawdata)
  console.log(data)
  let message = 'Dog Breeds: \n'
  data.forEach(item => {
    message += `-${item}\n`
  })

  ctx.reply(message)
})

bot.launch()