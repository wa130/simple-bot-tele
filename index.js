import 'dotenv/config'
import TelegramBot from 'node-telegram-bot-api'

const token = process.env.TELE_TOKEN

async function startBot() {

    const bot = new TelegramBot(token, { polling: true })
    
    bot.onText(/\/start/, (msg) => {
        bot.sendMessage(msg.chat.id, "hellow brokk")
    })

    bot.on('message', (msg) => {
        const text = msg.text

        const prefix = '/'
        const isCmd = text.startsWith(prefix)
        const cuy = text.slice(1).trim()
        const args = cuy.split(" ")
        const command = args.shift().toLowerCase()

        if (!isCmd) return

        switch (command) {
            case 'tes':
                bot.sendMessage(msg.chat.id, 'testing berhasil')
                break;
        
            default:
                break;
        }
    })

}

startBot()