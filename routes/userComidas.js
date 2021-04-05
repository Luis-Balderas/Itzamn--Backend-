const express = require('express');
const passport = require('passport');

const UserComidasService = require('../services/userComida');
const validationHandler = require('../utils/middleware/validationHandler');

const { comidaIdSchema } = require('../utils/schemas/comida');
const { userIdSchema } = require('../utils/schemas/users');
const { createUserComidaSchema } = require('../utils/schemas/userComidas');



require('../utils/auth/strategies/jwt');

function userComidasApi(app) {
    const router = express.Router();
    app.use('/api/user-Comidas', router);

    const userComidasService = new UserComidasService();

    router.get('/', 
    passport.authenticate('jwt', { session: false }),
    validationHandler({ userId: userIdSchema }, 'query'),
    async function(req, res, next) {
        const { userId } = req.query;

        try {
          const userComidas = await userComidasService.getUseComidas({ userId });

          res.status(200).json({
              data: userComidas,
              message: 'user comida listed'
          })
        } catch(error) {
            next(error);
        }
    }
  );

  router.post('/',
  passport.authenticate('jwt', { session: false }),
  validationHandler(createUserComidaSchema),  
  async function(req, res, next) {
    const { body: userComidas } = req;

    try {
      const createdUserComidaId = await userComidasService.createUserComida({
        userComidas
      });

      res.status(201).json({
        data: createdUserComidaId,
        message: 'user comida created'
      })
    } catch(err){
        next(err);
    }
  });

  router.delete('/:userComidaId', 
  passport.authenticate('jwt', { session: false }),
  validationHandler({ userComidaId: comidaIdSchema }, 'params'),
  async function(req, res, next) {
    const { userComidaId } = req.params;

    try {
      const deletedUserComidaId = await userComidasService.deleteUserComida({
        userComidaId
      });

      res.status(200).json({
        data: deletedUserComidaId,
        message: 'user comida deleted'
      })
    }catch(error) {
      next(error)
    }
  })
}

module.exports = userComidasApi;