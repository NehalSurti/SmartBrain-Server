const dotenv = require("dotenv");
dotenv.config();
const { ClarifaiStub, grpc } = require("clarifai-nodejs-grpc");

const stub = ClarifaiStub.grpc();

// This will be used by every Clarifai endpoint call
const metadata = new grpc.Metadata();
metadata.set("authorization", "Key " + process.env.PAT);

exports.handleApiCall = (req, res) => {
  stub.PostModelOutputs(
    {
      user_app_id: {
        user_id: process.env.USER_ID,
        app_id: process.env.APP_ID,
      },
      model_id: process.env.MODEL_ID,
      version_id: process.env.MODEL_VERSION_ID, // This is optional. Defaults to the latest model version
      inputs: [
        { data: { image: { url: req.body.input, allow_duplicate_url: true } } },
      ],
    },
    metadata,
    (err, response) => {
      if (err) {
        throw new Error(err);
      }

      if (response.status.code !== 10000) {
        throw new Error(
          "Post model outputs failed, status: " + response.status.description
        );
      }

      // Since we have one input, one output will exist here
      const output = response.outputs[0];

      console.log("Predicted concepts:");
      for (const concept of output.data.concepts) {
        console.log(concept.name + " " + concept.value);
      }
      res.json(response);
    }
  );
};

exports.handleImage = (req, res) => {
  const { id } = req.body;
};
