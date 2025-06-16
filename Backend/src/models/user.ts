import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  _id: mongoose.Types.ObjectId;
  auth0Id: string;
  email: string;
  name?: string;
  addressLine1?: string;
  city?: string;
  country?: string;
}

const userSchema = new Schema<IUser>({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    auto: true, // optional: let MongoDB generate _id
  },
  auth0Id: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  name: String,
  addressLine1: String,
  city: String,
  country: String,
});

const User = mongoose.model<IUser>("User", userSchema);

export default User;
