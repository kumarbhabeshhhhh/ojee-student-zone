const CONFIG = {
  youtube: "https://youtube.com/@ojeestudentszone6463?si=xDCQHRL1EaF2o-zI",
  app: "https://play.google.com/store/apps/details?id=co.khal.cmspq"
};

const youtubeLink = document.getElementById("youtubeLink");
const appLink = document.getElementById("appLink");

function wireExternalLink(el, value, label) {
  if (!el) return;
  if (value && !value.startsWith("PASTE_")) {
    el.href = value;
  } else {
    el.href = "#";
    el.addEventListener("click", (e) => {
      e.preventDefault();
      alert(`The ${label} link has not been added yet. Open script.js and paste the link in CONFIG.`);
    });
  }
}
wireExternalLink(youtubeLink, CONFIG.youtube, "YouTube");
wireExternalLink(appLink, CONFIG.app, "Google Play");

// Premium page-loading animation. It waits for the document and all images so the
// logo/achiever artwork is already ready when the page is revealed.
const pageLoader = document.getElementById("pageLoader");
window.addEventListener("load", () => {
  setTimeout(() => {
    pageLoader?.classList.add("loaded");
    document.body.classList.add("page-ready");
  }, 650);
});

const header = document.querySelector(".site-header");
const progress = document.getElementById("scrollProgress");
window.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY > 20);
  const max = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = `${max > 0 ? (window.scrollY / max) * 100 : 0}%`;
}, {passive:true});

const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");
menuBtn?.addEventListener("click", () => {
  const open = mobileMenu.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", open);
});
mobileMenu?.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
  mobileMenu.classList.remove("open");
  menuBtn.setAttribute("aria-expanded", "false");
}));

// Animated background particles.
const particleBox = document.getElementById("particles");
for (let i = 0; i < 42; i++) {
  const p = document.createElement("span");
  p.className = "particle";
  p.style.left = `${Math.random() * 100}%`;
  p.style.top = `${20 + Math.random() * 100}%`;
  p.style.animationDuration = `${8 + Math.random() * 14}s`;
  p.style.animationDelay = `${Math.random() * 10}s`;
  p.style.opacity = `${0.15 + Math.random() * .45}`;
  particleBox.appendChild(p);
}

// Scroll reveal.
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, {threshold:.12});
document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

// Achiever lightbox.
const cards = [...document.querySelectorAll(".achiever-card")];
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxCount = document.getElementById("lightboxCount");
let current = 0;

function showImage(index) {
  current = (index + cards.length) % cards.length;
  const src = cards[current].dataset.image;
  lightboxImage.src = src;
  lightboxCount.textContent = `${String(current + 1).padStart(2,"0")} / ${String(cards.length).padStart(2,"0")}`;
}
function openLightbox(index) {
  showImage(index);
  lightbox.classList.add("open");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.classList.add("no-scroll");
}
function closeLightbox() {
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
  document.body.classList.remove("no-scroll");
}
cards.forEach((card, index) => card.addEventListener("click", () => openLightbox(index)));
document.getElementById("openFirst")?.addEventListener("click", () => openLightbox(0));
document.getElementById("lightboxClose")?.addEventListener("click", closeLightbox);
document.getElementById("lightboxPrev")?.addEventListener("click", () => showImage(current - 1));
document.getElementById("lightboxNext")?.addEventListener("click", () => showImage(current + 1));
lightbox?.addEventListener("click", e => { if (e.target === lightbox) closeLightbox(); });
document.addEventListener("keydown", e => {
  if (!lightbox.classList.contains("open")) return;
  if (e.key === "Escape") closeLightbox();
  if (e.key === "ArrowLeft") showImage(current - 1);
  if (e.key === "ArrowRight") showImage(current + 1);
});

// Subtle pointer tilt on desktop.
document.querySelectorAll(".hero-card").forEach(card => {
  card.addEventListener("pointermove", e => {
    if (window.innerWidth < 900) return;
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - .5;
    const y = (e.clientY - r.top) / r.height - .5;
    card.style.transform = `rotateX(${(-y*5).toFixed(2)}deg) rotateY(${(x*5).toFixed(2)}deg)`;
  });
  card.addEventListener("pointerleave", () => card.style.transform = "");
});
