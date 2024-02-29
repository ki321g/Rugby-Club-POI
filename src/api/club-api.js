import Boom from "@hapi/boom";
import { IdSpec, ClubArraySpec, ClubSpec, ClubSpecPlus } from "../models/joi-schemas.js";
import { db } from "../models/db.js";
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
    description: "Get all Clubs",
    notes: "Returns all Clubs",
  },

  findOne: {
    auth: false,
    async handler(request) {
      try {
        const club = await db.clubStore.getClubById(request.params.id);
        if (!club) {
          return Boom.notFound("No Club with this id");
        }
        return club;
      } catch (err) {
        return Boom.serverUnavailable("No Club with this id");
      }
    },
    tags: ["api"],
    description: "Find a Club",
    notes: "Returns a Club",
    validate: { params: { id: IdSpec }, failAction: validationError },
    response: { schema: ClubSpecPlus, failAction: validationError },
  },

  create: {
    auth: false,
    handler: async function (request, h) {
      try {
        const club = request.payload;
        const newClub = await db.clubStore.addClub(club);
        if (newClub) {
          return h.response(newClub).code(201);
        }
        return Boom.badImplementation("error creating Club");
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Create a Club",
    notes: "Returns the newly created Club",
    validate: { payload: ClubSpec, failAction: validationError },
    response: { schema: ClubSpecPlus, failAction: validationError },
  },

  deleteOne: {
    auth: false,
    handler: async function (request, h) {
      try {
        const club = await db.clubStore.getClubById(request.params.id);
        if (!club) {
          return Boom.notFound("No Club with this id");
        }
        await db.clubStore.deleteClubById(club._id);
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("No Club with this id");
      }
    },
    tags: ["api"],
    description: "Delete a Club",
    validate: { params: { id: IdSpec }, failAction: validationError },
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
};
