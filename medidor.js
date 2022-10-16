const { Directus } = require('@directus/sdk');
const { DirectusService } = require('./DirectusService');
var textEvent = '';
/**
 *
 * @param {import('telegraf/typings').Telegraf} bot
 */
function medidor(bot) {
  bot.hears('/medidor', (ctx) => {
    let medidorMensagem = `Ok. O que deseja fazer na categoria MEDIDOR?`;
    ctx.deleteMessage();
    bot.telegram.sendMessage(ctx.chat.id, medidorMensagem, {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: 'Consultar Medidor',
              callback_data: 'consultar_medidor',
            },
            {
              text: 'Cadastrar Medidor',
              callback_data: 'cadastrar_medidor',
            },
          ],
        ],
      },
    });

    //Consultar Aparelho
    bot.action('consultar_medidor', (ctx) => {
      bot.telegram.sendMessage(ctx.chat.id, 'Digite o nome do Medidor a ser consultado:');
      textEvent = 'consultar_medidor';
      bot.on('text', async (ctx) => {
        //Pegar input do usario

        
        if (textEvent == 'comandos_medidor'){
          const comandoNumero = ctx.message.text; 
          const directusService = new DirectusService(comandoNumero);
          const medidor = ctx.session.medidor;
          const returnMessage = await directusService.enviarComando(medidor.id, comandoNumero);
          console.log(returnMessage);
          const link = "<a href='https://sistema.openmesh.com.br/admin/content/comando21/" 
                       + returnMessage.id +"'>Clique para abrir a mensagem</a>";
          await bot.telegram.sendMessage(chat_id=ctx.chat.id, text=link, { parse_mode: 'HTML' })
          return returnMessage;
        } else {
          const medidorNome = ctx.message.text;
          const directusService = new DirectusService();
          const medidores = await directusService.listarMedidoresPorNome(medidorNome);

          const inline_keyboard = [];
          medidores.data.forEach((medidor) => {
            let texto = medidor.nome;
            bot.action(texto, (ctx) => actionExibirDetalhesMedidor(ctx, bot, medidor));

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

      const actionExibirDetalhesMedidor = async (ctx, bot, medidor) => {
        ctx.session.medidor = medidor;
        try {
          bot.telegram.sendMessage(
            ctx.chat.id,
            '\n' +
              '🆔ID do Medidor: ' +
              medidor.id +
              '\n' +
              '🖲Nome do Medidor: ' +
              medidor.nome +
              '\n' +
              '📴Status do Medidor: ' +
              medidor.status +
              '\n' +
              '🔖Rótulo do Medidor: ' +
              medidor.rotulo +
              '\n' +
              '📟Nome do OpenMesh: ' +
              medidor.openmesh.nome +
              '\n' +
              '🚦Status do OpenMesh: ' +
              medidor.openmesh.status +
              '\n' +
              '🏷Rótulo do OpenMesh: ' +
              medidor.openmesh.rotulo,
              
          );
          // Confirmar busca do aparelho
          let medidorEscolhido = `O Medidor buscado está correto?`;
          bot.telegram.sendMessage(ctx.chat.id, medidorEscolhido, {
            reply_markup: {
              inline_keyboard: [
                [
                  {
                    text: 'SIM 👍',
                    callback_data: 'opcoes_medidor',
                  },
                  {
                    text: 'NÃO 👎',
                    callback_data: 'consultar_medidor',
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

  // Menu de Opções medidor Encontrado.
  bot.action('opcoes_medidor', (ctx) => {
    let medidorMensagem = `Qual o próximo passo?`;

    bot.action('listar_medidores', (ctx) => listarMedidores(ctx, bot));

    bot.telegram.sendMessage(ctx.chat.id, medidorMensagem, {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: 'Ligar Medidor',
              callback_data: 'Ligar',
            },
            {
              text: 'Cortar Medidor',
              callback_data: 'comando_cortar',
            },
          ],
          [
            {
              text: 'Outro Comando',
              callback_data: 'comandos_medidor',
            },
            {
              text: 'Nova Busca',
              callback_data: 'consultar_medidor',
            },            
          ],          
        ],
      },
    });
  });

  
  // Comando Ligar.
  bot.action('Ligar', async (ctx) => {
    const directusService = new DirectusService();
    const medidor = ctx.session.medidor;    
    return directusService.ligar(medidor.id);
  });

  // Comando Cortar.
  bot.action('comando_cortar', (ctx) => {
    const directusService = new DirectusService();
    const medidor = ctx.session.medidor;
    return directusService.cortar(medidor.id);
  });

  // Outros Comandos por Medidor ID.
  bot.action('comandos_medidor', (ctx) => {
    bot.telegram.sendMessage(ctx.chat.id, 'Digite o número do comando:');       
    textEvent = 'comandos_medidor';
    
  });
}

module.exports = {
  medidor,
};
