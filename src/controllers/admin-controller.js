import { ClubSpec } from "../models/joi-schemas.js";
import { UserSpec } from "../models/joi-schemas.js";
import { Analytics } from "../utils/analytics-utils.js";
import { db } from "../models/db.js";

export const adminController = {
  index: {
    handler: async function (request, h) {
      const users = await db.userStore.getAllUsers();
      const loggedInUser = request.auth.credentials;
      let UserLoggedIn = Boolean(loggedInUser);
      let superAdmin = false;

      if (loggedInUser.accountType === "superadmin" || loggedInUser.accountType === "admin") {
        superAdmin = Boolean(loggedInUser.accountType);
      }

      const viewData = {
        title: "RugbyGamePOI Admin",
        user: request.auth.credentials,
        UserLoggedIn: UserLoggedIn,
        superAdmin: superAdmin,
        users: users,
      };
      return h.view("admin-view", viewData);
    },
  },
  analytics: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      let UserLoggedIn = Boolean(loggedInUser);
      let superAdmin = false;

      if (loggedInUser.accountType === "superadmin" || loggedInUser.accountType === "admin") {
        superAdmin = Boolean(loggedInUser.accountType);
      }
      
      const { totalUsersQty, totalClubsQty, totalGamesQty, clubMostGames, highestScore, largestScoreDifference, countyAnalytics, clubAnalytics } = await Analytics();
     
      const viewData = {
        title: "RugbyGamePOI Analytics",
        user: request.auth.credentials,
        UserLoggedIn: UserLoggedIn,
        superAdmin: superAdmin,
        totalUsersQty: totalUsersQty,
        totalClubsQty: totalClubsQty,
        totalGamesQty: totalGamesQty,
        clubMostGames: clubMostGames,
        highestScore: highestScore,
        largestScoreDifference: largestScoreDifference,
        countyAnalytics: countyAnalytics,
        clubAnalytics: clubAnalytics,
      };
      return h.view("analytics-view", viewData);
    },
  },
  editUser: {
    handler: async function (request, h) {
      console.log("Editing User: " + request.params.id);
      const loggedInUser = request.auth.credentials;
      let UserLoggedIn = Boolean(loggedInUser);
      let superAdmin = false;

      if (loggedInUser.accountType === "superadmin" || loggedInUser.accountType === "admin") {
        superAdmin = Boolean(loggedInUser.accountType);
      }

      const user = await db.userStore.getUserById(request.params.id);
      const viewData = {
        title: "Edit User",
        UserLoggedIn: UserLoggedIn,
        superAdmin: superAdmin,
        user: user,
      };
      return h.view("edit-user-view", viewData);
    },
  },
  deleteUser: {
    handler: async function (request, h) {
      await db.userStore.deleteUserById(request.params.id);
      return h.redirect("/admin");
    },
  },
};
