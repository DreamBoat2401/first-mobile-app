import { verifyToken } from "./jwt.js";
import { UserModel } from "../models/userModel.js";

const auth = async (req) => {
  const { authorization } = req.headers;

  if (!authorization) throw new Error("Unauthorized");
  const token = authorization.split(" ")[1];

  const payload = verifyToken(token);

  const user = await UserModel.findByEmail(payload.email);

  if (!user) throw new Error("Unauthorized");

  return {
    id: user._id,
    email: user.email,
    username: user.username,
  };
};

export { auth };
