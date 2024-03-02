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
      const superAdminUser = users.filter((user) => user.accountType === "superadmin");
      // const adminUsers = users.filter((user) => user.accountType === "admin" || user.accountType === "superadmin");
      const superAdminUserCount = superAdminUser.length;
      console.log(superAdminUser);
      console.log(superAdminUserCount);
      console.log(loggedInUser);
      let UserLoggedIn = Boolean(loggedInUser);
      let CreateSuperAdmin = false;
      console.log("CreateSuperAdmin: " + CreateSuperAdmin);
      console.log("UserLoggedIn: " + UserLoggedIn);
      if (superAdminUserCount == 0) {
        console.log("No Admin Users found. superAdminUserCount: " + superAdminUserCount);
        CreateSuperAdmin = true;
        console.log("CreateSuperAdmin: " + CreateSuperAdmin);
        const viewData = {
          title: "RugbyGamePOI Setup",
          user: request.auth.credentials,
          UserLoggedIn: UserLoggedIn,
          CreateSuperAdmin: CreateSuperAdmin,
        };

        return h.view("signup-view", viewData);
        // return h.redirect("/signup", viewData);
      } else {
        console.log("Admin users found. superAdminUserCount: " + superAdminUserCount);

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
      const checkUsers = await db.userStore.getAllUsers();
      const superAdminUser = checkUsers.filter((user) => user.accountType === "superadmin");

      if (superAdminUser.length == 0) {
        user.accountType = "superadmin";
      } else {
        user.accountType = "user";
      }
      // console.log(user);
      await db.userStore.addUser(user);
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
      console.log("Kieron is testing here now.");
      console.log(user);

      request.cookieAuth.set({ id: user._id });
      if (user.accountType === "superadmin") {
        console.log("Super Admin User Logged In");
        return h.redirect("/admin");
      }

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
