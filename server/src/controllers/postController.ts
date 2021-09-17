import { Request, Response } from "express";
import PostModel from "../models/Post";
import UserModel from "../models/User";

const createPost = async (req: Request, res: Response) => {
  try {
    const post = await PostModel.findOne({ title: req.body.title });

    if (post) {
      return res.status(409).json({
        success: false,
        message: "Post with that title already exists.",
      });
    }

    const newPost = new PostModel(req.body);

    const user = await UserModel.findOne({ username: req.user });
    user.posts.push(newPost._id);
    newPost.postedBy = user._id;

    await newPost.save();
    await user.save();

    res.status(201).json({
      success: true,
      message: "Post created successfuly.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getPosts = async (req: Request, res: Response) => {
  try {
    const posts = await PostModel.find({}).populate("postedBy");
    res.status(201).json({
      success: true,
      message: "Successfuly got posts",
      data: posts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deletePost = async (req: Request, res: Response) => {
  try {
    const postTitle = req.params.title;
    const postToDelete = await PostModel.findOne({ title: postTitle }).populate("postedBy");

    if (!postToDelete)
      return res.status(404).json({
        success: false,
        message: "Post doesn't exist",
      });

    if (req.user === postToDelete.postedBy.username) {
      await postToDelete.deleteOne();
    } else {
      return res.status(401).json({
        success: false,
        message: "You cannot delete a post that was not posted by you.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Post deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export { createPost, getPosts, deletePost };
