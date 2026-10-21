(function () {
  "use strict";

  var header = document.querySelector(".site-header");
  var progress = document.querySelector(".scroll-progress span");
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("nav");

  function onScroll() {
    if (header) header.classList.toggle("is-scrolled", window.scrollY > 8);

    if (!progress) return;
    var max = document.documentElement.scrollHeight - window.innerHeight;
    var pct = max > 0 ? Math.min(100, (window.scrollY / max) * 100) : 0;
    progress.style.width = pct + "%";
  }

  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);

  if (toggle && nav) {
    function closeNav() {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    }

    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });

    nav.addEventListener("click", function (event) {
      if (event.target.closest("a")) closeNav();
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") closeNav();
    });

    document.addEventListener("click", function (event) {
      if (!nav.classList.contains("is-open")) return;
      if (nav.contains(event.target) || toggle.contains(event.target)) return;
      closeNav();
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth > 760) closeNav();
    });
  }

  document.querySelectorAll("[data-year]").forEach(function (node) {
    node.textContent = new Date().getFullYear();
  });

  /* ------------------------------------------------------------- carousel */

  document.querySelectorAll("[data-carousel]").forEach(function (root) {
    var slides = Array.prototype.slice.call(root.querySelectorAll(".slide"));
    if (slides.length < 2) return;

    var dotsBox = root.querySelector(".car-dots");
    var currentEl = root.querySelector("[data-current]");
    var totalEl = root.querySelector("[data-total]");
    var capTitle = root.querySelector("[data-cap-title]");
    var capText = root.querySelector("[data-cap-text]");
    var prev = root.querySelector("[data-prev]");
    var next = root.querySelector("[data-next]");
    var stage = root.querySelector(".carousel-stage");

    var index = 0;
    slides.forEach(function (slide, i) {
      if (slide.classList.contains("is-active")) index = i;
    });

    var dots = slides.map(function (slide, i) {
      var name = slide.getAttribute("data-title") || "Screenshot " + (i + 1);

      var dot = document.createElement("button");
      dot.type = "button";
      dot.className = "car-dot";
      dot.setAttribute("aria-label", "Show " + name);
      dot.setAttribute("aria-pressed", "false");
      dot.addEventListener("click", function () {
        go(i);
      });
      dotsBox.appendChild(dot);
      return dot;
    });

    function go(target) {
      index = (target + slides.length) % slides.length;

      slides.forEach(function (slide, i) {
        var active = i === index;
        slide.classList.toggle("is-active", active);
        slide.setAttribute("aria-hidden", active ? "false" : "true");
      });

      root.setAttribute("data-fit", slides[index].getAttribute("data-fit") || "tall");

      dots.forEach(function (dot, i) {
        var active = i === index;
        dot.classList.toggle("is-active", active);
        dot.setAttribute("aria-pressed", active ? "true" : "false");
      });

      if (currentEl) currentEl.textContent = String(index + 1);
      if (totalEl) totalEl.textContent = String(slides.length);

      if (capTitle) capTitle.textContent = slides[index].getAttribute("data-title") || "";
      if (capText) capText.textContent = slides[index].getAttribute("data-text") || "";
    }

    if (prev) {
      prev.addEventListener("click", function () {
        go(index - 1);
      });
    }

    if (next) {
      next.addEventListener("click", function () {
        go(index + 1);
      });
    }

    root.addEventListener("keydown", function (event) {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        go(index - 1);
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        go(index + 1);
      } else if (event.key === "Home") {
        event.preventDefault();
        go(0);
      } else if (event.key === "End") {
        event.preventDefault();
        go(slides.length - 1);
      }
    });

    if (stage && window.PointerEvent) {
      var startX = null;
      var startY = null;

      stage.addEventListener("pointerdown", function (event) {
        if (event.target.closest(".car-btn")) return;
        startX = event.clientX;
        startY = event.clientY;
      });

      stage.addEventListener("pointerup", function (event) {
        if (startX === null) return;
        var dx = event.clientX - startX;
        var dy = event.clientY - startY;
        startX = null;
        startY = null;
        if (Math.abs(dx) > 44 && Math.abs(dx) > Math.abs(dy)) {
          go(index + (dx < 0 ? 1 : -1));
        }
      });

      stage.addEventListener("pointercancel", function () {
        startX = null;
        startY = null;
      });
    }

    go(index);
  });
})();
