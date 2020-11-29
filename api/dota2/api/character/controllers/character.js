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
            entities = await strapi.services.character.search(ctx.query);
            } else {
            entities = await strapi.services.character.find(ctx.query);
            }
        
            return entities.map(entity => sanitizeEntity(entity, { model: strapi.models.character }));
        },
    
    async findOneByName(ctx) {
        const { name } = ctx.params;
        const entities = await strapi.query('character').model.find({'displayName' : name});
        return sanitizeEntity(entities, { model: strapi.models.character });
        },

};
