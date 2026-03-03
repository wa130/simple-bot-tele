import 'dotenv/config'
import TelegramBot from 'node-telegram-bot-api'

const token = process.env.TELE_TOKEN

async function startBot() {

    const bot = new TelegramBot(token, { polling: true })
    
    bot.onText(/\/start/, (msg) => {
        bot.sendMessage(msg.chat.id, "hellow brokk")
    })
}

startBot()