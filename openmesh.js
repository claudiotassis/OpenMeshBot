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
              "🚦status: " +
              openmesh.status +
              "\n" +
              "📟Nome: " +
              openmesh.nome +
              "\n" +
              "🏷Rótulo: " +
              openmesh.rotulo +
              "\n" +
              "OpenMesh: " +
              openmesh.openmesh.nome 
              
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

  /* Listar OpenMesh Ligados.
  const listarOpenmeshes = async (ctx, bot) => {
    const openmesh = ctx.session.openmesh;
    console.log(openmesh.nome);
    try {
      bot.telegram.sendMessage(
        ctx.chat.id,
        "\n" +
          "⚠Situação: " +
          profissional.plantoes.status +
          "\n" +
          "🆔ID: " +
          profissional.plantoes.id +
          "\n" +
          "👩‍⚕Profissional: " +
          profissional.plantoes.profissional.nome_social +
          "\n" +
          "♿Paciente: " +
          profissional.plantoes.paciente.nome_social +
          "\n" +
          "⏳Data/Hora Inicial: " +
          profissional.plantoes.inicio +
          "\n" +
          "⌛Data/Hora Final: " +
          profissional.plantoes.termino +
          "\n" +
          "📝Descrição: " +
          profissional.plantoes.descricao
      );
    } catch (err) {
      ctx.reply("Encontramos um erro. Tente novamente.");
    }
  };*/

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
              text: "Ligar",
              callback_data: "ligar_openmesh",
            },
            {
              text: "Desligar",
              callback_data: "desligar_openmesh",
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

  // Ligar OpenMesh Selecionado.
  bot.action("ligar_openmesh", (ctx) => {
    bot.telegram.sendMessage(
      ctx.chat.id,
      "Informe o período que o PROFISSIONAL estará indisponível:"
    );
  });








  
}

module.exports = {
  openmesh,
};
