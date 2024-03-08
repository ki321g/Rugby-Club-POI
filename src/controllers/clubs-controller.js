import { db } from "../models/db.js";

export const clubsController = {
index: {
    handler: async function (request, h) {      
      const loggedInUser = request.auth.credentials;
      let superAdmin = false;
      let hideAddClub = false;
      let checkClubs, numberClubs;

      const userClubs = await db.clubStore.getUserClubs(loggedInUser._id);
      if (loggedInUser.accountType === "superadmin" || loggedInUser.accountType === "admin") {
        superAdmin = Boolean(loggedInUser.accountType);
      }
      checkClubs = userClubs.sort((a, b) => a.club.localeCompare(b.club));
      numberClubs = checkClubs.length;

      if (numberClubs > 0) {
        hideAddClub = true;
      }

    const clubs = await db.clubStore.getAllClubs();
    const viewData = {
        title: "List Clubs",
        user: loggedInUser,
        superAdmin: superAdmin,
        clubs: clubs,
        hideAddClub: hideAddClub,
        clubs,
    };
    return h.view("clubs-view", viewData);
    },
},
  category: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const category = request.params.category.toUpperCase();
      const clubs = await db.clubStore.getClubsByCategory(category);
      
      const viewData = {
        title: "List Club Results",
        user: loggedInUser,
        clubs,
      };
      return h.view("clubs-view", viewData);
    },
  },
};