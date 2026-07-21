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
      "<span>Draft D &middot; The Witness concept</span></div>" +
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

/* ===== Polish: scroll reveal, stat counters, header shadow ===== */
(function () {
  "use strict";
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function onReady(fn) {
    if (document.readyState !== "loading") { fn(); }
    else { document.addEventListener("DOMContentLoaded", fn); }
  }

  onReady(function () {
    // Header shadow once the page scrolls
    var header = document.querySelector(".site-header");
    if (header) {
      var onScroll = function () {
        header.classList.toggle("scrolled", (window.scrollY || 0) > 8);
      };
      window.addEventListener("scroll", onScroll, { passive: true });
      onScroll();
    }

    if (reduce || !("IntersectionObserver" in window)) return;

    // Scroll reveal with a light stagger
    var sel = [
      ".card", ".envelope", ".post-card", ".tl-step", ".roman", ".stack-item",
      ".dir-row", ".roll-row", ".bigstat", ".stat", ".qa", ".section-head",
      ".letter-card", ".quote-chip", ".gold-frame", ".cta-band", ".chapter",
      ".split > *", ".hero h1", ".hero .lede", ".hero-actions",
      ".poster h1", ".poster-foot", ".hero-full h1", ".hero-full .lede",
      ".hero-split h1", ".photo-frame", ".stat-strip", ".directory", ".zig > *"
    ].join(",");
    var els = Array.prototype.slice.call(document.querySelectorAll(sel));
    els.forEach(function (el) { el.classList.add("rv"); });

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        var el = en.target;
        var sibs = el.parentNode ? Array.prototype.filter.call(el.parentNode.children, function (c) {
          return c.classList && c.classList.contains("rv");
        }) : [];
        var idx = sibs.indexOf(el);
        el.style.transitionDelay = (idx > 0 ? Math.min(idx, 7) * 80 : 0) + "ms";
        el.classList.add("rv-in");
        io.unobserve(el);
      });
    }, { threshold: 0.08, rootMargin: "0px 0px -30px 0px" });
    els.forEach(function (el) { io.observe(el); });

    // Safety net: if the observer misses, reveal anything already on screen
    setTimeout(function () {
      els.forEach(function (el) {
        if (el.classList.contains("rv-in")) return;
        var r = el.getBoundingClientRect();
        if (r.top < (window.innerHeight || 800) + 40) { el.classList.add("rv-in"); }
      });
    }, 1400);

    // Count-up animation for stat numbers
    function countUp(el) {
      var full = el.textContent;
      var m = full.match(/^([\d.]+)([\s\S]*)$/);
      if (!m) return;
      var target = parseFloat(m[1]);
      if (!isFinite(target)) return;
      var suffix = m[2];
      var decimals = (m[1].split(".")[1] || "").length;
      var t0 = null;
      function step(ts) {
        if (t0 === null) t0 = ts;
        var p = Math.min((ts - t0) / 900, 1);
        p = 1 - Math.pow(1 - p, 3);
        el.textContent = (target * p).toFixed(decimals) + suffix;
        if (p < 1) { requestAnimationFrame(step); } else { el.textContent = full; }
      }
      requestAnimationFrame(step);
    }
    var statIo = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        countUp(en.target);
        statIo.unobserve(en.target);
      });
    }, { threshold: 0.4 });
    document.querySelectorAll(".stat b, .bigstat b").forEach(function (b) { statIo.observe(b); });
  });
})();

/* ===== Fancy shared: scroll progress + page transitions ===== */
(function () {
  "use strict";
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  function onReady(fn) {
    if (document.readyState !== "loading") { fn(); } else { document.addEventListener("DOMContentLoaded", fn); }
  }
  onReady(function () {
    // Scroll progress bar
    var bar = document.createElement("div");
    bar.className = "scroll-progress";
    document.body.appendChild(bar);
    function paint() {
      var h = document.documentElement;
      var max = h.scrollHeight - h.clientHeight;
      bar.style.width = (max > 0 ? (h.scrollTop / max) * 100 : 0) + "%";
    }
    window.addEventListener("scroll", paint, { passive: true });
    paint();

    // Soft page transitions on internal links
    if (!reduce) {
      document.addEventListener("click", function (e) {
        var a = e.target.closest ? e.target.closest("a") : null;
        if (!a) return;
        var href = a.getAttribute("href");
        if (!href || href.charAt(0) === "#" || a.target === "_blank" ||
            /^(https?:|mailto:|tel:)/.test(href)) return;
        e.preventDefault();
        document.body.classList.add("page-exit");
        setTimeout(function () { window.location.href = href; }, 260);
      });
      window.addEventListener("pageshow", function () {
        document.body.classList.remove("page-exit");
      });
    }
  });
})();

/* ===== Signature D: masked line reveal + parallax chapter numbers ===== */
(function () {
  "use strict";
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  document.addEventListener("DOMContentLoaded", function () {
    var h1 = document.querySelector(".poster h1");
    if (h1 && !reduce) {
      var parts = h1.innerHTML.split(/<br\s*\/?>/i);
      h1.innerHTML = parts.map(function (p, i) {
        return '<span class="pl"><span class="pl-in" style="transition-delay:' + (i * 120 + 150) + 'ms">' + p + "</span></span>";
      }).join("");
      requestAnimationFrame(function () {
        requestAnimationFrame(function () { h1.classList.add("play"); });
      });
      setTimeout(function () { h1.classList.add("play"); }, 900);
    }
    if (!reduce) {
      var nums = document.querySelectorAll(".ch-num");
      if (nums.length) {
        var ticking = false;
        function parallax() {
          ticking = false;
          var vh = window.innerHeight || 800;
          nums.forEach(function (n) {
            var r = n.parentNode.getBoundingClientRect();
            if (r.bottom < 0 || r.top > vh) return;
            n.style.transform = "translateY(" + ((r.top - vh / 2) * -0.09).toFixed(1) + "px)";
          });
        }
        window.addEventListener("scroll", function () {
          if (!ticking) { ticking = true; requestAnimationFrame(parallax); }
        }, { passive: true });
        parallax();
      }
    }
  });
})();
