import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { MENU_PRICES } from "./prices";

const schema = z.object({
  name: z.string().trim().min(1).max(100),
  phone: z.string().trim().min(7).max(20),
  address: z.string().trim().min(5).max(500),
  time: z.string().trim().min(1).max(50),
  items: z.array(z.object({ id: z.string(), qty: z.number().int().min(1).max(50) })).min(1).max(20),
});

const RESTAURANT_EMAIL = "rsrigangaram@gmail.com";

export const placeOrder = createServerFn({ method: "POST" })
  .inputValidator((d) => schema.parse(d))
  .handler(async ({ data }) => {
    const lines = data.items
      .flatMap((i) => {
        const p = MENU_PRICES[i.id];
        return p ? [{ ...i, ...p, subtotal: p.price * i.qty }] : [];
      });
    const total = lines.reduce((s, l) => s + l.subtotal, 0);
    const orderId = "RB-" + Date.now().toString(36).toUpperCase();
    const text = [
      `New order ${orderId}`,
      `Name: ${data.name}`, `Phone: ${data.phone}`, `Address: ${data.address}`, `Preferred time: ${data.time}`,
      "", ...lines.map((l) => `${l.qty} x ${l.name} = Rs ${l.subtotal}`), "", `Total: Rs ${total}`,
    ].join("\n");

    // Email notification: set RESEND_API_KEY (and optionally ORDER_FROM_EMAIL) as a secret to enable.
    let emailed = false;
    const key = process.env["RESEND_API_KEY"];
    if (key) {
      try {
        const r = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
          body: JSON.stringify({
            from: process.env["ORDER_FROM_EMAIL"] || "Rangoli Bites <onboarding@resend.dev>",
            to: [RESTAURANT_EMAIL],
            subject: `New order ${orderId} — Rs ${total}`,
            text,
          }),
        });
        emailed = r.ok;
        if (!r.ok) console.error("Email failed", r.status, await r.text());
      } catch (e) { console.error("Email error", e); }
    } else {
      console.log("[order] email not configured\n" + text);
    }
    return { orderId, total, emailed };
  });
