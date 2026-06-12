"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "@/db";
import {
  heroContent,
  services,
  portfolioProjects,
  products,
  teamMembers,
  testimonials,
  navigationItems,
} from "@/db/schema";
import { requireAdmin } from "@/lib/auth/middleware";

export async function updateHeroContent(formData: FormData) {
  await requireAdmin();
  const data = {
    subheadline: formData.get("subheadline") as string,
    cta_primary_text: formData.get("cta_primary_text") as string,
    cta_primary_href: formData.get("cta_primary_href") as string,
    cta_secondary_text: formData.get("cta_secondary_text") as string,
    cta_secondary_href: formData.get("cta_secondary_href") as string,
    updatedAt: new Date(),
  };

  const [existing] = await db
    .select({ id: heroContent.id })
    .from(heroContent)
    .limit(1);
  if (existing) {
    await db
      .update(heroContent)
      .set(data)
      .where(eq(heroContent.id, existing.id));
  } else {
    await db.insert(heroContent).values(data);
  }
  revalidatePath("/");
  return { success: true };
}

export async function createService(formData: FormData) {
  await requireAdmin();
  const tags = (formData.get("tags") as string)
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);

  const existing = await db.select({ id: services.id }).from(services);
  await db.insert(services).values({
    num: formData.get("num") as string,
    title: formData.get("title") as string,
    description: formData.get("description") as string,
    icon: (formData.get("icon") as string) || "Monitor",
    tags,
    order: existing.length,
  });
  revalidatePath("/");
  revalidatePath("/services");
  return { success: true };
}

export async function updateService(id: string, formData: FormData) {
  await requireAdmin();
  const tags = (formData.get("tags") as string)
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);

  await db
    .update(services)
    .set({
      num: formData.get("num") as string,
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      icon: (formData.get("icon") as string) || "Monitor",
      tags,
      updatedAt: new Date(),
    })
    .where(eq(services.id, id));
  revalidatePath("/");
  revalidatePath("/services");
  return { success: true };
}

export async function deleteService(id: string) {
  await requireAdmin();
  await db.delete(services).where(eq(services.id, id));
  revalidatePath("/");
  revalidatePath("/services");
  return { success: true };
}

export async function toggleServiceActive(id: string, active: boolean) {
  await requireAdmin();
  await db.update(services).set({ active }).where(eq(services.id, id));
  revalidatePath("/");
  revalidatePath("/services");
  return { success: true };
}

export async function createPortfolioProject(formData: FormData) {
  await requireAdmin();
  const tags = (formData.get("tags") as string)
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);

  const existing = await db
    .select({ id: portfolioProjects.id })
    .from(portfolioProjects);
  await db.insert(portfolioProjects).values({
    index: String(existing.length + 1).padStart(2, "0"),
    category: formData.get("category") as string,
    title: formData.get("title") as string,
    slug:
      (formData.get("slug") as string) ||
      (formData.get("title") as string).toLowerCase().replace(/\s+/g, "-"),
    sub: formData.get("sub") as string,
    description: (formData.get("description") as string) || undefined,
    tags,
    year: formData.get("year") as string,
    color: (formData.get("color") as string) || "#f0ede9",
    imageUrl: (formData.get("imageUrl") as string) || undefined,
    liveUrl: (formData.get("liveUrl") as string) || undefined,
    featured: formData.get("featured") === "true",
    status: (formData.get("status") as string) || "published",
    order: existing.length,
  });
  revalidatePath("/");
  revalidatePath("/portfolio");
  return { success: true };
}

export async function updatePortfolioProject(id: string, formData: FormData) {
  await requireAdmin();
  const tags = (formData.get("tags") as string)
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);

  await db
    .update(portfolioProjects)
    .set({
      category: formData.get("category") as string,
      title: formData.get("title") as string,
      slug: formData.get("slug") as string,
      sub: formData.get("sub") as string,
      description: (formData.get("description") as string) || undefined,
      tags,
      year: formData.get("year") as string,
      color: (formData.get("color") as string) || "#f0ede9",
      imageUrl: (formData.get("imageUrl") as string) || undefined,
      liveUrl: (formData.get("liveUrl") as string) || undefined,
      featured: formData.get("featured") === "true",
      status: (formData.get("status") as string) || "published",
      updatedAt: new Date(),
    })
    .where(eq(portfolioProjects.id, id));
  revalidatePath("/");
  revalidatePath("/portfolio");
  return { success: true };
}

export async function deletePortfolioProject(id: string) {
  await requireAdmin();
  await db.delete(portfolioProjects).where(eq(portfolioProjects.id, id));
  revalidatePath("/");
  revalidatePath("/portfolio");
  return { success: true };
}

export async function createProduct(formData: FormData) {
  await requireAdmin();
  const existing = await db.select({ id: products.id }).from(products);
  await db.insert(products).values({
    productId: `P${String(existing.length + 1).padStart(2, "0")}`,
    name: formData.get("name") as string,
    type: formData.get("type") as string,
    description: formData.get("description") as string,
    icon: (formData.get("icon") as string) || "Layers",
    status: (formData.get("status") as string) || "Available",
    learnMoreUrl: (formData.get("learnMoreUrl") as string) || undefined,
    order: existing.length,
  });
  revalidatePath("/");
  revalidatePath("/products");
  return { success: true };
}

export async function updateProduct(id: string, formData: FormData) {
  await requireAdmin();
  await db
    .update(products)
    .set({
      name: formData.get("name") as string,
      type: formData.get("type") as string,
      description: formData.get("description") as string,
      icon: (formData.get("icon") as string) || "Layers",
      status: (formData.get("status") as string) || "Available",
      learnMoreUrl: (formData.get("learnMoreUrl") as string) || undefined,
      updatedAt: new Date(),
    })
    .where(eq(products.id, id));
  revalidatePath("/");
  revalidatePath("/products");
  return { success: true };
}

export async function deleteProduct(id: string) {
  await requireAdmin();
  await db.delete(products).where(eq(products.id, id));
  revalidatePath("/");
  revalidatePath("/products");
  return { success: true };
}

export async function createTeamMember(formData: FormData) {
  await requireAdmin();
  const stack = (formData.get("stack") as string)
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);

  const existing = await db.select({ id: teamMembers.id }).from(teamMembers);
  await db.insert(teamMembers).values({
    index: String(existing.length + 1).padStart(2, "0"),
    firstName: formData.get("firstName") as string,
    lastName: formData.get("lastName") as string,
    role: formData.get("role") as string,
    philosophy: formData.get("philosophy") as string,
    initials: formData.get("initials") as string,
    system: formData.get("system") as string,
    stack,
    imageUrl: (formData.get("imageUrl") as string) || undefined,
    accentHue: (formData.get("accentHue") as string) || "220 40% 14%",
    order: existing.length,
  });
  revalidatePath("/");
  return { success: true };
}

export async function updateTeamMember(id: string, formData: FormData) {
  await requireAdmin();
  const stack = (formData.get("stack") as string)
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);

  await db
    .update(teamMembers)
    .set({
      firstName: formData.get("firstName") as string,
      lastName: formData.get("lastName") as string,
      role: formData.get("role") as string,
      philosophy: formData.get("philosophy") as string,
      initials: formData.get("initials") as string,
      system: formData.get("system") as string,
      stack,
      imageUrl: (formData.get("imageUrl") as string) || undefined,
      accentHue: (formData.get("accentHue") as string) || "220 40% 14%",
      updatedAt: new Date(),
    })
    .where(eq(teamMembers.id, id));
  revalidatePath("/");
  return { success: true };
}

export async function deleteTeamMember(id: string) {
  await requireAdmin();
  await db.delete(teamMembers).where(eq(teamMembers.id, id));
  revalidatePath("/");
  return { success: true };
}

export async function createTestimonial(formData: FormData) {
  await requireAdmin();
  const existing = await db.select({ id: testimonials.id }).from(testimonials);
  await db.insert(testimonials).values({
    clientName: formData.get("clientName") as string,
    company: (formData.get("company") as string) || undefined,
    role: (formData.get("role") as string) || undefined,
    testimonial: formData.get("testimonial") as string,
    featured: formData.get("featured") === "true",
    order: existing.length,
  });
  revalidatePath("/");
  return { success: true };
}

export async function updateTestimonial(id: string, formData: FormData) {
  await requireAdmin();
  await db
    .update(testimonials)
    .set({
      clientName: formData.get("clientName") as string,
      company: (formData.get("company") as string) || undefined,
      role: (formData.get("role") as string) || undefined,
      testimonial: formData.get("testimonial") as string,
      featured: formData.get("featured") === "true",
      updatedAt: new Date(),
    })
    .where(eq(testimonials.id, id));
  revalidatePath("/");
  return { success: true };
}

export async function deleteTestimonial(id: string) {
  await requireAdmin();
  await db.delete(testimonials).where(eq(testimonials.id, id));
  revalidatePath("/");
  return { success: true };
}

export async function updateNavigationItems(
  items: Array<{
    id?: string;
    href: string;
    label: string;
    index: string;
    order: number;
  }>,
) {
  await requireAdmin();
  for (const item of items) {
    if (item.id) {
      await db
        .update(navigationItems)
        .set({
          href: item.href,
          label: item.label,
          index: item.index,
          order: item.order,
        })
        .where(eq(navigationItems.id, item.id));
    } else {
      await db.insert(navigationItems).values(item);
    }
  }
  revalidatePath("/");
  return { success: true };
}
