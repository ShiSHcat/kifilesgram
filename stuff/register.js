const request = require('request');

module.exports = async (users,ctx)=>{
    var cmse = ctx.message.text.split(" ")[1];
    if(users[ctx.message.from.id]) {
         ctx.reply("You are alredy registered.");
         return;
    } else {
    request({
        url:'https://kifiles.gq/api/getId',
         headers:{
          'token': cmse
           }
    })
    .on('response', function(response,body) {
            if(response.statusCode == 200) {
                ctx.reply("Success! You can now post files using this client.")
              users[ctx.message.from.id] = cmse;
            } else {
                ctx.reply("Error.")
                return;
               
            }
        })
    .on("error", function(err){
        
      ctx.reply(`Error: ${err}`);
      return;
        })
    }
}