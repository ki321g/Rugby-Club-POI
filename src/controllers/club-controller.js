import { GameSpec } from "../models/joi-schemas.js";
import { db } from "../models/db.js";

export const clubController = {
  index: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const club = await db.clubStore.getClubById(request.params.id);
      const viewData = {
        title: "Club",
        club: club,
      };
      return h.view("club-view", viewData);
    },
  },

  addGame: {
    validate: {
      payload: GameSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("club-view", { title: "Add game error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      // console.log(request);
      // console.log(request.params);
      // console.log(request.payload);
      const club = await db.clubStore.getClubById(request.params.id);
      // console.log(club);
      // console.log(request.payload.home);
      // console.log(request.payload.homescore);
      // console.log(request.payload.awayscore);
      // console.log(request.payload.away);
      // console.log(request.payload.gametime);
      // console.log(request.payload.gamelocation);
      const newGame = {
        home: request.payload.home,
        homescore: Number(request.payload.homescore),
        awayscore: Number(request.payload.awayscore),
        away: request.payload.away,
        gametime: request.payload.gametime,
        gamelocation: request.payload.gamelocation,
      };

      // console.log(newGame);
      await db.gameStore.addGame(club._id, newGame);
      return h.redirect(`/club/${club._id}`);
    },
  },

  deleteGame: {
    handler: async function (request, h) {
      const club = await db.clubStore.getClubById(request.params.id);
      await db.gameStore.deleteGame(request.params.gameid);
      return h.redirect(`/club/${club._id}`);
    },
  },
};
