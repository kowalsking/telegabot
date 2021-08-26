const { Telegraf } = require('telegraf')

const bot = new Telegraf('1895899439:AAGq3yivTVoApAG5NLAyddj_zUZBjbI3gxI') //bujigua_bot

bot.command('newyork', ctx => {
  bot.telegram.sendChatAction(ctx.chat.id, 'upload_photo')
  bot.telegram.sendPhoto(ctx.chat.id, 
    { source: 'img/1.jpg' },
    { reply_to_message_id: ctx.message.message_id }
  )
})

bot.command('cities', ctx => {
  bot.telegram.sendMediaGroup(ctx.chat.id, [
    {
      type: 'photo',
      media: { source: 'img/2.jpg'}
    },
    {
      type: 'photo',
      media: { source: 'img/4.jpg'}
    },
  ])
})

bot.command('citieslist', ctx => {
  bot.telegram.sendDocument(ctx.chat.id, {
    source: './bot.js' //should be some txt file
  }, 
  {
    thumb: { source: 'img/5.jpeg' }
  })
})

bot.command('singapore', ctx => {
  bot.telegram.sendLocation(ctx.chat.id, 1.3521, 103.8198)
})

bot.on('message', async ctx => {
  if (ctx.message.document) {
    let link = await bot.telegram.getFileLink(ctx.message.document.file_id)
    ctx.reply('Your download link: ' + link)
  }
})

bot.launch()