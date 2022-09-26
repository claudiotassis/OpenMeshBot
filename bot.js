const openmesh = require("./openmesh.js");
const Telegraf = require("telegraf");
const { Directus } = require("@directus/sdk");
const session = require("telegraf/session");

//iniciar bot
require("dotenv").config();
const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);
bot.use(session());
let ok = false;
let usuarios = ["392424600", "5608585570", "683112823"];

bot.start((content) => {
  //Buscar USERID
  const from = content.update.message.from;
  const usuario = usuarios.find((element) => element == from.id);
  if (usuario == from.id) {
    ok = true;
  }

  if (ok) {
    // MENU
    content.reply(`Olá, ${from.first_name}!`);
    content.reply("Selecione no MENU a opção desejada:");

    //OpenMesh
    openmesh.openmesh(bot);

    // Canal
    //paciente.paciente(bot);

    // Correspondência
    //cliente.cliente(bot);
  } else {
    content.reply(`Usuário não autorizado!`);
  }
});

bot.startPolling();
