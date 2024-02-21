import { EventEmitter } from "events";
import { assert } from "chai";
import { assertSubset } from "../test-utils.js";
import { rugbyClubPOIService } from "./rugby-club-poi-service-service.js";
import { maggie, wexford, testClubs, kilkenny } from "../fixtures.js";

EventEmitter.setMaxListeners(25);

suite("Club API tests", () => {
  let user = null;
  let testingCounty = null;

  setup(async () => {
    await rugbyClubPOIService.deleteAllCounties();
    await rugbyClubPOIService.deleteAllUsers();
    await rugbyClubPOIService.deleteAllClubs();
    user = await rugbyClubPOIService.createUser(maggie);
    wexford.userid = user._id;
    testingCounty = await rugbyClubPOIService.createCounty(wexford);    
  });

  teardown(async () => {});

  test("Create Club", async () => {
    console.log("THIS IS ME LOGGING TESTING CLUB");
    console.log(testingCounty);
    const returnedClub = await rugbyClubPOIService.createClub(testingCounty._id, kilkenny);
    assertSubset(kilkenny, returnedClub);
  });

  test("Create Multiple Clubs", async () => {
    for (let i = 0; i < testClubs.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await rugbyClubPOIService.createClub(testingCounty._id, testClubs[i]);
    }
    const returnedClubs = await rugbyClubPOIService.getAllClubs();
    assert.equal(returnedClubs.length, testClubs.length);
    for (let i = 0; i < returnedClubs.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      const club = await rugbyClubPOIService.getClub(returnedClubs[i]._id);
      assertSubset(club, returnedClubs[i]);
    }
  });

  test("Delete clubApi", async () => {
    for (let i = 0; i < testClubs.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await rugbyClubPOIService.createClub(testingCounty._id, testClubs[i]);
    }
    let returnedClubs = await rugbyClubPOIService.getAllClubs();
    assert.equal(returnedClubs.length, testClubs.length);
    for (let i = 0; i < returnedClubs.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      const club = await rugbyClubPOIService.deleteClub(returnedClubs[i]._id);
    }
    returnedClubs = await rugbyClubPOIService.getAllClubs();
    assert.equal(returnedClubs.length, 0);
  });

  test("Denormalised County", async () => {
    for (let i = 0; i < testClubs.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await rugbyClubPOIService.createClub(testingCounty._id, testClubs[i]);
    }
    const returnedCounty = await rugbyClubPOIService.getCounty(testingCounty._id);
    assert.equal(returnedCounty.clubs.length, testClubs.length);
    for (let i = 0; i < testClubs.length; i += 1) {
      assertSubset(testClubs[i], returnedCounty.clubs[i]);
    }
  });
});
