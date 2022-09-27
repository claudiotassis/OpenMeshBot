const { Directus } = require("@directus/sdk");
const { DirectusService } = require("./DirectusService");

class Dados {
  _nome = "";
}

let dados = new Dados();

// OpenMesh
function openmesh(bot) {
  bot.hears("/openmesh", (ctx) => {
    console.log(ctx.from);
    let openmeshMensagem = `Ok. O que deseja fazer na categoria OPENMESH?`;
    ctx.deleteMessage();
    bot.telegram.sendMessage(ctx.chat.id, openmeshMensagem, {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "Consultar Aparelho(s)",
              callback_data: "consultar_openmesh",
            },
            {
              text: "Listar Aparelho(s) Ligados",
              callback_data: "listar_openmesh_ligados",
            },
            {
              text: "Cadastrar Aparelho(s)",
              callback_data: "cadastrar_openmesh",
            },
          ],
        ],
      },
    });

    //Consultar Aparelho
    bot.action("consultar_openmesh", (ctx) => {
      bot.telegram.sendMessage(
        ctx.chat.id,
        "Digite o nome do OpenMesh a ser consultado:"
      );

      bot.on("text", async (ctx) => {
        //Pegar input do usario
        const openmeshNome = ctx.message.text;

        const directusService = new DirectusService();

        const openmeshes = await directusService.listarOpenmeshesPorNome(
          openmeshNome
        );

        const inline_keyboard = [];
        openmeshes.data.forEach((openmesh) => {
          let texto = openmesh.nome;
          bot.action(texto,  (ctx) => actionExibirDetalhesOpenmesh(ctx, bot, openmesh)
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

      const actionExibirDetalhesOpenmesh = async (
        ctx,
        bot,
        openmesh,
        
      ) => {
        console.log(openmesh);
        ctx.session.openmesh = openmesh;
        try {
          bot.telegram.sendMessage(
            ctx.chat.id,            
            "\n" +
              "🖲Nome do OpenMesh: " +
              openmesh.openmesh.nome +
              "\n" +
              "📴Status do OpenMesh: " +
              openmesh.openmesh.status +
              "\n" +
              "🔖Rótulo do OpenMesh: " +
              openmesh.openmesh.rotulo +              
              "\n" +
              "📟Nome do Medidor: " +
              openmesh.nome +
              "\n" +
              "🚦Status do Medidor: " +
              openmesh.status +
              "\n" +
              "🏷Rótulo do Medidor: " +
              openmesh.rotulo 
              
              
          );
            // Confirmar busca do aparelho
          let openmeshEscolhido = `O OpenMesh buscado está correto?`;          
          bot.telegram.sendMessage(ctx.chat.id, openmeshEscolhido, {
            reply_markup: {
              inline_keyboard: [
                [
                  {
                    text: "SIM 👍",
                    callback_data: "opcoes_openmesh",
                  },
                  {
                    text: "NÃO 👎",
                    callback_data: "consultar_openmesh",
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

  
  // Menu de Opções OpenMesh Encontrado.
  bot.action("opcoes_openmesh", (ctx) => {
    console.log(ctx.from);
    let openmeshMensagem = `Qual o próximo passo?`;
    
    bot.action("listar_Openmeshes", (ctx) => listarOpenmeshes(ctx, bot));

    bot.telegram.sendMessage(ctx.chat.id, openmeshMensagem, {
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
              callback_data: "comandos_openmesh",
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
              callback_data: "consultar_openmesh",
            },
          ],
        ],
      },
    });
  });

  // Comando Ligar.
  bot.action("ligar_medidor", (ctx) => {
    bot.telegram.sendMessage(
      ctx.chat.id,
      "Informe o Nome do MEDIDOR a ser ligado:"
    );
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
  openmesh,
};
