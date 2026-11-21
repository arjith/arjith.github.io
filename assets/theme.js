(() => {
  const system = matchMedia("(prefers-color-scheme: dark)");
  let preference = "system";
  try {
    const saved = localStorage.getItem("portfolio-theme");
    if (saved && ["system", "light", "dark"].includes(saved)) preference = saved;
  } catch (error) {
    console.warn("Theme preference storage unavailable:", error);
  }
  const apply = () => {
    document.documentElement.dataset.theme = preference === "system"
      ? (system.matches ? "dark" : "light") : preference;
    document.dispatchEvent(new Event("themechange"));
  };
  apply();
  system.addEventListener("change", () => { if (preference === "system") apply(); });
  document.addEventListener("DOMContentLoaded", () => {
    const nav = document.querySelector(".titlebar .nav");
    if (!nav) return;
    const select = document.createElement("select");
    select.className = "theme-switch";
    select.setAttribute("aria-label", "Color theme");
    select.title = "Color theme";
    for (const [value, label] of [["system", "Auto"], ["light", "Light"], ["dark", "Dark"]]) {
      const option = document.createElement("option");
      option.value = value; option.textContent = label;
      select.append(option);
    }
    select.value = preference;
    select.addEventListener("change", () => {
      preference = select.value;
      try { localStorage.setItem("portfolio-theme", preference); }
      catch (error) { console.warn("Theme preference could not be saved:", error); }
      apply();
    });
    nav.append(select);
    addEventListener("storage", event => {
      if (event.key !== "portfolio-theme" && event.key !== null) return;
      preference = ["light", "dark"].includes(event.newValue) ? event.newValue : "system";
      select.value = preference;
      apply();
    });
  });
})();
