// all packages init
const express = require('express');
const { Telegraf } = require('telegraf');
const axios = require('axios');

// define port
const port = process.env.PORT || 7000;

// server definition
const app = express();

// define middleware
app.use(express.static('static'));

// create bot
const tb = new Telegraf('5920614032:AAHP9b8SiOpOGoTD9I1RZBBOeVyuqllGZHk');

//define start command
tb.command('start', ctx => {
    tb.telegram.sendMessage(ctx.chat.id, 
        'Привіт! Я створений для того, щоб говорити тобі якісь пафосні цитати і цікаві факти про котів\n' + 
        'Я нещодавно в Україні, цій прекрасній країні, тому ще не встиг досконало вивчити українську\n' + 
        'Тому, на жаль, я буду писати тобі англійською');
});

// define GET server handler
app.get('/', (req, res) => {
    res.send('This site exists to serve my own Telegram Bot which I proud of');
});

// launch bot
tb.launch();