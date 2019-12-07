const tmpdir = require('os').tmpdir();
const request = require('request');
const utils = require("./utils")
const fs = require("fs")
const win = require("is-windows")()
const kif = require("./kifiles.js");
const mime = require("mime-types")
module.exports.doc = async(ctx,users)=>{
   var le = utils.login(users,ctx)
   if(!le) {
       ctx.reply("You cannot post stuff without kifiles token, please get one joining kifiles server and register it here using /login");
       return;
   }
   var url = await ctx.telegram.getFileLink( ctx.message.document.file_id ).catch(e=>{ctx.reply("failed")});
   if (win) var e = "\\";
    else var e = "/";
   var path = tmpdir+e+ctx.message.document.file_name;
   var pr = fs.createWriteStream(path)
   request(url).pipe(pr)
   pr.on("close",()=>{
     kif({
      path:path,
      fn:ctx.message.document.file_name,
      mime:ctx.message.document.mime_type,
      ctx:ctx,
      tkn:le })
    
    })

     
}
module.exports.vid = async(ctx,users)=>{
  var le = utils.login(users,ctx)
  if(!le) {
      ctx.reply("You cannot post stuff without kifiles token, please get one joining kifiles server and register it here using /login");
      return;
  }
  var url = await ctx.telegram.getFileLink( ctx.message.video.file_id ).catch(e=>{ctx.reply("failed")});
  if (win) var e = "\\";
   else var e = "/";
   var fna = url.split("/")[url.split("/").length-1]
  var path = tmpdir+e+fna;
  var pr = fs.createWriteStream(path)
  request(url).pipe(pr)
  pr.on("close",()=>{
    kif({
     path:path,
     fn:fna,
     mime:ctx.message.video.mime_type,
     ctx:ctx,
     tkn:le })
   
   })

    
}
module.exports.photo = async(ctx,users)=>{
  var le = utils.login(users,ctx)
  if(!le) {
      ctx.reply("You cannot post stuff without kifiles token, please get one joining kifiles server and register it here using /login");
      return;
  }
  var e_ = ctx.message.photo;
  var url = await ctx.telegram.getFileLink( e_[e_.length-1].file_id ).catch(e=>{ctx.reply("failed")});
  var g = utils.random(5);
  var fna = g+url.split("/")[url.split("/").length-1]
  if (win) var e = "\\";
   else var e = "/";
  
  var path = tmpdir+e+fna;
  var pr = fs.createWriteStream(path)
  request(url).pipe(pr)
  pr.on("close",()=>{
    kif({
     path:path,
     fn:fna,
     mime:mime.lookup(fna),
     ctx:ctx,
     tkn:le })
   
   })

    
}