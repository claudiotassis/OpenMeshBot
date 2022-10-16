const medidor = require('./medidor.js');
const openmesh = require('./openmesh.js');
const Telegraf = require('telegraf');
const { Directus } = require('@directus/sdk');
const session = require('telegraf/session');

//iniciar bot
require('dotenv').config();

/**
 * @type {import('telegraf/typings').Telegraf}
 */
const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

bot.use(session());
const usuarios = JSON.parse(process.env.TELEGRAM_BOT_USUARIOS);
bot.start((ctx) => {
  
  //Buscar USERID
  const from = ctx.update.message.from;
  const usuario = usuarios.find((element) => {
    return element === String(from.id);
  });

  if (!usuario) {
    ctx.reply(`Usuário não autorizado`);
    console.log(`Usuário não autorizado = ${JSON.stringify(from)}`);
    return;
  }

  // MENU
  ctx.reply(`Olá, ${from.first_name}!`);
  ctx.reply('Selecione no MENU a opção desejada:');

  //Medidor
  medidor.medidor(bot);

  //Openmesh
  openmesh.openmesh(bot);
});

bot.startPolling();
