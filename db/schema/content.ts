import {
  pgTable,
  text,
  timestamp,
  varchar,
  uuid,
  boolean,
  integer,
  jsonb,
} from "drizzle-orm/pg-core";


export const heroContent = pgTable("hero_content", {
  id: uuid("id").primaryKey().defaultRandom(),
  headline: text("headline").notNull().default("WE ARE\nTHE PIXELS"),
  subheadline: text("subheadline")
    .notNull()
    .default(
      "A cinematic technology studio building products, systems, and experiences at the intersection of design and engineering.",
    ),
  cta_primary_text: varchar("cta_primary_text", { length: 100 }).default(
    "View Our Work",
  ),
  cta_primary_href: varchar("cta_primary_href", { length: 255 }).default(
    "/portfolio",
  ),
  cta_secondary_text: varchar("cta_secondary_text", { length: 100 }).default(
    "Start a Project",
  ),
  cta_secondary_href: varchar("cta_secondary_href", { length: 255 }).default(
    "/contact",
  ),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});


export const navigationItems = pgTable("navigation_items", {
  id: uuid("id").primaryKey().defaultRandom(),
  href: varchar("href", { length: 255 }).notNull(),
  label: varchar("label", { length: 100 }).notNull(),
  index: varchar("index", { length: 10 }).notNull(),
  order: integer("order").notNull().default(0),
  active: boolean("active").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});


export const services = pgTable("services", {
  id: uuid("id").primaryKey().defaultRandom(),
  num: varchar("num", { length: 10 }).notNull(),
  title: varchar("title", { length: 200 }).notNull(),
  description: text("description").notNull(),
  icon: varchar("icon", { length: 50 }).notNull().default("Monitor"),
  tags: jsonb("tags").notNull().default([]),
  order: integer("order").notNull().default(0),
  active: boolean("active").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});


export const portfolioProjects = pgTable("portfolio_projects", {
  id: uuid("id").primaryKey().defaultRandom(),
  index: varchar("index", { length: 10 }).notNull(),
  category: varchar("category", { length: 100 }).notNull(),
  title: varchar("title", { length: 200 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  sub: text("sub").notNull(),
  description: text("description"),
  tags: jsonb("tags").notNull().default([]),
  year: varchar("year", { length: 10 }).notNull(),
  color: varchar("color", { length: 30 }).default("#f0ede9"),
  imageUrl: text("image_url"),
  liveUrl: text("live_url"),
  featured: boolean("featured").notNull().default(false),
  status: varchar("status", { length: 20 }).notNull().default("published"),
  order: integer("order").notNull().default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});


export const products = pgTable("products", {
  id: uuid("id").primaryKey().defaultRandom(),
  productId: varchar("product_id", { length: 20 }).notNull(),
  name: varchar("name", { length: 200 }).notNull(),
  type: varchar("type", { length: 100 }).notNull(),
  description: text("description").notNull(),
  icon: varchar("icon", { length: 50 }).notNull().default("Layers"),
  status: varchar("status", { length: 50 }).notNull().default("Available"),
  learnMoreUrl: text("learn_more_url"),
  order: integer("order").notNull().default(0),
  active: boolean("active").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});


export const teamMembers = pgTable("team_members", {
  id: uuid("id").primaryKey().defaultRandom(),
  index: varchar("index", { length: 10 }).notNull(),
  firstName: varchar("first_name", { length: 100 }).notNull(),
  lastName: varchar("last_name", { length: 100 }).notNull(),
  role: varchar("role", { length: 200 }).notNull(),
  philosophy: text("philosophy").notNull(),
  initials: varchar("initials", { length: 5 }).notNull(),
  system: varchar("system", { length: 100 }).notNull(),
  stack: jsonb("stack").notNull().default([]),
  imageUrl: text("image_url"),
  socialLinks: jsonb("social_links").notNull().default({}),
  accentHue: varchar("accent_hue", { length: 100 }).default("220 40% 14%"),
  order: integer("order").notNull().default(0),
  active: boolean("active").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});


export const testimonials = pgTable("testimonials", {
  id: uuid("id").primaryKey().defaultRandom(),
  clientName: varchar("client_name", { length: 200 }).notNull(),
  company: varchar("company", { length: 200 }),
  role: varchar("role", { length: 200 }),
  testimonial: text("testimonial").notNull(),
  imageUrl: text("image_url"),
  featured: boolean("featured").notNull().default(false),
  order: integer("order").notNull().default(0),
  active: boolean("active").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type HeroContent = typeof heroContent.$inferSelect;
export type NavigationItem = typeof navigationItems.$inferSelect;
export type Service = typeof services.$inferSelect;
export type PortfolioProject = typeof portfolioProjects.$inferSelect;
export type Product = typeof products.$inferSelect;
export type TeamMember = typeof teamMembers.$inferSelect;
export type Testimonial = typeof testimonials.$inferSelect;
