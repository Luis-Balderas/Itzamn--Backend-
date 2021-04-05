const MongoLib = require('../lib/mongo');

class ComidasService {
  constructor() {
    this.collection = 'comidas';
    this.mongoDB = new MongoLib();
  }
  async getComidas({ tags }) {
    const query = tags && {
      tags: {
        $in: tags,
      },
    };
    const comidas = await this.mongoDB.getAll(this.collection, query);
    return comidas || [];
  }

  async getComida({ comidaId }) {
    const comida = await this.mongoDB.get(this.collection, comidaId);
    return comida || {};
  }

  async createComida({ comida }) {
    const newComida = {
      ...comida,
      createdAt: Date.now(),
    };
    const createComidaId = await this.mongoDB.create(this.collection, newComida);
    return createComidaId;
  }

  async updateComida({ comidaId, comida }) {
    const updatedComidaId = await this.mongoDB.update(
      this.collection,
      comidaId,
      comida
    );
    return updatedComidaId;
  }

  async deleteComida(comidaId) {
    const deletedComidaId = await this.mongoDB.delete(this.collection, comidaId);
    return deletedComidaId;
  }

  async filterComidas(comida) {
    const filterComida = await this.mongoDB.filterComidas(this.collection, comida);
    return filterComida;
  }

  async getComidasRecents() {
    const comidasRecents = await this.mongoDB.getComidasRecents(this.collection);
    return comidasRecents;
  }
}

module.exports = ComidasService;