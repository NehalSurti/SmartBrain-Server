const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const signinRouter = require("./routes/signin");
const registerRouter = require("./routes/register");
const userRouter = require("./routes/user");
const imageRouter = require("./routes/image");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/signin", signinRouter);
app.use("/register", registerRouter);
app.use("/users", userRouter);
app.use("/image", imageRouter);

app.listen(5000, () => {
  console.log("Server Started");
});
