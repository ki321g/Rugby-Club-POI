import Boom from "@hapi/boom";
import { db } from "../models/db.js";
import { IdSpec, GameSpec, GameSpecPlus, GameArraySpec  } from "../models/joi-schemas.js";
import { validationError } from "./logger.js";

export const gameApi = {
  // Find all games
  find: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const games = await db.gameStore.getAllGames();
        return games;
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    response: { schema: GameArraySpec, failAction: validationError },
    description: "Get all gameApi",
    notes: "Returns all gameApi",
  },
  // Find a game by id
  findOne: {
    auth: {
      strategy: "jwt",
    },
    async handler(request) {
      try {
        const game = await db.gameStore.getGameById(request.params.id);
        if (!game) {
          return Boom.notFound("No game with this id");
        }
        return game;
      } catch (err) {
        return Boom.serverUnavailable("No game with this id");
      }
    },
    tags: ["api"],
    description: "Find a CLub",
    notes: "Returns a Game",
    validate: { params: { id: IdSpec }, failAction: validationError },
    response: { schema: GameSpecPlus, failAction: validationError },
  },
  // Create a new game
  create: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const game = await db.gameStore.addGame(request.params.id, request.payload);
        if (game) {
          return h.response(game).code(201);
        }
        return Boom.badImplementation("error creating game");
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Create a Game",
    notes: "Returns the newly created game",
    validate: { payload: GameSpec },
    response: { schema: GameSpecPlus, failAction: validationError },
  },
  // Delete a game by id
  deleteOne: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const game = await db.gameStore.getGameById(request.params.id);
        if (!game) {
          return Boom.notFound("No Game with this id");
        }
        await db.gameStore.deleteGame(game._id);
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("No Game with this id");
      }
    },
    tags: ["api"],
    description: "Delete a Game",
    validate: { params: { id: IdSpec }, failAction: validationError },
  },  
  // Delete all games
  deleteAll: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        await db.gameStore.deleteAllGames();
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Delete all gameApi",
  },
};
