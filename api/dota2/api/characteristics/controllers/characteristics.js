'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */
const { sanitizeEntity } = require('strapi-utils');

module.exports = {

    async find(ctx){
        let entities;
        
        ctx.query = {
            ...ctx.query,
            _limit: -1
            };
         
        if (ctx.query._q) {
            entities = await strapi.services.characteristics.search(ctx.query);
            } else {
            entities = await strapi.services.characteristics.find(ctx.query);
            }
        
            return entities.map(entity => sanitizeEntity(entity, { model: strapi.models.characteristics }));
        },
    
    async findOne(ctx) {
        const { id } = ctx.params;
        const entity = await strapi.services.characteristics.findOne({ id });
        return sanitizeEntity(entity, { model: strapi.models.characteristics });
        },
    
    async findOneByName(ctx) {
        const { Hero } = ctx.params;
        const entities = await strapi.query('characteristics').model.find({'Hero' : Hero});
        return sanitizeEntity(entities, { model: strapi.models.characteristics });
        },

};
