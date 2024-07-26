const prisma = require("../DB/prismaClient.js");
const { registerUserSchema } = require("../validation/userValidation.js");
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

exports.handleRegister = async (req, res) => {
  try {
    const { email, password } = req.body;

    try {
      await registerUserSchema.validate(req.body, { abortEarly: false });
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

    if (findUser) {
      return res
        .status(400)
        .json({ message: "Email already registered.", status: false });
    } else {
      const saltRounds = 10;

      const hashedPassword = await bcrypt.hash(password, saltRounds);

      const newUser = { ...req.body, password: hashedPassword };

      const user = await prisma.user.create({
        data: {
          ...newUser,
        },
      });

      const token = generateToken(user);
      const { password: _, ...others } = user;
      return res.status(201).json({ ...others, token, status: true });
      // res.status(201).json(true);
    }
  } catch (error) {
    console.error("Error : ", error);
    return res.status(500).json({ message: "Server error.", status: false });
  }
};
