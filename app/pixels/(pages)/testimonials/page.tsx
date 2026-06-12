import { AdminHeader } from "@/components/admin/AdminHeader";
import { getAllTestimonials } from "@/db/queries/content";
import { TestimonialsCMS } from "./TestimonialsCMS";

export default async function TestimonialsPage() {
  const testimonials = await getAllTestimonials().catch(() => []);
  return (
    <>
      <AdminHeader title="TESTIMONIALS" subtitle="Manage client testimonials" />
      <TestimonialsCMS testimonials={testimonials} />
    </>
  );
}
