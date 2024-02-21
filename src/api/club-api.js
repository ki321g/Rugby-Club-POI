import Boom from "@hapi/boom";
import { db } from "../models/db.js";
import { IdSpec, ClubSpec, ClubSpecPlus, ClubArraySpec  } from "../models/joi-schemas.js";
import { validationError } from "./logger.js";

export const clubApi = {
  find: {
    auth: false,
    handler: async function (request, h) {
      try {
        const clubs = await db.clubStore.getAllClubs();
        return clubs;
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    response: { schema: ClubArraySpec, failAction: validationError },
    description: "Get all clubApi",
    notes: "Returns all clubApi",
  },

  findOne: {
    auth: false,
    async handler(request) {
      try {
        const club = await db.clubStore.getClubById(request.params.id);
        if (!club) {
          return Boom.notFound("No club with this id");
        }
        return club;
      } catch (err) {
        return Boom.serverUnavailable("No club with this id");
      }
    },
    tags: ["api"],
    description: "Find a CLub",
    notes: "Returns a Club",
    validate: { params: { id: IdSpec }, failAction: validationError },
    response: { schema: ClubSpecPlus, failAction: validationError },
  },

  create: {
    auth: false,
    handler: async function (request, h) {
      try {
        const club = await db.clubStore.addClub(request.params.id, request.payload);
        if (club) {
          return h.response(club).code(201);
        }
        return Boom.badImplementation("error creating club");
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Create a Club",
    notes: "Returns the newly created club",
    validate: { payload: ClubSpec },
    response: { schema: ClubSpecPlus, failAction: validationError },
  },

  deleteAll: {
    auth: false,
    handler: async function (request, h) {
      try {
        await db.clubStore.deleteAllClubs();
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Delete all clubApi",
  },

  deleteOne: {
    auth: false,
    handler: async function (request, h) {
      try {
        const club = await db.clubStore.getClubById(request.params.id);
        if (!club) {
          return Boom.notFound("No Club with this id");
        }
        await db.clubStore.deleteClub(club._id);
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("No Club with this id");
      }
    },
    tags: ["api"],
    description: "Delete a Club",
    validate: { params: { id: IdSpec }, failAction: validationError },
  },
};
