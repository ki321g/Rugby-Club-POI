import { ClubSpec } from "../models/joi-schemas.js";
import { db } from "../models/db.js";

export const countyController = {
  index: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const county = await db.countyStore.getCountyById(request.params.id);
      const viewData = {
        title: "County",
        county: county,
      };
      return h.view("county-view", viewData);
    },
  },

  addClub: {
    validate: {
      payload: ClubSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("county-view", { title: "Add club error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const county = await db.countyStore.getCountyById(request.params.id);
      const newClub = {
        name: request.payload.name,
        address: request.payload.address,
        phone: request.payload.phone,
        email: request.payload.email,
        website: request.payload.website,
        latitude: Number(request.payload.latitude),
        longitude: Number(request.payload.longitude),
      };
      await db.clubStore.addClub(county._id, newClub);
      return h.redirect(`/county/${county._id}`);
    },
  },

  deleteClub: {
    handler: async function (request, h) {
      const county = await db.countyStore.getCountyById(request.params.id);
      await db.clubStore.deleteClub(request.params.clubid);
      return h.redirect(`/county/${county._id}`);
    },
  },
};
