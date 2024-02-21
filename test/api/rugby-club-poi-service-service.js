import axios from "axios";
import { serviceUrl } from "../fixtures.js";

export const rugbyClubPOIService = {
  rugbyClubPOIyUrl: serviceUrl,

  async createUser(user) {
    const res = await axios.post(`${this.rugbyClubPOIyUrl}/api/users`, user);
    return res.data;
  },

  async getUser(id) {
    const res = await axios.get(`${this.rugbyClubPOIyUrl}/api/users/${id}`);
    return res.data;
  },

  async getAllUsers() {
    const res = await axios.get(`${this.rugbyClubPOIyUrl}/api/users`);
    return res.data;
  },

  async deleteAllUsers() {
    const res = await axios.delete(`${this.rugbyClubPOIyUrl}/api/users`);
    return res.data;
  },

  async createCounty(county) {
    const res = await axios.post(`${this.rugbyClubPOIyUrl}/api/counties`, county);
    return res.data;
  },

  async deleteAllCounties() {
    const response = await axios.delete(`${this.rugbyClubPOIyUrl}/api/counties`);
    return response.data;
  },

  async deleteCounty(id) {
    const response = await axios.delete(`${this.rugbyClubPOIyUrl}/api/counties/${id}`);
    return response;
  },

  async getAllCounties() {
    const res = await axios.get(`${this.rugbyClubPOIyUrl}/api/counties`);
    return res.data;
  },

  async getCounty(id) {
    const res = await axios.get(`${this.rugbyClubPOIyUrl}/api/counties/${id}`);
    return res.data;
  },

  async getAllClubs() {
    const res = await axios.get(`${this.rugbyClubPOIyUrl}/api/clubs`);
    return res.data;
  },

  async createClub(id, club) {
    const res = await axios.post(`${this.rugbyClubPOIyUrl}/api/counties/${id}/clubs`, club);
    return res.data;
  },

  async deleteAllClubs() {
    const res = await axios.delete(`${this.rugbyClubPOIyUrl}/api/clubs`);
    return res.data;
  },

  async getClub(id) {
    const res = await axios.get(`${this.rugbyClubPOIyUrl}/api/clubs/${id}`);
    return res.data;
  },

  async deleteClub(id) {
    const res = await axios.delete(`${this.rugbyClubPOIyUrl}/api/clubs/${id}`);
    return res.data;
  },
};
