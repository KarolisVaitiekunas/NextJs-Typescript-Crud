import mongoose, { Document, PopulatedDoc } from "mongoose";
import IUser from "./User";

interface IPost extends Document {
  title: String;
  body: String;
  postId: String;
  postedBy: PopulatedDoc<typeof IUser & Document>;
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

  postId: {
    type: String,
    unique: true,
  },

  postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const PostModel = mongoose.model<IPost>("Post", postSchema);

// postSchema.pre<IPost>("save", function (next) {

// });

export default PostModel;
