import jwt from "jsonwebtoken";

const generateToken = (userName) => {
  return jwt.sign({ userName }, `${process.env.JWT_SECRET_KEY}`, {
    expiresIn: "300d",
  });
};

export default generateToken;