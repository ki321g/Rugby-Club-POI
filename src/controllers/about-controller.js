import { db } from "../models/db.js";

export const aboutController = {
  index: {
    handler: async function (request, h) {
      const viewData = {
        title: "About Playtime",
      };
      try {
        return h.view("about-view", viewData);
      } catch (err) {
        console.error("Error in GET / route:", err.stack || err);
        throw err;
      }
    },
  },
};
