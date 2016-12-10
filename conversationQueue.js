module.exports = {messages:[{
   message:'What is your weight?',
   end:false,
   end_point_callback:function(text) {
      console.log(text)
   }},{
   message:'What is your height?',
   end:false,
   end_point_callback:function(text) {
      console.log(text)
   }},{
   message:'What is your BMI?',
   end:true,
   end_point_callback:function(text,bot,message) {
      bot.reply(message,"Thank you for your response")
      console.log(text)
   }}
]}
