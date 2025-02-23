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
  workExperiences: z
    .array(
      z
        .object({
          position: optionalString,
          company: optionalString,
          startDate: z.string().optional().or(z.literal("")), // YYYY-MM-DD
          endDate: z.string().optional().or(z.literal("")),
          description: optionalString,
        })
        .superRefine(({ startDate, endDate }, ctx) => {
          if (startDate && endDate && new Date(endDate) < new Date(startDate)) {
            ctx.addIssue({
              path: ["endDate"],
              message: "End date must be after start date",
              code: "custom",
            });
          }
        }),
    )
    .optional(),
});

export const socialSchema = z.object({
  github: optionalString,
  linkedin: optionalString,
  X: optionalString,
  medium: optionalString,
  portfolio: optionalString,
});

export type socialValues = z.infer<typeof socialSchema>;

export type workExperienceValues = z.infer<typeof workExperienceSchema>;

export const educationSchema = z.object({
  education: z
    .array(
      z
        .object({
          degree: optionalString,
          school: optionalString,
          grade: optionalString,
          startDate: z.string().optional().or(z.literal("")), // YYYY-MM-DD
          endDate: z.string().optional().or(z.literal("")),
        })
        .superRefine(({ startDate, endDate }, ctx) => {
          if (startDate && endDate && new Date(endDate) < new Date(startDate)) {
            ctx.addIssue({
              path: ["endDate"],
              message: "End date must be after start date",
              code: "custom",
            });
          }
        }),
    )
    .optional(),
});

export type educationValues = z.infer<typeof educationSchema>;

export const skillsSchema = z.object({
  skills: z.array(z.string().trim()).optional().or(z.literal("")),
});

export type skillsValues = z.infer<typeof skillsSchema>;

export const summarySchema = z.object({
  summary: optionalString,
});

export type summaryValues = z.infer<typeof summarySchema>;

export const resumeSchema = z.object({
  ...generalInfoSchema.shape,
  ...personalInfoSchema.shape,
  ...workExperienceSchema.shape,
  ...educationSchema.shape,
  ...skillsSchema.shape,
  ...summarySchema.shape,
  ...socialSchema.shape,
});

export type resumeValues = Omit<z.infer<typeof resumeSchema>, "photo"> & {
  id?: string;
  photo?: File | string | null | undefined;
};
