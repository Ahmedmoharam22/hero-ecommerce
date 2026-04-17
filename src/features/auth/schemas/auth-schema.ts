import * as z from "zod";

export const loginSchema = z.object({
  email: z.string().email("the email is not correct"),
  password: z.string().min(6, "the password must be at least 6 characters"),
});

export const registerSchema = z.object({
  name: z.string().min(3, "the name must be at least 3 characters"),
  email: z.string().email("the email is not correct"),
  password: z.string().min(6, "the password must be at least 6 characters"),
  rePassword: z.string(),
  phone: z.string().regex(/^01[0125][0-9]{8}$/, "the phone number must be correct"),
}).refine((data) => data.password === data.rePassword, {
  message: "the password is not matching",
  path: ["rePassword"],
});

export type LoginValues = z.infer<typeof loginSchema>;
export type RegisterValues = z.infer<typeof registerSchema>;