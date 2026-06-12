import "server-only";
import { desc, eq, and, or } from "drizzle-orm";
import { db } from "@/db";
import { contactSubmissions, projectSubmissions, admins } from "@/db/schema";

export async function getContactSubmissions() {
  return db
    .select()
    .from(contactSubmissions)
    .where(eq(contactSubmissions.archived, false))
    .orderBy(desc(contactSubmissions.createdAt));
}

export async function getArchivedContactSubmissions() {
  return db
    .select()
    .from(contactSubmissions)
    .where(eq(contactSubmissions.archived, true))
    .orderBy(desc(contactSubmissions.createdAt));
}

export async function getProjectSubmissions() {
  return db
    .select()
    .from(projectSubmissions)
    .where(eq(projectSubmissions.archived, false))
    .orderBy(desc(projectSubmissions.createdAt));
}

export async function markContactRead(id: string) {
  await db
    .update(contactSubmissions)
    .set({ read: true })
    .where(eq(contactSubmissions.id, id));
}

export async function archiveContact(id: string) {
  await db
    .update(contactSubmissions)
    .set({ archived: true })
    .where(eq(contactSubmissions.id, id));
}

export async function archiveProject(id: string) {
  await db
    .update(projectSubmissions)
    .set({ archived: true })
    .where(eq(projectSubmissions.id, id));
}

export async function deleteContact(id: string) {
  await db.delete(contactSubmissions).where(eq(contactSubmissions.id, id));
}

export async function deleteProjectSubmission(id: string) {
  await db.delete(projectSubmissions).where(eq(projectSubmissions.id, id));
}

export async function getAllAdmins() {
  return db
    .select({
      id: admins.id,
      name: admins.name,
      email: admins.email,
      role: admins.role,
      createdAt: admins.createdAt,
    })
    .from(admins)
    .orderBy(admins.createdAt);
}

export async function getAdminById(id: string) {
  const [admin] = await db
    .select({
      id: admins.id,
      name: admins.name,
      email: admins.email,
      role: admins.role,
      createdAt: admins.createdAt,
    })
    .from(admins)
    .where(eq(admins.id, id))
    .limit(1);
  return admin ?? null;
}

export async function getUnreadCount() {
  const contacts = await db
    .select({ id: contactSubmissions.id })
    .from(contactSubmissions)
    .where(
      and(
        eq(contactSubmissions.read, false),
        eq(contactSubmissions.archived, false),
      ),
    );
  const projects = await db
    .select({ id: projectSubmissions.id })
    .from(projectSubmissions)
    .where(
      and(
        eq(projectSubmissions.read, false),
        eq(projectSubmissions.archived, false),
      ),
    );
  return contacts.length + projects.length;
}
