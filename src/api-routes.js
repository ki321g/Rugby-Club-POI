import { userApi } from "./api/user-api.js";
import { countyApi } from "./api/county-api.js";
import { clubApi } from "./api/club-api.js";

export const apiRoutes = [
  { method: "GET", path: "/api/users", config: userApi.find },
  { method: "POST", path: "/api/users", config: userApi.create },
  { method: "DELETE", path: "/api/users", config: userApi.deleteAll },
  { method: "GET", path: "/api/users/{id}", config: userApi.findOne },

  { method: "POST", path: "/api/counties", config: countyApi.create },
  { method: "DELETE", path: "/api/counties", config: countyApi.deleteAll },
  { method: "GET", path: "/api/counties", config: countyApi.find },
  { method: "GET", path: "/api/counties/{id}", config: countyApi.findOne },
  { method: "DELETE", path: "/api/counties/{id}", config: countyApi.deleteOne },

  { method: "GET", path: "/api/clubs", config: clubApi.find },
  { method: "GET", path: "/api/clubs/{id}", config: clubApi.findOne },
  { method: "POST", path: "/api/counties/{id}/clubs", config: clubApi.create },
  { method: "DELETE", path: "/api/clubs", config: clubApi.deleteAll },
  { method: "DELETE", path: "/api/clubs/{id}", config: clubApi.deleteOne },
];
