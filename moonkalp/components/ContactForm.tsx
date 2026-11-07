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
        <span className="sent-i" aria-hidden>✦</span>
        <h3>Message sent</h3>
        <p className="mut">{s.message}</p>
      </div>
    );

  return (
    <form action={action} className="form">
      <div className="form-row">
        <label className="fld"><span className="lbl">01</span><input name="name" placeholder="Your name" aria-label="Your name" defaultValue={v.name} required /></label>
        <label className="fld"><span className="lbl">02</span><input name="phone" placeholder="Phone / WhatsApp" aria-label="Phone / WhatsApp" defaultValue={v.phone} required /></label>
      </div>
      <div className="form-row">
        <label className="fld"><span className="lbl">03</span><input name="email" type="email" placeholder="Email (optional)" aria-label="Email (optional)" defaultValue={v.email} /></label>
        <label className="fld"><span className="lbl">04</span><input name="business" placeholder="Business name (optional)" aria-label="Business name (optional)" defaultValue={v.business} /></label>
      </div>
      <fieldset>
        <legend className="lbl">What do you need?</legend>
        {["Reels", "Video", "Social", "Ads", "SEO", "Website", "Web app"].map((n) => (
          <label key={n} className="chip"><input type="radio" name="need" value={n} defaultChecked={v.need === n} /><span>{n}</span></label>
        ))}
      </fieldset>
      <label className="fld"><span className="lbl">05</span><textarea name="story" rows={4} placeholder="Tell us a story, or a project idea…" aria-label="Tell us a story, or a project idea" defaultValue={v.story} /></label>
      <input name="website" tabIndex={-1} autoComplete="off" aria-hidden className="hp" />
      <div className="form-end">
        <label className="agree"><input type="checkbox" required /> <span>I agree that MoonKalp may contact me about this request.</span></label>
        <button className="send" type="submit" disabled={pending} data-magnetic><span>{pending ? "Sending…" : "Send it"}</span></button>
      </div>
      {s.message && <p className="err" role="alert">{s.message}</p>}
    </form>
  );
}
