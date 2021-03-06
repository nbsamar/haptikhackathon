var conservationQueue = require('./conversationQueue')
var apiParams = require('./api_params').params
var buttonUtil = require('./create_buttons_util')

module.exports = function(bot,controller) {

  var startConversation = function(bot,message,apiParams) {
    var conservationQueue = require('./conversationQueue')(apiParams)
    var messages = conservationQueue.messages
    bot.startConversation(message,(err,convo)=>{
        if(err == null) {
           messages.forEach((messageObj)=>{
              convo.ask(messageObj.message,(response,convo)=>{
                 bot.startTyping(message,()=>{

                 })
                 messageObj.end_point_callback(response.text,bot,message)
                 if(messageObj.end) {
                    convo.task.endImmediately()
                 }
                 else {
                   convo.next()
                 }
              })
           })
        }
    })
  }
  var pregnancyMap = {
    'Yeah':function(bot,message) {
          apiParams.Pregnancies = 1
          startConversation(bot,message,apiParams)
      },
    "Ain't Pregnant":function(bot,message) {
         apiParams.Pregnancies = 0
         startConversation(bot,message,apiParams)
    }

  }
  var genderMap = {
    'Female':function(bot,message) {
            bot.reply(message,'we need specific details')
            buttonUtil.createButtonsFromJson(bot,message,controller,'Are you Pregnant?',pregnancyMap)
      },
    'Male':function(bot,message) {
            apiParams.Pregnancies = 0
            console.log('male')
            startConversation(bot,message,apiParams)
      }
  }
  var genderMenuHandler = (bot,message,controller)=>{
      buttonUtil.createButtonsFromJson(bot,message,controller,'What is your gender?',genderMap)
  }
    var menuUtil = {menu_reply_map:{
      'Yes':function(bot,message){
            bot.reply(message,'No issues we are there for you we will recommend you relevant exercise ,diet and medicine :B')
            genderMenuHandler(bot,message,controller)
        },
      'No':function(bot,message) {
          bot.reply(message,'Fine then nothing to worry :D :D')
        },
      'Uncertain': function(bot,message) {
          bot.reply(message,'We need some specific details to determine whether you are diabetic')
          genderMenuHandler(bot,message,controller)
        }
      }


    }
    return menuUtil
}
