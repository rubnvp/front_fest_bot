var TelegramBot = require('node-telegram-bot-api');
var config = require('./config.json');

// Setup polling way
var bot = new TelegramBot(config.token, {polling: true});

// Matches /echo [whatever]
bot.onText(/\/echo (.+)/, function (msg, match) {
  var fromId = msg.from.id;
  var resp = match[1];
  bot.sendMessage(fromId, resp);
});

// Matches /cat
bot.onText(/\/cat/, function (msg) {
  var chatId = msg.chat.id;
  var width = getRandomInt(100, 500);
  var height = getRandomInt(100, 500);
  var photo = `http://placekitten.com/${width}/${height}`;
  bot.sendPhoto(chatId, photo, {caption: 'meow!'});
});

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

var http = require('http')
var server = http.createServer(function(request, response) {
  response.end("Hi there! :)");
});
server.listen(process.env.PORT || 8080);
setInterval(function() {
    http.get("http://front-fest-bot.herokuapp.com");
}, 10 * 1000);