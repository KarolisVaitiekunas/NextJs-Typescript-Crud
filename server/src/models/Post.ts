import mongoose, { Document, PopulatedDoc } from "mongoose";
import IUser from "./User";

interface IPost extends Document {
  title: string;
  body: string;
  postedBy: PopulatedDoc<typeof IUser & Document>;
  // postedBy: { type: mongoose.Schema.Types.ObjectId; ref: string };

  // image: {
  //   filename: string;
  //   filepath: string;
  //   mimetype: string;
  //   size: string;
  // };
}

const postSchema = new mongoose.Schema<IPost>({
  title: {
    type: String,
    unique: true,
    required: [true, "title is required"],
  },
  body: {
    type: String,
    required: [true, "body is required"],
  },
  // image: {
  //   filename: String,
  //   filepath: String,
  //   mimetype: String,
  //   size: String,
  // },
  postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const PostModel = mongoose.model<IPost>("Post", postSchema);
export default PostModel;
