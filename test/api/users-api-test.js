import { assert } from "chai";
import { assertSubset } from "../test-utils.js";
import { rugbyGamePOIService } from "./rugby-game-poi-service-service.js";
import { maggie, testUsers } from "../fixtures.js";
import { db } from "../../src/models/db.js";

const users = new Array(testUsers.length);

suite("User API tests", () => {
  setup(async () => {
    console.log(testUsers);
    db.init("json");
    await rugbyGamePOIService.deleteAllUsers();
    for (let i = 0; i < testUsers.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      users[0] = await rugbyGamePOIService.createUser(testUsers[i]);
    }
  });
  teardown(async () => {});

  test("create a user", async () => {
    const newUser = await rugbyGamePOIService.createUser(maggie);
    assertSubset(maggie, newUser);
    assert.isDefined(newUser._id);
  });
  test("get a user", async () => {
    const returnedUser = await rugbyGamePOIService.getUser(testUsers[0]._id);
    assert.deepEqual(testUsers[0], returnedUser);
  });

  test("get a user - bad id", async () => {
    try {
      const returnedUser = await rugbyGamePOIService.getUser("1234");
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No User with this id");
      // assert.equal(error.response.data.statusCode, 503);
    }
  });

  test("get a user - deleted user", async () => {
    await rugbyGamePOIService.deleteAllUsers();
    try {
      const returnedUser = await rugbyGamePOIService.getUser(testUsers[0]._id);
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No User with this id");
      assert.equal(error.response.data.statusCode, 404);
    }
  });
  
  test("delete all userApi", async () => {
    let returnedUsers = await rugbyGamePOIService.getAllUsers();
    assert.equal(returnedUsers.length, 3);
    await rugbyGamePOIService.deleteAllUsers();
    returnedUsers = await rugbyGamePOIService.getAllUsers();
    assert.equal(returnedUsers.length, 0);
  });
});
