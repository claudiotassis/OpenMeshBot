const { Directus } = require("@directus/sdk");

class DirectusService {
  constructor() {
    this.directus = new Directus(process.env.OPENMESH_DIRECTUS_URL, {
      auth: { staticToken: process.env.OPENMESH_DIRECTUS_TOKEN },
    });
    this.medidorService = this.directus.items("medidor");
    this.canalService = this.directus.items("canal");
    this.correspondenciaService = this.directus.items("correspondencia");
    this.cortarService = this.directus.items("comando_cortar");
  }

  listarMedidoresPorNome(texto) {
    return this.medidorService.readByQuery({
      fields: [
        "nome",
        "rotulo",
        "status",
        "openmesh.nome",
        "openmesh.rotulo",
        "openmesh.status",
        "medidor.nome",
        "medidor.rotulo",
        "medidor.status",
      ],
      filter: { _and: [{ nome: { _icontains: texto } }] },
      limit: 5,
    });
  }
  listarCanaisPorNome(texto) {
    return this.canalService.readByQuery({
      fields: ["nome", "rotulo", "status"],
      filter: { _and: [{ nome: { _icontains: texto } }] },
      limit: 5,
    });
  }
  criarCorrespondencia(novaCorrespondencia) {
    return this.correspondenciaService.createOne({
      destinatario: novaCorrespondencia.destinatario,
      remetente: novaCorrespondencia.remetente,
      user_updated: null,
      user_created: "ef428c58-8b11-4c86-bd32-372e914e4dff",
      data_limite_entrega: null,
      date_updated: "2022-09-21T20:17:40.502Z",
      date_created: "2022-09-21T20:17:34.186Z",
      mensagem_id: "71043151",
      status: "enviado_recebimento_confirmado",
      mensagem:
        "20157929000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000E8FC",
    });
  }
<<<<<<< HEAD
  async cortar() {
    return await this.directus.items("comando_cortar").createOne({
      medidor: "8df898f3-5c15-49ac-ab33-32305582c9d0",
=======
  

  cortar(medidorId) {
    return this.directus.items("comando_cortar").createOne({
      medidor: medidorId,
>>>>>>> 1e483bd2d5845d4ce008daaf4e8861d09dadd9b6
    });
  }
}

module.exports = { DirectusService };
