import { userMemStore } from "./mem/user-mem-store.js";
import { clubMemStore } from "./mem/club-mem-store.js";
import { gameMemStore } from "./mem/game-mem-store.js";
import { userJsonStore } from "./json/user-json-store.js";
import { clubJsonStore } from "./json/club-json-store.js";
import { gameJsonStore } from "./json/game-json-store.js";
import { userMongoStore } from "./mongo/user-mongo-store.js";
import { clubMongoStore } from "./mongo/club-mongo-store.js";
import { gameMongoStore } from "./mongo/game-mongo-store.js";
import { connectMongo } from "./mongo/connect.js";

export const db = {
  userStore: null,
  clubStore: null,
  gameStore: null,

  init(storeType) {
    switch (storeType) {
      case "json" :
        this.userStore = userJsonStore;
        this.clubStore = clubJsonStore;
        this.gameStore = gameJsonStore;
        break;
      case "mongo" :
        this.userStore = userMongoStore;
        this.clubStore = clubMongoStore;
        this.gameStore = gameMongoStore;
        connectMongo();
        break;
      default :
        this.userStore = userMemStore;
        this.clubStore = clubMemStore;
        this.gameStore = gameMemStore;
    }
  }
};
