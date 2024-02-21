import { CountySpec } from "../models/joi-schemas.js";
import { db } from "../models/db.js";

export const dashboardController = {
  index: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      let counties;
      // console.log(loggedInUser);
      const userCounties = await db.countyStore.getUserCounties(loggedInUser._id);
      // console.log(userCounties);
      // Sort the counties array alphabetically by the 'name' property
      counties = userCounties.sort((a, b) => a.county.localeCompare(b.county));
      // console.log(counties);
      const viewData = {
        title: "RugbyClubPOI Dashboard",
        user: loggedInUser,
        counties: counties,
      };
      return h.view("dashboard-view", viewData);
    },
  },

  addCounty: {
    validate: {
      payload: CountySpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("dashboard-view", { title: "Add County error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const newCounty = {
        userid: loggedInUser._id,
        county: request.payload.county,
      };
      await db.countyStore.addCounty(newCounty);
      return h.redirect("/dashboard");
    },
  },

  deleteCounty: {
    handler: async function (request, h) {
      console.log("Deleting CountyID: " + request.params.id);
      const county = await db.countyStore.getCountyById(request.params.id);
      await db.countyStore.deleteCountyById(county._id);
      return h.redirect("/dashboard");
    },
  },
};
