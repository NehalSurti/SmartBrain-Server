const prisma = require("../DB/prismaClient.js");
const { UserIdSchema } = require("../validation/userValidation.js");

exports.handleProfileGet = async (req, res) => {
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
      const { password: _, createdAt, ...others } = findUser;
      return res.status(200).json({ ...others, status: true });
    }
  } catch (error) {
    console.error("Error : ", error);
    return res.status(500).json({ message: "Server error.", status: false });
  }
};
