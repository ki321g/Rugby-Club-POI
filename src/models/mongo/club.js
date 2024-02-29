import Mongoose from "mongoose";

const { Schema } = Mongoose;

const clubSchema = new Schema({
  club: String,
  userid: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

export const Club = Mongoose.model("Club", clubSchema);
