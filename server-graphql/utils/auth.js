import { verifyToken } from "./jwt.js";
import { UserModel } from "../models/userModel.js";

const auth = async (req) => {
  const { authorization } = req.headers;
  if (!authorization) return null;
  const token = authorization.split(" ")[1];

  const payload = verifyToken(token);

  const user = await UserModel.findByEmail(payload.email);
  if (!user) return null;
  return {
    id: user._id,
    email: user.email,
  };
};

export { auth };
