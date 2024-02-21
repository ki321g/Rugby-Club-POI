import { aboutController } from "./controllers/about-controller.js";
import { accountsController } from "./controllers/accounts-controller.js";
import { dashboardController } from "./controllers/dashboard-controller.js";
import { countyController } from "./controllers/county-controller.js";
import { clubController } from "./controllers/club-controller.js";

export const webRoutes = [
  { method: "GET", path: "/", config: accountsController.index },
  { method: "GET", path: "/signup", config: accountsController.showSignup },
  { method: "GET", path: "/login", config: accountsController.showLogin },
  { method: "GET", path: "/logout", config: accountsController.logout },
  { method: "POST", path: "/register", config: accountsController.signup },
  { method: "POST", path: "/authenticate", config: accountsController.login },

  { method: "GET", path: "/about", config: aboutController.index },

  { method: "GET", path: "/dashboard", config: dashboardController.index },
  { method: "POST", path: "/dashboard/addcounty", config: dashboardController.addCounty },
  { method: "GET", path: "/dashboard/deletecounty/{id}", config: dashboardController.deleteCounty },

  { method: "GET", path: "/county/{id}", config: countyController.index },
  { method: "POST", path: "/county/{id}/addclub", config: countyController.addClub },
  { method: "GET", path: "/county/{id}/deleteclub/{clubid}", config: countyController.deleteClub },

  { method: "GET", path: "/club/{id}/editclub/{clubid}", config: clubController.index },
  { method: "POST", path: "/club/{id}/updateclub/{clubid}", config: clubController.update },

  { method: "GET", path: "/{param*}", handler: { directory: { path: "./public" } }, options: { auth: false } },
];
