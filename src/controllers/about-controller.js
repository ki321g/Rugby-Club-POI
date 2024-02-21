export const aboutController = {
  index: {
    handler: function (request, h) {
      const viewData = {
        title: "About RugbyClubPOI",
      };
      return h.view("about-view", viewData);
    },
  },
};
