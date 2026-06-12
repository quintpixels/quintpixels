import { AdminHeader } from "@/components/admin/AdminHeader";
import { getAllServices } from "@/db/queries/content";
import { ServicesCMS } from "./ServicesCMS";

export default async function ServicesPage() {
  const services = await getAllServices().catch(() => []);
  return (
    <>
      <AdminHeader title="SERVICES" subtitle="Manage service offerings" />
      <ServicesCMS services={services} />
    </>
  );
}
