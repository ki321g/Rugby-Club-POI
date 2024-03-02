import { v4 } from "uuid";
import { db } from "./store-utils.js";

export const gameJsonStore = {
  async getAllGames() {
    await db.read();
    return db.data.games;
  },

  async addGame(clubId, game) {
    await db.read();
    game._id = v4();
    game.clubid = clubId;
    db.data.games.push(game);
    await db.write();
    return game;
  },

  async getGamesByClubId(id) {
    await db.read();
    let t = db.data.games.filter((game) => game.clubid === id);
    if (t === undefined) t = null;
    return t;
  },

  async getGameById(id) {
    await db.read();
    let t = db.data.games.find((game) => game._id === id);
    if (t === undefined) t = null;
    return t;
  },

  async deleteGame(id) {
    await db.read();
    const index = db.data.games.findIndex((game) => game._id === id);
    if (index !== -1) db.data.games.splice(index, 1);
    await db.write();
  },

  async deleteAllGames() {
    db.data.games = [];
    await db.write();
  },

  async updateGame(game, updatedGame) {
    await db.read();
    game.home = updatedGame.home;
    game.homescore = Number(updatedGame.homescore);
    game.awayscore = Number(updatedGame.awayscore);
    game.away = updatedGame.away;
    game.gametime = updatedGame.gametime;
    game.gamelocation = updatedGame.gamelocation;
    await db.write();
  },
};
