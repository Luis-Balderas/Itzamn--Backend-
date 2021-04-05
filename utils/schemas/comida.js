const joi = require('@hapi/joi');

const comidaIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/);

const comidaNombreSchema = joi.string().max(80);
const comidaImagSchema = joi.array().items(joi.string());
const comidaOrigenSchema = joi.string().max(750);
const comidaIngredientesSchema = joi.string().max(250);
const comidaPrecedimientoSchema = joi.string().max(2500)
const comidaCreatedAt = joi.date();

const createComidaSchema = {
  nombre:  comidaNombreSchema.required(),
  images: comidaImagSchema,
  origen:  comidaOrigenSchema,
  Prcedimiento: comidaPrecedimientoSchema,
  ingredientes: comidaIngredientesSchema,
  createdAt: comidaCreatedAt,
};

const updateComidaSchema = {
  nombre:  comidaNombreSchema,
  images: comidaImagSchema,
  origen:  comidaOrigenSchema,
  Prcedimiento: comidaPrecedimientoSchema,
  ingredientes: comidaIngredientesSchema,
};

module.exports = {
  comidaIdSchema,
  createComidaSchema,
  updateComidaSchema
};