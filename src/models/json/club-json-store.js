import { v4 } from "uuid";
import { db } from "./store-utils.js";
import { gameJsonStore } from "./game-json-store.js";

export const clubJsonStore = {
  async getAllClubs() {
    await db.read();
    return db.data.clubs;
  },

  async addClub(club) {
    await db.read();
    club._id = v4();
    db.data.clubs.push(club);
    await db.write();
    return club;
  },

  async getClubById(id) {
    await db.read();
    let list = db.data.clubs.find((club) => club._id === id);
    if (list) {
      list.games = await gameJsonStore.getGamesByClubId(list._id);
    } else {
      list = null;
    }
    return list;
  }, 

  async getOnlyClubById(id) {
    await db.read();    
    return db.data.clubs.find((club) => club._id === id);
  },

  async getUserClubs(userId) {
    await db.read();
    return db.data.clubs.filter((club) => club.userid === userId);
  },

  async deleteClubById(id) {
    await db.read();
    const index = db.data.clubs.findIndex((club) => club._id === id);
    if (index !== -1) db.data.clubs.splice(index, 1);
    await db.write();
  },

  async deleteAllClubs() {
    db.data.clubs = [];
    await db.write();
  },

  async updateClub(clubID, updatedClub) {
    await db.read();
    const club = await this.getOnlyClubById(clubID);
    club.club = updatedClub.club;
    club.address = updatedClub.address;
    club.phone = updatedClub.phone;
    club.email = updatedClub.email;
    club.website = updatedClub.website;
    club.latitude = Number(updatedClub.latitude);
    club.longitude = Number(updatedClub.longitude);
    club.description = updatedClub.description;
    await db.write();
  },
};
