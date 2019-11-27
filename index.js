const Telegraf = require('telegraf');
const config = require("./config.js")
const tg =require("./stuff/telegram");
const kf = require("./stuff/kifiles")
const rg = require("./stuff/register.js")
const bot = new Telegraf(config.bottoken)
var users = {};
bot.on("document",async(ctx)=>tg.doc(ctx,users))
bot.on("photo",async(ctx)=>await tg.photo(ctx,users))
bot.on("video",(ctx)=>tg.vid(ctx,users))
bot.command("login",async(ctx)=>rg(users,ctx))
bot.launch(config.bottoken)