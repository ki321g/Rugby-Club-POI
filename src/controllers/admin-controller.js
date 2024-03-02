import { ClubSpec } from "../models/joi-schemas.js";
import { db } from "../models/db.js";

export const adminController = {
  index: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      let UserLoggedIn = Boolean(loggedInUser);
      let superAdmin = false;

      if (loggedInUser.accountType === "superadmin" || loggedInUser.accountType === "admin") {
        superAdmin = Boolean(loggedInUser.accountType);
        console.log("superAdmin: " + superAdmin);
      }

      const viewData = {
        title: "RugbyGamePOI Admin",
        user: request.auth.credentials,
        UserLoggedIn: UserLoggedIn,
        superAdmin: superAdmin,
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
        console.log("superAdmin: " + superAdmin);
      }

      const viewData = {
        title: "RugbyGamePOI Analytics",
        user: request.auth.credentials,
        UserLoggedIn: UserLoggedIn,
        superAdmin: superAdmin,
      };
      return h.view("analytics-view", viewData);
    },
  },
};
