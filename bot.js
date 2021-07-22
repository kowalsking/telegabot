const { Telegraf } = require('telegraf')

const bot = new Telegraf('1895899439:AAGq3yivTVoApAG5NLAyddj_zUZBjbI3gxI') //bujigua_bot

const helpMessage = `
  Say something to me
  /start - start the bot
  /help - command reference
`

bot.use((ctx, next) => {
  console.log(ctx.message.sticker)
  // if (ctx.updateSubTypes[0] === 'text') {
  //   console.log(ctx.from.username + ' said ' + ctx.message.text)
  // } else {
  //   console.log(ctx.from.username + ' sent ' + ctx.updateSubTypes[0]);
  // }
  next()
})

bot.start(ctx => {
  ctx.reply('Hello epta')
  ctx.reply(helpMessage)
})

bot.help(ctx => {
  ctx.reply(helpMessage)
})

bot.command('echo', ctx => {
  let input = ctx.message.text
  let inputArray = input.split(' ')
  if (inputArray.length === 1) return ctx.reply('You said /echo')

  inputArray.shift()
  const message = inputArray.join(' ')
  ctx.reply(message)
})

bot.launch()