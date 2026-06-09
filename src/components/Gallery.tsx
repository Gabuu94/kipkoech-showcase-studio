import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, X, Maximize2, Images } from "lucide-react";

export type GalleryItem = { src: string; alt: string; caption?: string };

export function Gallery({ items, title = "Gallery" }: { items: GalleryItem[]; title?: string }) {
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(false);

  if (!items.length) return null;
  const item = items[active];

  const go = (d: number) => setActive((i) => (i + d + items.length) % items.length);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, items.length]);

  return (
    <section className="px-4 pb-12">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Media</p>
            <h2 className="mt-2 font-serif text-3xl sm:text-4xl">{title}</h2>
          </div>
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
            <Images className="h-3 w-3" /> {items.length} {items.length === 1 ? "shot" : "shots"}
          </span>
        </div>

        <div className="overflow-hidden rounded-3xl border border-border bg-card">
          <div className="relative group">
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="block w-full"
              aria-label="Open fullscreen viewer"
            >
              <img
                src={item.src}
                alt={item.alt}
                loading="lazy"
                className="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-[1.01]"
              />
            </button>

            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-foreground/40 via-transparent to-transparent" />

            <button
              type="button"
              onClick={() => setOpen(true)}
              className="absolute right-4 top-4 inline-flex items-center gap-2 rounded-full bg-foreground/80 px-3 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-background backdrop-blur hover:bg-foreground"
            >
              <Maximize2 className="h-3 w-3" /> Fullscreen
            </button>

            {items.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => go(-1)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 grid h-10 w-10 place-items-center rounded-full bg-background/85 text-foreground shadow-lg backdrop-blur hover:bg-background"
                  aria-label="Previous"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={() => go(1)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 grid h-10 w-10 place-items-center rounded-full bg-background/85 text-foreground shadow-lg backdrop-blur hover:bg-background"
                  aria-label="Next"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </>
            )}

            {item.caption && (
              <div className="absolute bottom-4 left-4 max-w-[80%] rounded-xl bg-foreground/80 px-3 py-2 text-xs text-background backdrop-blur">
                {item.caption}
              </div>
            )}
          </div>

          {items.length > 1 && (
            <div className="flex gap-2 overflow-x-auto p-3">
              {items.map((it, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActive(i)}
                  className={`relative h-16 w-24 flex-shrink-0 overflow-hidden rounded-lg border transition-all ${
                    i === active ? "border-foreground ring-2 ring-foreground/20" : "border-border opacity-70 hover:opacity-100"
                  }`}
                  aria-label={`Show ${it.alt}`}
                >
                  <img src={it.src} alt={it.alt} loading="lazy" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 backdrop-blur"
          onClick={() => setOpen(false)}
        >
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); setOpen(false); }}
            className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>

          {items.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); go(-1); }}
                className="absolute left-4 top-1/2 -translate-y-1/2 grid h-12 w-12 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20"
                aria-label="Previous"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); go(1); }}
                className="absolute right-4 top-1/2 -translate-y-1/2 grid h-12 w-12 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20"
                aria-label="Next"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </>
          )}

          <figure className="max-h-[90vh] max-w-[90vw]" onClick={(e) => e.stopPropagation()}>
            <img src={item.src} alt={item.alt} className="max-h-[85vh] max-w-[90vw] rounded-xl object-contain shadow-2xl" />
            {item.caption && (
              <figcaption className="mt-4 text-center text-sm text-white/80">{item.caption}</figcaption>
            )}
            <p className="mt-2 text-center text-[10px] uppercase tracking-[0.2em] text-white/40">
              {active + 1} / {items.length} · Esc to close · ← → to navigate
            </p>
          </figure>
        </div>
      )}
    </section>
  );
}
