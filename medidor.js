const { Directus } = require("@directus/sdk");
const { DirectusService } = require("./DirectusService");
const { ligar } = require('./comandos/ligar')

// OpenMesh
function medidor(bot) {
  bot.hears("/medidor", (ctx) => {
    console.log(ctx.from);
    let medidorMensagem = `Ok. O que deseja fazer na categoria MEDIDOR?`;
    ctx.deleteMessage();
    bot.telegram.sendMessage(ctx.chat.id, medidorMensagem, {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "Consultar Medidor",
              callback_data: "consultar_medidor",
            },
            {
              text: "Cadastrar Medidor",
              callback_data: "cadastrar_medidor",
            },
          ],
        ],
      },
    });

    //Consultar Aparelho
    bot.action("consultar_medidor", (ctx) => {
      bot.telegram.sendMessage(
        ctx.chat.id,
        "Digite o nome do Medidor a ser consultado:"
      );

      bot.on("text", async (ctx) => {
        //Pegar input do usario
        const medidorNome = ctx.message.text;

        const directusService = new DirectusService();

        const medidores = await directusService.listarMedidoresPorNome(
          medidorNome
        );

        const inline_keyboard = [];
        medidores.data.forEach((medidor) => {
          let texto = medidor.nome;
          bot.action(texto,  (ctx) => actionExibirDetalhesMedidor(ctx, bot, medidor)
          );

          inline_keyboard.push({
            text: texto,
            callback_data: texto,
          });
        });

        bot.telegram.sendMessage(ctx.chat.id, "Especifique, por favor...", {
          reply_markup: { inline_keyboard: [inline_keyboard] },
        });
      });

      const actionExibirDetalhesMedidor = async (
        ctx,
        bot,
        medidor,
        
      ) => {
        console.log(medidor);
        ctx.session.medidor = medidor;
        try {
          bot.telegram.sendMessage(
            ctx.chat.id,            
            "\n" +
              "🖲Nome do Medidor: " +
              medidor.nome +
              "\n" +
              "📴Status do Medidor: " +
              medidor.status +
              "\n" +
              "🔖Rótulo do Medidor: " +
              medidor.rotulo +            
              "\n" +
              "📟Nome do Medidor: " +
              medidor.openmesh.nome +
              "\n" +
              "🚦Status do Medidor: " +
              medidor.openmesh.status +
              "\n" +
              "🏷Rótulo do Medidor: " +
              medidor.openmesh.rotulo 
              
              
          );
            // Confirmar busca do aparelho
          let medidorEscolhido = `O Medidor buscado está correto?`;          
          bot.telegram.sendMessage(ctx.chat.id, medidorEscolhido, {
            reply_markup: {
              inline_keyboard: [
                [
                  {
                    text: "SIM 👍",
                    callback_data: "opcoes_medidor",
                  },
                  {
                    text: "NÃO 👎",
                    callback_data: "consultar_medidor",
                  },
                ],
              ],
            },
          });
        } catch (err) {
          ctx.reply("Encontramos um erro. Tente novamente.");
        }
      };
    });

    
    
  });

  
  // Menu de Opções medidor Encontrado.
  bot.action("opcoes_medidor", (ctx) => {
    console.log(ctx.from);
    let medidorMensagem = `Qual o próximo passo?`;
    
    bot.action("listar_medidores", (ctx) => listarMedidores(ctx, bot));

    bot.telegram.sendMessage(ctx.chat.id, medidorMensagem, {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "Ligar Medidor",
              callback_data: "ligar_medidor",
            },
            {
              text: "Cortar Medidor",
              callback_data: "desligar_medidor",
            },
          ],
          [
            {
              text: "Outro Comando",
              callback_data: "comandos_medidor",
            },
            {
              text: "Listar Mensagens Enviadas",
              callback_data: "listar_mensagens_enviadas",
            },
          ],
          [
            {
              text: "Listar Mensagens Recebidas",
              callback_data: "listar_mensagens_recebidas",
            },
            {
              text: "Nova Busca",
              callback_data: "consultar_medidor",
            },
          ],
        ],
      },
    });
  });

  // Comando Ligar.
  bot.action("ligar_medidor", (ctx) => {bot.telegram.sendMessage(ctx.chat.id,"Informe o Nome do MEDIDOR a ser ligado:");
    ligar.ligar(bot);
  });

  // Comando Cortar.
  bot.action("cortar_medidor", (ctx) => {
    bot.telegram.sendMessage(
      ctx.chat.id,
      "Informe o Nome do MEDIDOR a ser cortado:"
    );
  });







  
}

module.exports = {
  medidor,
};