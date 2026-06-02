// Lec-86 :- ZOD validation in our ExpressJS application
// Lec-104 :- How to verify Email?
// Lec-110 :- Edit/Update User Profile
// Lec-112 :- Password Validation
// Lec-115 :- Post() Forgot(Reset) Password
// Lec-119 :- Finally :- Reset your Password & Update password in DB
// Lec-123 :- set password after social login (in profile page)

import z from "zod";

const nameSchema = z
    .string()
    .trim()
    .min(3, { message: "Name must be at least 3 characters long." })
    .max(100, { message: "Name must be no more than 100 characters." });

const emailSchema = z
    .string()
    .trim()
    .email({ message: "Please enter a valid email address." })
    .max(100, { message: "Email must be no more than 100 characters." });

export const loginUserSchema = z.object({
    email: emailSchema,

    password: z
        .string()
        .min(6, { message: "Password must be at least 6 characters long." })
        .max(100, { message: "Password must be no more than 100 characters." }),
});

export const registerUserSchema = loginUserSchema.extend({
    name: nameSchema,
});

// Lec-104
export const verifyEmailSchema = z.object({
    token: z.string().trim().length(8),
    email: z.string().trim().email(),
});

// Lec-110
export const verifyUserSchema = z.object({
    name: nameSchema,
});

// Lec-112
export const verifyPasswordSchema = z.object({
    currentPassword: z
        .string()
        .min(1, { message: "Current Password is required!" }),
    newPassword: z
        .string()
        .min(6, { message: "New Password must be at least 6 characters long." })
        .max(100, {
            message: "New Password must be no more than 100 characters.",
        }),
    confirmPassword: z
        .string()
        .min(6, {
            message: "Confirm Password must be at least 6 characters long.",
        })
        .max(100, {
            message: "Confirm Password must be no more than 100 characters.",
        }),
}).refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"], // Error will be associated with confirmPassword field
});

// Lec-115
export const forgotPasswordSchema = z.object({
    email: emailSchema,
});

// Lec-119
const passwordSchema = z.object({
    newPassword: z
        .string()
        .min(6, { message: "New Password must be at least 6 characters long." })
        .max(100, {
            message: "New Password must be no more than 100 characters.",
        }),
    confirmPassword: z
        .string()
        .min(6, {
            message: "Confirm Password must be at least 6 characters long.",
        })
        .max(100, {
            message: "Confirm Password must be no more than 100 characters.",
        }),
}).refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});

export const verifyResetPasswordSchema = passwordSchema;
// Lec-123
export const setPasswordSchema = passwordSchema;