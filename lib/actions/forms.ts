"use server";

import { z } from "zod";
import { db } from "@/db";
import { contactSubmissions, projectSubmissions } from "@/db/schema";
import { eq } from "drizzle-orm";
import { requireAdmin } from "@/lib/auth/middleware";

const ContactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email is required"),
  company: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

const ProjectSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email is required"),
  company: z.string().optional(),
  budget: z.string().optional(),
  timeline: z.string().optional(),
  services: z.array(z.string()).optional().default([]),
  projectDescription: z.string().min(20, "Please describe your project"),
});

export type FormState =
  | {
      success?: boolean;
      errors?: Record<string, string[]>;
      message?: string;
    }
  | undefined;

export async function submitContact(
  prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  const raw = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    company: (formData.get("company") as string) || undefined,
    message: formData.get("message") as string,
  };

  const validated = ContactSchema.safeParse(raw);
  if (!validated.success) {
    return { errors: validated.error.flatten().fieldErrors };
  }

  await db.insert(contactSubmissions).values({
    ...validated.data,
    source: "contact",
  });

  return { success: true, message: "Message sent successfully" };
}

export async function submitConnect(
  prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  const raw = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    company: (formData.get("company") as string) || undefined,
    message: formData.get("message") as string,
  };

  const validated = ContactSchema.safeParse(raw);
  if (!validated.success) {
    return { errors: validated.error.flatten().fieldErrors };
  }

  await db.insert(contactSubmissions).values({
    ...validated.data,
    source: "connect",
  });

  return { success: true, message: "Let's connect!" };
}

export async function submitProjectRequirement(
  prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  const servicesRaw = formData.getAll("services") as string[];

  const raw = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    company: (formData.get("company") as string) || undefined,
    budget: (formData.get("budget") as string) || undefined,
    timeline: (formData.get("timeline") as string) || undefined,
    services: servicesRaw,
    projectDescription: formData.get("projectDescription") as string,
  };

  const validated = ProjectSchema.safeParse(raw);
  if (!validated.success) {
    return { errors: validated.error.flatten().fieldErrors };
  }

  await db.insert(projectSubmissions).values(validated.data);

  return { success: true, message: "Project brief received" };
}

export async function archiveContactAction(id: string) {
  await requireAdmin();
  await db
    .update(contactSubmissions)
    .set({ archived: true })
    .where(eq(contactSubmissions.id, id));
}

export async function unarchiveContactAction(id: string) {
  await requireAdmin();
  await db
    .update(contactSubmissions)
    .set({ archived: false })
    .where(eq(contactSubmissions.id, id));
}

export async function deleteContactAction(id: string) {
  await requireAdmin();
  await db.delete(contactSubmissions).where(eq(contactSubmissions.id, id));
}

export async function archiveProjectAction(id: string) {
  await requireAdmin();
  await db
    .update(projectSubmissions)
    .set({ archived: true })
    .where(eq(projectSubmissions.id, id));
}

export async function deleteProjectAction(id: string) {
  await requireAdmin();
  await db.delete(projectSubmissions).where(eq(projectSubmissions.id, id));
}
