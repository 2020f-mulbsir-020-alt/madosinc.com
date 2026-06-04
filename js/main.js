(function () {
  "use strict";

  var yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  var toggle = document.querySelector(".nav__toggle");
  var menu = document.getElementById("nav-menu");

  if (toggle && menu) {
    toggle.addEventListener("click", function () {
      var open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!open));
      menu.classList.toggle("is-open", !open);
    });

    menu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        toggle.setAttribute("aria-expanded", "false");
        menu.classList.remove("is-open");
      });
    });
  }

  var prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!prefersReduced && "IntersectionObserver" in window) {
    var fadeEls = document.querySelectorAll(".fade-in");
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { root: null, rootMargin: "0px 0px -8% 0px", threshold: 0.1 }
    );
    fadeEls.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    document.querySelectorAll(".fade-in").forEach(function (el) {
      el.classList.add("is-visible");
    });
  }

  var form = document.querySelector(".contact__form");
  if (form) {
    form.addEventListener("submit", function (event) {
      var status = form.querySelector(".form-status");
      if (!status) return;

      if (!form.checkValidity()) {
        event.preventDefault();
        status.hidden = false;
        status.textContent = "Please fill in all required fields.";
        status.className = "form-status form-status--error";
        return;
      }

      if (form.getAttribute("action").includes("YOUR_FORM")) {
        event.preventDefault();
        status.hidden = false;
        status.textContent =
          "Configure your Formspree endpoint in index.html (form action URL).";
        status.className = "form-status form-status--error";
      }
    });
  }
})();
