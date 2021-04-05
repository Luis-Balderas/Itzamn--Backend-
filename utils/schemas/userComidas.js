const joi = require('@hapi/joi');

const { comidaIdSchema } = require('./comida');
const { userIdSchema }  = require('./users');

const userComidaIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/);

const createUserComidaSchema = {
    userId: userIdSchema,
    eventId: comidaIdSchema
};

module.exports = {
    userComidaIdSchema,
    createUserComidaSchema
}