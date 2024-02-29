export const aboutController = {
  index: {
    handler: function (request, h) {
      const viewData = {
        title: "About RugbyGamePOI",
      };
      return h.view("about-view", viewData);
    },
  },
};
