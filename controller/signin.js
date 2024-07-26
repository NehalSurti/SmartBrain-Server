const prisma = require("../DB/prismaClient.js");
const { loginUserSchema } = require("../validation/userValidation.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

function generateToken(user) {
  const payload = {
    id: user.id,
    email: user.email,
  };
  const options = {
    expiresIn: "3d",
  };
  return jwt.sign(payload, process.env.jwtsecretKey, options);
}

exports.handleSignin = async (req, res) => {
  try {
    const { email, password } = req.body;

    try {
      await loginUserSchema.validate(req.body, { abortEarly: false });
    } catch (err) {
      if (err.name === "ValidationError") {
        return res.status(400).json({
          status: false,
          message: "Validation failed",
        });
      }
    }

    const findUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!findUser) {
      return res.status(401).json({
        message: "Incorrect Username or Password",
        status: false,
      });
    } else {
      const isMatch = await bcrypt.compare(password, findUser.password);
      if (isMatch) {
        const token = generateToken(findUser);
        const { password: _, ...others } = findUser;
        return res.status(200).json({ ...others, token, status: true });
      } else {
        return res.status(401).json({
          message: "Incorrect Username or Password",
          status: false,
        });
      }
    }
  } catch (error) {
    console.error("Error : ", error);
    return res.status(500).json({ message: "Server error.", status: false });
  }
};
