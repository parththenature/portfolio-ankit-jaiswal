const { z } = require("zod");

// Create a Zod schema for user login
const loginSchema = z.object({
    email: z
        .string({ required_error: "Email Required" })
        .trim()
        .email({ message: "Invalid Email Address" })
        .min(11, { message: "Email must be at least 11 characters" })
        .max(25, { message: "Email must not be more than 25 characters" }),
    password: z
        .string({ required_error: "Password Required" })
        .trim()
        .min(8, { message: "Password must be at least 8 characters" })
        .max(25, { message: "Password must not be more than 25 characters" })
})

// Create a Zod schema for user registration
const signupSchema = loginSchema.extend({
    username: z
        .string({ required_error: "Username Required" })
        .trim()
        .min(3, { message: "Username must be at least 3 characters" })
        .max(25, { message: "Username must not be more than 25 characters" }),
    phone: z
        .string({ required_error: "Phone Required" })
        .trim()
        .min(10, { message: "Phone must be at least 10 characters" })
        .max(20, { message: "Phone must not be more than 20 characters" }),
});

module.exports = { signupSchema, loginSchema };