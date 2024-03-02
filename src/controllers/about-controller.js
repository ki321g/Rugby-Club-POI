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
    },
  },
};
