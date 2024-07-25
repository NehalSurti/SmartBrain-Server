const yup = require("yup");

const registerUserSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters long")
    .required("Password is required"),
});

const loginUserSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters long")
    .required("Password is required"),
});

const UserIdSchema = yup.object().shape({
  id: yup
    .number()
    .integer("ID must be an integer")
    .positive("ID must be a positive number")
    .required("ID is required"),
});

module.exports = {
  registerUserSchema,
  loginUserSchema,
  UserIdSchema,
};
