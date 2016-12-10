var Botkit = require('botkit')
var config = require('./config')

var controller = Botkit.facebookbot(config.tokens)
var bot = controller.spawn({})

var menuUtil = require('./menu_util')(bot,controller)
var menuReplyMap = menuUtil.menu_reply_map
var buttonUtil = require('./create_buttons_util')
controller.setupWebserver(config.port,(err,webserver)=>{
    if(err == null) {
      controller.createWebhookEndpoints(controller.webserver,bot,()=>{
          console.log("server is online")
      })
    }
})
controller.api.thread_settings.greeting('Welcome to pipey diabetic assistant')
controller.hears(['hello','hi','hey'],'message_received',(bot,message)=>{
  bot.startTyping(message,()=>{

  })
    buttonUtil.createButtonsFromJson(bot,message,controller,'Are you Diabetic?',menuReplyMap)
})
