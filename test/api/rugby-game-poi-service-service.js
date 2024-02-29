import axios from "axios";
import { serviceUrl } from "../fixtures.js";

export const rugbyGamePOIService = {
  rugbyGamePOIyUrl: serviceUrl,

  async createUser(user) {
    const res = await axios.post(`${this.rugbyGamePOIyUrl}/api/users`, user);
    return res.data;
  },

  async getUser(id) {
    const res = await axios.get(`${this.rugbyGamePOIyUrl}/api/users/${id}`);
    return res.data;
  },

  async getAllUsers() {
    const res = await axios.get(`${this.rugbyGamePOIyUrl}/api/users`);
    return res.data;
  },

  async deleteAllUsers() {
    const res = await axios.delete(`${this.rugbyGamePOIyUrl}/api/users`);
    return res.data;
  },

  async createClub(club) {
    const res = await axios.post(`${this.rugbyGamePOIyUrl}/api/clubs`, club);
    return res.data;
  },

  async deleteAllClubs() {
    const response = await axios.delete(`${this.rugbyGamePOIyUrl}/api/clubs`);
    return response.data;
  },

  async deleteClub(id) {
    const response = await axios.delete(`${this.rugbyGamePOIyUrl}/api/clubs/${id}`);
    return response;
  },

  async getAllClubs() {
    const res = await axios.get(`${this.rugbyGamePOIyUrl}/api/clubs`);
    return res.data;
  },

  async getClub(id) {
    const res = await axios.get(`${this.rugbyGamePOIyUrl}/api/clubs/${id}`);
    return res.data;
  },

  async getAllGames() {
    const res = await axios.get(`${this.rugbyGamePOIyUrl}/api/games`);
    return res.data;
  },

  async createGame(id, game) {
    const res = await axios.post(`${this.rugbyGamePOIyUrl}/api/clubs/${id}/games`, game);
    return res.data;
  },

  async deleteAllGames() {
    const res = await axios.delete(`${this.rugbyGamePOIyUrl}/api/games`);
    return res.data;
  },

  async getGame(id) {
    const res = await axios.get(`${this.rugbyGamePOIyUrl}/api/games/${id}`);
    return res.data;
  },

  async deleteGame(id) {
    const res = await axios.delete(`${this.rugbyGamePOIyUrl}/api/games/${id}`);
    return res.data;
  },
};
