import { Club } from "./club.js";
import { County } from "./county.js";

export const clubMongoStore = {
  async getAllClubs() {
    const clubs = await Club.find().lean();
    return clubs;
  },

  async addClub(countyId, club) {
    club.countyid = countyId;
    const newClub = new Club(club);
    const clubObj = await newClub.save();
    return this.getClubById(clubObj._id);
  },

  async getClubsByCountyId(id) {
    const clubs = await Club.find({ countyid: id }).lean();
    return clubs;
  },

  async getClubById(id) {
    if (id) {
      const club = await Club.findOne({ _id: id }).lean();
      return club;
    }
    return null;
  },

  async deleteClub(id) {
    try {
      await Club.deleteOne({ _id: id });
    } catch (error) {
      console.log("bad id");
    }
  },

  async deleteAllClubs() {
    await Club.deleteMany({});
  },

  async updateClub(club, updatedClub) {
    const clubDoc = await Club.findOne({ _id: club._id });
    clubDoc.name = updatedClub.name;
    clubDoc.address = updatedClub.address;
    clubDoc.phone = updatedClub.phone;
    clubDoc.email = updatedClub.email;
    clubDoc.website = updatedClub.website;
    clubDoc.latitude = Number(updatedClub.latitude);
    clubDoc.longitude = Number(updatedClub.longitude);
    await clubDoc.save();
  },
};
