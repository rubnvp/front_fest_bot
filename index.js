var TelegramBot = require('node-telegram-bot-api');

var TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN;
if (TELEGRAM_TOKEN === undefined) {
  console.error("Undefined TELEGRAM_TOKEN enviroment variable");
  process.exit();
}

// Setup polling way
var bot = new TelegramBot(TELEGRAM_TOKEN, {polling: true});

/* Commands spanish descriptions:
start - presenta al bot.
location - muestra la localización del evento.
cat - manda una foto de un gatito.
*/

// Start message
bot.onText(/^\/start$/, function (msg) {
  var fromId = msg.from.id;
  bot.sendMessage(fromId, "Hola, soy el bot del frontFest! Estaré encantado de responder tus preguntas sobre el evento.");
});

//Ask for event location
bot.onText(/^\/location$/, function (msg) {
  var chatId = msg.chat.id;
  latitude = '40.412664';
  longitude = '-3.718301';
  title = 'frontFest (Google Campus)';
  address = 'Calle Moreno Nieto, 2, 28005 Madrid, Spain';
  bot.sendVenue(chatId, latitude, longitude, title, address);
  bot.sendMessage(chatId, '(se accede por la entrada del auditorio)');
});

// Matches /cat
bot.onText(/^\/cat$/, function (msg) {
  var chatId = msg.chat.id;
  var width = getRandomInt(100, 500);
  var height = getRandomInt(100, 500);
  var photo = `http://placekitten.com/${width}/${height}`;
  bot.sendPhoto(chatId, photo, {caption: 'meow!'});
});

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// server to keep alive on heroku
var http = require('http');
var server = http.createServer(function(request, response) {
  response.end("Hi there! :)");
});
server.listen(process.env.PORT || 8080);