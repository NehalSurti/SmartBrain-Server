const express = require("express");
const cors = require("cors");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config();

const signinRouter = require("./routes/signin");
const registerRouter = require("./routes/register");
const userRouter = require("./routes/user");
const imageRouter = require("./routes/image");
const tokenVerifyRouter = require("./routes/tokenVerify");

const app = express();

app.use(cors());
app.use(express.json());

app.use(express.static("build"));

app.use("/api/signin", signinRouter);
app.use("/api/register", registerRouter);
app.use("/api/users", userRouter);
app.use("/api/image", imageRouter);
app.use("/api/tokenVerify", tokenVerifyRouter);

app.use("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(process.env.PORT, () => {
  console.log("Server Started");
});
