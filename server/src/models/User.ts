import mongoose, { Document, PopulatedDoc } from "mongoose";
import bcrypt from "bcrypt";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import config from "config";
import IPost from "./Post";

const secret = config.get<string>("secret");

interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  resetPasswordToken: String;
  resetPasswordExpire: Number;
  posts: PopulatedDoc<typeof IPost & Document>;
  // posts: Array<{ type: mongoose.Schema.Types.ObjectId; ref: String }>;
  validatePassword: (password: string) => Promise<boolean>;
  createAccessToken: () => string;
  createResetToken: () => string;
}

//adding <IUser> will allow us to access this.password
const userSchema = new mongoose.Schema<IUser>({
  username: {
    type: String,
    unique: true,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    select: false, //not gonna select password by default
  },
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

userSchema.pre<IUser>("save", async function (next) {
  // const user = this;
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(this.password, salt);
  this.password = hash;
  next();
});

userSchema.methods.validatePassword = async function (password): Promise<boolean> {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.createAccessToken = function (): string {
  return jwt.sign({ id: this._id }, secret);
};

userSchema.methods.createResetToken = function (): string {
  const resetToken = crypto.randomBytes(20).toString("hex");
  this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
  this.resetPasswordExpire = Date.now() + 10 * (60 * 1000); //date in future
  return resetToken;
};

const UserModel = mongoose.model<IUser>("User", userSchema);
export default UserModel;
