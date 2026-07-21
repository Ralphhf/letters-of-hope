/* Emmanuel AD — shared behavior + header/footer injection */
(function () {
  "use strict";

  var SOCIAL = { facebook: "#", instagram: "#", youtube: "#" };

  var NAV = [
    { href: "index.html", label: "Home" },
    { href: "our-story.html", label: "Our Story" },
    { href: "mission.html", label: "Mission" },
    { href: "write-to-prisoners.html", label: "Write to Prisoners" },
    { href: "faq.html", label: "FAQ" },
    { href: "blog.html", label: "Blog" },
    { href: "contact.html", label: "Contact" }
  ];

  var mark = '<img class="brand-mark" src="assets/img/logo.png" alt="">';

  function currentPage() {
    var p = location.pathname.split("/").pop();
    return p === "" ? "index.html" : p;
  }

  function buildHeader() {
    var cur = currentPage();
    var links = NAV.map(function (n) {
      var active = n.href === cur ? ' class="active"' : "";
      return '<li><a href="' + n.href + '"' + active + ">" + n.label + "</a></li>";
    }).join("");

    return (
      '<header class="site-header"><div class="wrap"><nav class="nav" aria-label="Main">' +
      '<a class="brand" href="index.html" aria-label="Emmanuel AD — home">' +
      mark +
      '<span class="brand-name">Emmanuel <span>AD</span></span></a>' +
      '<ul class="nav-links" id="navLinks">' + links + "</ul>" +
      '<div class="nav-cta">' +
      '<a class="btn btn-ghost" href="write-to-prisoners.html">Write a Letter</a>' +
      '<a class="btn btn-primary" href="donate.html">Donate</a>' +
      '<button class="nav-toggle" id="navToggle" aria-label="Menu" aria-expanded="false">' +
      "<span></span><span></span><span></span></button>" +
      "</div></nav></div></header>"
    );
  }

  function buildFooter() {
    var yr = document.body.getAttribute("data-year") || "2026";
    function col(title, items) {
      return (
        '<div class="footer-col"><h4>' + title + "</h4>" +
        items.map(function (i) { return '<a href="' + i[1] + '">' + i[0] + "</a>"; }).join("") +
        "</div>"
      );
    }
    return (
      '<footer class="site-footer"><div class="wrap"><div class="footer-grid">' +
      '<div><a class="brand" href="index.html">' + mark +
      '<span class="brand-name">Emmanuel AD</span></a>' +
      "<p>God with us. Hope for all. Freedom in Christ. A prison ministry connecting people on the outside with the incarcerated.</p>" +
      '<div class="socials">' +
      '<a href="' + SOCIAL.facebook + '" aria-label="Facebook">f</a>' +
      '<a href="' + SOCIAL.instagram + '" aria-label="Instagram">ig</a>' +
      '<a href="' + SOCIAL.youtube + '" aria-label="YouTube">yt</a>' +
      "</div></div>" +
      col("Explore", [["Our Story", "our-story.html"], ["Our Mission", "mission.html"], ["Write to Prisoners", "write-to-prisoners.html"], ["Blog", "blog.html"]]) +
      col("Support", [["Donate", "donate.html"], ["FAQ", "faq.html"], ["Contact", "contact.html"]]) +
      '<div class="footer-col"><h4>Stay Connected</h4>' +
      "<p style=\"margin-top:0\">Get letters, stories, and ways to help — straight to your inbox.</p>" +
      '<form class="newsletter js-subscribe" style="margin-top:1rem" novalidate>' +
      '<input type="email" required placeholder="you@email.com" aria-label="Email address">' +
      '<button class="btn btn-primary" type="submit">Join</button>' +
      '</form><div class="form-success js-success" style="margin-top:.8rem">Thank you — you\'re on the list.</div>' +
      "</div>" +
      "</div>" +
      '<div class="footer-bottom"><span>&copy; ' + yr + " Emmanuel AD. A prison ministry.</span>" +
      "<span>Draft A &middot; The Correspondence concept</span></div>" +
      "</div></footer>"
    );
  }

  function initNavToggle() {
    var t = document.getElementById("navToggle");
    var l = document.getElementById("navLinks");
    if (!t || !l) return;
    t.addEventListener("click", function () {
      var open = l.classList.toggle("open");
      t.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  function initAccordion() {
    document.querySelectorAll(".qa").forEach(function (qa) {
      var btn = qa.querySelector("button");
      var ans = qa.querySelector(".qa-answer");
      if (!btn || !ans) return;
      qa.setAttribute("aria-expanded", "false");
      btn.addEventListener("click", function () {
        var open = qa.getAttribute("aria-expanded") === "true";
        qa.setAttribute("aria-expanded", open ? "false" : "true");
        ans.style.maxHeight = open ? null : ans.scrollHeight + "px";
      });
    });
  }

  function initDonate() {
    var freq = document.querySelectorAll(".toggle button");
    freq.forEach(function (b) {
      b.addEventListener("click", function () {
        freq.forEach(function (x) { x.classList.remove("active"); });
        b.classList.add("active");
        var lbl = document.getElementById("freqLabel");
        if (lbl) lbl.textContent = b.dataset.freq === "monthly" ? "per month" : "one time";
      });
    });
    var amts = document.querySelectorAll(".amt");
    amts.forEach(function (a) {
      a.addEventListener("click", function () {
        amts.forEach(function (x) { x.classList.remove("active"); });
        a.classList.add("active");
      });
    });
    var anon = document.getElementById("anon");
    var form = document.getElementById("donorFields");
    if (anon && form) {
      anon.addEventListener("change", function () {
        form.style.display = anon.checked ? "none" : "block";
      });
    }
  }

  function initFakeForms() {
    document.querySelectorAll("form.js-fake, form.js-subscribe").forEach(function (f) {
      f.addEventListener("submit", function (e) {
        e.preventDefault();
        if (!f.checkValidity()) { f.reportValidity(); return; }
        var scope = f.closest(".panel") || f.parentElement;
        var ok = scope.querySelector(".js-success");
        if (ok) ok.classList.add("show");
        f.reset();
      });
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    var h = document.getElementById("site-header-slot");
    var f = document.getElementById("site-footer-slot");
    if (h) h.outerHTML = buildHeader();
    if (f) f.outerHTML = buildFooter();
    initNavToggle();
    initAccordion();
    initDonate();
    initFakeForms();
  });
})();
