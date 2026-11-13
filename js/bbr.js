// BuddyBikeRide presentation page: texts in Russian and English, feature cards and screenshots.
(function () {
    const { esc } = window.site;

    site.extend({
        ru: {
            backToProjects: "Все проекты",
            bbrLead: "Катайтесь с друзьями и не теряйтесь: все видны на одной карте, маршрут всегда под рукой, карты работают без интернета, а в беде выручит кнопка SOS.",
            bbrTry: "Как попробовать",
            bbrEditorBtn: "Редактор маршрутов",
            bbrFeatures: "Что умеет",
            bbrShots: "Как это выглядит",
            bbrLandscape: "На руле: горизонтальный режим",
            bbrLandscapeText: "Телефон на креплении лежит боком, и приложение тоже: полоса с данными сверху, SOS и сигналы под большим пальцем справа, огромная кнопка «Начать поездку» внизу.",
            landscape: [
                ["l-light", "Светлая карта: скорость, высота и закат сверху, SOS и сигналы справа"],
                ["l-light-clean", "Чистый вид: карта и данные без лишних кнопок"],
                ["l-dark", "Ночью: тёмная карта и кнопка «Закончить поездку»"],
                ["l-dark-clean", "Чистый вид ночью: только маршрут, карта и данные"],
            ],
            bbrEditorTitle: "Редактор маршрутов на компьютере",
            bbrEditorText: "Рисуй и правь «Мои маршруты» на большом экране. Заходи тем же Google-аккаунтом, что в приложении, и маршруты появятся на телефоне. Есть магнит к дорогам, импорт и экспорт GPX, русский, румынский и английский языки и ночной режим.",
            bbrEditorOpen: "Открыть редактор",
            bbrGetTitle: "Как попробовать",
            bbrGetText: "Приложение пока для своих и не лежит в магазине. Напиши нам в Discord, и мы пришлём установку и код группы.",
            bbrCredits: "Данные карты © участники OpenStreetMap (ODbL), тайлы OpenFreeMap.",
            chips: ["Android", "Офлайн-карты", "SOS"],
            features: [
                ["👥", "Вся группа на карте", "Создаёшь группу, получаешь код или ссылку-приглашение и видишь друзей на карте в реальном времени. Позиции обновляются каждые несколько секунд."],
                ["🟤", "Грунтовки и тропы", "На карте видны грунтовки, тропы и броды (данные OpenStreetMap), и видно их уже издалека, а не только вблизи."],
                ["📴", "Работает без интернета", "Карты 25 стран скачиваются на телефон и обновляются раз в месяц. В лесу и в горах связь не нужна."],
                ["🆘", "SOS и сигналы", "Одна кнопка SOS для всей группы и свои сигналы («стоим», «опасность»). Уведомление приходит, даже если приложение закрыто."],
                ["📍", "Метки на карте", "Долгое нажатие ставит метку: яма, брод, ждём здесь, опасность или своя подпись. Группа видит её сразу."],
                ["🧭", "Данные в пути", "Скорость, высота, закат, время в пути и средняя скорость. Во время поездки в шторке уведомлений видны дистанция и скорость."],
                ["☁️", "Вход через Google", "Маршруты, места, группы и настройки синхронизируются между телефонами. Без входа приложение тоже работает."],
            ],
            shots: [
                ["s-map", "Карта поездки: скорость, высота и закат сверху, SOS и сигналы под рукой"],
                ["s-signal", "Сигнал группе: «стоим», «нужно топливо», «жди меня» и свои"],
                ["s-night", "Ночной режим: сигнал группы прямо на карте"],
                ["s-offline", "Свои маршруты, GPX и карты стран для офлайна"],
                ["s-notify", "Сигналы и уведомления, даже когда приложение закрыто"],
                ["s-theme", "Тема и язык: русский, английский, румынский"],
            ],
        },
        en: {
            backToProjects: "All projects",
            bbrLead: "Ride with your friends and never lose each other: everyone is on one shared map, your route is always at hand, maps work without internet, and an SOS button has your back.",
            bbrTry: "How to try it",
            bbrEditorBtn: "Route editor",
            bbrFeatures: "What it does",
            bbrShots: "What it looks like",
            bbrLandscape: "On the handlebars: landscape mode",
            bbrLandscapeText: "The phone sits sideways in its mount and so does the app: the info strip on top, SOS and signals under your thumb on the right, a huge \"Start the ride\" button at the bottom.",
            landscape: [
                ["l-light", "Light map: speed, height and sunset on top, SOS and signals on the right"],
                ["l-light-clean", "Clean view: the map and the data without extra buttons"],
                ["l-dark", "At night: a dark map and the \"End the ride\" button"],
                ["l-dark-clean", "Clean view at night: just the route, the map and the data"],
            ],
            bbrEditorTitle: "Route editor for your computer",
            bbrEditorText: "Draw and edit \"My routes\" on a big screen. Sign in with the same Google account as in the app and the routes show up on your phone. It has a road magnet, GPX import and export, Russian, Romanian and English, and a night mode.",
            bbrEditorOpen: "Open the editor",
            bbrGetTitle: "How to try it",
            bbrGetText: "The app is for friends for now and isn't in a store. Message us on Discord and we'll send the install and a group code.",
            bbrCredits: "Map data © OpenStreetMap contributors (ODbL), tiles by OpenFreeMap.",
            chips: ["Android", "Offline maps", "SOS"],
            features: [
                ["👥", "The whole group on the map", "Create a group, share the code or invite link and see your friends on the map in real time. Positions update every few seconds."],
                ["🟤", "Dirt roads and trails", "The map shows dirt roads, tracks and fords (OpenStreetMap data), visible from far out, not only up close."],
                ["📴", "Works without internet", "Maps of 25 countries download to the phone and refresh monthly. No signal needed in the forest or the mountains."],
                ["🆘", "SOS and signals", "One SOS button for the whole group and your own signals (\"stopping\", \"danger\"). The alert arrives even when the app is closed."],
                ["📍", "Map marks", "A long press drops a mark: pothole, ford, waiting here, danger or your own text. The group sees it at once."],
                ["🧭", "Info on the road", "Speed, height, sunset, time on the road and average speed. During a ride the notification shows distance and speed."],
                ["☁️", "Google sign-in", "Routes, places, groups and settings sync between your phones. The app works without signing in too."],
            ],
            shots: [
                ["s-map", "The ride map: speed, height and sunset on top, SOS and signals at hand"],
                ["s-signal", "A signal to the group: \"Stopped\", \"Need fuel\", \"Wait for me\" and your own"],
                ["s-night", "Night mode: a group signal right on the map"],
                ["s-offline", "Your routes, GPX and country maps for offline"],
                ["s-notify", "Signals and alerts, even when the app is closed"],
                ["s-theme", "Theme and language: Russian, English, Romanian"],
            ],
        },
    });

    function render() {
        document.getElementById("heroChips").innerHTML = site.t("chips").map(c => `<span class="chip">${esc(c)}</span>`).join("");
        document.getElementById("features").innerHTML = site.t("features").map(([icon, title, text]) => `
            <article class="feature">
                <div class="feature-icon" aria-hidden="true">${icon}</div>
                <h3>${esc(title)}</h3>
                <p>${esc(text)}</p>
            </article>`).join("");
        document.getElementById("landscape").innerHTML = site.t("landscape").map(([file, caption]) => `
            <figure>
                <img src="/img/bbr/${esc(file)}.webp" alt="${esc(caption)}" width="1100" height="434" loading="lazy">
                <figcaption>${esc(caption)}</figcaption>
            </figure>`).join("");
        document.getElementById("gallery").innerHTML = site.t("shots").map(([file, caption]) => `
            <figure>
                <img src="/img/bbr/${esc(file)}.webp" alt="${esc(caption)}" width="560" height="1161" loading="lazy">
                <figcaption>${esc(caption)}</figcaption>
            </figure>`).join("");
    }

    site.onLanguage(render);
    document.addEventListener("DOMContentLoaded", render);
})();
