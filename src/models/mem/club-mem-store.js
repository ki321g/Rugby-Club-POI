import { v4 } from "uuid";

let clubs = [];

export const clubMemStore = {
  async getAllClubs() {
    return clubs;
  },

  async addClub(countyId, club) {
    club._id = v4();
    club.countyid = countyId;
    clubs.push(club);
    return club;
  },

  async getClubsByCountyId(id) {
    return clubs.filter((club) => club.countyid === id);
  },

  async getClubById(id) {
    let foundClub = clubs.find((club) => club._id === id);
    if (!foundClub) {
      foundClub = null;
    }
    return foundClub;
  },

  async getCountyClubs(countyidId) {
    let foundClubs = clubs.filter((club) => club.countyid === countyidId);
    if (!foundClubs) {
      foundClubs = null;
    }
    return foundClubs;
  },

  async deleteClub(id) {
    const index = clubs.findIndex((club) => club._id === id);
    if (index !== -1) clubs.splice(index, 1);
  },

  async deleteAllClubs() {
    clubs = [];
  },

  async updateClub(club, updatedClub) {
    club.name = updatedClub.name;
    club.address = updatedClub.address;
    club.phone = updatedClub.phone;
    club.email = updatedClub.email;
    club.website = updatedClub.website;
    club.latitude = Number(updatedClub.latitude);
    club.longitude = Number(updatedClub.longitude);
  },
};
