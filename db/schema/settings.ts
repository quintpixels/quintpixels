import {
  pgTable,
  text,
  timestamp,
  varchar,
  uuid,
  jsonb,
} from "drizzle-orm/pg-core";


export const siteSettings = pgTable("site_settings", {
  id: uuid("id").primaryKey().defaultRandom(),
  key: varchar("key", { length: 100 }).notNull().unique(),
  value: jsonb("value"),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});


export const seoMetadata = pgTable("seo_metadata", {
  id: uuid("id").primaryKey().defaultRandom(),
  page: varchar("page", { length: 100 }).notNull().unique(),
  title: varchar("title", { length: 200 }),
  description: text("description"),
  keywords: text("keywords"),
  ogImage: text("og_image"),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type SiteSetting = typeof siteSettings.$inferSelect;
export type SeoMetadata = typeof seoMetadata.$inferSelect;
