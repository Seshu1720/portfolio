const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector("[data-nav-links]");
const links = document.querySelectorAll(".nav-links a");
const revealItems = document.querySelectorAll(".reveal");
const sections = document.querySelectorAll("main section[id]");
const typedText = document.querySelector("#typedText");
const visitorCount = document.querySelector("#visitorCount");
const themeToggle = document.querySelector("[data-theme-toggle]");
const themeIcon = document.querySelector(".theme-icon");
const form = document.querySelector("#contactForm");
const formStatus = document.querySelector("#formStatus");
const canvas = document.querySelector("#particleCanvas");
const ctx = canvas.getContext("2d");

const phrases = [
  "Aspiring VLSI Engineer",
  "Embedded Systems Enthusiast",
  "Software Development Learner",
  "GATE ECE 2027 Aspirant",
  "Future Semiconductor Engineer"
];

let phraseIndex = 0;
let charIndex = 0;
let deleting = false;
let particles = [];

navToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

links.forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

function typeHeroText() {
  const phrase = phrases[phraseIndex];
  typedText.textContent = phrase.slice(0, charIndex);

  if (!deleting && charIndex < phrase.length) {
    charIndex += 1;
  } else if (deleting && charIndex > 0) {
    charIndex -= 1;
  } else if (!deleting) {
    deleting = true;
    setTimeout(typeHeroText, 1100);
    return;
  } else {
    deleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
  }

  setTimeout(typeHeroText, deleting ? 36 : 72);
}

function setTheme(theme) {
  document.body.classList.toggle("light", theme === "light");
  themeIcon.textContent = theme === "light" ? "Light" : "Dark";
  localStorage.setItem("portfolio-theme", theme);
}

themeToggle.addEventListener("click", () => {
  setTheme(document.body.classList.contains("light") ? "dark" : "light");
});

setTheme(localStorage.getItem("portfolio-theme") || "dark");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      entry.target.classList.add("visible");

      if (entry.target.classList.contains("skill-bar")) {
        const fill = entry.target.querySelector("i");
        fill.style.width = `${entry.target.dataset.level}%`;
      }

      revealObserver.unobserve(entry.target);
    });
  },
  { threshold: 0.16 }
);

revealItems.forEach((item, index) => {
  item.style.transitionDelay = `${Math.min(index * 28, 220)}ms`;
  revealObserver.observe(item);
});

const activeObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      links.forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
      });
    });
  },
  { rootMargin: "-35% 0px -55% 0px", threshold: 0.01 }
);

sections.forEach((section) => activeObserver.observe(section));

function updateVisitorCount() {
  const current = Number(localStorage.getItem("portfolio-visits") || "0") + 1;
  localStorage.setItem("portfolio-visits", String(current));
  visitorCount.textContent = String(current).padStart(3, "0");
}

function validateField(field) {
  const error = field.parentElement.querySelector("small");
  let message = "";

  if (field.validity.valueMissing) {
    message = "This field is required.";
  } else if (field.validity.typeMismatch) {
    message = "Enter a valid email address.";
  } else if (field.validity.tooShort) {
    message = `Use at least ${field.minLength} characters.`;
  }

  error.textContent = message;
  return message === "";
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const fields = [...form.querySelectorAll("input, textarea")];
  const isValid = fields.map(validateField).every(Boolean);

  if (!isValid) {
    formStatus.textContent = "";
    return;
  }

  if (form.action.includes("REPLACE_WITH_YOUR_FORM_ID")) {
    formStatus.textContent = "Form is validated. Add your Formspree form ID in index.html to enable live delivery.";
    return;
  }

  formStatus.textContent = "Sending message...";

  try {
    const response = await fetch(form.action, {
      method: "POST",
      body: new FormData(form),
      headers: { Accept: "application/json" }
    });

    if (!response.ok) {
      throw new Error("Form submission failed");
    }

    formStatus.textContent = "Message sent successfully. Thank you for reaching out.";
    form.reset();
  } catch (error) {
    formStatus.textContent = "Something went wrong. Please email me directly at seshu.perikala58@gmail.com.";
  }
});

form.querySelectorAll("input, textarea").forEach((field) => {
  field.addEventListener("input", () => validateField(field));
});

function resizeCanvas() {
  canvas.width = window.innerWidth * window.devicePixelRatio;
  canvas.height = window.innerHeight * window.devicePixelRatio;
  ctx.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0);

  const total = Math.min(90, Math.max(36, Math.floor(window.innerWidth / 18)));
  particles = Array.from({ length: total }, () => ({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    vx: (Math.random() - 0.5) * 0.38,
    vy: (Math.random() - 0.5) * 0.38,
    r: Math.random() * 1.8 + 0.8
  }));
}

function drawParticles() {
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  ctx.fillStyle = "rgba(52, 231, 255, 0.74)";
  ctx.strokeStyle = "rgba(84, 240, 189, 0.18)";

  particles.forEach((particle, index) => {
    particle.x += particle.vx;
    particle.y += particle.vy;

    if (particle.x < 0 || particle.x > window.innerWidth) particle.vx *= -1;
    if (particle.y < 0 || particle.y > window.innerHeight) particle.vy *= -1;

    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.r, 0, Math.PI * 2);
    ctx.fill();

    for (let i = index + 1; i < particles.length; i += 1) {
      const other = particles[i];
      const distance = Math.hypot(particle.x - other.x, particle.y - other.y);
      if (distance < 116) {
        ctx.globalAlpha = 1 - distance / 116;
        ctx.beginPath();
        ctx.moveTo(particle.x, particle.y);
        ctx.lineTo(other.x, other.y);
        ctx.stroke();
        ctx.globalAlpha = 1;
      }
    }
  });

  requestAnimationFrame(drawParticles);
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();
drawParticles();
typeHeroText();
updateVisitorCount();
