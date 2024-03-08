import { UserSpec, UserCredentialsSpec, GameSpec, ClubSpec } from "../models/joi-schemas.js";
import { imageStore } from "../models/image-store.js";
import { db } from "../models/db.js";


export const clubsController = {
  index: {
    auth: {
      mode: "try",
    },
    handler: async function (request, h) {      
      const loggedInUser = request.auth.credentials;
      let superAdmin = false;
      let hideAddClub = false;
      let UserLoggedIn = false;
      let checkClubs, numberClubs;
      
      if (loggedInUser) {
        const userClubs = await db.clubStore.getUserClubs(loggedInUser._id);
        if (loggedInUser.accountType === "superadmin" || loggedInUser.accountType === "admin") {
          superAdmin = Boolean(loggedInUser.accountType);
        }
        checkClubs = userClubs.sort((a, b) => a.club.localeCompare(b.club));
        numberClubs = checkClubs.length;
        
        UserLoggedIn = Boolean(loggedInUser);

        if (numberClubs > 0) {
          hideAddClub = true;
        }
      } 

      const clubs = await db.clubStore.getAllClubs();
      const viewData = {
          title: "List Clubs",
          user: loggedInUser,
          superAdmin: superAdmin,
          clubs: clubs,
          UserLoggedIn: UserLoggedIn,
          hideAddClub: hideAddClub,
          clubs,
    };
    return h.view("clubs-view", viewData);
    },
  },
  category: {
    auth: {
      mode: "try",
    },
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const category = request.params.category.toUpperCase();
      const clubs = await db.clubStore.getClubsByCategory(category);
      
      let superAdmin = false;
      let hideAddClub = false;
      let UserLoggedIn = false;
      let checkClubs, numberClubs;
      
      if (loggedInUser) {
        
        const userClubs = await db.clubStore.getUserClubs(loggedInUser._id);
        if (loggedInUser.accountType === "superadmin" || loggedInUser.accountType === "admin") {
          superAdmin = Boolean(loggedInUser.accountType);
        }
        checkClubs = userClubs.sort((a, b) => a.club.localeCompare(b.club));
        numberClubs = checkClubs.length;
        
        UserLoggedIn = Boolean(loggedInUser);

        if (numberClubs > 0) {
          hideAddClub = true;
        }
      } 

      const viewData = {
        title: "List Club Results",
        user: loggedInUser,
        superAdmin: superAdmin,
        clubs: clubs,
        UserLoggedIn: UserLoggedIn,
        hideAddClub: hideAddClub,
        clubs,
      };
      return h.view("clubs-view", viewData);
    },
  },
};