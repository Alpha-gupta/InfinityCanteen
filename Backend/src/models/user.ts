import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  _id: mongoose.Types.ObjectId;
  auth0Id: string;
  email: string;
  name?: string;
  phoneNumber?: string;// addressLine1?: string;
  roomNumber?: string;                 //city?: string;
  HostelName?: string; // country?: string;
  College?: string;
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
  phoneNumber: String,
  roomNumber: String,
  HostelName: String,
  College: String,
});

const User = mongoose.model<IUser>("User", userSchema);

export default User;
