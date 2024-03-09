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
      const users = await db.userStore.getAllUsers();
      const superAdminUser = users.filter((user) => user.accountType === "superadmin");
      // const adminUsers = users.filter((user) => user.accountType === "admin" || user.accountType === "superadmin");
      const superAdminUserCount = superAdminUser.length;
      let CreateSuperAdmin = false;
      let superAdmin = false;
      let hideAddClub = false;
      let UserLoggedIn = false;
      let checkClubs, numberClubs;

      if (superAdminUserCount == 0) {
        CreateSuperAdmin = true;
        const viewData = {
          title: "RugbyGamePOI Setup",
          user: request.auth.credentials,
          UserLoggedIn: UserLoggedIn,
          CreateSuperAdmin: CreateSuperAdmin,
        };

        return h.view("signup-view", viewData);
      } else {
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
        
        const clubs = await db.clubStore.getAllClubs(); // Gets clubs from the database
        let clubCounties = clubs.map((club) => club.address); // Create clubCounties array
        // clubCounties = clubCounties.map(address => address.toUpperCase());
        clubCounties = [...new Set(clubCounties)]; // Remove duplicates
        
        const viewData = {
          title: "List Clubs",
          user: loggedInUser,
          superAdmin: superAdmin,
          clubs: clubs,
          UserLoggedIn: UserLoggedIn,
          hideAddClub: hideAddClub,
          clubCounties: clubCounties,
        };
        return h.view("clubs-view", viewData);
      }

      
    },
  },
  category: {
    auth: {
      mode: "try",
    },
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;

      const category = request.params.category.toUpperCase(); // Get the category from the params
      const clubs = await db.clubStore.getClubsByCategory(category); // Gets clubs from the database
      let clubCounties = clubs.map((club) => club.address.toUpperCase()); // Create clubCounties array
      clubCounties = [...new Set(clubCounties)]; // Remove duplicates

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
        clubCounties: clubCounties,
      };
      return h.view("clubs-view", viewData);
    },
  },
  showClubDetails: {
    auth: {
      mode: "try",
    },
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const clubId = request.params.id;
      console.log(clubId);
      let superAdmin = false;
      let hideAddClub = false;
      let UserLoggedIn = false;
      let clubDetails = true;
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

      const club = await db.clubStore.getOnlyClubById(clubId); // Gets club from the database
      const games = await db.gameStore.getGamesByClubId(clubId); // Gets games from the database
      club.games = games;
      console.log(club);
      const viewData = {
        title: "Club Details",
        user: loggedInUser,
        superAdmin: superAdmin,
        club: club,
        UserLoggedIn: UserLoggedIn,
        hideAddClub: hideAddClub,
        clubDetails: clubDetails,
      };
      return h.view("clubs-view", viewData);
    },
  },
};
