import { v4 } from "uuid";
import { db } from "./store-utils.js";

export const clubJsonStore = {
  async getAllClubs() {
    await db.read();
    return db.data.clubs;
  },

  async addClub(countyId, club) {
    await db.read();
    club._id = v4();
    club.countyid = countyId;
    db.data.clubs.push(club);
    await db.write();
    return club;
  },

  async getClubsByCountyId(id) {
    await db.read();
    let t = db.data.clubs.filter((club) => club.countyid === id);
    if (t === undefined) t = null;
    return t;
  },

  async getClubById(id) {
    await db.read();
    let t = db.data.clubs.find((club) => club._id === id);
    if (t === undefined) t = null;
    return t;
  },

  async deleteClub(id) {
    await db.read();
    const index = db.data.clubs.findIndex((club) => club._id === id);
    if (index !== -1) db.data.clubs.splice(index, 1);
    await db.write();
  },

  async deleteAllClubs() {
    db.data.clubs = [];
    await db.write();
  },

  async updateClub(club, updatedClub) {
    club.name = updatedClub.name;
    club.address = updatedClub.address;
    club.phone = updatedClub.phone;
    club.email = updatedClub.email;
    club.website = updatedClub.website;
    club.latitude = Number(updatedClub.latitude);
    club.longitude = Number(updatedClub.longitude);
    await db.write();
  },
};
