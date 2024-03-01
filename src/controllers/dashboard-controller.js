import { ClubSpec } from "../models/joi-schemas.js";
import { db } from "../models/db.js";

export const dashboardController = {
  index: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      let superAdmin = false;
      let clubs;
      // console.log(loggedInUser);
      const userClubs = await db.clubStore.getUserClubs(loggedInUser._id);
      // console.log(loggedInUser);
      // console.log("loggedInUser.accountType: " + loggedInUser.accountType);
      if (loggedInUser.accountType === "superadmin" || loggedInUser.accountType === "admin") {
        superAdmin = Boolean(loggedInUser.accountType);
      }

      // console.log("superAdmin: " + superAdmin);
      // console.log(userClubs);
      // Sort the clubs array alphabetically by the 'name' property
      clubs = userClubs.sort((a, b) => a.club.localeCompare(b.club));
      // console.log(clubs);
      const viewData = {
        title: "RugbyGamePOI Dashboard",
        user: loggedInUser,
        superAdmin: superAdmin,
        clubs: clubs,
      };
      return h.view("dashboard-view", viewData);
    },
  },
  addClub: {
    validate: {
      payload: ClubSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("dashboard-view", { title: "Add Club error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const newClub = {
        club: request.payload.club,
        address: request.payload.address,
        phone: request.payload.phone,
        email: request.payload.email,
        website: request.payload.website,
        latitude: Number(request.payload.latitude),
        longitude: Number(request.payload.longitude),
        userid: loggedInUser._id,
        // userid: loggedInUser._id,
        // club: request.payload.club,
      };
      await db.clubStore.addClub(newClub);
      return h.redirect("/dashboard");
    },
  },

  editClub: {
    handler: async function (request, h) {
      console.log("Editing ClubID: " + request.params.id);
      const club = await db.clubStore.getClubById(request.params.id);
      // console.log(club);
      const viewData = {
        title: "Edit Club",
        club: club,
      };
      return h.view("edit-club-view", viewData);
    },
  },
  deleteClub: {
    handler: async function (request, h) {
      console.log("Deleting ClubID: " + request.params.id);
      const club = await db.clubStore.getClubById(request.params.id);
      await db.clubStore.deleteClubById(club._id);
      return h.redirect("/dashboard");
    },
  },
};
