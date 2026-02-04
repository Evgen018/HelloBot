require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');

const token = process.env.BOT_TOKEN;
if (!token) {
  console.error('Ошибка: BOT_TOKEN не задан в .env');
  process.exit(1);
}

const bot = new TelegramBot(token, { polling: true });

const isRussian = (text) => /[\u0400-\u04FF]/.test(text);

const russianGreetings = ['Привет, я бот!', 'Здравствуйте, я бот!'];
const englishGreeting = "Hello, I'm a bot!";

bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text || '';
  const reply = isRussian(text)
    ? russianGreetings[Math.floor(Math.random() * russianGreetings.length)]
    : englishGreeting;
  bot.sendMessage(chatId, reply);
});

console.log('Бот запущен. Ожидаю сообщения...');
