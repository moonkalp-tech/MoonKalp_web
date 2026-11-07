// Edit everything here: contact details, socials and team cards.
// Team photos: drop images in /public/team/ and set photo: "/team/name.jpg".
export const site = {
  email: "moonkalp.tech@gmail.com",
  phone: "+91 88057 58841",
  whatsapp: "https://wa.me/918805758841",
  // address: ["MoonKalp · CreativeFlow Studio", "Street address, City, State"],
  // hours: "Mon to Sat · 10:00 to 19:00 IST",
  // Add real profile URLs here and the "Follow" column appears in the footer.
  social: [] as [string, string][],
  // social: [["Instagram", "https://instagram.com/"], ["LinkedIn", "https://linkedin.com/"], ["YouTube", "https://youtube.com/"]] as [string, string][],
  teamIntro: "A small team that sweats the script, the timing and the last frame. You'll talk to the people who actually make your work.",
};

export const team: { name: string; role: string; fun: string; photo?: string }[] = [
  { name: "Sooraj Moon", role: "Creative and Content Lead", fun: "Will rewrite a script ten times for one perfect pause." },
  { name: "Rasik Moon", role: "Marketing and Creative Lead", fun: "Hears a brief and sees the storyboard instantly." },
  { name: "Aniket Dhakate", role: "Web Developer and Technical", fun: "Fixes your site while the rest of us sleep" },
  { name: "Hemant Gowardipe", role: "Web Developer and Technical", fun: "Fixes your site while the rest of us sleep" },
];

export const nav: [string, [string, string][]][] = [
  ["Studio", [["About", "#about"], ["Built for", "#for"], ["The difference", "#why"], ["Team", "#team"]]],
  ["Services", ["Motion Graphics", "Video Production", "Social Media", "Meta Ads", "SEO", "Websites", "Web Apps", "Integrations"].map((s) => [s, "#services"] as [string, string])],
  ["Work", [["Playground", "#playground"], ["Process", "#process"], ["Ways to work", "#ways"]]],
  ["Say hello", [["Contact", "#contact"]]],
];
