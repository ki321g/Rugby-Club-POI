export const aboutController = {
  index: {
    handler: function (request, h) {
      const viewData = {
        title: "About RugbyGamePOI",
        user: request.auth.credentials,
      };
      return h.view("about-view", viewData);
    },
  },
};
