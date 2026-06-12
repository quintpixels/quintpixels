import {
  pgTable,
  text,
  timestamp,
  varchar,
  uuid,
  boolean,
  jsonb,
} from "drizzle-orm/pg-core";


export const contactSubmissions = pgTable("contact_submissions", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 200 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  company: varchar("company", { length: 200 }),
  message: text("message").notNull(),
  read: boolean("read").notNull().default(false),
  archived: boolean("archived").notNull().default(false),
  source: varchar("source", { length: 50 }).notNull().default("contact"),
  
  createdAt: timestamp("created_at").defaultNow().notNull(),
});


export const projectSubmissions = pgTable("project_submissions", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 200 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  company: varchar("company", { length: 200 }),
  budget: varchar("budget", { length: 100 }),
  timeline: varchar("timeline", { length: 100 }),
  services: jsonb("services").notNull().default([]),
  projectDescription: text("project_description").notNull(),
  read: boolean("read").notNull().default(false),
  archived: boolean("archived").notNull().default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type ContactSubmission = typeof contactSubmissions.$inferSelect;
export type ProjectSubmission = typeof projectSubmissions.$inferSelect;
export type NewContactSubmission = typeof contactSubmissions.$inferInsert;
export type NewProjectSubmission = typeof projectSubmissions.$inferInsert;
