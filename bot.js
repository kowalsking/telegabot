const { Telegraf } = require('telegraf')

const bot = new Telegraf('1895899439:AAGq3yivTVoApAG5NLAyddj_zUZBjbI3gxI') //bujigua_bot

const axios = require('axios')
const fs = require('fs')

const api_key = '7712a525b44f22e9e26ce8400ddfd6c992fbb4a24d8accdd68c4c6845581baa2' // test key
bot.launch()