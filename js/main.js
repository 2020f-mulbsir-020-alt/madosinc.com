(function () {
  var prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* Scroll reveal */
  if (!prefersReduced && "IntersectionObserver" in window) {
    var revealEls = document.querySelectorAll(".reveal");
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    document.querySelectorAll(".reveal").forEach(function (el) {
      el.classList.add("is-visible");
    });
  }

  /* Mobile nav accessibility */
  var navToggle = document.getElementById("nav-toggle");
  var navLabel = document.querySelector(".nav-toggle-label");
  if (navToggle && navLabel) {
    function syncNav() {
      var open = navToggle.checked;
      navLabel.setAttribute("aria-expanded", open ? "true" : "false");
      navLabel.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      document.body.style.overflow = open ? "hidden" : "";
    }
    navToggle.addEventListener("change", syncNav);
    syncNav();
  }

  /* Form success notice */
  if (window.location.search.indexOf("submitted=true") !== -1) {
    var contact = document.getElementById("contact");
    if (contact) {
      var notice = document.createElement("p");
      notice.className = "form-success";
      notice.setAttribute("role", "status");
      notice.textContent =
        "Thank you. Your consultation request has been received. The Madosinc team will respond shortly.";
      var form = contact.querySelector(".inquiry-form");
      if (form) {
        contact.querySelector(".contact__header").after(notice);
      }
    }
  }
})();
