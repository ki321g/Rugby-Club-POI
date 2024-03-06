import Joi from "joi";
const { string } = Joi;
import Mongoose from "mongoose";

const { Schema } = Mongoose;

const gameSchema = new Schema({
  home: String,
  homescore: String,
  awayscore: String,
  away: String,
  gametime: String,
  gamelocation: String,
  clubid: {
    type: Schema.Types.ObjectId,
    ref: "Club",
  },
});

export const Game = Mongoose.model("Game", gameSchema);
