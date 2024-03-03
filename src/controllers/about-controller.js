import { UserSpec, UserCredentialsSpec } from "../models/joi-schemas.js";
import { db } from "../models/db.js";

export const aboutController = {
  index: {
    auth: {
      mode: "try",
    },
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const users = await db.userStore.getAllUsers();
      const superAdminUser = users.filter((user) => user.accountType === "superadmin");
      // const adminUsers = users.filter((user) => user.accountType === "admin" || user.accountType === "superadmin");
      const superAdminUserCount = superAdminUser.length;
      let CreateSuperAdmin = false;
      let UserLoggedIn = Boolean(loggedInUser);
      let superAdmin = false;

      
      if (superAdminUserCount == 0) {
        CreateSuperAdmin = true;
        const viewData = {
          title: "RugbyGamePOI Setup",
          user: request.auth.credentials,
          UserLoggedIn: UserLoggedIn,
          CreateSuperAdmin: CreateSuperAdmin,
        };

        return h.view("signup-view", viewData);
      } else {
        if (loggedInUser) {
          if (loggedInUser.accountType === "superadmin" || loggedInUser.accountType === "admin") {
            superAdmin = Boolean(loggedInUser.accountType);
          }
        }
        const viewData = {
          title: "About RugbyGamePOI",
          user: request.auth.credentials,
          UserLoggedIn: UserLoggedIn,
          superAdmin: superAdmin,
        };
        return h.view("about-view", viewData);
      }
    },
  },
};
