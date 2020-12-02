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
            entities = await strapi.services.matches.search(ctx.query);
            } else {
            entities = await strapi.services.matches.find(ctx.query);
            }
        
            return entities.map(entity => sanitizeEntity(entity, { model: strapi.models.matches }));
        },
        async findOne(ctx) {
            const { id } = ctx.params;
            const entity = await strapi.services.matches.findOne({ id });
            return sanitizeEntity(entity, { model: strapi.models.matches });
        },

        async searchByResult(ctx){
            const { result } = ctx.params;
            const entity = await strapi.services.matches.search({ _q: `${result}`, _limit: -1});
            return sanitizeEntity(entity, { model: strapi.models.matches });
        },

        async countSearchByResult(ctx){
            const { result } = ctx.params;
            const entity = await strapi.query('matches').countSearch({ _q: `${result}` });
            return sanitizeEntity(entity, { model: strapi.models.matches });
        }
        
};
