// Shared helpers: language, text dictionaries, status rendering, HTML escaping.
(function () {
    const STRINGS = {
        ro: {},
        ru: {
            serversTitle: "Наши сервера",
            serversLead: "Игры и приложения, которые я делаю. Выбери проект, чтобы открыть его страницу.",
            summary: (up, total, players) => `${up} из ${total} онлайн` + (players ? ` · ${players} ${plural(players, "игрок", "игрока", "игроков")} в игре` : ""),
            open: "Открыть",
            soonCard: "Скоро",
            inGame: "В игре",
            nobodyInGame: "Сейчас никого нет",
            stateOnline: "Онлайн",
            stateOffline: "Оффлайн",
            stateStarting: "Запускается",
            stateLoading: "Проверка…",
            stateSoon: "Скоро",
            statePrivate: "Для своих",
            stateOurGame: "Наша игра",
            stateApp: "Приложение",
            projectsTitle: "Наши проекты",
            nextGame: "Следующая игра",
            projectsLead: "Игры и приложения, которые мы делаем сами.",
            players: n => `${n} ${plural(n, "игрок", "игрока", "игроков")}`,
            loadError: "Не удалось загрузить данные. Обнови страницу.",
            footerNote: "Игры и приложения, которые мы делаем сами.",
            writeMe: "💬 Написать мне в Discord",
            discordCopied: nick => `Ник скопирован: ${nick}. Найди меня в Discord и пиши.`,
            discordNick: nick => `Мой ник в Discord: ${nick}`,
            backToServers: "Все сервера",
            nameCopied: name => `Название скопировано: ${name}`,
            copyName: "Скопировать название",
            signIn: "Войти",
            signOutShort: "Выйти",
            menu: "Меню",
            ariaNav: "Навигация", ariaLang: "Язык", ariaTabs: "Разделы", ariaServers: "Сервера",
            addAccount: "Добавить аккаунт", forgetAccount: "Убрать из списка", switchError: "Не получилось переключиться — войди в этот аккаунт заново.",
        },
        en: {
            serversTitle: "Our servers",
            serversLead: "Games and apps I make. Pick a project to open its page.",
            summary: (up, total, players) => `${up} of ${total} online` + (players ? ` · ${players} ${players === 1 ? "player" : "players"} in game` : ""),
            open: "Open",
            soonCard: "Soon",
            inGame: "In game",
            nobodyInGame: "Nobody online right now",
            stateOnline: "Online",
            stateOffline: "Offline",
            stateStarting: "Starting",
            stateLoading: "Checking…",
            stateSoon: "Soon",
            statePrivate: "Friends only",
            stateOurGame: "Our game",
            stateApp: "App",
            projectsTitle: "Our projects",
            nextGame: "Next game",
            projectsLead: "Games and apps we build ourselves.",
            players: n => `${n} ${n === 1 ? "player" : "players"}`,
            loadError: "Couldn't load data. Refresh the page.",
            footerNote: "Games and apps we build ourselves.",
            writeMe: "💬 Message me on Discord",
            discordCopied: nick => `Username copied: ${nick}. Find me on Discord and say hi.`,
            discordNick: nick => `My Discord username: ${nick}`,
            backToServers: "All servers",
            nameCopied: name => `Name copied: ${name}`,
            copyName: "Copy name",
            signIn: "Sign in",
            signOutShort: "Sign out",
            menu: "Menu",
            ariaNav: "Navigation", ariaLang: "Language", ariaTabs: "Sections", ariaServers: "Servers",
            addAccount: "Add account", forgetAccount: "Remove from the list", switchError: "Couldn't switch — sign in to this account again.",
        },
    };

    function plural(n, one, few, many) {
        const m10 = n % 10, m100 = n % 100;
        if (m10 === 1 && m100 !== 11) return one;
        if (m10 >= 2 && m10 <= 4 && (m100 < 12 || m100 > 14)) return few;
        return many;
    }

    function readLang() {
        try {
            const saved = localStorage.getItem("lang");
            if (saved === "ru" || saved === "en" || saved === "ro") return saved;
        } catch { /* storage blocked: fall through */ }
        // first visit: Romanian browsers get Romanian, everybody else Russian
        const browser = (navigator.language || "").toLowerCase();
        return browser.startsWith("ro") || browser.startsWith("mo") ? "ro" : "ru";
    }

    let lang = readLang();
    const listeners = [];

    const site = {
        get lang() { return lang; },
        t(key, ...args) {
            // Romanian falls back to English (not Russian) where a text has no translation yet
            const value = (STRINGS[lang] && STRINGS[lang][key]) ?? (lang === "ro" ? STRINGS.en[key] : undefined) ?? STRINGS.ru[key] ?? key;
            return typeof value === "function" ? value(...args) : value;
        },
        extend(dicts) {
            for (const code of Object.keys(dicts)) Object.assign(STRINGS[code], dicts[code]);
        },
        onLanguage(fn) { listeners.push(fn); },
        setLang(code) {
            lang = code;
            try { localStorage.setItem("lang", code); } catch { /* ignore */ }
            document.documentElement.lang = code;
            applyStatic();
            renderSwitch();
            renderAccountSlot();
            listeners.forEach(fn => fn(code));
        },
        esc(s) {
            return String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
        },
        statusText(status) {
            if (!status) return site.t("stateLoading");
            switch (status.state) {
                case "online": return site.t("stateOnline");
                case "offline": return site.t("stateOffline");
                case "starting": return site.t("stateStarting");
                default: return status.label === "private" ? site.t("statePrivate")
                    : status.label === "ourgame" ? site.t("stateOurGame")
                    : status.label === "app" ? site.t("stateApp")
                    : site.t("stateSoon");
            }
        },
        statusHtml(status, withPlayers) {
            const state = status ? status.state : "loading";
            let text = site.statusText(status);
            if (withPlayers && status && status.state === "online" && status.players != null) text += ` · ${site.t("players", status.players)}`;
            return `<span class="status" data-state="${site.esc(state)}"><span class="status-dot" aria-hidden="true"></span>${site.esc(text)}</span>`;
        },
        /** Copies text; falls back to execCommand where the Clipboard API is missing (plain http). */
        async copy(text) {
            try {
                await navigator.clipboard.writeText(text);
                return true;
            } catch {
                const area = document.createElement("textarea");
                area.value = text;
                area.setAttribute("readonly", "");
                area.style.position = "fixed";
                area.style.opacity = "0";
                document.body.appendChild(area);
                area.select();
                const ok = document.execCommand("copy");
                area.remove();
                return ok;
            }
        },
        /** Small message at the bottom of the screen. */
        toast(message) {
            let el = document.getElementById("toast");
            if (!el) {
                el = document.createElement("div");
                el.id = "toast";
                el.className = "toast";
                el.setAttribute("role", "status");
                document.body.appendChild(el);
            }
            el.textContent = message;
            el.classList.add("toast--visible");
            clearTimeout(el._timer);
            el._timer = setTimeout(() => el.classList.remove("toast--visible"), 2200);
        },
        me: null,
        /** Re-reads who is signed in and redraws the header. */
        async refreshMe() {
            try {
                const me = await site.getJson("/api/auth/me");
                site.me = me.login ? me : null;
            } catch {
                site.me = null;
            }
            renderAccountSlot();
        },
        async getJson(url) {
            const res = await fetch(url, { headers: { Accept: "application/json" } });
            if (!res.ok) throw new Error(`${url}: ${res.status}`);
            return res.json();
        },
    };

    function applyStatic() {
        document.querySelectorAll("[data-i18n]").forEach(el => { el.textContent = site.t(el.dataset.i18n); });
        document.querySelectorAll("[data-i18n-aria]").forEach(el => el.setAttribute("aria-label", site.t(el.dataset.i18nAria)));
    }

    function renderAccountSlot() {
        const slot = document.getElementById("headerAccount");
        if (!slot) return;
        if (!site.me) {
            slot.innerHTML = `<a class="header-link" href="/mu.html#account">${site.esc(site.t("signIn"))}</a>`;
            return;
        }
        slot.innerHTML = `<div class="account-menu"><button type="button" class="header-link header-user" id="accountMenuBtn" aria-haspopup="true" aria-expanded="false">${site.esc(site.me.login)} <span aria-hidden="true">▾</span></button>`
            + `<div class="account-panel" id="accountPanel" hidden></div></div>`
            + `<button type="button" class="header-link" id="headerSignOut">${site.esc(site.t("signOutShort"))}</button>`;
        setUpAccountMenu();
        document.getElementById("headerSignOut").addEventListener("click", async () => {
            await fetch("/api/auth/logout", { method: "POST", headers: { "X-Requested-With": "fetch" } }).catch(() => { });
            location.reload();
        });
    }

    // One-click switcher between the accounts this browser has signed in to.
    function setUpAccountMenu() {
        const button = document.getElementById("accountMenuBtn");
        const panel = document.getElementById("accountPanel");
        const post = (url, method = "POST", body) => fetch(url, {
            method,
            headers: { "Content-Type": "application/json", "X-Requested-With": "fetch" },
            body: body ? JSON.stringify(body) : undefined,
        });
        const reloadClean = () => {
            const url = new URL(location.href);
            url.searchParams.delete("add");
            history.replaceState(null, "", url);
            location.reload();
        };
        const setOpen = open => {
            panel.hidden = !open;
            button.setAttribute("aria-expanded", String(open));
        };

        async function render() {
            const { current, accounts } = await site.getJson("/api/auth/accounts");
            panel.innerHTML = `<ul class="account-list">${accounts.map(login => `
                <li class="account-row${login === current ? " is-current" : ""}">
                    <button type="button" class="account-item" data-switch="${site.esc(login)}">${site.esc(login)}${login === current ? " ✓" : ""}</button>
                    <button type="button" class="account-forget" data-forget="${site.esc(login)}" title="${site.esc(site.t("forgetAccount"))}" aria-label="${site.esc(site.t("forgetAccount"))}: ${site.esc(login)}">×</button>
                </li>`).join("")}</ul>
                <a class="account-add" href="/mu.html?add=1#account">+ ${site.esc(site.t("addAccount"))}</a>`;
        }

        button.addEventListener("click", async e => {
            e.stopPropagation();
            if (panel.hidden) { await render().catch(() => { }); setOpen(true); } else setOpen(false);
        });
        panel.addEventListener("click", async e => {
            const sw = e.target.closest("[data-switch]");
            const forget = e.target.closest("[data-forget]");
            if (sw && !sw.closest(".is-current")) {
                const res = await post("/api/auth/switch", "POST", { login: sw.dataset.switch });
                if (res.ok) reloadClean(); else { alert(site.t("switchError")); render(); }
            } else if (forget) {
                const wasCurrent = forget.closest(".is-current") !== null;
                await post(`/api/auth/accounts/${encodeURIComponent(forget.dataset.forget)}`, "DELETE");
                if (wasCurrent) reloadClean(); else render();
            }
        });
        document.addEventListener("click", e => { if (!panel.hidden && !e.target.closest(".account-menu")) setOpen(false); });
        document.addEventListener("keydown", e => { if (e.key === "Escape" && !panel.hidden) { setOpen(false); button.focus(); } });
    }

    function renderSwitch() {
        document.querySelectorAll(".lang-switch button").forEach(btn => {
            btn.setAttribute("aria-pressed", String(btn.dataset.lang === lang));
        });
    }

    // Phones: "all servers", the account and the language move from the header row into a
    // drop-down behind a ☰ button; the logo and the download button stay in the row.
    function setUpMobileMenu() {
        const header = document.querySelector(".site-header");
        const nav = header?.querySelector(".header-nav");
        if (!nav) return;
        const items = [nav.querySelector(".back-link"), nav.querySelector(".header-account"), nav.querySelector(".lang-switch")].filter(Boolean);
        if (!items.length) return;

        const toggle = document.createElement("button");
        toggle.type = "button";
        toggle.className = "menu-toggle";
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-controls", "headerMenu");
        toggle.innerHTML = `<span class="menu-toggle-bars" aria-hidden="true"></span><span class="visually-hidden">${site.esc(site.t("menu"))}</span>`;
        nav.appendChild(toggle);

        const menu = document.createElement("div");
        menu.className = "header-menu";
        menu.id = "headerMenu";
        menu.hidden = true;
        menu.innerHTML = `<div class="page"></div>`;
        header.appendChild(menu);

        // Remember where each item lived so it can go back when the window gets wide again.
        const homes = items.map(el => [el, el.nextSibling]);
        const setOpen = open => {
            menu.hidden = !open;
            toggle.setAttribute("aria-expanded", String(open));
            header.classList.toggle("menu-open", open);
        };
        const mobile = window.matchMedia("(max-width: 640px)");
        const place = () => {
            if (mobile.matches) items.forEach(el => menu.firstElementChild.appendChild(el));
            else {
                homes.forEach(([el, next]) => nav.insertBefore(el, next && next.parentNode === nav ? next : toggle));
                setOpen(false);
            }
        };
        mobile.addEventListener("change", place);
        place();

        toggle.addEventListener("click", () => setOpen(menu.hidden));
        menu.addEventListener("click", e => { if (e.target.closest("a")) setOpen(false); });
        document.addEventListener("keydown", e => { if (e.key === "Escape" && !menu.hidden) { setOpen(false); toggle.focus(); } });
        document.addEventListener("click", e => { if (!menu.hidden && !header.contains(e.target)) setOpen(false); });
    }

    // Soft light following the mouse on the page background (mouse only, not touch screens).
    function setUpCursorLight() {
        if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
        const root = document.documentElement;
        let x = 0, y = 0, queued = false;
        document.addEventListener("pointermove", e => {
            if (e.pointerType !== "mouse") return;
            x = e.clientX; y = e.clientY;
            if (queued) return;
            queued = true;
            requestAnimationFrame(() => {
                queued = false;
                root.style.setProperty("--mx", `${x}px`);
                root.style.setProperty("--my", `${y}px`);
                root.classList.add("cursor-light");
            });
        }, { passive: true });
        document.addEventListener("mouseleave", () => root.classList.remove("cursor-light"));
    }

    document.addEventListener("DOMContentLoaded", () => {
        setUpMobileMenu();
        setUpCursorLight();
        document.documentElement.lang = lang;
        document.querySelectorAll(".lang-switch button").forEach(btn =>
            btn.addEventListener("click", () => site.setLang(btn.dataset.lang)));
        applyStatic();
        renderSwitch();
        site.ready = Promise.resolve();
    });

    // Footer button "write to me": Discord can't open a chat by nickname, only by numeric user id
    // (Discord → Settings → Advanced → Developer Mode, then right click the profile → Copy User ID).
    // Without the id the button copies the nickname instead.
    const DISCORD_NICK = "diethisway";
    const DISCORD_ID = "277193997762428928";
    document.addEventListener("click", async e => {
        if (!e.target.closest("[data-discord]")) return;
        if (DISCORD_ID) {
            window.open(`https://discord.com/users/${DISCORD_ID}`, "_blank", "noopener");
            return;
        }
        site.toast(site.t(await site.copy(DISCORD_NICK) ? "discordCopied" : "discordNick", DISCORD_NICK));
    });

    window.site = site;
})();
