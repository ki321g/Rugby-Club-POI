import { EventEmitter } from "events";
import { assert } from "chai";
import { assertSubset } from "../test-utils.js";
import { rugbyGamePOIService } from "./rugby-game-poi-service.js";
import { maggie, wexford, testGames, corkWaterford } from "../fixtures.js";
import { db } from "../../src/models/db.js";

EventEmitter.setMaxListeners(25);

suite("Game API tests", () => {
  let user = null;
  let testingClub = null;

  setup(async () => {    
    db.init("json");
    rugbyGamePOIService.clearAuth();
    user = await rugbyGamePOIService.createUser(maggie);
    await rugbyGamePOIService.authenticate(maggie);
    await rugbyGamePOIService.deleteAllClubs();
    await rugbyGamePOIService.deleteAllGames();    
    await rugbyGamePOIService.deleteAllUsers();
    user = await rugbyGamePOIService.createUser(maggie);
    await rugbyGamePOIService.authenticate(maggie);
    wexford.userid = user._id;
    testingClub = await rugbyGamePOIService.createClub(wexford);    
  });

  teardown(async () => {});

  test("Create Game", async () => {
    const returnedGame = await rugbyGamePOIService.createGame(testingClub._id, corkWaterford);
    assertSubset(corkWaterford, returnedGame);
  });

  test("Create Multiple Games", async () => {
    for (let i = 0; i < testGames.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await rugbyGamePOIService.createGame(testingClub._id, testGames[i]);
    }
    const returnedGames = await rugbyGamePOIService.getAllGames();
    assert.equal(returnedGames.length, testGames.length);
    for (let i = 0; i < returnedGames.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      const game = await rugbyGamePOIService.getGame(returnedGames[i]._id);
      assertSubset(game, returnedGames[i]);
    }
  });

  test("Delete gameApi", async () => {
    for (let i = 0; i < testGames.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await rugbyGamePOIService.createGame(testingClub._id, testGames[i]);
    }
    let returnedGames = await rugbyGamePOIService.getAllGames();
    assert.equal(returnedGames.length, testGames.length);
    for (let i = 0; i < returnedGames.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      const game = await rugbyGamePOIService.deleteGame(returnedGames[i]._id);
    }
    returnedGames = await rugbyGamePOIService.getAllGames();
    assert.equal(returnedGames.length, 0);
  });

  test("Denormalised Club", async () => {
    for (let i = 0; i < testGames.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await rugbyGamePOIService.createGame(testingClub._id, testGames[i]);
    }
    const returnedClub = await rugbyGamePOIService.getClub(testingClub._id);
    assert.equal(returnedClub.games.length, testGames.length);
    for (let i = 0; i < testGames.length; i += 1) {
      assertSubset(testGames[i], returnedClub.games[i]);
    }
  });
});
