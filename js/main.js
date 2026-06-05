(function () {
  "use strict";

  var yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  var header = document.querySelector(".site-header");
  if (header) {
    var onScroll = function () {
      header.classList.toggle("is-scrolled", window.scrollY > 40);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  var navToggle = document.getElementById("nav-toggle");
  if (navToggle) {
    navToggle.addEventListener("change", function () {
      document.body.style.overflow = navToggle.checked ? "hidden" : "";
    });

    document.querySelectorAll(".header__nav a, .header__actions a").forEach(function (link) {
      link.addEventListener("click", function () {
        navToggle.checked = false;
        document.body.style.overflow = "";
      });
    });
  }

  var prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if ("IntersectionObserver" in window) {
    var fadeEls = document.querySelectorAll(".fade-in");
    var fadeObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            fadeObserver.unobserve(entry.target);
          }
        });
      },
      { root: null, rootMargin: "0px 0px -6% 0px", threshold: 0.08 }
    );

    fadeEls.forEach(function (el) {
      if (prefersReduced) {
        el.classList.add("is-visible");
      } else {
        fadeObserver.observe(el);
      }
    });

    var counters = document.querySelectorAll("[data-count]");
    var counterObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          var el = entry.target;
          var target = parseInt(el.getAttribute("data-count"), 10);
          var suffix = el.getAttribute("data-suffix") || "";
          if (prefersReduced) {
            el.textContent = target + suffix;
          } else {
            animateCounter(el, target, suffix);
          }
          counterObserver.unobserve(el);
        });
      },
      { threshold: 0.5 }
    );

    counters.forEach(function (el) {
      counterObserver.observe(el);
    });
  } else {
    document.querySelectorAll(".fade-in").forEach(function (el) {
      el.classList.add("is-visible");
    });
    document.querySelectorAll("[data-count]").forEach(function (el) {
      el.textContent = el.getAttribute("data-count") + (el.getAttribute("data-suffix") || "");
    });
  }

  function animateCounter(el, target, suffix) {
    var duration = 1600;
    var start = performance.now();

    function step(now) {
      var progress = Math.min((now - start) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(eased * target) + suffix;
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    }

    requestAnimationFrame(step);
  }

  var newsletter = document.querySelector(".footer__newsletter");
  if (newsletter) {
    newsletter.addEventListener("submit", function (event) {
      event.preventDefault();
      var input = newsletter.querySelector("input[type='email']");
      if (input && input.value) {
        input.value = "";
        input.placeholder = "Thank you for subscribing!";
        setTimeout(function () {
          input.placeholder = "you@company.com";
        }, 3000);
      }
    });
  }
})();
