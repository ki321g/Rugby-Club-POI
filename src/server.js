// import "dotenv/config";
import dotenv from "dotenv";
import path from "path";
import Joi from "joi";
import Hapi from "@hapi/hapi";
import Vision from "@hapi/vision";
import Cookie from "@hapi/cookie";
import Handlebars from "handlebars";
import { fileURLToPath } from "url";
import { webRoutes } from "./web-routes.js";
import { apiRoutes } from "./api-routes.js";
import { db } from "./models/db.js";
import { accountsController } from "./controllers/accounts-controller.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const result = dotenv.config();
if (result.error) {
  console.log(result.error.message);
  process.exit(1);
}

async function init() {
  try {
    const server = Hapi.server({
      port: process.env.PORT,
      host: "localhost",
    });
    await server.register(Vision);
    await server.register(Cookie);
    server.validator(Joi);

    server.auth.strategy("session", "cookie", {
      cookie: {
        name: process.env.COOKIE_NAME,
        password: process.env.COOKIE_PASSWORD,
        isSecure: false,
      },
      redirectTo: "/",
      validate: accountsController.validate,
    });
    server.auth.default("session");

    server.views({
      engines: {
        hbs: Handlebars,
      },
      relativeTo: __dirname,
      path: "./views",
      layoutPath: "./views/layouts",
      partialsPath: "./views/partials",
      layout: true,
      isCached: false,
    });

    db.init("mongo");
    server.route(webRoutes);
    server.route(apiRoutes);
    await server.start();
    console.log("Server running on %s", server.info.uri);
  } catch (err) {
    console.error("Error in init function:", err.stack || err);
  }
}

process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection at:", err.stack || err);
  process.exit(1);
});

init();
