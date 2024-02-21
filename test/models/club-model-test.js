import { assert } from "chai";
import { db } from "../../src/models/db.js";
import { testCounties, testClubs, kilkenny, wexford, wexford_warriors, testUsers, maggie } from "../fixtures.js";
import { assertSubset } from "../test-utils.js";

suite("Club Model Tests", () => {
  let kilkennyList = null;

  setup(async () => {
    db.init("json");
    await db.countyStore.deleteAllCounties();
    await db.clubStore.deleteAllClubs();
    kilkennyList = await db.countyStore.addCounty(kilkenny);
    for (let i = 0; i < testClubs.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      testClubs[i] = await db.clubStore.addClub(kilkennyList._id, testClubs[i]);
    }
  });

  test("Create Single Club", async () => {
    const wexfordList = await db.countyStore.addCounty(wexford);
    const club = await db.clubStore.addClub(wexfordList._id, wexford_warriors);
    assert.isNotNull(club._id);
    assertSubset(wexford_warriors, club);
  });

  test("Create Multiple clubApi", async () => {
    const clubs = await db.countyStore.getCountyById(kilkennyList._id);
    assert.equal(testClubs.length, testClubs.length);
  });

  test("Delete all clubApi", async () => {
    const clubs = await db.clubStore.getAllClubs();
    assert.equal(testClubs.length, clubs.length);
    await db.clubStore.deleteAllClubs();
    const newClubs = await db.clubStore.getAllClubs();
    assert.equal(0, newClubs.length);
  });

  test("Get a Club - Success", async () => {
    const wexfordList = await db.countyStore.addCounty(wexford);
    const club = await db.clubStore.addClub(wexfordList._id, wexford_warriors);
    const newClub = await db.clubStore.getClubById(club._id);
    assertSubset(wexford_warriors, newClub);
  });

  test("Delete One Club - Success", async () => {
    const id = testClubs[0]._id;
    await db.clubStore.deleteClub(id);
    const clubs = await db.clubStore.getAllClubs();
    assert.equal(clubs.length, testCounties.length - 1);
    const deletedClub = await db.clubStore.getClubById(id);
    assert.isNull(deletedClub);
  });

  test("Get a County - Bad Params", async () => {
    assert.isNull(await db.clubStore.getClubById(""));
    assert.isNull(await db.clubStore.getClubById());
  });

  test("Delete One User - Fail", async () => {
    await db.clubStore.deleteClub("bad-id");
    const clubs = await db.clubStore.getAllClubs();
    assert.equal(clubs.length, testCounties.length);
  });
});
