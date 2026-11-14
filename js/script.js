/* ========= 1. YOUR LINKS (edit these) ========= */
const LINKS = {
  linkedin: "https://www.linkedin.com/in/nandhini0911",
  github: "https://github.com/Nandhinisakthivel2004"
};

/* ========= 2. ICONS (loaded from the web; a lettered badge shows if one is missing) ========= */
const dv = n => `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${n}/${n}-original.svg`;
const si = n => `https://cdn.simpleicons.org/${n}`;

/* ========= 3. SKILLS: each group is one slide. Format: [name, icon or null] ========= */
const SN_ONLINE = si("servicenow");
const SN = "images/servicenow.png";                   // <-- green ServiceNow icon, used on skill tiles
const WORDMARK = "images/servicenow-wordmark.png";    // <-- ServiceNow name logo, shown beside the ServiceNow slide titles
const ALT = { [SN]: SN_ONLINE };      // used automatically if the file above is missing
const skills = [
  { title: "ServiceNow", items: ["ServiceNow", "ITSM", "Service Catalog", "Flow Designer", "Service Portal", "CMDB basics", "CSM and FSM"].map(n => [n, SN]) },
  { title: "ServiceNow scripting", items: ["GlideRecord", "GlideAjax", "Script Includes", "Business Rules", "Client Scripts", "ACLs", "Update Sets"].map(n => [n, SN]) },
  { title: "Languages", items: [["Python", dv("python")], ["Java", dv("java")], ["JavaScript", dv("javascript")], ["PostgreSQL", dv("postgresql")], ["HTML", dv("html5")], ["CSS", dv("css3")]] },
  { title: "Backend and APIs", items: [["FastAPI", dv("fastapi")], ["REST APIs"], ["REST Message"], ["Integration Hub"], ["JSON"], ["Postman", dv("postman")]] },
  { title: "Frontend and tools", items: [["React", dv("react")], ["Power BI", si("powerbi")], ["Git", dv("git")], ["GitHub", dv("github")], ["VS Code", dv("vscode")], ["Azure DevOps", dv("azuredevops")], ["Jira", dv("jira")]] }
];

/* ========= 4. PROJECTS: tech names that match a skill above get its icon ========= */
const projects = [
  { title: "Automated Azure Repository Management via ServiceNow",
    text: "A Service Catalog form and Flow Designer workflow take a repository request from submission to a ready repo with branch protection enforced, with no manual steps.",
    tech: ["ServiceNow", "Flow Designer", "JavaScript", "Azure DevOps"] },
  { title: "ServiceNow and Jira Integration for Dynamic Dashboards",
    text: "Jira data flows into custom catalog forms through REST Messages, so dashboards stay live instead of static. Creating an Incident also creates the matching Jira task automatically.",
    tech: ["ServiceNow", "Jira", "REST Message", "Client Scripts"] },
  { title: "Final Year Project: Smart Crop Recommendation System",
    text: "Group project built in the final year of my B.E. A CatBoost and Random Forest model predicts suitable crops from nitrogen, phosphorus, potassium, pH, temperature, humidity and rainfall data. A React front end shows results in real time.",
    tech: ["Python", "CatBoost", "Random Forest", "React", "FastAPI", "TypeScript", "Tailwind CSS"] }
];

/* ========= 5. EDUCATION ========= */
const education = [
  { badge: "KPR", title: "KPR Institute of Engineering and Technology",
    facts: [["Location", "Coimbatore"], ["Degree", "BE in Computer Science and Engineering"], ["CGPA", "8.56"], ["Duration", "2022 - 2026"]] },
  { badge: "LF", title: "Little Flower Matriculation Higher Secondary School",
    facts: [["Location", "Sathyamangalam"], ["SSLC", "96.8%"], ["HSC", "94.8%"]] }
];

/* ========= 6. BUILDING BLOCKS ========= */
const $ = id => document.getElementById(id);
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
const ICONS = {};
skills.forEach(g => g.items.forEach(([n, i]) => { if (i) ICONS[n] = i; }));
ICONS["Azure DevOps"] = dv("azuredevops");
ICONS["TypeScript"] = dv("typescript");
ICONS["Tailwind CSS"] = dv("tailwindcss");

const ini = n => { const w = n.replace(/[^A-Za-z ]/g, "").split(" ").filter(Boolean);
  return (w.length > 1 ? w[0][0] + w[1][0] : (w[0] || "?").slice(0, 2)).toUpperCase(); };
window.fb = img => { if (img.dataset.alt) { img.src = img.dataset.alt; img.dataset.alt = ""; return; } const s = document.createElement("span"); s.className = "badge"; s.textContent = ini(img.dataset.n); img.replaceWith(s); };
const chip = (n, icon, i) => `<div class="chip" style="--i:${i}">${
  icon ? `<img src="${icon}" class="${icon === SN ? "sn" : ""}" alt="" data-n="${n}" data-alt="${ALT[icon] || ""}" loading="lazy" onerror="fb(this)">` : `<span class="badge">${ini(n)}</span>`
}<span>${n}</span></div>`;

function carousel(id, tabs, slides) {
  const root = $(id), n = slides.length;
  root.innerHTML = `<div class="car-tabs">${tabs.map((t, i) => `<button type="button" data-i="${i}">${t}</button>`).join("")}</div>
    <div class="car-view"><div class="car-track">${slides.map(s => `<div class="slide ${s.cls || ""}">${s.html}</div>`).join("")}</div></div>
    <div class="car-ctl"><button type="button" class="icon-btn" data-d="-1" aria-label="Previous">&#8249;</button><button type="button" class="icon-btn" data-d="1" aria-label="Next">&#8250;</button></div>`;
  const track = root.querySelector(".car-track"), view = root.querySelector(".car-view");
  const els = [...track.children], btns = [...root.querySelectorAll(".car-tabs button")];
  let idx = 0, timer, paused = false, visible = false, seen = false;

  const go = i => {
    idx = (i + n) % n;
    track.style.transform = `translateX(-${idx * 100}%)`;
    els.forEach((e, k) => { e.classList.toggle("on", k === idx); e.setAttribute("aria-hidden", k !== idx); });
    btns.forEach((b, k) => b.setAttribute("aria-pressed", k === idx));
  };
  const loop = () => { clearInterval(timer); if (!reduce) timer = setInterval(() => { if (!paused && visible) go(idx + 1); }, 5500); };

  btns.forEach(b => b.addEventListener("click", () => { go(+b.dataset.i); loop(); }));
  root.querySelectorAll("[data-d]").forEach(b => b.addEventListener("click", () => { go(idx + +b.dataset.d); loop(); }));
  let x0 = null;
  view.addEventListener("pointerdown", e => x0 = e.clientX);
  view.addEventListener("pointerup", e => { if (x0 !== null && Math.abs(e.clientX - x0) > 40) { go(idx + (e.clientX < x0 ? 1 : -1)); loop(); } x0 = null; });
  root.addEventListener("mouseenter", () => paused = true);
  root.addEventListener("mouseleave", () => paused = false);
  root.addEventListener("focusin", () => paused = true);
  root.addEventListener("focusout", () => paused = false);
  new IntersectionObserver(([e]) => {
    visible = e.isIntersecting;
    if (visible && !seen) { seen = true; const s = els[idx]; s.classList.remove("on"); void s.offsetWidth; s.classList.add("on"); }
  }, { threshold: .4 }).observe(root);
  go(0); loop();
}

/* ========= 7. BUILD THE PAGE ========= */
const chipsHtml = items => `<div class="chips">${items.map(([n, i], k) => chip(n, i || ICONS[n], k)).join("")}</div>`;

carousel("skills-car", skills.map(s => s.title),
  skills.map(s => ({ html: `<div class="slide-head"><h3>${s.title}</h3>${s.title.startsWith("ServiceNow") ? `<img class="wordmark" src="${WORDMARK}" alt="ServiceNow" onerror="this.remove()">` : ""}</div>${chipsHtml(s.items)}` })));

carousel("projects-car", ["Azure Repository Automation", "Jira Integration", "Final Year Project"],
  projects.map(p => ({ html: `<h3>${p.title}</h3><p>${p.text}</p>${chipsHtml(p.tech.map(t => [t]))}` })));

carousel("edu-car", ["College", "School"],
  education.map(e => e.items
    ? { html: `<h3>${e.title}</h3>${chipsHtml(e.items)}` }
    : { cls: "edu", html: `<span class="badge">${e.badge}</span><div><h3>${e.title}</h3><div class="facts">${e.facts.map(([k, v], i) => `<div class="fact" style="--i:${i}"><span>${k}</span><b>${v}</b></div>`).join("")}</div></div>` }));

/* ========= EXPERIENCE AND INTERNSHIPS (one slide each) ========= */
const work = [
  { tab: "AVASOFT (Experience)", title: "ServiceNow Analyst (Trainee Engineer)", meta: "AVASOFT Software Pvt Ltd, Chennai. Dec 2025 to present",
    points: ["Built end-to-end Service Catalog workflows with Flow Designer and Script Includes, removing manual ticket routing from request fulfilment.",
      "Configured REST Message integrations with JSON payloads to sync ServiceNow with Azure DevOps and Jira in real time.",
      "Handle Incident, Problem and Change tickets in daily ITSM operations, and worked usecases in CSM and FSM configuration.",
      "Designed a custom catalog form that automates Azure repository provisioning, cutting branch protection setup from hours to minutes.",
      "Manage releases with Update Sets, supporting secure dev-to-prod deployment under platform governance standards."],
    tech: ["ServiceNow", "Flow Designer", "JavaScript", "Azure DevOps", "Jira"] },
  { tab: "CodSoft (Internship)", title: "Machine Learning Intern", meta: "CodSoft Pvt Ltd. Virtual internship, 4 weeks (10 Jul to 10 Aug 2024)",
    points: ["Cleaned and prepared raw datasets in Python so they were ready for model training.",
      "Applied feature engineering to shape the input data the models learn from.",
      "Worked on model optimization to improve model readiness and the quality of results.",
      "Gained hands-on experience with the machine learning workflow, from data preparation to optimization."],
    tech: ["Python", "Machine Learning", "Data Preprocessing"],
    cert: { name: "Certificate of Completion", by: "CodSoft, Jul to Aug 2024", file: "codsoft-internship.jpg" } },
  { tab: "Techvolt (Internship)", title: "Web Development Intern", meta: "Techvolt Software Pvt Ltd, Coimbatore. Frontend web development (18 Jan to 5 Feb 2024)",
    points: ["Built responsive user interface layouts using HTML, CSS and JavaScript.",
      "Made pages render consistently across different screen sizes, from phones to desktops.",
      "Created reusable interface components for the pages.",
      "Strengthened front-end fundamentals across HTML, CSS and JavaScript."],
    tech: ["HTML", "CSS", "JavaScript"],
    cert: { name: "Certificate of Merit", by: "Techvolt Software, Jan to Feb 2024", file: "techvolt-internship.jpeg" } }
];
carousel("work-car", work.map(w => w.tab),
  work.map((w, k) => ({ html: `<h3>${w.title}</h3><p class="meta">${w.meta}</p><ul>${w.points.map(p => `<li>${p}</li>`).join("")}</ul><div class="slide-foot">${chipsHtml(w.tech.map(t => [t]))}${w.cert ? `<button type="button" class="cert" data-w="${k}"><span class="cert-img"><img src="images/${w.cert.file}" alt="" onerror="cfb(this)"></span><span class="cert-txt">${w.cert.name}<small>${w.cert.by}</small></span></button>` : ""}</div>` })));

/* ========= CONTACT (icon + name) ========= */
const contact = [
  ["Email", si("gmail"), "https://mail.google.com/mail/?view=cm&fs=1&to=nandhinisakthivel1621@gmail.com"],
  ["LinkedIn", si("linkedin"), LINKS.linkedin],
  ["GitHub", dv("github"), LINKS.github],
  ["Erode, TN"]
];
const cbox = $("contact-chips");
cbox.innerHTML = contact.filter(([n, i, href]) => !href || !href.includes("YOUR-")).map(([n, i, href], k) => {
  const c = chip(n, i, k);
  return href ? `<a class="chip-link" href="${href}"${href.startsWith("http") ? ' target="_blank" rel="noopener"' : ""} aria-label="${n}">${c}</a>` : c;
}).join("");
new IntersectionObserver(([e], o) => { if (e.isIntersecting) { cbox.classList.add("in"); o.disconnect(); } }, { threshold: .5 }).observe(cbox);

/* ========= DARK / LIGHT MODE ========= */
const root = document.documentElement, tbtn = $("theme-btn");
const paint = t => {
  root.dataset.theme = t;
  tbtn.setAttribute("aria-pressed", t === "dark");
  tbtn.setAttribute("aria-label", t === "dark" ? "Switch to light mode" : "Switch to dark mode");
};
paint(root.dataset.theme === "dark" ? "dark" : "light");
tbtn.addEventListener("click", () => {
  const t = root.dataset.theme === "dark" ? "light" : "dark";
  paint(t);
  try { localStorage.setItem("theme", t); } catch (e) {}
});

/* ========= 8. RESUME VIEWER ========= */
const dialog = $("resume-dialog");
const PDF = "resume/Nandhini_S_Resume.pdf";
document.querySelectorAll(".open-resume").forEach(b => b.addEventListener("click", () => {
  $("rd-frame").src = PDF + "#toolbar=0&navpanes=0&view=FitH";
  dialog.showModal();
}));
$("rd-close").addEventListener("click", () => dialog.close());
dialog.addEventListener("click", e => { if (e.target === dialog) dialog.close(); });
dialog.addEventListener("close", () => { $("rd-frame").src = "about:blank"; });

/* ========= CERTIFICATES: put the scans in images/certificates/ ========= */
const certs = [
  { name: "Welcome to ServiceNow", by: "ServiceNow", file: "welcome-to-servicenow.jpg" },
  { name: "Flow Designer", by: "ServiceNow", file: "flow-designer.jpg" },
  { name: "Integration Hub", by: "ServiceNow", file: "integration-hub.jpg" },
  { name: "Cybersecurity for Businesses: The Fundamental Edition", by: "EC-Council, Jul 2024", file: "ec-council-cybersecurity.png" },
  { name: "Linear Regression", by: "Great Learning, Feb 2024", file: "great-learning-linear-regression.jpg" },
  { name: "Logistic Regression", by: "Great Learning, Mar 2024", file: "great-learning-logistic-regression.jpg" },
  { name: "Finding, Sorting and Filtering Data in Microsoft Excel", by: "Coursera Project Network, Apr 2023", file: "coursera-excel-filtering.jpg" },
  { name: "Get Started with Figma", by: "Coursera Project Network, Nov 2023", file: "coursera-figma.jpg" },
  { name: "Hackathon for Women in Engineering", by: "TANCAM and KIT-CBE, Mar 2024", file: "tancam-hackathon.jpg" },
  { name: "Biz Flare 2024: Brain Sizzlers", by: "Firebird Institute of Research in Management, Mar 2024", file: "firebird-biz-flare.jpg" },
  // Remove the two slashes at the start of a line when you have that certificate's image:
  // { name: "Honors Specialization in AI/ML", file: "ai-ml-honors.jpg" },
  // { name: "Hindi Visharad", file: "hindi-visharad.jpg" }
].map(c => ({ ...c, src: "images/" + c.file }));

window.cfb = img => img.replaceWith(Object.assign(document.createElement("span"), { className: "cert-ph", textContent: "Certificate image" }));
const grid = $("cert-grid");
grid.innerHTML = certs.map((c, i) => `<button type="button" class="cert" data-i="${i}" style="--i:${i}">
  <span class="cert-img"><img src="${c.src}" alt="" loading="lazy" onerror="cfb(this)"></span><span class="cert-txt">${c.name}${c.by ? `<small>${c.by}</small>` : ""}</span></button>`).join("");
new IntersectionObserver(([e], o) => { if (e.isIntersecting) { grid.classList.add("in"); o.disconnect(); } }, { threshold: .3 }).observe(grid);

const cd = $("cert-dialog"), cimg = $("cd-img");
let list = certs, cards = [], ci = 0, lastCard = null;
const showCert = i => {
  ci = (i + list.length) % list.length;
  lastCard = cards[ci];
  cimg.style.animation = "none"; void cimg.offsetWidth; cimg.style.animation = "";   // replay the image reveal
  cimg.hidden = false; cimg.src = list[ci].src; cimg.alt = list[ci].name;
  $("cd-name").textContent = list[ci].name;
  $("cd-count").textContent = list.length > 1 ? `${ci + 1} of ${list.length}` : "";
  $("cd-prev").hidden = $("cd-next").hidden = list.length < 2;
};
/* the certificate grows out of the card you clicked, and shrinks back into it when closed */
const flipFrom = () => {
  const from = lastCard.querySelector(".cert-img").getBoundingClientRect(), to = cd.getBoundingClientRect();
  const s = from.width / to.width;
  const dx = from.left + from.width / 2 - (to.left + to.width / 2);
  const dy = from.top + from.height / 2 - (to.top + to.height / 2);
  return `translate(${dx}px, ${dy}px) scale(${s})`;
};
const openCert = (i, items, els) => {
  list = items; cards = els;
  showCert(i);
  cd.showModal();
  if (reduce) return;
  cd.animate([{ transform: flipFrom(), opacity: 0 }, { opacity: 1, offset: .35 }, { transform: "none", opacity: 1 }],
    { duration: 800, easing: "cubic-bezier(.2,.8,.2,1)" });
};
const closeCert = () => {
  if (!cd.open) return;
  if (reduce) { cd.close(); return; }
  const a = cd.animate([{ transform: "none", opacity: 1 }, { transform: flipFrom(), opacity: 0 }],
    { duration: 500, easing: "cubic-bezier(.5,0,.75,0)", fill: "forwards" });
  a.onfinish = () => { cd.close(); a.cancel(); };
};
cd.addEventListener("cancel", e => { e.preventDefault(); closeCert(); });   // Esc key
cimg.addEventListener("error", () => { cimg.hidden = true; });
grid.addEventListener("click", e => { const b = e.target.closest(".cert"); if (b) openCert(+b.dataset.i, certs, [...grid.children]); });
/* internship certificates open the same viewer with just that one certificate */
document.querySelectorAll("#work-car .cert").forEach(b => b.addEventListener("click", () => {
  const c = work[+b.dataset.w].cert;
  openCert(0, [{ ...c, src: "images/" + c.file }], [b]);
}));
$("cd-prev").addEventListener("click", () => showCert(ci - 1));
$("cd-next").addEventListener("click", () => showCert(ci + 1));
$("cd-close").addEventListener("click", closeCert);
cd.addEventListener("click", e => { if (e.target === cd) closeCert(); });
cd.addEventListener("keydown", e => { if (e.key === "ArrowLeft") showCert(ci - 1); if (e.key === "ArrowRight") showCert(ci + 1); });


/* ========= TEXT ANIMATION (hero lines one by one, headings on scroll) ========= */
(() => {
  const lead = document.querySelector(".hero .lead");
  const sentences = lead.textContent.match(/[^.]+\.?/g).map(s => s.trim()).filter(Boolean);
  lead.innerHTML = sentences.map(s => `<span class="ln">${s}</span>`).join("");
  document.querySelectorAll(".hero .role, .hero h1, .hero .lead .ln, .hero .actions")
    .forEach((el, k) => { el.classList.add("line"); el.style.setProperty("--d", k); });

  /* inside slides: title, description and every bullet appear one by one when the slide opens */
  document.querySelectorAll(".slide").forEach(s => {
    s.querySelectorAll("h3, :scope > p, .meta, li").forEach((el, k) => {
      el.classList.add("ln2");
      el.style.setProperty("--d", k);
    });
  });
  /* section headings and intro lines: appear when scrolled into view */
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add("show"); io.unobserve(e.target); }
  }), { threshold: .3 });
  document.querySelectorAll("section:not(.hero) h2, #certs .lead, #contact .lead, #contact .meta")
    .forEach(el => { el.classList.add("rv"); io.observe(el); });
})();

/* ========= COPY EMAIL BUTTON ========= */
(() => {
  const btn = $("copy-mail"), addr = "nandhinisakthivel1621@gmail.com";
  btn.addEventListener("click", async () => {
    try { await navigator.clipboard.writeText(addr); }
    catch (e) {                                   // older browsers
      const t = document.createElement("textarea");
      t.value = addr; document.body.appendChild(t); t.select(); document.execCommand("copy"); t.remove();
    }
    btn.textContent = "Copied!";
    setTimeout(() => { btn.textContent = "Copy email"; }, 2000);
  });
})();