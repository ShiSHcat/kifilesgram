const request = require('request');
const fs = require("fs");
module.exports = async(data)=>{
  if(!data) return;
    var ctx = data.ctx;
    var path = data.path;

    var fn = data.fn;
    var mime = data.mime;
    var kft = data.tkn;
    const formData = {
        f: {
          value:  fs.createReadStream(path),
          options: {
            filename: fn,
            contentType: mime
          }
        }
      };
      request.post({
          url:'https://kifiles.gq/api/upload',
           formData: formData,
           headers:{
            'Authorization': 'Bearer '+kft
             }
    }, function optionalCallback(err, httpResponse, body) {
        if (err) {
           // fs.unlinkSync(path)
          return ctx.reply('Upload failed.');

        }
       // fs.unlinkSync(path)
        try{
          ctx.reply(JSON.parse(body).url);
       } catch {
        return ctx.reply("Upload failed.  Reason:"+body);
       }
       
      });
}
