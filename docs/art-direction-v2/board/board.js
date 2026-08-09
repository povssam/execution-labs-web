const params = new URLSearchParams(window.location.search);
const direction = params.get("direction") || "current";
const focus = params.get("focus") || "full";
const page = params.get("page") || "";

const clients = [
  "Soniq",
  "Dividends & Total Returns",
  "Grace",
  "Orbit Artist Group",
  "Media Scaling",
];

const capabilities = [
  ["01", "AI Agents", "Give the agent a job, not a demo."],
  ["02", "Internal Tools", "Replace the tab maze."],
  ["03", "MVP Software", "Ship the first real version."],
  ["04", "Product Systems", "Build the layer that holds up."],
  ["05", "Motion Design", "Motion as proof, not decoration."],
  ["06", "Automation", "Less manual work. Clearer handoffs."],
];

const projects = [
  ["01", "Grace", "Brand system, product interface, social UI, motion"],
  ["02", "Orbit Artist Group", "AI Agents"],
  ["03", "Media Scaling", "Internal Tools"],
  ["04", "Soniq", "MVP Software"],
  ["05", "Dividends & Total Returns", "Product Systems"],
];

const process = [
  ["01", "Brief", "Find the leak."],
  ["02", "System map", "Design the workflow."],
  ["03", "Build", "Ship v1."],
  ["04", "Proof", "Test in real use."],
];

const image = (className = "") => `<img class="${className}" src="../../../public/brand/hero-glass.png" alt="" />`;
const grace = (className = "") => `<video class="${className}" muted autoplay loop playsinline poster="../../../public/brand/grace/grace-animation-poster.jpg"><source src="../../../public/brand/grace/grace-animation.mp4" type="video/mp4" /></video>`;
const clientRail = () => `<div class="client-rail">${clients.map(client => `<span>${client}</span>`).join("")}</div>`;
const capabilityList = () => `<div class="capability-list">${capabilities.map(([index, title, stance]) => `<div class="capability-item"><span>${index}</span><strong>${title}</strong><em>${stance}</em></div>`).join("")}</div>`;
const processList = () => `<div class="process-list">${process.map(([index, title, body]) => `<div class="process-item"><span>${index}</span><strong>${title}</strong><em>${body}</em></div>`).join("")}</div>`;
const projectList = (active = "Grace") => `<div class="project-list">${projects.map(([index, title, category]) => `<div class="project-item ${title === active ? "is-active" : ""}"><span>${index}</span><strong>${title}</strong><em>${category}</em></div>`).join("")}</div>`;

function shell({label, title, description, className, content}) {
  return `<section class="scene ${className}" id="${label.toLowerCase().replace(/[^a-z]+/g, "-")}">
    <div class="scene-inner">
      <div class="scene-kicker">${label}</div>
      <h2>${title}</h2>
      ${description ? `<p class="scene-description">${description}</p>` : ""}
      ${content}
    </div>
  </section>`;
}

function current() {
  return `<div class="current-board">
    <div class="current-copy">
      <p class="scene-kicker">00 — CURRENT</p>
      <h1>Approved production baseline.</h1>
      <p>Captured from the current preview before exploration. The implementation remains untouched while these directions are evaluated.</p>
    </div>
    <div class="current-captures">
      <figure><img src="../current/preview/home-1440x900.png" alt="Current homepage preview at 1440 pixels" /><figcaption>Preview / 1440 × 900</figcaption></figure>
      <figure><img src="../current/preview/home-390x844.png" alt="Current homepage preview at 390 pixels" /><figcaption>Preview / 390 × 844</figcaption></figure>
    </div>
  </div>`;
}

function reviewPage({label, title, description, content, className = ""}) {
  return `<div class="review-page ${className}">
    <div class="review-page-head"><div><p class="scene-kicker">${label}</p><h1>${title}</h1><p>${description}</p></div><span class="review-status">PENDING DIRECTION APPROVAL</span></div>
    ${content}
  </div>`;
}

function finalDesktop() {
  return reviewPage({
    label: "04 — FINAL DESKTOP",
    title: "Final composition follows approval.",
    description: "Direction A is the recommended candidate. This page is intentionally held as a review frame until a direction is approved.",
    className: "review-final review-desktop",
    content: `<div class="review-candidate"><a href="?direction=a&focus=hero"><img src="../direction-a/hero-1440x900.png" alt="Direction A desktop hero candidate" /><span>Recommended candidate / hero</span></a><a href="?direction=a&focus=selected-work"><img src="../direction-a/selected-work-1440x900.png" alt="Direction A desktop Selected Work candidate" /><span>Recommended candidate / Selected Work</span></a></div>`
  });
}

function finalMobile() {
  return reviewPage({
    label: "05 — FINAL MOBILE",
    title: "Mobile composition follows approval.",
    description: "The mobile frame is designed independently from the desktop system and will be finalized against the approved direction.",
    className: "review-final review-mobile",
    content: `<div class="review-candidate"><a href="?direction=a&focus=hero"><img src="../direction-a/hero-390x844.png" alt="Direction A mobile hero candidate" /><span>Recommended candidate / hero</span></a><a href="?direction=a&focus=selected-work"><img src="../direction-a/selected-work-390x844.png" alt="Direction A mobile Selected Work candidate" /><span>Recommended candidate / Selected Work</span></a></div>`
  });
}

function motionStoryboard() {
  const beats = [
    ["01", "Hero", "Type enters in line groups; glass resolves behind it; CTA settles last.", "mask → opacity → settle"],
    ["02", "Capability index", "Rows reveal as one system, with the active capability sharpening after the list arrives.", "rule → type → focus"],
    ["03", "Selected Work", "The selected real artifact moves forward while adjacent project names recede without overshoot.", "transform → opacity → settle"],
    ["04", "Process", "A connected line traces the movement from Brief to System map to Build to Proof.", "line travel → state"],
    ["05", "Contact", "The closing statement resolves from a soft mask and the underline draws a quiet finish.", "mask → underline"],
  ];
  return reviewPage({
    label: "06 — MOTION STORYBOARD",
    title: "Enter. Perform. Settle.",
    description: "A restrained motion language for a fast, precise, cinematic studio site. Grace’s real video is the only continuous media movement.",
    className: "review-motion",
    content: `<div class="storyboard-list">${beats.map(([index, name, body, treatment]) => `<div class="storyboard-row"><span>${index}</span><strong>${name}</strong><p>${body}</p><em>${treatment}</em></div>`).join("")}</div><div class="motion-footnote">Reduced motion removes transforms, blur, stagger, and non-essential transitions while preserving content order and state.</div>`
  });
}

function components() {
  return reviewPage({
    label: "07 — COMPONENTS",
    title: "One system, different compositions.",
    description: "Shared tokens keep the directions related; composition, media treatment, and motion determine the character of each route.",
    className: "review-components",
    content: `<div class="component-grid"><div class="component-swatch component-type"><span>TYPE SCALE</span><strong>Agents<br />and software.</strong><p>Editorial grotesk / tight measure / deliberate line breaks</p></div><div class="component-swatch component-color"><span>PALETTE</span><div><i></i><i></i><i></i><i></i></div><p>Ink / warm white / muted gray / one controlled accent</p></div><div class="component-swatch component-list"><span>INDEX ROW</span>${capabilities.slice(0, 3).map(([index, title]) => `<div><small>${index}</small><b>${title}</b><em>focused state</em></div>`).join("")}</div><div class="component-swatch component-media"><span>REAL MEDIA SURFACE</span>${grace("grace-media")}<p>Poster-first, intrinsic ratio, no decorative chrome</p></div></div>`
  });
}

function directionA() {
  return `<div class="direction direction-a">
    <section class="scene a-hero" id="hero">
      <div class="a-hero-media">${image("hero-glass")}</div>
      <div class="a-hero-inner">
        <div class="scene-kicker">01 — DARK EDITORIAL TECHNOLOGY STUDIO</div>
        <h1>Agents and<br /><span>software</span><br />that save<br />time and money.</h1>
        <p>We turn your vision into systems that save labor, budget, and time.</p>
        <a class="text-link" href="#contact">Start a project <span>↗</span></a>
      </div>
      <div class="a-hero-index">EL / 2026</div>
      ${clientRail()}
    </section>
    ${shell({label:"WHAT WE BUILD", title:"A small team for the work that keeps moving.", description:"AI agents, internal tools, MVP software, product systems, motion design, and automation.", className:"a-build", content:`<div class="a-build-grid"><div class="a-build-lead">One clear system.<br /><span>Fewer loose ends.</span></div>${capabilityList()}</div>`})}
    ${shell({label:"SELECTED WORK", title:"Proof, held in the frame.", description:"Real artifacts, users, and workflows. Proof stays visible.", className:"a-work", content:`<div class="a-work-stage"><div class="a-work-media">${grace("grace-media")}</div><div class="a-work-meta"><div class="a-work-number">01 / 05</div>${projectList()}<p class="a-work-note">Grace shows identity, interface, and motion working as one calm product.</p></div></div>`})}
    ${shell({label:"HOW WE WORK", title:"Brief to proof.", description:"The useful version first.", className:"a-process", content:processList()})}
    <section class="scene a-worked" id="worked-with"><div class="scene-inner"><div class="scene-kicker">WORKED WITH</div>${clientRail()}</div></section>
    <section class="scene a-contact" id="contact"><div class="scene-inner"><div class="scene-kicker">CONTACT</div><h2>Have a system<br />worth building?</h2><a class="text-link" href="#hero">Start a project <span>↗</span></a></div></section>
  </div>`;
}

function directionB() {
  return `<div class="direction direction-b">
    <section class="scene b-hero" id="hero">
      <div class="b-hero-art">${image("hero-glass")}</div>
      <div class="b-hero-top"><span>EXECUTION LABS</span><span>BUILD / OPERATE / PROVE</span></div>
      <div class="b-hero-copy"><div class="scene-kicker">02 — EXPERIMENTAL CREATIVE TECHNOLOGY</div><h1>Build the thing<br /><i>behind</i> the thing.</h1><p>Agents and software that save time and money.</p><a class="text-link" href="#selected-work">Enter the work <span>↓</span></a></div>
      <div class="b-hero-side">A studio for useful<br />systems / 2026</div>
    </section>
    ${shell({label:"WHAT WE BUILD", title:"Six ways to remove the drag.", description:"A system is more than a screen. It is what happens next.", className:"b-build", content:`<div class="b-build-scene"><div class="b-build-giant">06</div>${capabilityList()}<div class="b-build-aside">Selected capability<br /><strong>AI Agents</strong><br /><span>Give the agent a job, not a demo.</span></div></div>`})}
    ${shell({label:"SELECTED WORK", title:"Choose a project. Watch the system move.", description:"Tap a name. The artifact takes the room.", className:"b-work", content:`<div class="b-work-scene"><div class="b-work-projects">${projectList()}</div><div class="b-work-feature">${grace("grace-media")}</div><div class="b-work-caption"><span>GRACE / 2025</span><strong>Motion-ready<br />brand system</strong><p>A brand and interface system for a product that needed to feel human, premium, and alive.</p></div></div>`})}
    ${shell({label:"HOW WE WORK", title:"Move from leak to proof.", description:"The sequence stays visible.", className:"b-process", content:`<div class="b-process-track">${process.map(([index,title,body])=>`<div class="b-process-item"><span>${index}</span><strong>${title}</strong><em>${body}</em></div>`).join("")}</div>`})}
    <section class="scene b-worked" id="worked-with"><div class="scene-inner"><div class="scene-kicker">WORKED WITH / A MOVING INDEX</div><div class="b-client-cloud">${clients.map((client,index)=>`<span class="client-${index+1}">${client}</span>`).join("")}</div></div></section>
    <section class="scene b-contact" id="contact"><div class="scene-inner"><div class="b-contact-mark">E</div><div class="scene-kicker">CONTACT / NEXT MOVE</div><h2>Send the problem.<br />We will map the first useful build.</h2><a class="text-link" href="#hero">Start a project <span>↗</span></a></div></section>
  </div>`;
}

function directionC() {
  return `<div class="direction direction-c">
    <section class="scene c-hero" id="hero">
      <div class="c-hero-rule"></div><div class="c-hero-top"><span>EXECUTION LABS</span><span>EL / 01</span></div>
      <div class="c-hero-grid"><div><div class="scene-kicker">03 — PRECISION MINIMAL BRUTALIST</div><h1>Agents<br />and software<br /><span>that save<br />time and money.</span></h1></div><div class="c-hero-media">${image("hero-glass")}</div></div>
      <div class="c-hero-bottom"><p>We turn your vision into systems that save labor, budget, and time.</p><a class="text-link" href="#contact">Start a project <span>↗</span></a></div>
    </section>
    ${shell({label:"WHAT WE BUILD", title:"One system. Six disciplines.", description:"Precision at the point where work gets stuck.", className:"c-build", content:`<div class="c-capabilities">${capabilities.map(([index,title,stance])=>`<div class="c-capability"><span>${index}</span><strong>${title}</strong><em>${stance}</em></div>`).join("")}</div>`})}
    ${shell({label:"SELECTED WORK", title:"The work is the proof.", description:"No decks. Real artifacts and workflows.", className:"c-work", content:`<div class="c-work-grid"><div class="c-work-list">${projectList()}</div><div class="c-work-media">${grace("grace-media")}</div><div class="c-work-footer"><span>GRACE / MOTION-READY BRAND SYSTEM</span><span>VIEW PROJECT ↗</span></div></div>`})}
    ${shell({label:"HOW WE WORK", title:"A direct line from brief to proof.", description:"No layers between the problem and the build.", className:"c-process", content:`<div class="c-process-grid">${process.map(([index,title,body])=>`<div class="c-process-item"><span>${index}</span><strong>${title}</strong><em>${body}</em></div>`).join("")}</div>`})}
    <section class="scene c-worked" id="worked-with"><div class="scene-inner"><div class="c-worked-top"><span>WORKED WITH</span><span>05 CLIENTS / 2024—2025</span></div><div class="c-client-list">${clients.map((client,index)=>`<div><span>0${index+1}</span><strong>${client}</strong></div>`).join("")}</div></div></section>
    <section class="scene c-contact" id="contact"><div class="scene-inner"><div class="c-contact-grid"><div class="scene-kicker">CONTACT</div><h2>Have a system<br />worth building?</h2><a class="text-link" href="#hero">Start a project <span>↗</span></a></div></div></section>
  </div>`;
}

const board = document.getElementById("artboard");
const pages = {"final-desktop": finalDesktop, "final-mobile": finalMobile, motion: motionStoryboard, components};
board.innerHTML = page && pages[page] ? pages[page]() : direction === "current" ? current() : direction === "b" ? directionB() : direction === "c" ? directionC() : directionA();
const bodyClasses = [`direction-${direction}`, `focus-${focus}`];
if (page && pages[page]) bodyClasses.push(`page-${page}`);
document.body.classList.add(...bodyClasses);
document.getElementById("direction-name").textContent = page && pages[page] ? page.replace("-", " ") : direction === "current" ? "Current" : `Direction ${direction.toUpperCase()}`;
document.getElementById("viewport-name").textContent = `${window.innerWidth} / ${window.innerHeight}`;
window.addEventListener("resize", () => { document.getElementById("viewport-name").textContent = `${window.innerWidth} / ${window.innerHeight}`; });
