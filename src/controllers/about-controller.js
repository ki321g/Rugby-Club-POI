export const aboutController = {
  index: {
    auth: {
      mode: "try",
    },
    handler: function (request, h) {
      const loggedInUser = request.auth.credentials;
      let UserLoggedIn = Boolean(loggedInUser);
      let superAdmin = false;
      if (loggedInUser) {
        if (loggedInUser.accountType === "superadmin") {
          superAdmin = Boolean(loggedInUser.accountType);
          console.log("superAdmin: " + superAdmin);
        }
      }
      const viewData = {
        title: "About RugbyGamePOI",
        user: request.auth.credentials,
        UserLoggedIn: UserLoggedIn,
        superAdmin: superAdmin,
      };
      return h.view("about-view", viewData);
    },
  },
};
