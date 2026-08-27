import * as z from "zod";

const paymentOptions = ["bank_transfer", "cash_on_delivery"] as const;

export const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("A valid email is required"),
  subject: z.string().optional(),
  message: z.string().optional(),
});

export const checkoutSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  companyName: z.string().optional(),
  zipCode: z.string().min(8, "Valid ZIP code is required"),
  country: z.string().min(2, "Country is required"),
  streetAddress: z.string().min(5, "Street address is required"),
  city: z.string().min(2, "Town / City is required"),
  province: z.string().min(2, "Province is required"),
  addonAddress: z.string().optional(),
  email: z.string().email("Invalid email address"),
  additionalInfo: z.string().optional(),

  paymentMethod: z.enum(paymentOptions, {
    message: "Please select a payment method",
  }),
});

export type CheckoutFormData = z.infer<typeof checkoutSchema>;

export type ContactFormData = z.infer<typeof contactSchema>;
