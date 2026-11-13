// Home page: one card per project.
(function () {
    const { t, esc } = window.site;
    const projects = [
        {
            page: "/hamster.html", name: "Hamster Massacre", accent: "#ffa04d", cover: "/img/hamster-cover.jpg", facts: ["2–8", "Steam", "PvP"], state: "stateOurGame",
            tagline: {
                ru: "Наша собственная игра: онлайн-драка хомяков на одном экране. Прыгни сопернику на голову, пока он не прыгнул на твою.",
                en: "Our own game: a single-screen online hamster brawl. Jump on your rival's head before they jump on yours.",
                ro: "Jocul nostru: o încăierare online de hamsteri pe un singur ecran. Sari-i adversarului pe cap înainte să sară el pe al tău.",
            },
        },
        {
            page: "/buddybikeride.html", name: "BuddyBikeRide", accent: "#8b63ff", cover: "/img/bbr/cover.webp", facts: ["Android", "Offline maps", "SOS"], state: "stateApp",
            tagline: {
                ru: "Приложение для поездок на байке с друзьями: все видны на одной карте, маршрут под рукой, карты без интернета и кнопка SOS.",
                en: "An app for riding with friends: everyone on one map, your route at hand, offline maps and an SOS button.",
                ro: "O aplicație pentru ieșiri cu prietenii: toți pe aceeași hartă, traseul la îndemână, hărți offline și buton SOS.",
            },
        },
    ];

    function render() {
        document.getElementById("cards").innerHTML = projects.map((g, i) => `
        <a class="game-card${i === 0 ? " game-card--featured" : ""}" href="${esc(g.page)}" style="--card-accent:${esc(g.accent)}">
            <div class="game-cover">
                <img src="${esc(g.cover)}" alt="" loading="${i === 0 ? "eager" : "lazy"}">
                <span class="pill">${window.site.statusHtml({ state: "none", label: g.state === "stateApp" ? "app" : "ourgame" })}</span>
            </div>
            <div class="game-body">
                <h2 class="game-title">${esc(g.name)}</h2>
                <div class="game-facts">${g.facts.map(f => `<span class="chip">${esc(f)}</span>`).join("")}</div>
                <p class="game-tagline">${esc(g.tagline[site.lang] || g.tagline.ru)}</p>
                <span class="game-open">${esc(t("open"))} <span class="arrow" aria-hidden="true">→</span></span>
            </div>
        </a>`).join("");
    }

    site.onLanguage(render);
    render();
})();
