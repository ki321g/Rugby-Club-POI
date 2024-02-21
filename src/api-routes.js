import { userApi } from "./api/user-api.js";
import { countyApi } from "./api/county-api.js";
import { clubApi } from "./api/club-api.js";

export const apiRoutes = [
  { method: "POST", path: "/api/users", config: userApi.create },
  { method: "GET", path: "/api/users", config: userApi.find },
  { method: "GET", path: "/api/users/{id}", config: userApi.findOne },
  { method: "DELETE", path: "/api/users", config: userApi.deleteAll },
  { method: "DELETE", path: "/api/users/{id}", config: userApi.deleteOne },

  { method: "POST", path: "/api/counties", config: countyApi.create },
  { method: "GET", path: "/api/counties", config: countyApi.find },
  { method: "GET", path: "/api/counties/{id}", config: countyApi.findOne },
  { method: "DELETE", path: "/api/counties", config: countyApi.deleteAll },
  { method: "DELETE", path: "/api/counties/{id}", config: countyApi.deleteOne },
  
  { method: "POST", path: "/api/counties/{id}/clubs", config: clubApi.create },
  { method: "GET", path: "/api/clubs", config: clubApi.find },
  { method: "GET", path: "/api/clubs/{id}", config: clubApi.findOne },
  { method: "DELETE", path: "/api/clubs", config: clubApi.deleteAll },
  { method: "DELETE", path: "/api/clubs/{id}", config: clubApi.deleteOne },
];
