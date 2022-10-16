const { Directus } = require('@directus/sdk');

class DirectusService {
  constructor(comandoNumero) {

    this.directus = new Directus(process.env.OPENMESH_DIRECTUS_URL, {
      auth: { staticToken: process.env.OPENMESH_DIRECTUS_TOKEN },
    });
    this.medidorService = this.directus.items('medidor');
    this.openmeshService = this.directus.items('openmesh');
    this.canalService = this.directus.items('canal');
    this.correspondenciaService = this.directus.items('correspondencia');
    this.cortarService = this.directus.items('comando_cortar');
    this.ligarService = this.directus.items('comando_ligar');
    this.comandoService = this.directus.items('comando' + comandoNumero);
  }

  listarMedidoresPorNome(texto) {
    return this.medidorService.readByQuery({
      fields: [
        'id',
        'nome',
        'rotulo',
        'status',
        'openmesh.nome',
        'openmesh.rotulo',
        'openmesh.status',
        
      ],
      filter: { _and: [{ nome: { _icontains: texto } }] },
      limit: 5,
    });
  }

  listarOpenmeshesPorNome(texto) {    
    return this.openmeshService.readByQuery({
      fields: [
        'id',
        'nome',
        'rotulo',
        'status',
        'openmesh.nome',
        'openmesh.rotulo',
        'openmesh.status',
        
      ],
      filter: { _and: [{ nome: { _icontains: texto } }] },
      limit: 5,
    });    
  }

  listarCorrespondenciasRecebidasPorNome(id) {
    return this.correspondenciaService.readByQuery({
      fields: [
        'date_created',
        'destinatario',
        'destinatario.nome',
        'remetente',
        'remetente.nome',
        'status',
        'mensagem',
        'canais',
        'resposta_payload',
        'destinatario.status',
        'correspondencia.status',
        'mensagem_id',
        
      ],
      filter: { _and: [{ destinatario: {id: { _eq: id }}}] },
      limit: 5,
    });
  }

  listarCorrespondenciasEnviadasPorNome(id) {
    return this.correspondenciaService.readByQuery({
      fields: [
        'date_created',
        'destinatario',
        'destinatario.nome',
        'remetente',
        'remetente.nome',
        'status',
        'mensagem',
        'canais',
        'resposta_payload',
        'destinatario.status',
        'correspondencia.status',
        'mensagem_id',
        
      ],
      filter: { _and: [{ remetente: {id: { _eq: id }}}] },
      limit: 5,
    });
  }

  listarCanaisPorNome(texto) {
    return this.canalService.readByQuery({
      fields: ['nome', 'rotulo', 'status'],
      filter: { _and: [{ nome: { _icontains: texto } }] },
      limit: 5,
    });
  }
  
  /**
   * 
   * @param {import('@directus/sdk/dist').ID} medidorId
   * @returns 
   */
  async enviarComando(medidorId, comandoNumero) {
    
    return this.directus.items('comando' + comandoNumero).createOne({
      medidor: medidorId,
    });
  }

  /**
   * 
   * @param {import('@directus/sdk/dist').ID} medidorId
   * @returns 
   */
  async cortar(medidorId) {
    return this.directus.items('comando_cortar').createOne({
      medidor: medidorId,
      
    });
  }

  /**
   * 
   * @param {import('@directus/sdk/dist').ID} medidorId
   * @returns 
   */
   async ligar(medidorId) {
    return this.directus.items('comando_ligar').createOne({
      medidor: medidorId,
      
      
    });
  }
}

module.exports = { DirectusService };
