import Boom from "@hapi/boom";
import { IdSpec, CountyArraySpec, CountySpec, CountySpecPlus } from "../models/joi-schemas.js";
import { db } from "../models/db.js";
import { validationError } from "./logger.js";

export const countyApi = {
  find: {
    auth: false,
    handler: async function (request, h) {
      try {
        const counties = await db.countyStore.getAllCounties();
        return counties;
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    response: { schema: CountyArraySpec, failAction: validationError },
    description: "Get all Counties",
    notes: "Returns all Counties",
  },

  findOne: {
    auth: false,
    async handler(request) {
      try {
        const county = await db.countyStore.getCountyById(request.params.id);
        if (!county) {
          return Boom.notFound("No County with this id");
        }
        return county;
      } catch (err) {
        return Boom.serverUnavailable("No County with this id");
      }
    },
    tags: ["api"],
    description: "Find a County",
    notes: "Returns a County",
    validate: { params: { id: IdSpec }, failAction: validationError },
    response: { schema: CountySpecPlus, failAction: validationError },
  },

  create: {
    auth: false,
    handler: async function (request, h) {
      try {
        const county = request.payload;
        const newCounty = await db.countyStore.addCounty(county);
        if (newCounty) {
          return h.response(newCounty).code(201);
        }
        return Boom.badImplementation("error creating County");
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Create a County",
    notes: "Returns the newly created County",
    validate: { payload: CountySpec, failAction: validationError },
    response: { schema: CountySpecPlus, failAction: validationError },
  },

  deleteOne: {
    auth: false,
    handler: async function (request, h) {
      try {
        const county = await db.countyStore.getCountyById(request.params.id);
        if (!county) {
          return Boom.notFound("No County with this id");
        }
        await db.countyStore.deleteCountyById(county._id);
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("No County with this id");
      }
    },
    tags: ["api"],
    description: "Delete a County",
    validate: { params: { id: IdSpec }, failAction: validationError },
  },

  deleteAll: {
    auth: false,
    handler: async function (request, h) {
      try {
        await db.countyStore.deleteAllCounties();
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Delete all countyApi",
  },
};
