import { GameSpec } from "../models/joi-schemas.js";
import { ClubSpec } from "../models/joi-schemas.js";
import { imageStore } from "../models/image-store.js";
import { db } from "../models/db.js";

export const dashboardController = {
  index: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      let superAdmin = false;
      let hideAddClub = false;
      let clubs, numberClubs;

      const userClubs = await db.clubStore.getUserClubs(loggedInUser._id);
      if (loggedInUser.accountType === "superadmin" || loggedInUser.accountType === "admin") {
        superAdmin = Boolean(loggedInUser.accountType);
      }
      clubs = userClubs.sort((a, b) => a.club.localeCompare(b.club));
      numberClubs = clubs.length;

      // if (loggedInUser.accountType === "user" && numberClubs > 0) {
      //   hideAddClub = true;
      // }
      if (numberClubs > 0) {
        hideAddClub = true;
      }
      const viewData = {
        title: "RugbyGamePOI Dashboard",
        user: loggedInUser,
        superAdmin: superAdmin,
        clubs: clubs,
        hideAddClub: hideAddClub,
        apiKey: process.env.GOOGLE_API_KEY,
      };
      return h.view("dashboard-view", viewData);
    },
  },
  addClub: {
    validate: {
      payload: ClubSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("dashboard-view", { title: "Add Club error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      let superAdmin = false;
      let hideAddClub = false;
      let clubs, numberClubs; 

      const newClub = {
        club: request.payload.club,
        address: request.payload.address,
        phone: request.payload.phone,
        email: request.payload.email,
        website: request.payload.website,
        latitude: Number(request.payload.latitude),
        longitude: Number(request.payload.longitude),
        description: request.payload.description,
        category: request.payload.category.toUpperCase(),
        userId: loggedInUser._id,
      };
     
      const addingClub = await db.clubStore.addClub(newClub); 
      const checkClub = await db.clubStore.getOnlyClubById(addingClub._id);
      const clubAdded = Boolean(checkClub);

      const userClubs = await db.clubStore.getUserClubs(loggedInUser._id);
      if (loggedInUser.accountType === "superadmin" || loggedInUser.accountType === "admin") {
        superAdmin = Boolean(loggedInUser.accountType);
      }
      clubs = userClubs.sort((a, b) => a.club.localeCompare(b.club));
      numberClubs = clubs.length;

      // if (loggedInUser.accountType === "user" && numberClubs > 0) {
      //   hideAddClub = true;
      // }
      if (numberClubs > 0) {
        hideAddClub = true;
      }
      const viewData = {
        title: "RugbyGamePOI Dashboard",
        user: loggedInUser,
        club: checkClub,
        clubAdded: clubAdded,
      };
      // return h.view("dashboard-view", viewData);
      return h.view("dashboard-view", viewData)
    },
  },

  editClub: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      let UserLoggedIn = Boolean(loggedInUser);
      let superAdmin = false;

      if (loggedInUser.accountType === "superadmin" || loggedInUser.accountType === "admin") {
        superAdmin = Boolean(loggedInUser.accountType);
      }

      const club = await db.clubStore.getClubById(request.params.id);

      const viewData = {
        title: "Edit Club",
        user: loggedInUser,
        superAdmin: superAdmin,
        UserLoggedIn: UserLoggedIn,
        club: club,
      };
      return h.view("edit-club-view", viewData);
    },
  },

  uploadImage: {
    handler: async function (request, h) {
      try {        
        const loggedInUser = request.auth.credentials;
        let superAdmin = false;
        let hideAddClub = false;
        let clubs, numberClubs;    

        const club = await db.clubStore.getClubById(request.params.id);
        const file = request.payload.imagefile;
        if (Object.keys(file).length > 0) {
          const url = await imageStore.uploadImage(request.payload.imagefile);
          club.img = url;
          await db.clubStore.updateClubImage(club);
        }
        
        const userClubs = await db.clubStore.getUserClubs(loggedInUser._id);
        if (loggedInUser.accountType === "superadmin" || loggedInUser.accountType === "admin") {
          superAdmin = Boolean(loggedInUser.accountType);
        }
        clubs = userClubs.sort((a, b) => a.club.localeCompare(b.club));
        numberClubs = clubs.length;

        // if (loggedInUser.accountType === "user" && numberClubs > 0) {
        //   hideAddClub = true;
        // }
        if (numberClubs > 0) {
          hideAddClub = true;
        }

        const viewData = {
          title: "RugbyGamePOI Dashboard",
          user: loggedInUser,
          superAdmin: superAdmin,
          clubs: clubs,
          hideAddClub: hideAddClub,
          apiKey: process.env.GOOGLE_API_KEY,
        };
        
        return h.redirect(`/dashboard`, viewData);
      } catch (err) {
        console.log(err);
        return h.redirect(`/dashboard`);
      }
    },
    payload: {
      multipart: true,
      output: "data",
      maxBytes: 209715200,
      parse: true,
    },
  },    

  deleteClub: {
    handler: async function (request, h) {
      console.log("Deleting ClubID: " + request.params.id);
      const club = await db.clubStore.getClubById(request.params.id);
      await db.clubStore.deleteClubById(club._id);
      return h.redirect("/dashboard");
    },
  },
  
  deleteImage: {
    handler: async function (request, h) {           
      const loggedInUser = request.auth.credentials;
      let superAdmin = false;
      let hideAddClub = false;
      let clubs, numberClubs; 
      
      const club = await db.clubStore.getClubById(request.params.id);

      const splitImageURL = club.img.split("/");
      const publicId = splitImageURL[splitImageURL.length - 1].split(".")[0];

      await imageStore.deleteImage(publicId);
      
      club.img = null;
      await db.clubStore.updateClubImage(club);

      const userClubs = await db.clubStore.getUserClubs(loggedInUser._id);
        if (loggedInUser.accountType === "superadmin" || loggedInUser.accountType === "admin") {
          superAdmin = Boolean(loggedInUser.accountType);
        }
        clubs = userClubs.sort((a, b) => a.club.localeCompare(b.club));
        numberClubs = clubs.length;

        if (numberClubs > 0) {
          hideAddClub = true;
        }

        const viewData = {
          title: "RugbyGamePOI Dashboard",
          user: loggedInUser,
          superAdmin: superAdmin,
          clubs: clubs,
          hideAddClub: hideAddClub,
          apiKey: process.env.GOOGLE_API_KEY,
        };
        
        return h.redirect(`/dashboard`, viewData);
    },
  },

  editImage: {
    handler: async function (request, h) {           
      const loggedInUser = request.auth.credentials;
      let superAdmin = false;
      let hideAddClub = false;
      const clubAdded = true;
      let clubs, numberClubs; 
      console.log("Editing Club Image: " + request.params.id);
      const club = await db.clubStore.getClubById(request.params.id);
      const imageExists = Boolean(club.img);
      const userClubs = await db.clubStore.getUserClubs(loggedInUser._id);
        if (loggedInUser.accountType === "superadmin" || loggedInUser.accountType === "admin") {
          superAdmin = Boolean(loggedInUser.accountType);
        }
        clubs = userClubs.sort((a, b) => a.club.localeCompare(b.club));
        numberClubs = clubs.length;

        if (numberClubs > 0) {
          hideAddClub = true;
        }
        
        const viewData = {
          title: "RugbyGamePOI Dashboard",
          user: loggedInUser,
          superAdmin: superAdmin,
          club: club,
          hideAddClub: hideAddClub,
          imageExists: imageExists,
          clubAdded: clubAdded,
          apiKey: process.env.GOOGLE_API_KEY,
        };
        return h.view(`edit-image-view`, viewData);
    },
  },
};
