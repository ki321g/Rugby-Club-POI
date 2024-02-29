import { GameSpec } from "../models/joi-schemas.js";
import { db } from "../models/db.js";

export const gameController = {
  index: {
    handler: async function (request, h) {
      const club = await db.clubStore.getClubById(request.params.id);
      const game = await db.gameStore.getGameById(request.params.gameid);
      const viewData = {
        title: "Edit Game",
        club: club,
        game: game,
      };
      return h.view("game-view", viewData);
    },
  },

  update: {
    validate: {
      payload: GameSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("game-view", { title: "Edit game error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const game = await db.gameStore.getGameById(request.params.gameid);
      const newGame = {
        home: request.payload.home,
        homescore: Number(request.payload.homescore),
        awayscore: Number(request.payload.awayscore),
        away: request.payload.away,
        gametime: request.payload.gametime,
        gamelocation: request.payload.gamelocation,
      };
      await db.gameStore.updateGame(game, newGame);
      return h.redirect(`/club/${request.params.id}`);
    },
  },
};
