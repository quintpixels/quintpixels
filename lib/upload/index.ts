import "server-only";
import { writeFile, mkdir } from "fs/promises";
import { existsSync } from "fs";
import path from "path";

const UPLOAD_DIR = process.env.UPLOAD_DIR ?? "uploads";
const MAX_FILE_SIZE = 5 * 1024 * 1024; 
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];

export async function uploadImage(
  file: File,
): Promise<{ url: string; error?: string }> {
  if (file.size > MAX_FILE_SIZE) {
    return { url: "", error: "File size exceeds 5MB limit" };
  }

  if (!ALLOWED_TYPES.includes(file.type)) {
    return {
      url: "",
      error: "Only JPEG, PNG, WebP, and GIF files are allowed",
    };
  }

  const uploadPath = path.join(process.cwd(), "public", UPLOAD_DIR);
  if (!existsSync(uploadPath)) {
    await mkdir(uploadPath, { recursive: true });
  }

  const ext = file.name.split(".").pop() ?? "jpg";
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 8);
  const filename = `${timestamp}-${random}.${ext}`;
  const filePath = path.join(uploadPath, filename);

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  await writeFile(filePath, buffer);

  return { url: `/${UPLOAD_DIR}/${filename}` };
}

export async function deleteUploadedFile(url: string): Promise<void> {
  try {
    const filePath = path.join(process.cwd(), "public", url);
    const { unlink } = await import("fs/promises");
    await unlink(filePath);
  } catch {
    // File may not exist, ignore
  }
}
