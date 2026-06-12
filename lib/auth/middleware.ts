import { redirect } from "next/navigation";
import { getSession } from "./session";

export async function requireAdmin() {
  const session = await getSession();
  if (!session) redirect("/pixels/login");
  return session;
}

export async function requireRole(allowedRoles: string[]) {
  const session = await requireAdmin();
  if (!allowedRoles.includes(session.role)) redirect("/pixels/dashboard");
  return session;
}
