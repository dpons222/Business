(function () {
  const root = document.documentElement;
  const buttons = Array.from(document.querySelectorAll("[data-palette-option]"));
  const savedPalette = window.localStorage.getItem("digidap-palette");

  function setPalette(palette) {
    root.setAttribute("data-palette", palette);
    window.localStorage.setItem("digidap-palette", palette);

    buttons.forEach((button) => {
      const isActive = button.dataset.paletteOption === palette;
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-pressed", String(isActive));
    });
  }

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      setPalette(button.dataset.paletteOption);
    });
  });

  if (savedPalette === "steel" || savedPalette === "signal") {
    setPalette(savedPalette);
  } else {
    setPalette("signal");
  }
})();
