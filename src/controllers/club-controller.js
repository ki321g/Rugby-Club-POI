import { ClubSpec } from "../models/joi-schemas.js";
import { db } from "../models/db.js";

export const clubController = {
  index: {
    handler: async function (request, h) {
      const county = await db.countyStore.getCountyById(request.params.id);
      const club = await db.clubStore.getClubById(request.params.clubid);
      const viewData = {
        title: "Edit Club",
        county: county,
        club: club,
      };
      return h.view("club-view", viewData);
    },
  },

  update: {
    validate: {
      payload: ClubSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("club-view", { title: "Edit club error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const club = await db.clubStore.getClubById(request.params.clubid);
      const newClub = {
        name: request.payload.name,
        address: request.payload.address,
        phone: request.payload.phone,
        email: request.payload.email,
        website: request.payload.website,
        latitude: Number(request.payload.latitude),
        longitude: Number(request.payload.longitude),
      };
      await db.clubStore.updateClub(club, newClub);
      return h.redirect(`/county/${request.params.id}`);
    },
  },
};
