document.querySelectorAll(".menu-link").forEach(link => {
    link.addEventListener("click", function(e) {
        e.preventDefault();

        const destino = document.querySelector(this.getAttribute("href"));

        const posicao =
            destino.offsetTop -
            (window.innerHeight / 2) +
            (destino.offsetHeight / 2);

        window.scrollTo({
            top: posicao,
            behavior: "smooth"
        });
    });
});

(function () {
  const CHAVE = "tema";
  const body = document.body;

  const botao =
    document.getElementById("tema") ||
    document.getElementById("botao_tema") ||
    document.querySelector(".botao-tema") ||
    document.querySelector(".theme-toggle");

  function atualizarIcone() {
    if (!botao) return;
    if (body.classList.contains("dark") || body.classList.contains("modo-escuro")) {
      botao.textContent = "☀️";
      botao.setAttribute("aria-pressed", "true");
    } else {
      botao.textContent = "🌙";
      botao.setAttribute("aria-pressed", "false");
    }
  }

  function aplicarTema(nome) {
    if (nome === "dark") {
      body.classList.add("dark");
      body.classList.add("modo-escuro");
    } else {
      body.classList.remove("dark");
      body.classList.remove("modo-escuro");
    }
    body.classList.add("tema-transicao");
    window.setTimeout(() => body.classList.remove("tema-transicao"), 500);

    atualizarIcone();
  }

  window.alternarTema = function () {
    const atual = localStorage.getItem(CHAVE) || "light";
    const proximo = atual === "dark" ? "light" : "dark";
    aplicarTema(proximo);
    localStorage.setItem(CHAVE, proximo);
  };

  function inicializar() {
    const salvo = localStorage.getItem(CHAVE);
    if (salvo === "dark") {
      aplicarTema("dark");
    } else {
      aplicarTema("light");
    }
  }

  function ligarBotao() {
    if (!botao) return;
    botao.removeEventListener("click", window.alternarTema);
    botao.addEventListener("click", window.alternarTema);
    if (!botao.hasAttribute("aria-label")) botao.setAttribute("aria-label", "Alternar tema");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      inicializar();
      ligarBotao();
    });
  } else {
    inicializar();
    ligarBotao();
  }
})();