import Link from "next/link";

export function BackHomeLink() {
  return (
    <Link
      href="/"
      className="group flex items-center gap-4 md:gap-6 w-full px-6 md:px-10 lg:px-16 py-7 md:py-10 border-b border-(--pix-border) bg-(--pix-white) hover:bg-(--pix-surface) transition-colors duration-300 overflow-hidden"
    >
      
      <span
        className="font-mono text-[10px] md:text-[11px] tracking-[0.3em] uppercase text-(--pix-gray) group-hover:text-(--pix-black) group-hover:-translate-x-1.5 transition-all duration-300 shrink-0 leading-none"
        aria-hidden="true"
      >
        ←
      </span>

      <span className="font-pixel text-[clamp(2rem,7vw,6.5rem)] text-(--pix-black) leading-none group-hover:opacity-60 transition-opacity duration-400 whitespace-nowrap">
        BACK TO HOME
      </span>

      <span className="hidden sm:block ml-auto font-mono text-[10px] tracking-[0.25em] uppercase text-(--pix-gray-light) shrink-0">
        ← /
      </span>
    </Link>
  );
}
