// import { string } from "joi";
import Joi from "joi";
const { string } = Joi;
import Mongoose from "mongoose";

const { Schema } = Mongoose;

const clubSchema = new Schema({
  name: String,
  address: String,
  phone: String,
  email: String,
  website: String,
  latitude: String,
  longitude: String,
  countyid: {
    type: Schema.Types.ObjectId,
    ref: "County",
  },
});

export const Club = Mongoose.model("Club", clubSchema);
