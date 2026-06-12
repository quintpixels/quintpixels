"use server";

import { z } from "zod";
import { hash, compare } from "bcryptjs";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { admins } from "@/db/schema";
import { createSession, deleteSession } from "@/lib/auth/session";
import { redirect } from "next/navigation";

const LoginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

const RegisterSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Must contain at least one uppercase letter")
    .regex(/[0-9]/, "Must contain at least one number"),
});

export type AuthState =
  | {
      success?: boolean;
      errors?: Record<string, string[]>;
      message?: string;
    }
  | undefined;

export async function login(
  prevState: AuthState,
  formData: FormData,
): Promise<AuthState> {
  const raw = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const validated = LoginSchema.safeParse(raw);
  if (!validated.success) {
    return { errors: validated.error.flatten().fieldErrors };
  }

  const { email, password } = validated.data;

  const [admin] = await db
    .select()
    .from(admins)
    .where(eq(admins.email, email))
    .limit(1);

  if (!admin) {
    return { message: "Invalid email or password" };
  }

  const passwordMatch = await compare(password, admin.password);
  if (!passwordMatch) {
    return { message: "Invalid email or password" };
  }

  await createSession({
    adminId: admin.id,
    email: admin.email,
    name: admin.name,
    role: admin.role,
  });

  redirect("/pixels/dashboard");
}

export async function register(
  prevState: AuthState,
  formData: FormData,
): Promise<AuthState> {

    if (process.env.ENABLE_ADMIN_REGISTRATION !== "true") {
    return { message: "Registration is currently disabled" };
  }

  const raw = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const validated = RegisterSchema.safeParse(raw);
  if (!validated.success) {
    return { errors: validated.error.flatten().fieldErrors };
  }

  const { name, email, password } = validated.data;

    const [existing] = await db
    .select({ id: admins.id })
    .from(admins)
    .where(eq(admins.email, email))
    .limit(1);

  if (existing) {
    return { errors: { email: ["An account with this email already exists"] } };
  }

    const [count] = await db.select({ count: admins.id }).from(admins).limit(1);

  const role = !count ? "owner" : "admin";

  const hashedPassword = await hash(password, 12);

  const [newAdmin] = await db
    .insert(admins)
    .values({ name, email, password: hashedPassword, role })
    .returning();

  await createSession({
    adminId: newAdmin.id,
    email: newAdmin.email,
    name: newAdmin.name,
    role: newAdmin.role,
  });

  redirect("/pixels/dashboard");
}

export async function logout() {
  await deleteSession();
  redirect("/pixels/login");
}

const CreateAdminSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Must contain at least one uppercase letter")
    .regex(/[0-9]/, "Must contain at least one number"),
  role: z.enum(["admin", "editor"]).refine(() => true, {
    message: "Role must be admin or editor",
  }),
});

export async function createAdminAccount(
  prevState: AuthState,
  formData: FormData,
): Promise<AuthState> {
  const raw = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    role: formData.get("role") as string,
  };

  const validated = CreateAdminSchema.safeParse(raw);
  if (!validated.success) {
    return { errors: validated.error.flatten().fieldErrors };
  }

  const { name, email, password, role } = validated.data;

  const [existing] = await db
    .select({ id: admins.id })
    .from(admins)
    .where(eq(admins.email, email))
    .limit(1);

  if (existing) {
    return { errors: { email: ["An account with this email already exists"] } };
  }

  const hashedPassword = await hash(password, 12);

  await db
    .insert(admins)
    .values({ name, email, password: hashedPassword, role });

  return { success: true, message: `Admin account created for ${email}` };
}
