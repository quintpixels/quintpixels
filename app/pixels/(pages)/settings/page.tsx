import { AdminHeader } from "@/components/admin/AdminHeader";
import { getAllSettings } from "@/db/queries/content";
import { updateSettingsFromForm } from "@/lib/actions/settings";

export default async function SettingsPage() {
  const settings = await getAllSettings().catch(() => ({}));
  const settingsMap = settings as Record<string, string>;

  return (
    <>
      <AdminHeader title="SETTINGS" subtitle="Site-wide configuration" />
      <div className="p-6 max-w-2xl">
        <form
          action={
            updateSettingsFromForm as unknown as (
              formData: FormData,
            ) => Promise<void>
          }
          className="space-y-8"
        >
          
          <div>
            <div className="font-pixel text-[8px] tracking-[0.3em] text-white/20 uppercase mb-4">
              COMPANY INFO
            </div>
            <div className="space-y-4">
              {[
                {
                  key: "company_name",
                  label: "COMPANY NAME",
                  placeholder: "Quint Pixels",
                },
                {
                  key: "company_email",
                  label: "CONTACT EMAIL",
                  placeholder: "hello@quintpixels.com",
                },
                {
                  key: "company_phone",
                  label: "PHONE",
                  placeholder: "+91 ...",
                },
                {
                  key: "company_address",
                  label: "ADDRESS",
                  placeholder: "India",
                },
                {
                  key: "footer_tagline",
                  label: "FOOTER TAGLINE",
                  placeholder: "Building the future, one pixel at a time.",
                },
              ].map(({ key, label, placeholder }) => (
                <div key={key}>
                  <label className="block font-pixel text-[7px] tracking-[0.25em] text-white/30 uppercase mb-2">
                    {label}
                  </label>
                  <input
                    name={key}
                    defaultValue={settingsMap[key] ?? ""}
                    placeholder={placeholder}
                    className="w-full bg-white/3 border border-white/8 rounded-sm px-4 py-3 font-mono text-[11px] text-white placeholder-white/15 focus:outline-none focus:border-white/20 transition-colors"
                  />
                </div>
              ))}
            </div>
          </div>

          
          <div>
            <div className="font-pixel text-[8px] tracking-[0.3em] text-white/20 uppercase mb-4">
              SOCIAL LINKS
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { key: "twitter_url", label: "TWITTER / X" },
                { key: "instagram_url", label: "INSTAGRAM" },
                { key: "linkedin_url", label: "LINKEDIN" },
                { key: "github_url", label: "GITHUB" },
                { key: "dribbble_url", label: "DRIBBBLE" },
              ].map(({ key, label }) => (
                <div key={key}>
                  <label className="block font-pixel text-[7px] tracking-[0.25em] text-white/30 uppercase mb-2">
                    {label}
                  </label>
                  <input
                    name={key}
                    defaultValue={settingsMap[key] ?? ""}
                    placeholder="https://..."
                    className="w-full bg-white/3 border border-white/8 rounded-sm px-4 py-3 font-mono text-[11px] text-white placeholder-white/15 focus:outline-none focus:border-white/20 transition-colors"
                  />
                </div>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="bg-white text-black font-pixel text-[9px] tracking-widest uppercase px-6 py-3 rounded-sm hover:bg-white/90 transition-colors"
          >
            SAVE SETTINGS
          </button>
        </form>
      </div>
    </>
  );
}
