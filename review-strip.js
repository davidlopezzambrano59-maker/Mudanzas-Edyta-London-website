(function () {
  function fits(text) {
    return text.scrollHeight <= text.clientHeight + 1;
  }

  function setup(card) {
    var text = card.querySelector(".review-strip__text");
    var btn = card.querySelector(".review-strip__more");
    if (!text || !btn || btn.dataset.bound === "1") return;
    btn.dataset.bound = "1";

    function sync() {
      if (card.classList.contains("is-open")) {
        btn.hidden = false;
        return;
      }
      btn.hidden = fits(text);
    }

    btn.addEventListener("click", function () {
      var open = card.classList.toggle("is-open");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      btn.textContent = open ? "Show less" : "Read more";
      if (!open) sync();
    });

    sync();
    window.addEventListener("resize", sync);
  }

  function init() {
    document.querySelectorAll(".review-strip__card").forEach(setup);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
