import { aboutController } from "./controllers/about-controller.js";
import { accountsController } from "./controllers/accounts-controller.js";
import { adminController } from "./controllers/admin-controller.js";
import { dashboardController } from "./controllers/dashboard-controller.js";
import { clubController } from "./controllers/club-controller.js";
import { gameController } from "./controllers/game-controller.js";

export const webRoutes = [
  { method: "GET", path: "/about", config: aboutController.index },

  { method: "GET", path: "/", config: accountsController.index },
  { method: "GET", path: "/signup", config: accountsController.showSignup },
  { method: "GET", path: "/login", config: accountsController.showLogin },
  { method: "GET", path: "/logout", config: accountsController.logout },
  { method: "POST", path: "/register", config: accountsController.signup },
  { method: "POST", path: "/authenticate", config: accountsController.login },
  { method: "POST", path: "/updateuser/{id}", config: accountsController.updateUser},

  { method: "GET", path: "/admin", config: adminController.index },
  { method: "GET", path: "/analytics", config: adminController.analytics },  
  { method: "GET", path: "/deleteuser/{id}", config: adminController.deleteUser },  
  { method: "GET", path: "/edituser/{id}", config: adminController.editUser },

  { method: "GET", path: "/dashboard", config: dashboardController.index },
  { method: "POST", path: "/dashboard/addclub", config: dashboardController.addClub },
  { method: "Get", path: "/dashboard/editclub/{id}", config: dashboardController.editClub },
  { method: "GET", path: "/dashboard/deleteclub/{id}", config: dashboardController.deleteClub },

  { method: "GET", path: "/club/{id}", config: clubController.index },
  { method: "POST", path: "/club/{id}/addgame", config: clubController.addGame },
  { method: "GET", path: "/club/{id}/deletegame/{gameid}", config: clubController.deleteGame },
  { method: "POST", path: "/club/updateclub/{id}", config: clubController.update },

  { method: "GET", path: "/game/{id}/editgame/{gameid}", config: gameController.index },
  { method: "POST", path: "/game/{id}/updategame/{gameid}", config: gameController.update },
  

  { method: "GET", path: "/{param*}", handler: { directory: { path: "./public" } }, options: { auth: false } },
];
