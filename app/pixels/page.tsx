import { redirect } from "next/navigation";

export default function AdminRootPage() {
  redirect("/pixels/login");
}
