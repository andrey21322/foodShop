const express = require('express');
const TelegramBot = require('node-telegram-bot-api');
const cors = require('cors');

const botToken = '5979091454:AAGNNiZ720PZxGMOVjOgcB03l3Zem3pcdPQ';
const bot = new TelegramBot(botToken, { polling: true });

const app = express();
const port = 3001;

app.use(express.json());
app.use(cors())
app.post('/sendData', (req, res) => {
  const data = req.body;

  const chatId = '411745931';
  const message = JSON.stringify(data);
  bot.sendMessage(chatId, message);

  res.send('Data sent to Telegram');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
