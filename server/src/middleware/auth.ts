import { Request, Response, NextFunction } from "express";
import config from "config";
import jwt, { JwtPayload } from "jsonwebtoken";
import UserModel from "../models/User";

const secret = config.get<string>("secret");

/**
 * Get's cookie from request, if it validates it will call next() to allow to access the route.
 */
const validateToken = async (req: Request, res: Response, next: NextFunction) => {
  const accessToken = req.cookies["access-token"];
  if (!accessToken) return res.status(401).json({ success: false, message: "User not Authenticated" });

  try {
    const decodedUser: any = jwt.verify(accessToken, secret); //using any is not a perfect solution since you lose type checking
    const user = await UserModel.findById(decodedUser.id);
    //https://dev.to/kwabenberko/extend-express-s-request-object-with-typescript-declaration-merging-1nn5
    //we created req.user in index.d.ts, by default .user doesnt exist and typescript would not let us do it without modifying index.d.ts -25
    req.user = user.username;
    return next();
  } catch (error) {
    res.status(404).json({ success: false, message: "Invalid token" });
  }
};

export default validateToken;
