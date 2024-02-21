import { EventEmitter } from "events";
import { assert } from "chai";
import { assertSubset } from "../test-utils.js";
import { rugbyClubPOIService } from "./rugby-club-poi-service-service.js";
import { maggie, wexford, testCounties } from "../fixtures.js";

EventEmitter.setMaxListeners(25);

suite("County API tests", () => {
  let user = null;

  setup(async () => {
    await rugbyClubPOIService.deleteAllCounties();
    await rugbyClubPOIService.deleteAllUsers();
    user = await rugbyClubPOIService.createUser(maggie);
    maggie.userid = user._id;
  });

  teardown(async () => {});

  test("Create County", async () => {
    const returnedCounty = await rugbyClubPOIService.createCounty(wexford);
    assert.isNotNull(returnedCounty);
    assertSubset(wexford, returnedCounty);
  });

  test("Delete a County", async () => {
    const county = await rugbyClubPOIService.createCounty(wexford);
    const response = await rugbyClubPOIService.deleteCounty(county._id);
    assert.equal(response.status, 204);
    try {
      const returnedCounty = await rugbyClubPOIService.getCounty(county.id);
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No County with this id", "Incorrect Response Message");
    }
  });

  test("Create Multiple Counties", async () => {
    for (let i = 0; i < testCounties.length; i += 1) {
      testCounties[i].userid = user._id;
      // eslint-disable-next-line no-await-in-loop
      await rugbyClubPOIService.createCounty(testCounties[i]);
    }
    let returnedCounties = await rugbyClubPOIService.getAllCounties();
    assert.equal(returnedCounties.length, testCounties.length);
    await rugbyClubPOIService.deleteAllCounties();
    returnedCounties = await rugbyClubPOIService.getAllCounties();
    assert.equal(returnedCounties.length, 0);
  });

  test("Remove non-existant Counties", async () => {
    try {
      const response = await rugbyClubPOIService.deleteCounty("not an id");
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No County with this id", "Incorrect Response Message");
    }
  });
});
