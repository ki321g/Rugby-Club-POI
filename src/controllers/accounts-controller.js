import { UserSpec, UserCredentialsSpec } from "../models/joi-schemas.js";
import { db } from "../models/db.js";

export const accountsController = {
  index: {
    auth: {
      mode: "try",
    },
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const users = await db.userStore.getAllUsers();
      const adminUsers = users.filter((user) => user.accountType === "admin");
      const adminUserCount = adminUsers.length;
      console.log(adminUsers);
      console.log(adminUserCount);
      console.log(loggedInUser);
      let UserLoggedIn = Boolean(loggedInUser);
      console.log("UserLoggedIn: " + UserLoggedIn);
      if (adminUserCount == 0) {
        console.log("Admin users found. adminUserCount: " + adminUserCount);

        const viewData = {
          title: "RugbyGamePOI Setup",
          user: request.auth.credentials,
          UserLoggedIn: UserLoggedIn,
        };

        return h.redirect("/signup");
      } else {
        console.log("No Admin Users found. adminUserCount: " + adminUserCount);

        const viewData = {
          title: "Welcome to RugbyGamePOI",
          user: request.auth.credentials,
          UserLoggedIn: UserLoggedIn,
        };
        return h.view("main", viewData);
      }
    },
  },
  showSignup: {
    auth: false,
    handler: function (request, h) {
      return h.view("signup-view", { title: "Sign up for RugbyGamePOI" });
    },
  },
  signup: {
    auth: false,
    validate: {
      payload: UserSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("signup-view", { title: "Sign up error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const user = request.payload;
      // console.log(user);
      await db.userStore.addUser(user, "user");
      return h.redirect("/login");
    },
  },
  signupAdmin: {
    auth: false,
    validate: {
      payload: UserSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("signup-view", { title: "Sign up error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const user = request.payload;
      // console.log(user);
      await db.userStore.addUser(user, "admin");
      return h.redirect("/login");
    },
  },
  showLogin: {
    auth: false,
    handler: function (request, h) {
      return h.view("login-view", { title: "Login to RugbyGamePOI" });
    },
  },
  login: {
    auth: false,
    validate: {
      payload: UserCredentialsSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("login-view", { title: "Log in error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const { email, password } = request.payload;
      const user = await db.userStore.getUserByEmail(email);
      if (!user || user.password !== password) {
        return h.redirect("/");
      }
      request.cookieAuth.set({ id: user._id });
      return h.redirect("/dashboard");
    },
  },
  logout: {
    handler: function (request, h) {
      request.cookieAuth.clear();
      return h.redirect("/");
    },
  },

  async validate(request, session) {
    const user = await db.userStore.getUserById(session.id);
    if (!user) {
      return { isValid: false };
    }
    return { isValid: true, credentials: user };
  },
};
