import { ClubSpec } from "../models/joi-schemas.js";
import { db } from "../models/db.js";

export const adminController = {
  index: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      let UserLoggedIn = Boolean(loggedInUser);
      let superAdmin = false;

      if (loggedInUser.accountType === "superadmin") {
        superAdmin = Boolean(loggedInUser.accountType);
        console.log("superAdmin: " + superAdmin);
      }

      const viewData = {
        title: "Admin RugbyGamePOI",
        user: request.auth.credentials,
        UserLoggedIn: UserLoggedIn,
        superAdmin: superAdmin,
      };
      return h.view("admin-view", viewData);
    },
  },
};
