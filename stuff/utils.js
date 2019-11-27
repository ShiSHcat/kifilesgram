module.exports.login = (users,ctx)=>{
    
   if(users[ctx.message.from.id]) {
       return users[ctx.message.from.id];
   } else {
       return false;
   }
}
module.exports.random = (length)=>{
    var result           = '';
   var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
   var charactersLength = characters.length;
   for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}