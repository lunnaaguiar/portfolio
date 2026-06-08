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