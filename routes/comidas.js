const express = require('express');
const passport = require('passport');
const ComidasService = require('../services/comida');

const {
  comidaIdSchema,
  createComidaSchema,
  updateComidaSchema
} = require('../utils/schemas/comida');

const validationHandler = require('../utils/middleware/validationHandler');

require('../utils/auth/strategies/jwt');

function comidasApi(app) {
  const router = express.Router();
  app.use('/api/comidas', router);

  const comidasService = new ComidasService();

  router.get('/', async function (req, res, next) {
    const { tags } = req.query;
    try {
      const comidas = await comidasService.getComidas({
        tags,
      });

      res.status(200).json({
        data: comidas,
        message: 'Comida listed',
      });
    } catch (err) {
      next(err);
    }
  });

  router.get('/search', async function (req, res, next) {
    try {
      const comida = await comidasService.filterComidas(req.query);
      res.status(200).json({
        data: comida,
        message: 'filtro',
      });
    } catch (err) {
      next(err);
    }
  });

  router.get('/recents', async function (req, res, next) {
    try {
      const comida = await comidasService.getComidasRecents();
      res.status(200).json({
        data: comida,
        message: 'recents',
      });
    } catch (err) {
      next(err);
    }
  });

  router.get(
    '/:comidaId',
    validationHandler( { comidaId: comidaIdSchema,}, 'params'),
    async function (req, res, next) {
      const { comidaId } = req.params;
      try {
        const comida = await comidasService.getComida({
          comidaId,
        });

        res.status(200).json({
          data: comida,
          message: 'Comida retrieve',
        });
      } catch (err) {
        next(err);
      }
    }
  );

  router.post(
    '/',
    async function (req, res, next) {
      const { body: comida } = req;
      try {
        const createdComidaId = await comidasService.createComida({
          comida,
        });

        res.status(200).json({
          data: createdComidaId,
          message: 'Comida created',
        });
      } catch (err) {
        next(err);
      }
    }
  );

  router.put(
    '/:comidaId',
    passport.authenticate('jwt', {
      session: false,
    }),
    validationHandler( { comidaId:comidaIdSchema,},'params'),
    validationHandler(updateComidaSchema),
    async function (req, res, next) {
      const { body: comida } = req;
      const { comidaId } = req.params;
      try {
        const updatedComidaId = await comidasService.updateComida({
          comidaId,
          comida,
        });

        res.status(200).json({
          data: updatedComidaId,
          message: 'Comida updated',
        });
      } catch (err) {
        next(err);
      }
    }
  );

  router.delete(
    '/:comidaId',
    passport.authenticate('jwt', {
      session: false,
    }),
    validationHandler({comidaId: comidaIdSchema,}, 'params'),
    async function (req, res, next) {
      const { comidaId } = req.params;
      try {
        const deletedComidaId = await comidasService.deleteComida({
          comidaId,
        });

        res.status(200).json({
          data: deletedComidaId,
          message: 'Comida deleted',
        });
      } catch (err) {
        next(err);
      }
    }
  );
}

module.exports = comidasApi;