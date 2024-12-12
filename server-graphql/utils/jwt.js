import jwt from "jsonwebtoken";

const secret = process.env.SECRETKEY;

export const signToken = (payload) => jwt.sign(payload, secret);
export const verifyToken = (token) => jwt.verify(token, secret);
