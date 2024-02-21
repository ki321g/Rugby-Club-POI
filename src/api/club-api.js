import Boom from "@hapi/boom";
import { db } from "../models/db.js";
import { ClubSpec, CountySpec } from "../models/joi-schemas.js";

export const clubApi = {
  find: {
    auth: false,
    handler: async function (request, h) {
      try {
        const clubs = await db.clubStore.getAllClub();
        return clubs;
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
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
  },
};
