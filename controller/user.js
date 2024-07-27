const prisma = require("../DB/prismaClient.js");
const {
  UserIdSchema,
  UserCreateSchema,
  UserUpdateSchema,
} = require("../validation/userValidation.js");

// Create User
exports.createUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    try {
      await UserCreateSchema.validate(req.body, { abortEarly: false });
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

      const { password: _, ...others } = user;
      return res.status(201).json({ ...others, status: true });
    }
  } catch (error) {
    console.error("Error : ", error);
    return res.status(500).json({ message: "Server error.", status: false });
  }
};

// Read User by ID
exports.getUser = async (req, res) => {
  try {
    const { id } = req.params;

    try {
      await UserIdSchema.validate({ id: Number(id) }, { abortEarly: false });
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
        id: Number(id),
      },
    });

    if (!findUser) {
      return res.status(400).json({
        message: "User Not found",
        status: false,
      });
    } else {
      const { password: _, ...others } = findUser;
      return res.status(200).json({ ...others, status: true });
    }
  } catch (error) {
    console.error("Error : ", error);
    return res.status(500).json({ message: "Server error.", status: false });
  }
};

// Update User
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    try {
      // Validate ID
      await UserIdSchema.validate({ id: Number(id) }, { abortEarly: false });

      // Validate update data
      await UserUpdateSchema.validate(updateData, { abortEarly: false });
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
        id: Number(id),
      },
    });

    if (!findUser) {
      return res.status(400).json({
        message: "User Not found",
        status: false,
      });
    } else {
      const updatedUser = await prisma.user.update({
        where: { id: Number(id) },
        data: updateData,
      });

      const { password: _, ...others } = updatedUser;
      return res.status(200).json({ ...others, status: true });
    }
  } catch (error) {
    console.error("Error : ", error);
    return res.status(500).json({ message: "Server error.", status: false });
  }
};

// Delete User
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    try {
      // Validate ID
      await UserIdSchema.validate({ id: Number(id) }, { abortEarly: false });
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
        id: Number(id),
      },
    });

    if (!findUser) {
      return res.status(400).json({
        message: "User Not found",
        status: false,
      });
    } else {
      await prisma.user.delete({
        where: { id: Number(id) },
      });

      return res
        .status(200)
        .json({ message: "User deleted successfully", status: true });
    }
  } catch (error) {
    console.error("Error : ", error);
    return res.status(500).json({ message: "Server error.", status: false });
  }
};
