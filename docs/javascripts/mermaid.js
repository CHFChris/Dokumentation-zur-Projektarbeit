(function () {
  const init = () => {
    if (!window.mermaid) return;
    window.mermaid.initialize({ startOnLoad: true, theme: "default" });
  };

  const script = document.createElement("script");
  script.src = "https://unpkg.com/mermaid@10/dist/mermaid.min.js";
  script.onload = init;
  document.head.appendChild(script);
})();
