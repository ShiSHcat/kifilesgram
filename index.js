const Telegraf = require('telegraf');
const config = require("./config.js")
const tg =require("./stuff/telegram");
const kf = require("./stuff/kifiles")
const rg = require("./stuff/register.js")
const bot = new Telegraf(config.bottoken)
const a = require("./stuff/info.js");
var users = {};
bot.on("document",async(ctx)=>try{tg.doc(ctx,users)}catch(){})
bot.on("photo",async(ctx)=>try{await tg.photo(ctx,users)}catch(){})
bot.on("video",(ctx)=>try{tg.vid(ctx,users)}catch(){})
bot.command("login",async(ctx)=>try{rg(users,ctx)}catch(){})
bot.command("start",a.start)
bot.launch(config.bottoken)
