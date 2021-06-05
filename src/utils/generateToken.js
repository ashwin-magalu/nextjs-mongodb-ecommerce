import jwt from "jsonwebtoken";

export const createAccessToken = (payload) => {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
  });
};

export const createRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });
};

/* passwordsgenerator.net --> This is used to generate ACCESS_TOKEN_SECRET (password length of) and REFRESH_TOKEN_SECRET (password length of 80) */
