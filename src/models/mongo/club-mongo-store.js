import { Club } from "./club.js";
import { gameMongoStore } from "./game-mongo-store.js";

export const clubMongoStore = {
  async getAllClubs() {
    const clubs = await Club.find().lean();
    return clubs;
  },

  async addClub(club) {    
    const newClub = new Club(club);
    const clubObj = await newClub.save();
    return this.getClubById(clubObj._id);
  },

  async getClubAndGamesById(id) {
    if (id) {
      const club = await Club.findOne({ _id: id }).lean();
      if (club) {
        club.games = await gameMongoStore.getGamesByClubId(club._id);
      }
      return club;
    }
    return null;
  },

  async getClubById(id) {
    if (id) {
      const club = await Club.findOne({ _id: id }).lean();
      // if (club) {
      //   club.games = await gameMongoStore.getGamesByClubId(club._id);
      // }
      return club;
    }
    return null;
  },

  async getOnlyClubById(id) {
    if (id) {
      const club = await Club.findOne({ _id: id }).lean();
      return club;
    }
    return null;
  },

  async getUserClubs(id) {
    const club = await Club.find({ userId: id }).lean();
    return club;
  },

  async getClubsByCategory(category) {
    try {         
      const clubs = await Club.find({ category: category }).lean();
      return clubs;
    } catch (error) {
      return null;
    }
  },

  async deleteClubById(id) {
    try {
      await Club.deleteOne({ _id: id });
    } catch (error) {
    }
  },

  async deleteAllClubs() {
    await Club.deleteMany({});
  },

  async updateClub(clubID, updatedClub) {
    const club = await Club.findOne({ _id: clubID});
    club.club = updatedClub.club;
    club.address = updatedClub.address;
    club.phone = updatedClub.phone;
    club.email = updatedClub.email;
    club.website = updatedClub.website;
    club.latitude = Number(updatedClub.latitude);
    club.longitude = Number(updatedClub.longitude);
    club.description = updatedClub.description;
    club.category = updatedClub.category;
    const updatedClubObj = await club.save();
    return updatedClubObj;
  },

  async updateClubImage(updatedClub) {
    const club = await Club.findOne({ _id: updatedClub._id });
    club.club = updatedClub.club;
    club.address = updatedClub.address;
    club.phone = updatedClub.phone;
    club.email = updatedClub.email;
    club.website = updatedClub.website;
    club.latitude = Number(updatedClub.latitude);
    club.longitude = Number(updatedClub.longitude);
    club.description = updatedClub.description;
    club.img = updatedClub.img;
    club.category = updatedClub.category;
    await club.save();
  },
};
