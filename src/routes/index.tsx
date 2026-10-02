import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { useServerFn } from "@tanstack/react-start";
import { MENU } from "@/lib/menu";
import { placeOrder } from "@/lib/orders.functions";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Rangoli Bites — Colour outside. Eat inside." },
      { name: "description", content: "Order biryani, kebabs and Indian desserts from Rangoli Bites for home delivery." },
      { property: "og:title", content: "Rangoli Bites — Colour outside. Eat inside." },
      { property: "og:description", content: "Order biryani, kebabs and Indian desserts for home delivery." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const inr = (n: number) => `₹${n}`;

function Rangoli({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden>
      {Array.from({ length: 8 }).map((_, i) => (
        <g key={i} transform={`rotate(${i * 45} 100 100)`}>
          <ellipse cx="100" cy="45" rx="14" ry="34" fill="none" stroke="var(--holi-pink)" strokeWidth="2" />
          <circle cx="100" cy="14" r="5" fill="var(--holi-yellow)" />
          <circle cx="100" cy="70" r="3" fill="var(--holi-green)" />
        </g>
      ))}
      <circle cx="100" cy="100" r="12" fill="var(--holi-yellow)" />
    </svg>
  );
}

function Index() {
  const [cart, setCart] = useState<Record<string, number>>({});
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const [done, setDone] = useState<{ orderId: string; total: number } | null>(null);
  const submit = useServerFn(placeOrder);

  const setQty = (id: string, d: number) =>
    setCart((c) => {
      const q = Math.max(0, (c[id] ?? 0) + d);
      const n = { ...c };
      if (q) n[id] = q; else delete n[id];
      return n;
    });
  const lines = MENU.filter((m) => cart[m.id]).map((m) => ({ ...m, qty: cart[m.id] ?? 0 }));
  const count = lines.reduce((s, l) => s + l.qty, 0);
  const total = lines.reduce((s, l) => s + l.qty * l.price, 0);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    setBusy(true); setErr("");
    try {
      const r = await submit({
        data: {
          name: String(f.get("name")), phone: String(f.get("phone")),
          address: String(f.get("address")), time: String(f.get("time")),
          items: lines.map((l) => ({ id: l.id, qty: l.qty })),
        },
      });
      setDone(r); setCart({});
    } catch {
      setErr("Please check your details and try again.");
    } finally { setBusy(false); }
  }

  const input = "w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none focus:border-primary";

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <nav className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <a href="#" className="flex items-center gap-2 font-display text-xl font-bold">
            <Rangoli className="h-7 w-7" /> Rangoli Bites
          </a>
          <div className="hidden gap-8 text-sm text-muted-foreground sm:flex">
            <a href="#menu" className="hover:text-foreground">Menu</a>
            <a href="#story" className="hover:text-foreground">Our story</a>
            <a href="#delivery" className="hover:text-foreground">Delivery</a>
          </div>
          <a href="#menu" className="rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background">Order now</a>
        </div>
      </nav>

      <header className="relative px-5 pb-20 pt-16 sm:pt-24">
        <div className="holi-blob left-[-5%] top-10 h-64 w-64 bg-holi-pink" />
        <div className="holi-blob right-[5%] top-0 h-72 w-72 bg-holi-yellow [animation-delay:-4s]" />
        <div className="holi-blob bottom-0 left-1/3 h-56 w-56 bg-holi-green [animation-delay:-8s]" />
        <Rangoli className="rangoli-spin pointer-events-none absolute -right-24 top-10 h-96 w-96 opacity-20" />
        <div className="relative mx-auto max-w-6xl">
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.25em] text-primary">Indian kitchen · Home delivery</p>
          <h1 className="max-w-3xl text-5xl font-bold leading-[1.05] sm:text-7xl">
            Colour outside.<br />
            <span className="holi-gradient bg-clip-text text-transparent">Eat inside.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted-foreground">
            Slow-cooked biryani, smoky kebabs and festive sweets — made with care, delivered warm.
          </p>
          <a href="#menu" className="mt-8 inline-block rounded-full bg-primary px-7 py-3.5 font-medium text-primary-foreground shadow-lg">
            Explore the menu
          </a>
        </div>
      </header>

      <div id="delivery" className="holi-gradient py-3 text-center text-sm font-medium text-foreground">
        Free delivery within 5 km · 30–45 min · Open daily 11am – 11pm · Cash or UPI on delivery
      </div>

      <section id="menu" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-20">
        <h2 className="text-4xl font-bold">The menu</h2>
        <p className="mt-2 text-muted-foreground">Small, honest, and made fresh every day.</p>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {MENU.map((m) => {
            const q = cart[m.id] ?? 0;
            return (
              <article key={m.id} className="group overflow-hidden rounded-3xl border border-border bg-card transition hover:-translate-y-1 hover:shadow-xl">
                <div className="aspect-square overflow-hidden">
                  <img src={m.image} alt={m.name} loading="lazy" width={816} height={816} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                </div>
                <div className="p-5">
                  <span className="text-xs uppercase tracking-widest text-holi-green">{m.tag}</span>
                  <h3 className="mt-1 text-xl font-bold">{m.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{m.desc}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-lg font-bold">{inr(m.price)}</span>
                    {q === 0 ? (
                      <button onClick={() => setQty(m.id, 1)} className="rounded-full bg-primary px-5 py-2 text-sm font-medium text-primary-foreground">Add</button>
                    ) : (
                      <div className="flex items-center gap-3 rounded-full border border-border px-2 py-1">
                        <button aria-label={`Remove one ${m.name}`} onClick={() => setQty(m.id, -1)} className="h-8 w-8 rounded-full bg-muted text-lg">−</button>
                        <span className="w-5 text-center font-bold">{q}</span>
                        <button aria-label={`Add one ${m.name}`} onClick={() => setQty(m.id, 1)} className="h-8 w-8 rounded-full bg-primary text-lg text-primary-foreground">+</button>
                      </div>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section id="story" className="scroll-mt-20 bg-secondary px-5 py-20">
        <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2">
          <Rangoli className="rangoli-spin mx-auto h-64 w-64 sm:h-80 sm:w-80" />
          <div>
            <h2 className="text-4xl font-bold">The Rangoli Way</h2>
            <p className="mt-5 text-muted-foreground">
              A rangoli is drawn at the doorstep to welcome guests — every grain of colour placed by hand.
              We cook the same way: whole spices toasted each morning, biryani sealed on slow dum, kebabs
              kissed by charcoal, and sweets finished with saffron and rose.
            </p>
            <p className="mt-4 text-muted-foreground">Few dishes. Done properly. Brought to your door.</p>
          </div>
        </div>
      </section>

      <footer className="px-5 py-10 text-center text-sm text-muted-foreground">© {new Date().getFullYear()} Rangoli Bites</footer>

      {count > 0 && !open && (
        <button onClick={() => { setOpen(true); setDone(null); }}
          className="fixed bottom-5 left-1/2 z-40 flex -translate-x-1/2 items-center gap-4 rounded-full bg-foreground px-6 py-4 text-background shadow-2xl sm:left-auto sm:right-6 sm:translate-x-0">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">{count}</span>
          <span className="font-medium">View cart · {inr(total)}</span>
        </button>
      )}

      {open && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-foreground/40 sm:items-center" onClick={() => setOpen(false)}>
          <div className="max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-t-3xl bg-card p-6 sm:rounded-3xl" onClick={(e) => e.stopPropagation()}>
            {done ? (
              <div className="py-8 text-center">
                <Rangoli className="mx-auto h-24 w-24" />
                <h2 className="mt-4 text-3xl font-bold">Order placed!</h2>
                <p className="mt-2 text-muted-foreground">Thank you — we're on it. Order <b>{done.orderId}</b> · {inr(done.total)}</p>
                <p className="mt-1 text-sm text-muted-foreground">We'll call you to confirm. Pay cash or UPI on delivery.</p>
                <button onClick={() => setOpen(false)} className="mt-6 rounded-full bg-primary px-6 py-3 font-medium text-primary-foreground">Done</button>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold">Your order</h2>
                  <button onClick={() => setOpen(false)} aria-label="Close" className="text-2xl text-muted-foreground">×</button>
                </div>
                <ul className="mt-4 divide-y divide-border">
                  {lines.map((l) => (
                    <li key={l.id} className="flex items-center justify-between py-3 text-sm">
                      <span>{l.qty} × {l.name}</span><span className="font-medium">{inr(l.qty * l.price)}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex justify-between border-t border-border pt-3 text-lg font-bold">
                  <span>Total</span><span>{inr(total)}</span>
                </div>
                {lines.length === 0 ? <p className="mt-4 text-sm text-muted-foreground">Your cart is empty.</p> : (
                  <form onSubmit={onSubmit} className="mt-6 space-y-3">
                    <input name="name" required maxLength={100} placeholder="Your name" className={input} />
                    <input name="phone" required type="tel" pattern="[0-9+\- ]{7,20}" placeholder="Phone number" className={input} />
                    <textarea name="address" required minLength={5} maxLength={500} rows={3} placeholder="Delivery address" className={input} />
                    <select name="time" required defaultValue="ASAP" className={input}>
                      <option>ASAP</option>
                      {["12:00 – 13:00","13:00 – 14:00","19:00 – 20:00","20:00 – 21:00","21:00 – 22:00"].map((t) => <option key={t}>{t}</option>)}
                    </select>
                    {err && <p className="text-sm text-destructive">{err}</p>}
                    <button disabled={busy} className="w-full rounded-full bg-primary py-4 font-medium text-primary-foreground disabled:opacity-60">
                      {busy ? "Placing order…" : `Place order · ${inr(total)}`}
                    </button>
                  </form>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
