const { ClarifaiStub, grpc } = require("clarifai-nodejs-grpc");
const { UserIdSchema } = require("../validation/userValidation.js");
const prisma = require("../DB/prismaClient.js");
const dotenv = require("dotenv");
dotenv.config();

const stub = ClarifaiStub.grpc();

// This will be used by every Clarifai endpoint call
const metadata = new grpc.Metadata();
metadata.set("authorization", "Key " + process.env.PAT);

exports.handleApiCall = async (req, res) => {
  const { input } = req.body;

  if (!input) {
    return res
      .status(400)
      .json({ message: "Input URL is required.", status: false });
  }

  try {
    const response = await new Promise((resolve, reject) => {
      stub.PostModelOutputs(
        {
          user_app_id: {
            user_id: process.env.USER_ID,
            app_id: process.env.APP_ID,
          },
          model_id: process.env.MODEL_ID,
          version_id: process.env.MODEL_VERSION_ID, // This is optional. Defaults to the latest model version
          inputs: [
            {
              data: {
                image: { url: req.body.input, allow_duplicate_url: true },
              },
            },
          ],
        },
        metadata,
        (err, response) => {
          if (err) {
            return reject(err);
          }
          if (response.status.code !== 10000) {
            return reject(
              new Error(
                `Post model outputs failed, status: ${response.status.description}`
              )
            );
          }
          resolve(response);
        }
      );
    });

    // Since we have one input, one output will exist here
    const output = response.outputs[0];

    console.log("Predicted concepts:");
    for (const concept of output.data.concepts) {
      console.log(concept.name + " " + concept.value);
    }
    return res.status(200).json({ response, status: true });
  } catch (error) {
    console.error("Error : ", error);
    return res.status(500).json({ message: "Server error.", status: false });
  }
};

exports.handleImage = async (req, res) => {
  try {
    const { id } = req.body;

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

    const updatedUserEntries = await prisma.user.update({
      where: {
        id: Number(id),
      },
      data: {
        entries: {
          increment: 1,
        },
      },
    });

    const { entries, ...others } = updatedUserEntries;
    return res.status(200).json({ entries, status: true });
  } catch (error) {
    console.error("Error : ", error);
    return res.status(500).json({ message: "Server error.", status: false });
  }
};
