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

// define bot commands
tb.start(ctx => {
    ctx.reply('Привіт! Я створений для того, щоб говорити тобі якісь пафосні цитати\n' + 
    'і цікаві факти про котів' +
    'Я нещодавно в Україні, цій прекрасній країні, тому ще не встиг досконало вивчити українську\n' +
    'Тому, на жаль, я буду писати тобі англійською');
}).catch(e => {
    console.log(`Error occured when try to start bot: ${e.message}`);
});

tb.action('info');
tb.command('info', ctx => {
    ctx.reply('yes, this is info');
});

// define error handling
tb.catch((e, ctx) => {
    console.log(`Error occured: ${e.message}`);
    console.log(`Wait some time: ${ctx.updateType}`);
});

// Fetch interesting answer
let catsFact;
axios.get('https://catfact.ninja/fact').then(respons => {
    catsFact = respons.data.fact;
});
let q;
axios.get('https://quotes15.p.rapidapi.com/quotes/random/', {
    headers: {
        'X-RapidAPI-Key': 'dc40d2b288msh88ced99c0191b37p144f83jsne853bb67a11f',
        'X-RapidAPIHost': 'quotes15.p.rapidapi.com'
    }
}).then(respons => {
    q = respons.data.content;
});

// define answer
let answer;

// defeine general answer
tb.hears(/[a-zA-Z0-9]/, ctx => {
    answer = parseInt(Math.random() * 2) > 0 ? catsFact : q;
    ctx.reply(answer);
    axios.get('https://catfact.ninja/fact').then(respons => {
        catsFact = respons.data.fact;
    });
    axios.get('https://quotes15.p.rapidapi.com/quotes/random/', {
    headers: {
        'X-RapidAPI-Key': 'dc40d2b288msh88ced99c0191b37p144f83jsne853bb67a11f',
        'X-RapidAPIHost': 'quotes15.p.rapidapi.com'
    }
    }).then(respons => {
        q = respons.data.content;
    });
}).catch(e => {
    console.log(`Error occured when try to handle input message: ${e.message}`);
});

// define GET server handler
app.get('/', (req, res) => {
    res.send('This site exists to serve my own Telegram Bot which I proud of');
});

// launch bot
app.listen(port, () => {
    console.log(`http://localhost:${port}`);
    tb.launch().catch(e => {
        console.log(`Error was occured when try to launch bot: ${e.message}`);
    })
});