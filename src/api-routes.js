import { userApi } from "./api/user-api.js";
import { clubApi } from "./api/club-api.js";
import { gameApi } from "./api/game-api.js";

export const apiRoutes = [
  { method: "POST", path: "/api/users", config: userApi.create },
  { method: "GET", path: "/api/users", config: userApi.find },
  { method: "GET", path: "/api/users/{id}", config: userApi.findOne },
  { method: "DELETE", path: "/api/users", config: userApi.deleteAll },
  { method: "DELETE", path: "/api/users/{id}", config: userApi.deleteOne },
  { method: "GET", path: "/api/health", config: userApi.health },
  
  { method: "POST", path: "/api/users/authenticate", config: userApi.authenticate },

  { method: "POST", path: "/api/clubs", config: clubApi.create },
  { method: "GET", path: "/api/clubs", config: clubApi.find },
  { method: "GET", path: "/api/clubs/{id}", config: clubApi.findOne },
  { method: "DELETE", path: "/api/clubs", config: clubApi.deleteAll },
  { method: "DELETE", path: "/api/clubs/{id}", config: clubApi.deleteOne },

  { method: "POST", path: "/api/clubs/{id}/games", config: gameApi.create },
  { method: "GET", path: "/api/games", config: gameApi.find },
  { method: "GET", path: "/api/games/{id}", config: gameApi.findOne },
  { method: "DELETE", path: "/api/games", config: gameApi.deleteAll },
  { method: "DELETE", path: "/api/games/{id}", config: gameApi.deleteOne },
];
