(function () {
  "use strict";

  /* ---------------------------------------------------------------------
   * 1. Font size controls
   * ------------------------------------------------------------------- */
  var FONT_KEY = "itube-font-scale";
  var FONT_MIN = 0.8;
  var FONT_MAX = 1.5;
  var FONT_STEP = 0.1;
  var root = document.documentElement;

  function clamp(n, lo, hi) { return Math.max(lo, Math.min(hi, n)); }

  function getFontScale() {
    var saved = parseFloat(localStorage.getItem(FONT_KEY));
    return isNaN(saved) ? 1 : clamp(saved, FONT_MIN, FONT_MAX);
  }

  function applyFontScale(scale) {
    scale = clamp(scale, FONT_MIN, FONT_MAX);
    root.style.setProperty("--font-scale", scale.toFixed(2));
    try { localStorage.setItem(FONT_KEY, scale.toFixed(2)); } catch (e) {}
    var label = document.getElementById("font-size-label");
    if (label) label.textContent = Math.round(scale * 100) + "%";
  }

  function initFontControls() {
    applyFontScale(getFontScale());
    var dec = document.getElementById("font-dec-btn");
    var inc = document.getElementById("font-inc-btn");
    var reset = document.getElementById("font-reset-btn");
    if (dec) dec.addEventListener("click", function () { applyFontScale(getFontScale() - FONT_STEP); });
    if (inc) inc.addEventListener("click", function () { applyFontScale(getFontScale() + FONT_STEP); });
    if (reset) reset.addEventListener("click", function () { applyFontScale(1); });
  }

  /* ---------------------------------------------------------------------
   * 2. PWA install prompt
   * ------------------------------------------------------------------- */
  var INSTALL_DISMISS_KEY = "itube-install-dismissed";
  var deferredPrompt = null;

  function showInstallBanner() {
    if (localStorage.getItem(INSTALL_DISMISS_KEY) === "1") return;
    if (document.getElementById("pwa-install-banner")) return;
    var isStandalone = window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone === true;
    if (isStandalone) return;

    var banner = document.createElement("div");
    banner.id = "pwa-install-banner";
    banner.className = "pwa-install-banner";
    banner.innerHTML =
      '<span class="pwa-install-text">Install iTube as an app — read offline, no browser chrome.</span>' +
      '<span class="pwa-install-actions">' +
      '<button type="button" id="pwa-install-yes" class="pwa-btn pwa-btn-primary">Install</button>' +
      '<button type="button" id="pwa-install-no" class="pwa-btn">Not now</button>' +
      "</span>";
    document.body.appendChild(banner);
    requestAnimationFrame(function () { banner.classList.add("visible"); });

    document.getElementById("pwa-install-no").addEventListener("click", function () {
      try { localStorage.setItem(INSTALL_DISMISS_KEY, "1"); } catch (e) {}
      dismissBanner();
    });
    document.getElementById("pwa-install-yes").addEventListener("click", function () {
      if (!deferredPrompt) { dismissBanner(); return; }
      deferredPrompt.prompt();
      deferredPrompt.userChoice.finally(function () {
        deferredPrompt = null;
        dismissBanner();
      });
    });
  }

  function dismissBanner() {
    var banner = document.getElementById("pwa-install-banner");
    if (!banner) return;
    banner.classList.remove("visible");
    setTimeout(function () { banner.remove(); }, 250);
  }

  window.addEventListener("beforeinstallprompt", function (e) {
    e.preventDefault();
    deferredPrompt = e;
    showInstallBanner();
  });

  window.addEventListener("appinstalled", function () {
    dismissBanner();
    try { localStorage.setItem(INSTALL_DISMISS_KEY, "1"); } catch (e) {}
  });

  // iOS Safari never fires beforeinstallprompt — show a manual instruction banner instead.
  function isIos() {
    return /iphone|ipad|ipod/i.test(window.navigator.userAgent);
  }
  function maybeShowIosBanner() {
    if (!isIos()) return;
    var isStandalone = window.navigator.standalone === true;
    if (isStandalone) return;
    if (localStorage.getItem(INSTALL_DISMISS_KEY) === "1") return;
    if (document.getElementById("pwa-install-banner")) return;

    var banner = document.createElement("div");
    banner.id = "pwa-install-banner";
    banner.className = "pwa-install-banner";
    banner.innerHTML =
      '<span class="pwa-install-text">Install iTube: tap Share, then "Add to Home Screen".</span>' +
      '<span class="pwa-install-actions">' +
      '<button type="button" id="pwa-install-no" class="pwa-btn">Got it</button>' +
      "</span>";
    document.body.appendChild(banner);
    requestAnimationFrame(function () { banner.classList.add("visible"); });
    document.getElementById("pwa-install-no").addEventListener("click", function () {
      try { localStorage.setItem(INSTALL_DISMISS_KEY, "1"); } catch (e) {}
      dismissBanner();
    });
  }

  function registerServiceWorker() {
    if (!("serviceWorker" in navigator)) return;
    var depth = (document.body.getAttribute("data-depth") || "0");
    var prefix = "";
    for (var i = 0; i < parseInt(depth, 10); i++) prefix += "../";
    window.addEventListener("load", function () {
      navigator.serviceWorker.register(prefix + "sw.js").catch(function () {});
    });
  }

  /* ---------------------------------------------------------------------
   * 3. Markdown + LaTeX rendering
   *    Any element with class="md" is run through marked.js (markdown -> HTML).
   *    KaTeX auto-render then finds $...$ / $$...$$ / \(...\) / \[...\] inside
   *    the whole article and renders them in place. Existing hand-authored
   *    HTML is left completely untouched unless it opts in via .md, so this
   *    is safe to load on every page even where no math/markdown is used.
   * ------------------------------------------------------------------- */
  function renderMarkdownBlocks() {
    if (typeof window.marked === "undefined") return;
    var blocks = document.querySelectorAll(".md");
    blocks.forEach(function (el) {
      var src = el.getAttribute("data-src") || el.textContent;
      el.innerHTML = window.marked.parse(src);
    });
  }

  function renderMath() {
    if (typeof window.renderMathInElement === "undefined") return;
    var article = document.querySelector("article");
    if (!article) return;
    window.renderMathInElement(article, {
      delimiters: [
        { left: "$$", right: "$$", display: true },
        { left: "\\[", right: "\\]", display: true },
        { left: "$", right: "$", display: false },
        { left: "\\(", right: "\\)", display: false }
      ],
      throwOnError: false,
      ignoredTags: ["script", "noscript", "style", "textarea", "pre", "code"]
    });
  }

  /* ---------------------------------------------------------------------
   * Init
   * ------------------------------------------------------------------- */
  document.addEventListener("DOMContentLoaded", function () {
    initFontControls();
    registerServiceWorker();
    renderMarkdownBlocks();
    // KaTeX auto-render script loads async; give it a tick after markdown injects any new math text.
    setTimeout(renderMath, 0);
    setTimeout(maybeShowIosBanner, 800);
  });
})();
