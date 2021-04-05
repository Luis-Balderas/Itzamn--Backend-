const MongoLib = require('../lib/mongo');


class UserResetasService {
    constructor() {
        this.collection = 'user-comidas';
        this.mongoDB = new MongoLib();
    }

    async getUseComidas({ userId }) {
      const query = userId && { userId };
      const userComidas = await this.mongoDB.getAll(this.collection, query);

      return userComidas || [];
    }

    async createUserComida({ userComida }) {
      const createdUserComidaId = await this.mongoDB.create(this.collection, userComida);
      
      return createdUserComidaId;
    }

    async deleteUserComida({ userComidaId }) {
        const deletedUserComidaId = await this.mongoDB.delete(this.collection, userComidaId);

        return deletedUserComidaId;
    } 
}

module.exports = UserResetasService;