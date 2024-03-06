import { GameSpec } from "../models/joi-schemas.js";
import { ClubSpec } from "../models/joi-schemas.js";
import { imageStore } from "../models/image-store.js";
import { db } from "../models/db.js";

export const clubController = {
  index: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const club = await db.clubStore.getClubAndGamesById(request.params.id);
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
      const club = await db.clubStore.getClubById(request.params.id);
      const newGame = {
        home: request.payload.home,
        homescore: Number(request.payload.homescore),
        awayscore: Number(request.payload.awayscore),
        away: request.payload.away,
        gametime: request.payload.gametime,
        gamelocation: request.payload.gamelocation,
      };
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
  
  update: {
    validate: {
      payload: ClubSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("edit-club-view", { title: "Edit club error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      console.log("Editing ClubID: " + request.params.id);
      const club = await db.clubStore.getClubById(request.params.id);
      const clubID = club._id;

      const updatedClub = {
        club: request.payload.club,
        address: request.payload.address,
        phone: request.payload.phone,
        email: request.payload.email,
        website: request.payload.website,
        latitude: Number(request.payload.latitude),
        longitude: Number(request.payload.longitude),
        description: request.payload.description,
      };

      await db.clubStore.updateClub(clubID, updatedClub);
      return h.redirect(`/dashboard`);
    },
  },

  
};
