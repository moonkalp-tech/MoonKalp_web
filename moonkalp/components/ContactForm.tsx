"use client";
import { useActionState } from "react";
import { sendInquiry, type FormState } from "@/app/actions";

const init: FormState = { ok: false, message: "" };

export default function ContactForm() {
  const [s, action, pending] = useActionState(sendInquiry, init);
  const v = s.values ?? {};

  if (s.ok)
    return (
      <div className="sent">
        <h3 className="d h3">Message sent</h3>
        <p className="mut" style={{ marginTop: 12 }}>{s.message}</p>
      </div>
    );

  return (
    <form action={action} className="form">
      <input name="name" placeholder="Your name" defaultValue={v.name} required />
      <input name="phone" placeholder="Phone / WhatsApp" defaultValue={v.phone} required />
      <input name="email" type="email" placeholder="Email (optional)" defaultValue={v.email} />
      <input name="business" placeholder="Business name (optional)" defaultValue={v.business} />
      <fieldset>
        <legend className="lbl">What do you need?</legend>
        {["Reels", "Video", "Social", "Ads", "SEO", "Website"].map((n) => (
          <label key={n} className="chip"><input type="radio" name="need" value={n} defaultChecked={v.need === n} /><span>{n}</span></label>
        ))}
      </fieldset>
      <textarea name="story" rows={4} placeholder="Tell us a story, or a project idea…" defaultValue={v.story} />
      <input name="website" tabIndex={-1} autoComplete="off" aria-hidden className="hp" />
      <label className="agree"><input type="checkbox" required /> I agree that MoonKalp may contact me about this request.</label>
      {s.message && <p className="err" role="alert">{s.message}</p>}
      <button className="btn" type="submit" disabled={pending}>{pending ? "Sending…" : "Send it"}</button>
    </form>
  );
}
