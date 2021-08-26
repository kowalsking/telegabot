const { Telegraf } = require('telegraf')

const bot = new Telegraf('1895899439:AAGq3yivTVoApAG5NLAyddj_zUZBjbI3gxI') //bujigua_bot

const axios = require('axios')
const fs = require('fs')

const helpMessage = 
`
*Simple API Bot*
/fortune - get a fortune cookie
/cat - get a random cat pic
/cat \`<text>\` - get cat image with text
/dogbreeds - get a list of dog breeds
/dog \`<breed>\` - get image of dog breed
`

bot.help(ctx => {
  // ctx.reply(helpMessage)
  bot.telegram.sendMessage(ctx.from.id, helpMessage, {
    parse_mode: 'Markdown'

  })
})

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

bot.command('dog', ctx => {
  const input = ctx.message.text.split(' ')
  if (input.length !== 2) {
    ctx.reply('You must give a dog breed as the second argument')
    return
  }
  const breedInput = input[1]

  const rawdata = fs.readFileSync('dogbreeds.json', 'utf8')
  let data = JSON.parse(rawdata)

  if (data.includes(breedInput)) {
    axios.get(`https://dog.ceo/api/breed/${breedInput}/images/random`)
    .then(res => {
      ctx.replyWithPhoto(res.data.message)
    }).catch(e => {
      console.log(e)
    })
  } else {
    let suggestions = data.filter(item => {
      return item.startsWith(breedInput)
    })
    let message = `Did you meand:
`
    suggestions.forEach(item => {
      message += `-${item}
`
    })

    if (suggestions.length === 0) {
      ctx.reply('Cannot find breed')
    } else {
      ctx.reply(message)
    }
  }
})

bot.launch()