"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "@/db";
import { siteSettings, seoMetadata } from "@/db/schema";
import { requireAdmin } from "@/lib/auth/middleware";

export async function updateSiteSetting(key: string, value: unknown) {
  await requireAdmin();
  const [existing] = await db
    .select({ id: siteSettings.id })
    .from(siteSettings)
    .where(eq(siteSettings.key, key))
    .limit(1);

  if (existing) {
    await db
      .update(siteSettings)
      .set({ value: value as never, updatedAt: new Date() })
      .where(eq(siteSettings.key, key));
  } else {
    await db.insert(siteSettings).values({ key, value: value as never });
  }
  revalidatePath("/");
  return { success: true };
}

export async function updateSeoMetadata(
  page: string,
  data: {
    title?: string;
    description?: string;
    keywords?: string;
    ogImage?: string;
  },
) {
  await requireAdmin();
  const [existing] = await db
    .select({ id: seoMetadata.id })
    .from(seoMetadata)
    .where(eq(seoMetadata.page, page))
    .limit(1);

  if (existing) {
    await db
      .update(seoMetadata)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(seoMetadata.page, page));
  } else {
    await db.insert(seoMetadata).values({ page, ...data });
  }
  revalidatePath("/");
  return { success: true };
}

export async function updateSettingsFromForm(formData: FormData) {
  await requireAdmin();
  const keys = [
    "company_name",
    "company_email",
    "company_phone",
    "company_address",
    "footer_tagline",
    "twitter_url",
    "instagram_url",
    "linkedin_url",
    "github_url",
    "dribbble_url",
  ];

  for (const key of keys) {
    const value = formData.get(key) as string;
    if (value !== null) {
      await updateSiteSetting(key, value);
    }
  }

  revalidatePath("/");
  return { success: true };
}
