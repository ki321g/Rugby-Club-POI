import { assert } from "chai";
import { assertSubset } from "../test-utils.js";
import { rugbyGamePOIService } from "./rugby-game-poi-service.js";
import { maggie, maggieCredentials, testUsers } from "../fixtures.js";
import { db } from "../../src/models/db.js";

const users = new Array(testUsers.length);

suite("User API tests", () => {
  setup(async () => {
    //db.init("json");
    // db.init("mongo");
    rugbyGamePOIService.clearAuth();
    await rugbyGamePOIService.createUser(maggie);
    await rugbyGamePOIService.authenticate(maggieCredentials);
    await rugbyGamePOIService.deleteAllUsers();
    for (let i = 0; i < testUsers.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      users[0] = await rugbyGamePOIService.createUser(testUsers[i]);
    }
    await rugbyGamePOIService.createUser(maggie);
    await rugbyGamePOIService.authenticate(maggieCredentials);
  });
  teardown(async () => {});

  test("create a user", async () => {
    const newUser = await rugbyGamePOIService.createUser(maggie);
    assertSubset(maggie, newUser);
    assert.isDefined(newUser._id);
  });
  test("get a user", async () => {
    const returnedUser = await rugbyGamePOIService.getUser(users[0]._id);
    assert.deepEqual(users[0], returnedUser);
  });

  test("get a user - bad id", async () => {
    try {
      const returnedUser = await rugbyGamePOIService.getUser("1234");
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No User with this id");
      assert.equal(error.response.data.statusCode, 503);
    }
  });

  test("get a user - deleted user", async () => {    
    await rugbyGamePOIService.deleteAllUsers();
    await rugbyGamePOIService.createUser(maggie);
    await rugbyGamePOIService.authenticate(maggieCredentials);
    try {
      const returnedUser = await rugbyGamePOIService.getUser(users[0]._id);
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No User with this id");
      assert.equal(error.response.data.statusCode, 404);
    }
  });

  test("delete all userApi", async () => {
    let returnedUsers = await rugbyGamePOIService.getAllUsers();
    assert.equal(returnedUsers.length, 5);
    await rugbyGamePOIService.deleteAllUsers();
    await rugbyGamePOIService.createUser(maggie);
    await rugbyGamePOIService.authenticate(maggieCredentials);
    returnedUsers = await rugbyGamePOIService.getAllUsers();
    const qtyUsers = returnedUsers.length - 1;
    assert.equal(qtyUsers, 1);
  });
});
