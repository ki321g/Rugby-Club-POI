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
      let UserLoggedIn = Boolean(loggedInUser);
      let CreateSuperAdmin = false;
      
      if (superAdminUserCount == 0) {
        CreateSuperAdmin = true;
        const viewData = {
          title: "RugbyGamePOI Setup",
          user: request.auth.credentials,
          UserLoggedIn: UserLoggedIn,
          CreateSuperAdmin: CreateSuperAdmin,
        };

        return h.view("signup-view", viewData);
      } else {
        const viewData = {
          title: "Welcome to RugbyGamePOI",
          user: request.auth.credentials,
          UserLoggedIn: UserLoggedIn,
        };
        return h.view("main", viewData);
      }
    },
  },
  // showSignup: {
  //   auth: false,
  //   handler: function (request, h) {
  //     return h.view("signup-view", { title: "Sign up for RugbyGamePOI" });
  //   },
  // },
  showSignup: {
    auth: {
      mode: "try",
    },
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const users = await db.userStore.getAllUsers();
      const superAdminUser = users.filter((user) => user.accountType === "superadmin");
      // const adminUsers = users.filter((user) => user.accountType === "admin" || user.accountType === "superadmin");
      const superAdminUserCount = superAdminUser.length;
      let UserLoggedIn = Boolean(loggedInUser);
      let CreateSuperAdmin = false;
      
      if (superAdminUserCount == 0) {
        CreateSuperAdmin = true;
        const viewData = {
          title: "RugbyGamePOI Setup",
          user: request.auth.credentials,
          UserLoggedIn: UserLoggedIn,
          CreateSuperAdmin: CreateSuperAdmin,
        };

        return h.view("signup-view", viewData);
      } else {
        return h.view("signup-view", { title: "Sign up for RugbyGamePOI" });
      }
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
  // showLogin: {
  //   auth: false,
  //   handler: function (request, h) {
  //     return h.view("login-view", { title: "Login to RugbyGamePOI" });
  //   },
  // },  
  showLogin: {
    auth: {
      mode: "try",
    },
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const users = await db.userStore.getAllUsers();
      const superAdminUser = users.filter((user) => user.accountType === "superadmin");
      // const adminUsers = users.filter((user) => user.accountType === "admin" || user.accountType === "superadmin");
      const superAdminUserCount = superAdminUser.length;
      let UserLoggedIn = Boolean(loggedInUser);
      let CreateSuperAdmin = false;
      
      if (superAdminUserCount == 0) {
        CreateSuperAdmin = true;
        const viewData = {
          title: "RugbyGamePOI Setup",
          user: request.auth.credentials,
          UserLoggedIn: UserLoggedIn,
          CreateSuperAdmin: CreateSuperAdmin,
        };

        return h.view("signup-view", viewData);
      } else {
        return h.view("login-view", { title: "Login to RugbyGamePOI" });
      }
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
      if (user.accountType === "superadmin") {
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
  updateUser: {
    validate: {
      payload: UserSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("edit-user-view", { title: "Edit user error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const userID = request.params.id;
      const updatedUser = request.payload;
      await db.userStore.updateUser(userID, updatedUser);
      return h.redirect("/admin");
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
