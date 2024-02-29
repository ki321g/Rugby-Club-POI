import { assert } from "chai";
import { db } from "../../src/models/db.js";
import { maggie, testClubs, wexford } from "../fixtures.js";
import { assertSubset } from "../test-utils.js";

suite("Club Model Tests", () => {
  let user = null;

  setup(async () => {
    db.init("json");
    await db.clubStore.deleteAllClubs();
    await db.userStore.deleteAll();
    user = await db.userStore.addUser(maggie);
    maggie.userid = user._id;  
   
    for (let i = 0; i < testClubs.length; i += 1) {
      testClubs[i].userid = user._id;
      // eslint-disable-next-line no-await-in-loop
      testClubs[i] = await db.clubStore.addClub(testClubs[i]);
    }
  });

  test("Create a Club", async () => {    
    wexford.userid = user._id;
    const club = await db.clubStore.addClub(wexford);
    assertSubset(wexford, club);
    assert.isDefined(club._id);
  });

  test("Delete all Clubs", async () => {
    let returnedClubs = await db.clubStore.getAllClubs();
    assert.equal(returnedClubs.length, 3);
    await db.clubStore.deleteAllClubs();
    returnedClubs = await db.clubStore.getAllClubs();
    assert.equal(returnedClubs.length, 0);
  });

  test("Get a Club - Success", async () => {
    const club = await db.clubStore.addClub(wexford);
    const returnedClub = await db.clubStore.getClubById(club._id);
    assertSubset(wexford, club);
  });

  test("Delete One Club - Success", async () => {
    const id = testClubs[0]._id;
    await db.clubStore.deleteClubById(id);
    const returnedClubs = await db.clubStore.getAllClubs();
    assert.equal(returnedClubs.length, testClubs.length - 1);
    const deletedClub = await db.clubStore.getClubById(id);
    assert.isNull(deletedClub);
  });

  test("Get a Club - Bad Params", async () => {
    assert.isNull(await db.clubStore.getClubById(""));
    assert.isNull(await db.clubStore.getClubById());
  });

  test("Delete One Club - Fail", async () => {
    await db.clubStore.deleteClubById("bad-id");
    const allClubs = await db.clubStore.getAllClubs();
    assert.equal(testClubs.length, allClubs.length);
  });
});
