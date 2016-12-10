
var util = {}
util.createButtonsFromJson = function(bot,message,controller,question,jsonObj) {
  var attachment = {
        'type':'template',
        'payload':{
            'template_type':'generic',
            'elements':[
                {
                    'title':question,
                    'buttons':Object.keys(jsonObj).map(function(menu){
                      return {"type":"postback","title":menu,"payload":menu}
                    })
                },
            ]
        }
    }

  //controller.api.thread_settings.menu()
  bot.reply(message,{attachment:attachment})
  Object.keys(jsonObj).forEach(function(menu){
      var cb = jsonObj[menu]
      console.log(cb.toString())
      controller.hears([menu],'facebook_postback',cb)
      console.log(jsonObj[menu])
  })
  console.log(jsonObj)
  //console.log(attachment)
}
module.exports = util
