import { z } from "zod";

export const EmailFormLoginData = z.object({
  email: z.string().email({ message: "Invalid Email Address" }),
});
