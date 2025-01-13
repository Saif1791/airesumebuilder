"use client";

import { z } from "zod";

const optionalString = z.string().trim().optional().or(z.literal(""));

export const generalInfoSchema = z.object({
  title: optionalString,
  description: optionalString,
});

export type generalInfoValues = z.infer<typeof generalInfoSchema>;

export const personalInfoSchema = z.object({
  photo: z
    .custom<File | undefined>()
    .refine(
      (file) =>
        !file || (file instanceof File && file.type.startsWith("image/")),
      "The photo must be an image file",
    )
    .refine(
      (file) => !file || file.size <= 1024 * 1024 * 4,
      "The photo must be less than 4MB",
    )
    .optional(),
  firstName: z
    .string({ required_error: "First name is required" })
    .trim()
    .or(z.literal("")),
  lastName: optionalString,
  jobTitle: optionalString,
  city: optionalString,
  country: optionalString,
  email: z.string({ required_error: "Email is required" }).email(),
  phone: z
    .string({ required_error: "Phone is required" })
    .max(15)
    .or(z.literal("")),
});

export type personalInfoValues = z.infer<typeof personalInfoSchema>;

export const workExperienceSchema = z.object({
  workExperiences: z.array(
    z
      .object({
        position: optionalString,
        company: optionalString,
        startDate: z.string().date().optional(), //YYYY-MM-DD
        endDate: z.string().date().optional(),
        description: optionalString,
      })
      .optional(),
  ),
});

export type workExperienceValues = z.infer<typeof workExperienceSchema>;

export const resumeSchema = z.object({
  ...generalInfoSchema.shape,
  ...personalInfoSchema.shape,
  ...workExperienceSchema.shape,
});

export type resumeValues = Omit<z.infer<typeof resumeSchema>, "photo"> & {
  id?: string;
  photo?: File | string | null | undefined;
};
