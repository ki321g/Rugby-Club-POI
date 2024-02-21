import { assert } from "chai";
import { db } from "../../src/models/db.js";
import { testCounties, wexford } from "../fixtures.js";
import { assertSubset } from "../test-utils.js";

suite("County Model Tests", () => {
  setup(async () => {
    db.init("json");
    await db.countyStore.deleteAllCounties();
    for (let i = 0; i < testCounties.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      testCounties[i] = await db.countyStore.addCounty(testCounties[i]);
    }
  });

  test("Create a County", async () => {
    const county = await db.countyStore.addCounty(wexford);
    assertSubset(wexford, county);
    assert.isDefined(county._id);
  });

  test("delete all playlists", async () => {
    let returnedCounties = await db.countyStore.getAllCounties();
    assert.equal(returnedCounties.length, 3);
    await db.countyStore.deleteAllCounties();
    returnedCounties = await db.countyStore.getAllCounties();
    assert.equal(returnedCounties.length, 0);
  });

  test("Get a County - Success", async () => {
    const county = await db.countyStore.addCounty(wexford);
    const returnedCounty = await db.countyStore.getCountyById(county._id);
    assertSubset(wexford, county);
  });

  test("Delete One County - Success", async () => {
    const id = testCounties[0]._id;
    await db.countyStore.deleteCountyById(id);
    const returnedCounties = await db.countyStore.getAllCounties();
    assert.equal(returnedCounties.length, testCounties.length - 1);
    const deletedCounty = await db.countyStore.getCountyById(id);
    assert.isNull(deletedCounty);
  });

  test("Get a County - Bad Params", async () => {
    assert.isNull(await db.countyStore.getCountyById(""));
    assert.isNull(await db.countyStore.getCountyById());
  });

  test("Delete One County - Fail", async () => {
    await db.countyStore.deleteCountyById("bad-id");
    const allCounties = await db.countyStore.getAllCounties();
    assert.equal(testCounties.length, allCounties.length);
  });
});