const counters = document.querySelectorAll(".counter");
const aboutSection = document.querySelector(".about");

function startCounters() {
  counters.forEach((counter) => {
    const target = Number(counter.dataset.target);
    const duration = 1200;
    const startTime = performance.now();

    function updateCounter(currentTime) {
      const elapsedTime = currentTime - startTime;

      const progress = Math.min(elapsedTime / duration, 1);

      const currentNumber = Math.floor(target * progress);

      counter.textContent = currentNumber.toLocaleString("es-AR");

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = target.toLocaleString("es-AR");
      }
    }

    requestAnimationFrame(updateCounter);
  });
}

const counterObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        startCounters();

        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.4,
  },
);

counterObserver.observe(aboutSection);
const coverageCards = document.querySelectorAll(".coverage-card");
const coverageMap = document.querySelector("#coverage-map-svg");

coverageMap.addEventListener("load", () => {
  const svgDocument = coverageMap.contentDocument;

  if (!svgDocument) return;

  const mapAreas = svgDocument.querySelectorAll(".map-partido");

  const zoneColors = {
    caba: "#b71c1c",
    "cordon-1": "#d32f2f",
    "cordon-2": "#ef5350",
    "cordon-3": "#ef9a9a",
  };
  function activateZone(zone) {
    mapAreas.forEach((area) => {
      const areaZone = area.dataset.zone;
      const isSelected = areaZone === zone;

      const baseColor = zoneColors[areaZone] || "#202020";

      area.style.fill = baseColor;
      area.style.fillOpacity = isSelected ? "1" : "0.72";

      area.style.stroke = isSelected ? "#ffffff" : "#454545";

      area.style.strokeWidth = isSelected ? "1.2" : "0.7";
    });

    coverageCards.forEach((card) => {
      card.classList.toggle("is-active", card.dataset.zone === zone);
    });
  }

  function clearZone() {
    mapAreas.forEach((area) => {
      const areaZone = area.dataset.zone;
      const baseColor = zoneColors[areaZone] || "#202020";

      area.style.fill = baseColor;
      area.style.fillOpacity = "0.78";
      area.style.stroke = "#454545";
      area.style.strokeWidth = "0.7";
    });

    coverageCards.forEach((card) => {
      card.classList.remove("is-active");
    });
  }
  clearZone();
  coverageCards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      activateZone(card.dataset.zone);
    });

    card.addEventListener("mouseleave", clearZone);

    card.addEventListener("click", () => {
      activateZone(card.dataset.zone);
    });
  });

  // =========================
  // MAPA → TARJETA (PC)
  // =========================

  mapAreas.forEach((area) => {
    area.style.cursor = "pointer";

    area.addEventListener("mouseenter", () => {
      activateZone(area.dataset.zone);
    });

    area.addEventListener("mouseleave", () => {
      clearZone();
    });
  });
}); // ← recién acá cerramos coverageMap.addEventListener("load")
// =========================
// MENÚ MÓVIL
// =========================

const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");

if (menuToggle && nav) {
  menuToggle.addEventListener("click", () => {
    nav.classList.toggle("is-open");

    const menuOpen = nav.classList.contains("is-open");

    menuToggle.setAttribute("aria-expanded", menuOpen);
  });
}
