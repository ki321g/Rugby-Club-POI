import { v4 } from "uuid";
import { db } from "./store-utils.js";
import { clubJsonStore } from "./club-json-store.js";

export const countyJsonStore = {
  async getAllCounties() {
    await db.read();
    return db.data.counties;
  },

  async addCounty(county) {
    await db.read();
    county._id = v4();
    db.data.counties.push(county);
    await db.write();
    return county;
  },

  async getCountyById(id) {
    await db.read();
    let list = db.data.counties.find((county) => county._id === id);
    if (list) {
      list.clubs = await clubJsonStore.getClubsByCountyId(list._id);
    } else {
      list = null;
    }
    return list;
  },

  async getUserCounties(userId) {
    await db.read();
    return db.data.counties.filter((county) => county.userid === userId);;
  },

  async deleteCountyById(id) {
    await db.read();
    const index = db.data.counties.findIndex((county) => county._id === id);
    if (index !== -1) db.data.counties.splice(index, 1);
    await db.write();
  },

  async deleteAllCounties() {
    db.data.counties = [];
    await db.write();
  },
};
