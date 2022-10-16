const { Directus } = require('@directus/sdk');
const { DirectusService } = require('./DirectusService');

/**
 *
 * @param {import('telegraf/typings').Telegraf} bot
 */
function openmesh(bot) {
  bot.hears('/openmesh', (ctx) => {
    let openmeshMensagem = `Ok. O que deseja fazer na categoria OPENMESH?`;
    ctx.deleteMessage();
    bot.telegram.sendMessage(ctx.chat.id, openmeshMensagem, {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: 'Consultar Openmesh',
              callback_data: 'consultar_openmesh',
            },
            {
              text: 'Cadastrar Openmesh',
              callback_data: 'cadastrar_openmesh',
            },
          ],
        ],
      },
    });

    //Consultar Aparelho
    bot.action('consultar_openmesh', (ctx) => {
      bot.telegram.sendMessage(ctx.chat.id, 'Digite o nome do Openmesh a ser consultado:');

      bot.on('text', async (ctx) => {
        //Pegar input do usario

        if (ctx.message.text.substring(0, 1) == 'C') {
          const comandoNumero = ctx.message.text.substring(1, 3);
          const directusService = new DirectusService(comandoNumero);
          const medidor = ctx.session.medidor;
          return directusService.enviarComando(medidor.id, comandoNumero);
        } else {
          const openmeshNome = ctx.message.text;
          const directusService = new DirectusService();
          const openmeshes = await directusService.listarOpenmeshesPorNome(openmeshNome);

          const inline_keyboard = [];
          openmeshes.data.forEach((openmesh) => {
            let texto = openmesh.nome;
            bot.action(texto, (ctx) => actionExibirDetalhesOpenmesh(ctx, bot, openmesh));

            inline_keyboard.push({
              text: texto,
              callback_data: texto,
            });
          });

          bot.telegram.sendMessage(ctx.chat.id, 'Especifique, por favor...', {
            reply_markup: { inline_keyboard: [inline_keyboard] },
          });
        }
      });

      const actionExibirDetalhesOpenmesh = async (ctx, bot, openmesh) => {
        ctx.session.openmesh = openmesh;
        try {
          bot.telegram.sendMessage(
            ctx.chat.id,
            '\n' +
              '🆔ID do Openmesh: ' +
              openmesh.id +
              '\n' +
              '📟Nome do OpenMesh: ' +
              openmesh.nome +
              '\n' +
              '🚦Status do OpenMesh: ' +
              openmesh.status +
              '\n' +
              '🏷Rótulo do OpenMesh: ' +
              openmesh.rotulo,
          );
          // Confirmar busca do aparelho
          let openmeshEscolhido = `O Openmesh buscado está correto?`;
          bot.telegram.sendMessage(ctx.chat.id, openmeshEscolhido, {
            reply_markup: {
              inline_keyboard: [
                [
                  {
                    text: 'SIM 👍',
                    callback_data: 'opcoes_openmesh',
                  },
                  {
                    text: 'NÃO 👎',
                    callback_data: 'consultar_openmesh',
                  },
                ],
              ],
            },
          });
        } catch (err) {
          ctx.reply('Encontramos um erro. Tente novamente.');
        }
      };
    });
  });

  // Menu de Opções Openmesh Encontrado.
  bot.action('opcoes_openmesh', (ctx) => {
    let openmeshMensagem = `Qual o próximo passo?`;

    bot.action('listar_openmeshes', (ctx) => listarOpenmeshes(ctx, bot));

    bot.telegram.sendMessage(ctx.chat.id, openmeshMensagem, {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: 'Listar Mensagens Recebidas',
              callback_data: 'listar_mensagens_recebidas',
            },
            {
              text: 'Listar Mensagens Enviadas',
              callback_data: 'listar_mensagens_enviadas',
            },
          ],
        ],
      },
    });
  });

  // Comando listar mensagens recebidas.
  bot.action('listar_mensagens_recebidas', async (ctx) => {
    const directusService = new DirectusService();
    const openmesh = ctx.session.openmesh;
    const correspondencias = await directusService.listarCorrespondenciasRecebidasPorNome(openmesh.id);

    ctx.session.openmesh = openmesh;
    try {
      correspondencias.data.forEach((correspondencia) => {
        bot.telegram.sendMessage(
          ctx.chat.id,
          '\n' +
            '📩Mensagem Recebida: ' +
            correspondencia.mensagem +
            '\n' +
            '🔘Status: ' +
            correspondencia.status +
            '\n' +
            '🆔ID da mensagem: ' +
            correspondencia.mensagem_id +
            '\n' +
            '📤Remetente: ' +
            correspondencia.remetente.nome +
            '\n' +
            '📆Data de recebimento: ' +
            correspondencia.date_created,
        );
      });
    } catch (err) {
      ctx.reply('Encontramos um erro. Tente novamente.');
    }
  });

  // Comando listar mensagens enviadas.
  bot.action('listar_mensagens_enviadas', async (ctx) => {
    const directusService = new DirectusService();
    const openmesh = ctx.session.openmesh;
    const correspondencias = await directusService.listarCorrespondenciasEnviadasPorNome(openmesh.id);

    ctx.session.openmesh = openmesh;
    try {
      correspondencias.data.forEach((correspondencia) => {
        bot.telegram.sendMessage(
          ctx.chat.id,
          '\n' +
            '📩Mensagem Enviada: ' +
            correspondencia.mensagem +
            '\n' +
            '🔘Status: ' +
            correspondencia.status +
            '\n' +
            '🆔ID da mensagem: ' +
            correspondencia.mensagem_id +
            '\n' +
            '📤Destinatário: ' +
            correspondencia.destinatario.nome +
            '\n' +
            '📆Data de envio: ' +
            correspondencia.date_created,
        );
      });
    } catch (err) {
      ctx.reply('Encontramos um erro. Tente novamente.');
    }
  });
}

module.exports = {
  openmesh,
};
