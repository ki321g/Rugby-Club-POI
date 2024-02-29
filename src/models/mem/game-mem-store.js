import { v4 } from "uuid";

let games = [];

export const gameMemStore = {
  async getAllGames() {
    return games;
  },

  async addGame(clubId, game) {
    game._id = v4();
    game.clubid = clubId;
    games.push(game);
    return game;
  },

  async getGamesByClubId(id) {
    return games.filter((game) => game.clubid === id);
  },

  async getGameById(id) {
    let foundGame = games.find((game) => game._id === id);
    if (!foundGame) {
      foundGame = null;
    }
    return foundGame;
  },

  async getClubGames(clubidId) {
    let foundGames = games.filter((game) => game.clubid === clubidId);
    if (!foundGames) {
      foundGames = null;
    }
    return foundGames;
  },

  async deleteGame(id) {
    const index = games.findIndex((game) => game._id === id);
    if (index !== -1) games.splice(index, 1);
  },

  async deleteAllGames() {
    games = [];
  },

  async updateGame(game, updatedGame) {    
    game.home = updatedGame.home;
    game.homescore = Number(updatedGame.homescore);
    game.awayscore = Number(updatedGame.awayscore);
    game.away = updatedGame.away;
    game.gametime = updatedGame.gametime;
    game.gamelocation = updatedGame.gamelocation;
  },
};
