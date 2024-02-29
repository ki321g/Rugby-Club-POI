// import { string } from "joi";
import Joi from "joi";
const { string } = Joi;
import Mongoose from "mongoose";

const { Schema } = Mongoose;

const gameSchema = new Schema({
  name: String,
  address: String,
  phone: String,
  email: String,
  website: String,
  latitude: String,
  longitude: String,
  clubid: {
    type: Schema.Types.ObjectId,
    ref: "Club",
  },
});

export const Game = Mongoose.model("Game", gameSchema);
