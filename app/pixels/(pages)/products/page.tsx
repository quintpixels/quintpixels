import { AdminHeader } from "@/components/admin/AdminHeader";
import { getAllProducts } from "@/db/queries/content";
import { ProductsCMS } from "./ProductsCMS";

export default async function ProductsPage() {
  const products = await getAllProducts().catch(() => []);
  return (
    <>
      <AdminHeader title="PRODUCTS" subtitle="Manage product offerings" />
      <ProductsCMS products={products} />
    </>
  );
}
