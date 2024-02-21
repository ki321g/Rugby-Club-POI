import { userMemStore } from "./mem/user-mem-store.js";
import { countyMemStore } from "./mem/county-mem-store.js";
import { clubMemStore } from "./mem/club-mem-store.js";
import { userJsonStore } from "./json/user-json-store.js";
import { countyJsonStore } from "./json/county-json-store.js";
import { clubJsonStore } from "./json/club-json-store.js";
import { userMongoStore } from "./mongo/user-mongo-store.js";
import { countyMongoStore } from "./mongo/county-mongo-store.js";
import { clubMongoStore } from "./mongo/club-mongo-store.js";
import { connectMongo } from "./mongo/connect.js";

export const db = {
  userStore: null,
  countyStore: null,
  clubStore: null,

  init(storeType) {
    switch (storeType) {
      case "json" :
        this.userStore = userJsonStore;
        this.countyStore = countyJsonStore;
        this.clubStore = clubJsonStore;
        break;
      case "mongo" :
        this.userStore = userMongoStore;
        this.countyStore = countyMongoStore;
        this.clubStore = clubMongoStore;
        connectMongo();
        break;
      default :
        this.userStore = userMemStore;
        this.countyStore = countyMemStore;
        this.clubStore = clubMemStore;
    }
  }
};
