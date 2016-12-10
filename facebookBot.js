var Botkit = require('botkit')
var config = require('./config')

var controller = Botkit.facebookbot(config.tokens)
var bot = controller.spawn({})
var conservationQueue = require('./conversationQueue')
var messages = conservationQueue.messages
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
console.log(Object.keys(menuReplyMap).map((menu)=>{
  return {type:'postback',title:menu,payload:menu}
}));


controller.hears(['hello','hi','hey'],'message_received',(bot,message)=>{
  bot.startTyping(message,()=>{

  })
    buttonUtil.createButtonsFromJson(bot,message,controller,'Are you Diabetic?',menuReplyMap)
})

controller.hears(['Help'],'message_received',(bot,message)=>{
    bot.startTyping(message,()=>{

    })
    bot.startConversation(message,(err,convo)=>{
        console.log(convo)
        if(err == null) {
           convo.say("Let's check how fit you are")
           messages.forEach((messageObj)=>{
              convo.ask(messageObj.message,(response,convo)=>{
                 bot.startTyping(message,()=>{

                 })
                 if(messageObj.end) {
                    messageObj.end_point_callback(response.text,bot,message)
                    convo.task.endImmediately()
                 }
                 else {
                   messageObj.end_point_callback(response.text)
                   convo.next()
                 }
              })
           })
        }
    })
})
