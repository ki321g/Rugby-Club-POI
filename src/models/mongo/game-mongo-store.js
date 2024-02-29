import { Game } from "./game.js";
import { Club } from "./club.js";

export const gameMongoStore = {
  async getAllGames() {
    const games = await Game.find().lean();
    return games;
  },

  async addGame(clubId, game) {
    game.clubid = clubId;
    const newGame = new Game(game);
    const gameObj = await newGame.save();
    return this.getGameById(gameObj._id);
  },

  async getGamesByClubId(id) {
    const games = await Game.find({ clubid: id }).lean();
    return games;
  },

  async getGameById(id) {
    if (id) {
      const game = await Game.findOne({ _id: id }).lean();
      return game;
    }
    return null;
  },

  async deleteGame(id) {
    try {
      await Game.deleteOne({ _id: id });
    } catch (error) {
      console.log("bad id");
    }
  },

  async deleteAllGames() {
    await Game.deleteMany({});
  },

  async updateGame(game, updatedGame) {
    const gameDoc = await Game.findOne({ _id: game._id });
    gameDoc.name = updatedGame.name;
    gameDoc.address = updatedGame.address;
    gameDoc.phone = updatedGame.phone;
    gameDoc.email = updatedGame.email;
    gameDoc.website = updatedGame.website;
    gameDoc.latitude = Number(updatedGame.latitude);
    gameDoc.longitude = Number(updatedGame.longitude);
    await gameDoc.save();
  },
};
