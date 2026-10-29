"use server";

export type FormState = { ok: boolean; message: string; values?: Record<string, string> };

const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" } as Record<string, string>)[c]);

export async function sendInquiry(_prev: FormState, fd: FormData): Promise<FormState> {
  const get = (k: string, max = 2000) => String(fd.get(k) ?? "").trim().slice(0, max);
  const values = { name: get("name", 100), phone: get("phone", 30), email: get("email", 120), business: get("business", 120), need: get("need", 30), story: get("story") };

  // Honeypot: real people never see this field, bots fill it. Pretend success.
  if (get("website")) return { ok: true, message: "Thanks!" };

  if (!values.name || !values.phone) return { ok: false, message: "Please add your name and phone / WhatsApp number.", values };
  if (values.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) return { ok: false, message: "That email address doesn't look right.", values };

  const { BREVO_API_KEY, BREVO_SENDER_EMAIL, CONTACT_TO_EMAIL } = process.env;
  if (!BREVO_API_KEY || !BREVO_SENDER_EMAIL || !CONTACT_TO_EMAIL) {
    console.error("Brevo env vars missing (BREVO_API_KEY, BREVO_SENDER_EMAIL, CONTACT_TO_EMAIL)");
    return { ok: false, message: "Our inbox isn't connected yet. Please try again shortly.", values };
  }

  const rows: [string, string][] = [["Name", values.name], ["Phone / WhatsApp", values.phone], ["Email", values.email || "-"], ["Business", values.business || "-"], ["Needs", values.need || "-"], ["Message", values.story || "-"]];
  const htmlContent = `<h2 style="font-family:Arial">New MoonKalp inquiry</h2><table cellpadding="8" style="font-family:Arial;font-size:14px;border-collapse:collapse">${rows
    .map(([k, v]) => `<tr><td style="border-bottom:1px solid #eee;color:#888;vertical-align:top">${k}</td><td style="border-bottom:1px solid #eee;white-space:pre-wrap">${esc(v)}</td></tr>`)
    .join("")}</table>`;

  try {
    const res = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: { "api-key": BREVO_API_KEY, "content-type": "application/json", accept: "application/json" },
      body: JSON.stringify({
        sender: { name: "MoonKalp Website", email: BREVO_SENDER_EMAIL },
        to: [{ email: CONTACT_TO_EMAIL }],
        ...(values.email && { replyTo: { email: values.email, name: values.name } }),
        subject: `New inquiry from ${values.name.replace(/\s+/g, " ")}${values.need ? ` · ${values.need}` : ""}`,
        htmlContent,
      }),
    });
    if (!res.ok) {
      console.error("Brevo error", res.status, await res.text());
      return { ok: false, message: "We couldn't send that just now. Please try again in a minute.", values };
    }
    return { ok: true, message: "Thanks. We read every message and will reply soon." };
  } catch (e) {
    console.error("Brevo request failed", e);
    return { ok: false, message: "We couldn't send that just now. Please try again in a minute.", values };
  }
}
