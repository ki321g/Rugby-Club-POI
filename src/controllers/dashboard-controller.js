import { PlaylistSpec } from "../models/joi-schemas.js";
import { db } from "../models/db.js";

export const dashboardController = {
  index: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const playlists = await db.playlistStore.getUserPlaylists(loggedInUser._id);
      const viewData = {
        title: "Playtime Dashboard",
        user: loggedInUser,
        playlists: playlists,
      };
      try {
        return h.view("dashboard-view", viewData);
      } catch (err) {
        console.error("Error in GET / route:", err.stack || err);
        throw err;
      }
    },
  },

  addPlaylist: {
    validate: {
      payload: PlaylistSpec,
      options: { abortEarly: false },
      failAction: async function (request, h, error) {
        const playlists = await db.playlistStore.getUserPlaylists(request.auth.credentials._id);
        return h.view("dashboard-view", { title: "Add Playlist error", playlists: playlists, errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const newPlayList = {
        userid: loggedInUser._id,
        title: request.payload.title,
      };
      await db.playlistStore.addPlaylist(newPlayList);
      return h.redirect("/dashboard");
    },
  },
    
  deleteplaylist: {
    handler: async function (request, h) {
      const playlist = await db.playlistStore.getPlaylistById(request.params.id);      
      await db.playlistStore.deletePlaylistById(playlist._id);
      return h.redirect("/dashboard");
    },
  },
};