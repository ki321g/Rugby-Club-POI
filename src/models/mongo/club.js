import Mongoose from "mongoose";

const { Schema } = Mongoose;

const clubSchema = new Schema({
  club: String,
  address: String, 
  phone: String,
  email: String,
  website: String,
  latitude: String,
  longitude: String,
  description: String,
  category: String,
  img: String,
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

export const Club = Mongoose.model("Club", clubSchema);
