import "server-only";
import { asc, eq, desc } from "drizzle-orm";
import { db } from "@/db";
import {
  heroContent,
  services,
  portfolioProjects,
  products,
  teamMembers,
  testimonials,
  navigationItems,
  siteSettings,
  seoMetadata,
} from "@/db/schema";

export async function getHeroContent() {
  const [hero] = await db.select().from(heroContent).limit(1);
  return hero ?? null;
}

export async function getNavigationItems() {
  return db
    .select()
    .from(navigationItems)
    .where(eq(navigationItems.active, true))
    .orderBy(asc(navigationItems.order));
}

export async function getActiveServices() {
  return db
    .select()
    .from(services)
    .where(eq(services.active, true))
    .orderBy(asc(services.order));
}

export async function getAllServices() {
  return db.select().from(services).orderBy(asc(services.order));
}

export async function getPublishedProjects() {
  return db
    .select()
    .from(portfolioProjects)
    .where(eq(portfolioProjects.status, "published"))
    .orderBy(asc(portfolioProjects.order));
}

export async function getAllProjects() {
  return db
    .select()
    .from(portfolioProjects)
    .orderBy(asc(portfolioProjects.order));
}

export async function getActiveProducts() {
  return db
    .select()
    .from(products)
    .where(eq(products.active, true))
    .orderBy(asc(products.order));
}

export async function getAllProducts() {
  return db.select().from(products).orderBy(asc(products.order));
}

export async function getActiveTeamMembers() {
  return db
    .select()
    .from(teamMembers)
    .where(eq(teamMembers.active, true))
    .orderBy(asc(teamMembers.order));
}

export async function getAllTeamMembers() {
  return db.select().from(teamMembers).orderBy(asc(teamMembers.order));
}

export async function getActiveTestimonials() {
  return db
    .select()
    .from(testimonials)
    .where(eq(testimonials.active, true))
    .orderBy(asc(testimonials.order));
}

export async function getAllTestimonials() {
  return db.select().from(testimonials).orderBy(asc(testimonials.order));
}

export async function getSiteSetting(key: string) {
  const [setting] = await db
    .select()
    .from(siteSettings)
    .where(eq(siteSettings.key, key))
    .limit(1);
  return setting?.value ?? null;
}

export async function getAllSettings() {
  const settings = await db.select().from(siteSettings);
  return settings.reduce(
    (acc, s) => ({ ...acc, [s.key]: s.value }),
    {} as Record<string, unknown>,
  );
}

export async function getPageSeo(page: string) {
  const [seo] = await db
    .select()
    .from(seoMetadata)
    .where(eq(seoMetadata.page, page))
    .limit(1);
  return seo ?? null;
}

export async function getAllSeoMetadata() {
  return db.select().from(seoMetadata);
}
