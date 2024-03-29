import { assert } from "chai";
import { rugbyGamePOIService } from "./rugby-game-poi-service.js";
import { decodeToken } from "../../src/api/jwt-utils.js";
import { maggie, maggieCredentials } from "../fixtures.js";

suite("Authentication API tests", async () => {
  setup(async () => {
    rugbyGamePOIService.clearAuth();
    await rugbyGamePOIService.createUser(maggie);
    await rugbyGamePOIService.authenticate(maggieCredentials);
    await rugbyGamePOIService.deleteAllUsers();
  });

  test("authenticate", async () => {
    const returnedUser = await rugbyGamePOIService.createUser(maggie);
    const response = await rugbyGamePOIService.authenticate(maggieCredentials);
    assert(response.success);
    assert.isDefined(response.token);
  });

  test("verify Token", async () => {
    const returnedUser = await rugbyGamePOIService.createUser(maggie);
    const response = await rugbyGamePOIService.authenticate(maggieCredentials);

    const userInfo = decodeToken(response.token);
    assert.equal(userInfo.email, returnedUser.email);
    assert.equal(userInfo.userId, returnedUser._id);
  });

  test("check Unauthorized", async () => {
    rugbyGamePOIService.clearAuth();
    try {
      await rugbyGamePOIService.deleteAllUsers();
      assert.fail("Route not protected");
    } catch (error) {
      console.log(error);
      assert.equal(error.response.data.statusCode, 401);
    }
  });
});