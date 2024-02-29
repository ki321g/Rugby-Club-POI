import { Club } from "./club.js";
import { gameMongoStore } from "./game-mongo-store.js";

export const clubMongoStore = {
  async getAllClubs() {
    const clubs = await Club.find().lean();
    return clubs;
  },

  async getClubById(id) {
    if (id) {
      const club = await Club.findOne({ _id: id }).lean();
      if (club) {
        club.games = await gameMongoStore.getGamesByClubId(club._id);
      }
      return club;
    }
    return null;
  },

  async addClub(club) {
    const newClub = new Club(club);
    const clubObj = await newClub.save();
    return this.getClubById(clubObj._id);
  },

  async getUserClubs(id) {
    const club = await Club.find({ userid: id }).lean();
    return club;
  },

  async deleteClubById(id) {
    try {
      await Club.deleteOne({ _id: id });
    } catch (error) {
      console.log("bad id");
    }
  },

  async deleteAllClubs() {
    await Club.deleteMany({});
  }
};
