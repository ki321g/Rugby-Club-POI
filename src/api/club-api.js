import Boom from "@hapi/boom";
import jwt from "jsonwebtoken";
import { IdSpec, ClubArraySpec, ClubSpec, ClubSpecPlus } from "../models/joi-schemas.js";
import { db } from "../models/db.js";
import { validationError } from "./logger.js";
import { decodeToken, validate } from "./jwt-utils.js";

export const clubApi = {
  find: {
    auth: {
      strategy: "jwt",
    },
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
    auth: {
      strategy: "jwt",
    },
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
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        // decode and validate the JWT token
        const decodedToken = decodeToken(request.headers.authorization);
        const validationResult = await validate(decodedToken, request);
        console.log(validationResult);
        console.log(decodedToken);
        if (!validationResult.isValid) {
          return Boom.unauthorized("Invalid credentials");
        }
        // access user ID from decoded payload
        // eslint-disable-next-line prefer-destructuring
        const userId = decodedToken.userId;
        // access new  data from request payload

        console.log(userId);


        const club = request.payload;
        // Add userId to the new  data
        club.userId = userId;
        console.log(club);

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
    auth: {
      strategy: "jwt",
    },
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
    auth: {
      strategy: "jwt",
    },
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
