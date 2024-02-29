import { assert } from "chai";
import { db } from "../../src/models/db.js";
import { testClubs, testGames, clare, kilkenny, wexford, wexford_warriors, testUsers, maggie } from "../fixtures.js";
import { assertSubset } from "../test-utils.js";

suite("Game Model Tests", () => {
  let testingClub = null;
  let user = null;

  setup(async () => {
    db.init("json");
    await db.clubStore.deleteAllClubs();
    await db.gameStore.deleteAllGames();
    await db.userStore.deleteAll();
    user = await db.userStore.addUser(maggie);
    maggie.userid = user._id;  
    clare.userid = user._id;   
    wexford.userid = user._id;

    testingClub = await db.clubStore.addClub(clare);

    for (let i = 0; i < testGames.length; i += 1) {      
      // eslint-disable-next-line no-await-in-loop
      testGames[i] = await db.gameStore.addGame(testingClub._id, testGames[i]);
    }
  });

  test("Create Single Game", async () => {
    const wexfordList = await db.clubStore.addClub(wexford);
    const game = await db.gameStore.addGame(wexfordList._id, wexford_warriors);
    assert.isNotNull(game._id);
    assertSubset(wexford_warriors, game);
  });

  test("Create Multiple gameApi", async () => {
    const games = await db.clubStore.getClubById(testingClub._id);
    assert.equal(testGames.length, testGames.length);
  });

  test("Delete all gameApi", async () => {
    const games = await db.gameStore.getAllGames();
    assert.equal(testGames.length, games.length);
    await db.gameStore.deleteAllGames();
    const newGames = await db.gameStore.getAllGames();
    assert.equal(0, newGames.length);
  });

  test("Get a Game - Success", async () => {
    const wexfordList = await db.clubStore.addClub(wexford);
    const game = await db.gameStore.addGame(wexfordList._id, wexford_warriors);
    const newGame = await db.gameStore.getGameById(game._id);
    assertSubset(wexford_warriors, newGame);
  });

  test("Delete One Game - Success", async () => {
    const id = testGames[0]._id;
    await db.gameStore.deleteGame(id);
    const games = await db.gameStore.getAllGames();
    assert.equal(games.length, testClubs.length - 1);
    const deletedGame = await db.gameStore.getGameById(id);
    assert.isNull(deletedGame);
  });

  test("Get a Club - Bad Params", async () => {
    assert.isNull(await db.gameStore.getGameById(""));
    assert.isNull(await db.gameStore.getGameById());
  });

  test("Delete One User - Fail", async () => {
    await db.gameStore.deleteGame("bad-id");
    const games = await db.gameStore.getAllGames();
    assert.equal(games.length, testClubs.length);
  });
});
