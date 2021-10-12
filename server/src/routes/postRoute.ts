import express from "express";
/**
 * Route that handles post CRUD operations.
 */
const router = express.Router();

import validateToken from "../middleware/auth";
import validate from "../utils/yup/validateSchema";

import { createPostSchema } from "../utils/yup/postSchemas";

import { createPost, getPosts, deletePost, updatePost } from "../controllers/postController";

router.post("/create", validate(createPostSchema), validateToken, createPost);
router.delete("/delete/:title", validateToken, deletePost);
router.patch("/update/:postId", validateToken, updatePost);
router.get("/getPosts", getPosts);

export default router;
