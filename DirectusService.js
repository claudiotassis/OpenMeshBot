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
        "id",
        "nome",
        "rotulo",
        "status",
        "openmesh.nome",
        "openmesh.rotulo",
        "openmesh.status",
        "medidor.id",
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
  criarComando(medidorId) {
    return this.comandoService.createOne({
      
        destinatario: medidorId,
        remetente: "216f4aa5-10cd-4908-9333-807bc795c93a",
        status: "enviado_aguardando_confirmacao_recebimento",
        mensagem: "23157929000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000A8AD"
    });
  }

  

  async cortar() {
    return await this.directus.items("comando_cortar").createOne({
      medidor: "8df898f3-5c15-49ac-ab33-32305582c9d0",
    });
  }
  
}

module.exports = { DirectusService };
