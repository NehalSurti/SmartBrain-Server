const yup = require("yup");

// Validation schema for User registration
const registerUserSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters long")
    .required("Password is required"),
});

// Validation schema for User login
const loginUserSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters long")
    .required("Password is required"),
});

// Validation schema for User ID
const UserIdSchema = yup.object().shape({
  id: yup
    .number()
    .integer("ID must be an integer")
    .positive("ID must be a positive number")
    .required("ID is required"),
});

// Validation schema for creating a User
const UserCreateSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters long")
    .required("Password is required"),
});

// Validation schema for updating a User
const UserUpdateSchema = yup.object().shape({
  name: yup.string(),
  email: yup.string().email("Invalid email"),
  password: yup.string().min(8, "Password must be at least 8 characters long"),
});

module.exports = {
  registerUserSchema,
  loginUserSchema,
  UserIdSchema,
  UserCreateSchema,
  UserUpdateSchema,
};
