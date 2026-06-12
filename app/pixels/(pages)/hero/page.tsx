import { AdminHeader } from "@/components/admin/AdminHeader";
import { getHeroContent } from "@/db/queries/content";
import { updateHeroContent } from "@/lib/actions/content";

export default async function HeroPage() {
  const hero = await getHeroContent().catch(() => null);

  return (
    <>
      <AdminHeader
        title="HERO CONTENT"
        subtitle="Edit the homepage hero section"
      />
      <div className="p-6 max-w-2xl">
        
        <div className="mb-6 px-4 py-3 border border-white/8 rounded-sm bg-white/3">
          <p className="font-pixel text-[7px] tracking-widest text-white/30 uppercase mb-1">
            BRAND HEADLINE
          </p>
          <p className="font-mono text-[11px] text-white/50 leading-relaxed">
            <span className="text-white/70 font-bold">QUINT PIXELS</span> — the studio identity is hardcoded as the hero headline.
            Only the subheadline and CTAs below are editable.
          </p>
        </div>

        <form
          action={
            updateHeroContent as unknown as (
              formData: FormData,
            ) => Promise<void>
          }
          className="space-y-6"
        >
          <div className="space-y-5">
            <div>
              <label className="block font-pixel text-[7px] tracking-[0.25em] text-white/30 uppercase mb-2">
                SUBHEADLINE
              </label>
              <textarea
                name="subheadline"
                defaultValue={
                  hero?.subheadline ||
                  "A cinematic technology studio building products, systems, and experiences at the intersection of design and engineering."
                }
                rows={4}
                className="w-full bg-white/3 border border-white/8 rounded-sm px-4 py-3 font-mono text-[12px] text-white placeholder-white/20 focus:outline-none focus:border-white/20 transition-colors resize-none"
                placeholder="A cinematic technology studio..."
              />
              <p className="mt-1 font-mono text-[9px] text-white/20">
                Use \n for line breaks in the subheadline
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-pixel text-[7px] tracking-[0.25em] text-white/30 uppercase mb-2">
                  PRIMARY CTA TEXT
                </label>
                <input
                  name="cta_primary_text"
                  defaultValue={hero?.cta_primary_text || "View Our Work"}
                  className="w-full bg-white/3 border border-white/8 rounded-sm px-4 py-3 font-mono text-[12px] text-white focus:outline-none focus:border-white/20 transition-colors"
                />
              </div>
              <div>
                <label className="block font-pixel text-[7px] tracking-[0.25em] text-white/30 uppercase mb-2">
                  PRIMARY CTA LINK
                </label>
                <input
                  name="cta_primary_href"
                  defaultValue={hero?.cta_primary_href || "/portfolio"}
                  className="w-full bg-white/3 border border-white/8 rounded-sm px-4 py-3 font-mono text-[12px] text-white focus:outline-none focus:border-white/20 transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-pixel text-[7px] tracking-[0.25em] text-white/30 uppercase mb-2">
                  SECONDARY CTA TEXT
                </label>
                <input
                  name="cta_secondary_text"
                  defaultValue={hero?.cta_secondary_text || "Start a Project"}
                  className="w-full bg-white/3 border border-white/8 rounded-sm px-4 py-3 font-mono text-[12px] text-white focus:outline-none focus:border-white/20 transition-colors"
                />
              </div>
              <div>
                <label className="block font-pixel text-[7px] tracking-[0.25em] text-white/30 uppercase mb-2">
                  SECONDARY CTA LINK
                </label>
                <input
                  name="cta_secondary_href"
                  defaultValue={hero?.cta_secondary_href || "/contact"}
                  className="w-full bg-white/3 border border-white/8 rounded-sm px-4 py-3 font-mono text-[12px] text-white focus:outline-none focus:border-white/20 transition-colors"
                />
              </div>
            </div>
          </div>

          <div className="pt-2 flex items-center gap-4">
            <button
              type="submit"
              className="bg-white text-black font-pixel text-[9px] tracking-widest uppercase px-6 py-3 rounded-sm hover:bg-white/90 transition-colors"
            >
              SAVE CHANGES
            </button>
            <a
              href="/"
              target="_blank"
              className="font-pixel text-[8px] tracking-widest text-white/30 hover:text-white/60 uppercase transition-colors"
            >
              PREVIEW →
            </a>
          </div>
        </form>
      </div>
    </>
  );
}
