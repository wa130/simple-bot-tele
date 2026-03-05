import "dotenv/config";
import TelegramBot from "node-telegram-bot-api";
import {
    register,
    cekUser,
    listUser,
    totalUser
   } from "./lib/register.js";

const token = process.env.TELE_TOKEN;

async function startBot() {
  const bot = new TelegramBot(token, { polling: true });

  bot.on("message", (msg) => {
    const text = msg.text;
    const chatId = msg.chat.id;


    const prefix = "/";
    const isCmd = text.startsWith(prefix);
    const cuy = text.slice(1).trim();
    const args = cuy.split(" ");
    const command = args.shift().toLowerCase();


    if (!isCmd) return;

    switch (command) {
      case "start":
        {
          const menuUtama = `
                Halo Saya adalah bot monitoring dashboard sederhana
                `;
          bot.sendPhoto(
            msg.chat.id,
            "https://myprof.pages.dev/assets/img/logo.png",
            {
              caption: menuUtama,
              parse_mode: "HTML",
              reply_markup: {
                inline_keyboard: [[{ text: "klik me", callback_data: "me" }]],
              },
            },
          );

          bot.on("callback_query", (query) => {
            switch (query.data) {
              case "me":
                {
                  bot.editMessageCaption("halo ini saya Nasyuwa", {
                    chat_id: query.message.chat.id,
                    message_id: query.message.message_id,
                    reply_markup: {
                      inline_keyboard: [
                        [{ text: "kembali", callback_data: "kembali" }],
                      ],
                    },
                  });
                }
                break;

              case "kembali":
                {
                  bot.editMessageCaption(menuUtama, {
                    chat_id: query.message.chat.id,
                    message_id: query.message.message_id,
                    reply_markup: {
                      inline_keyboard: [
                        [
                          {
                            text: "klik me",
                            callback_data: "me",
                          },
                        ],
                      ],
                    },
                  });
                }
                break;

              default:
                break;
            }
          });
        }
        break;

      case "register":
        {
            if (!args[0]) {
                const cek = cekUser(msg.from.id); 

                if (cek === true) {
                    bot.sendMessage(chatId, 'nama wajib di isi!')
                    return true
                } else {
                    bot.sendMessage(chatId, 'anda sudah kedaftar brokkk!')
                    return false
                }
            }

          const name = args[0];
          const reg = register(name, msg.from.id)
        
          if (reg === true) {
            bot.sendMessage(
              chatId,
              `berhasil terdaftar\n\nname : ${name}\nid : ${msg.from.id}`,
            );
          } else {
            bot.sendMessage(
              chatId,
              "maaf terjadi kesalahan, gagal saat mendaftar",
            );
          }
        
        }
        break;

      case 'listuser': {
        const list = listUser()
        const listNama = list.map((n, i) => `${i+1}. ${n}`).join('\n')
        const total = totalUser()
        

        bot.sendMessage(chatId,
           `[  List User  ]\n\nTotal user :  ${total}\n\n${listNama}`,
          
        )
      }
      break

      case "tes":
        {
          bot.sendMessage(chatId, "testing berhasil");
        }
        break;

      default:
        break;
    }
  });
}

startBot();
