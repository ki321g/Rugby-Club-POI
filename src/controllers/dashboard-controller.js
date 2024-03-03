import { ClubSpec } from "../models/joi-schemas.js";
import { db } from "../models/db.js";

export const dashboardController = {
  index: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      let superAdmin = false;
      let hideAddClub = false;
      let clubs, numberClubs;
      const userClubs = await db.clubStore.getUserClubs(loggedInUser._id);
      if (loggedInUser.accountType === "superadmin" || loggedInUser.accountType === "admin") {
        superAdmin = Boolean(loggedInUser.accountType);
      }
      clubs = userClubs.sort((a, b) => a.club.localeCompare(b.club));
      numberClubs = clubs.length;
      
      if (numberClubs > 0) {
        hideAddClub = true;
      }

      const viewData = {
        title: "RugbyGamePOI Dashboard",
        user: loggedInUser,
        superAdmin: superAdmin,
        clubs: clubs,
        hideAddClub: hideAddClub,
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
        description: request.payload.description,
        userid: loggedInUser._id,
      };
      await db.clubStore.addClub(newClub);
      return h.redirect("/dashboard");
    },
  },

  editClub: {
    handler: async function (request, h) {
      console.log("Editing ClubID: " + request.params.id);
      const club = await db.clubStore.getClubById(request.params.id);
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
