import { v4 } from "uuid";
import { gameMemStore } from "./game-mem-store.js";

let clubs = [];

export const clubMemStore = {
  async getAllClubs() {
    return clubs;
  },

  async addClub(club) {
    club._id = v4();
    clubs.push(club);
    return club;
  },

  async getClubById(id) {
    const list = clubs.find((club) => club._id === id);
    if (list) {
      list.games = await gameMemStore.getGamesByClubId(list._id);
      return list;
    }
    return null;
  },

  async getUserClubs(userid) {
    return clubs.filter((club) => club.userid === userid);
  },

  async deleteClubById(id) {
    const index = clubs.findIndex((club) => club._id === id);
    if (index !== -1) clubs.splice(index, 1);
  },

  async deleteAllClubs() {
    clubs = [];
  },
};
