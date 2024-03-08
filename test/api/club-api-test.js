import { EventEmitter } from "events";
import { assert } from "chai";
import { assertSubset } from "../test-utils.js";
import { rugbyGamePOIService } from "./rugby-game-poi-service.js";
import { maggie, maggieCredentials, wexford, testClubs } from "../fixtures.js";
import { db } from "../../src/models/db.js";

// const clubs = new Array(testClubs.length);
EventEmitter.setMaxListeners(25);

suite("Club API tests", () => {
  let user = null;
  let userId = null;

  setup(async () => {
    // db.init("json");
    // db.init("mongo");
    rugbyGamePOIService.clearAuth();
    user = await rugbyGamePOIService.createUser(maggie);
    await rugbyGamePOIService.authenticate(maggieCredentials);
    await rugbyGamePOIService.deleteAllClubs();
    await rugbyGamePOIService.deleteAllUsers();
    user = await rugbyGamePOIService.createUser(maggie);
    await rugbyGamePOIService.authenticate(maggieCredentials);
    // wexford.userid = user._id;
  });

  teardown(async () => {});

  test("Create Club", async () => {
    const returnedClub = await rugbyGamePOIService.createClub(wexford);
    assert.isNotNull(returnedClub);
    assertSubset(wexford, returnedClub);
  });

  test("Delete a Club", async () => {
    const club = await rugbyGamePOIService.createClub(wexford);
    const response = await rugbyGamePOIService.deleteClub(club._id);
    assert.equal(response.status, 204);
    try {
      const returnedClub = await rugbyGamePOIService.getClub(club.id);
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No Club with this id", "Incorrect Response Message");
    }
  });

  test("Create Multiple Clubs", async () => {
    for (let i = 0; i < testClubs.length; i += 1) {
      // testClubs[i].userid = user._id;
      // eslint-disable-next-line no-await-in-loop
      await rugbyGamePOIService.createClub(testClubs[i]);
    }
    let returnedClubs = await rugbyGamePOIService.getAllClubs();
    assert.equal(returnedClubs.length, testClubs.length);
    await rugbyGamePOIService.deleteAllClubs();
    returnedClubs = await rugbyGamePOIService.getAllClubs();
    assert.equal(returnedClubs.length, 0);
  });

  test("Remove non-existant Clubs", async () => {
    try {
      const response = await rugbyGamePOIService.deleteClub("not an id");
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No Club with this id", "Incorrect Response Message");
    }
  });
});
