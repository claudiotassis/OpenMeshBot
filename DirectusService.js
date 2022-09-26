const { Directus } = require('@directus/sdk');

class DirectusService {
  constructor() {
    this.directus = new Directus(process.env.OPENMESH_DIRECTUS_URL, {
      auth: { staticToken: process.env.OPENMESH_DIRECTUS_TOKEN },
    });
    this.openmeshService = this.directus.items('openmesh'),
    this.canalService = this.directus.items('canal');
    this.correspondenciaService = this.directus.items('correspondencia');
    
  }

  listarOpenmeshesPorNome(texto) {
    return this.openmeshService.readByQuery({
      fields: [
        'nome',
        'rotulo',
        'status',
        
        
      ],
      filter: { _and: [{ nome: { _icontains: texto } } ] },
      limit: 5,
    });
  }
  listarCanaisPorNome(texto) {
    return this.canalService.readByQuery({
      fields: [
        'nome',
        'rotulo',
        'status',           
        
      ],
      filter: { _and: [{ nome: { _icontains: texto } } ] },
      limit: 5,
    });
  }
  listarCorrespondenciasPorNome(texto) {
    return this.correspondenciaService.readByQuery({
      fields: [
        'canais',
        'rotulo',
        'status',
        'remetente', 
        'destinatario',
        'mensagem', 
        'total_copias',
        'data_limite_entrega',
        'resposta_payload',  
        'resposta_conteudo',           
        
      ],
      filter: { _and: [{ nome: { _icontains: texto } } ] },
      limit: 5,
    });
  }

  ligarOpenmeshPorNome(texto) {
    this.openmeshService.createMany();
    return this.openmeshService.createMany({
      fields: [
        'status', 
        'remetente',
        'destinatario',
        'destinatario',
        'destinatario',
        'destinatario',
        'destinatario',
        'destinatario',
        'destinatario',
        
  
  
      ],
      filter: { _and: [{ nome_social: { _icontains: texto } }] },
      limit: 10,
    });
  }
}

module.exports = { DirectusService };
