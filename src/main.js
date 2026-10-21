import "@fontsource/manrope/cyrillic-400.css";
import "@fontsource/manrope/cyrillic-500.css";
import "@fontsource/manrope/cyrillic-600.css";
import "@fontsource/manrope/latin-400.css";
import "@fontsource/manrope/latin-500.css";
import "@fontsource/manrope/latin-600.css";
import "@fontsource/cormorant-garamond/cyrillic-500-italic.css";
import "./style.css";
import { contactEmail } from "./config.js";

const imagePath = (name) => `${import.meta.env.BASE_URL}images/${name}.webp`;

const arrow =
  '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" stroke-width="1.5"/></svg>';
const diagonal =
  '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 18 18 6M6 6h12v12" stroke="currentColor" stroke-width="1.5"/></svg>';
const logo =
  '<span class="brand-mark" aria-hidden="true"><svg viewBox="0 0 32 36" fill="none"><path d="M3 31V12L16 4l13 8v19H19V20h-6v11H3Z" stroke="currentColor" stroke-width="2.5" stroke-linejoin="round"/></svg></span><span>homini<span class="brand-dot">®</span></span>';
const products = [
  {
    id: "kitchen",
    name: "Летние кухни",
    tag: "Готовить и собираться вместе",
    group: "rest",
    image: "kitchen",
    description:
      "Место для неспешных завтраков, ужинов с друзьями и любимых рецептов на открытом воздухе.",
    details: [
      "Рабочая зона и место для приготовления",
      "Возможность предусмотреть хранение",
      "Открытый или частично закрытый формат",
    ],
    purpose: "Летняя кухня",
  },
  {
    id: "gazebo",
    name: "Беседки",
    tag: "Быть ближе к природе",
    group: "rest",
    image: "gazebo",
    description:
      "Своя тихая точка в саду. Для длинных разговоров, книг и обедов, которые не хочется заканчивать.",
    details: [
      "Пространство под обеденную группу",
      "Варианты ограждения и отделки",
      "Размер под ваш сценарий отдыха",
    ],
    purpose: "Беседка",
  },
  {
    id: "storage",
    name: "Хозблоки",
    tag: "У каждой вещи — своё место",
    group: "order",
    image: "storage",
    description:
      "Аккуратное место для садового инвентаря и сезонных вещей, которое становится частью архитектуры участка.",
    details: [
      "Хранение садового инвентаря",
      "Варианты внутренней организации",
      "Расположение входа под ваш участок",
    ],
    purpose: "Хозблок",
  },
  {
    id: "grill",
    name: "Гриль-зоны",
    tag: "Встречаться без особого повода",
    group: "rest",
    image: "grill",
    description:
      "Открытое пространство для приготовления на огне и встреч за городом. Расположение оборудования обсуждается при подборе решения.",
    details: [
      "Место для гриля и рабочей поверхности",
      "Открытая конструкция из дерева",
      "Размещение с учётом оборудования",
    ],
    purpose: "Гриль-зона",
  },
  {
    id: "carport",
    name: "Навесы",
    tag: "Защита в едином стиле",
    group: "order",
    image: "carport",
    description:
      "Лаконичная постройка для автомобиля, которая поддерживает общее настроение дома и сада.",
    details: [
      "Габариты под вашу технику",
      "Варианты боковых ограждений",
      "Размещение с учётом въезда",
    ],
    purpose: "Навес",
  },
  {
    id: "tools",
    name: "Для садовой техники",
    tag: "Порядок без лишних компромиссов",
    group: "order",
    image: "tools",
    description:
      "Удобный доступ к технике и всему, что помогает заботиться об участке. Всё необходимое рядом, а сад остаётся свободным.",
    details: [
      "Место для садовой техники",
      "Хранение расходников и инструментов",
      "Открытый доступ или ограждения",
    ],
    purpose: "Постройка для техники",
  },
];
const faqs = [
  [
    "Что входит в стоимость?",
    "Состав зависит от выбранной постройки и комплектации. В расчёте важно отдельно согласовать конструкцию, отделку, оснащение, доставку, монтаж и подготовку основания. До этого итоговую стоимость мы не указываем.",
  ],
  [
    "Можно ли изменить размеры и комплектацию?",
    "Пожелания к размерам, планировке и отделке можно указать в запросе. Возможность изменений зависит от конструкции и подтверждается после обсуждения проекта.",
  ],
  [
    "Как подготовить место на участке?",
    "Требования к основанию зависят от постройки, грунта и рельефа. Для обсуждения полезны фотографии участка, примерные размеры площадки и информация о подъезде. Не начинайте подготовку основания до согласования решения.",
  ],
  [
    "Доставляете ли вы в мой регион?",
    "Укажите населённый пункт в запросе. Возможность доставки, маршрут и условия установки нужно подтвердить для конкретного участка.",
  ],
  [
    "Сколько занимает изготовление?",
    "Срок зависит от состава проекта и загрузки производства. Точную дату изготовления, доставки и установки необходимо согласовать до оформления заказа.",
  ],
  [
    "Какие условия гарантии?",
    "Гарантийные условия должны быть указаны в договоре для конкретного изделия. Попросите включить в расчёт информацию о гарантии, правилах эксплуатации и уходе за материалами.",
  ],
];

document.querySelector("#app").innerHTML = `
  <header class="header" id="top">
    <a class="brand" href="#top" aria-label="Homini — на главную">${logo}</a>
    <nav class="desktop-nav" aria-label="Основная навигация">
      <a href="#catalog">Каталог <span class="tiny-plus">+</span></a><a href="#approach">Подход Homini</a><a href="#process">Как мы работаем</a><a href="#faq">Вопросы</a>
    </nav>
    <button class="header-cta text-button" data-quiz>Обсудить проект ${diagonal}</button>
    <button class="menu-toggle" aria-label="Открыть меню" aria-expanded="false" aria-controls="mobile-nav"><span></span><span></span></button>
  </header>
  <nav class="mobile-nav" id="mobile-nav" aria-label="Мобильная навигация" hidden>
    <a href="#catalog">Каталог</a><a href="#approach">Подход Homini</a><a href="#process">Как мы работаем</a><a href="#faq">Вопросы</a><button data-quiz>Обсудить проект ${diagonal}</button>
  </nav>
  <main>
    <section class="hero section-wrap" aria-labelledby="hero-title">
      <div class="hero-intro">
        <div><p class="eyebrow"><span class="small-sun"><svg viewBox="0 0 48 48" fill="none" aria-hidden="true"><path d="M24 4v40M4 24h40M10 10l28 28M10 38l28-28" stroke="currentColor" stroke-width="4" stroke-linecap="round"/></svg></span> АРХИТЕКТУРА ЗАГОРОДНОЙ ЖИЗНИ</p><h1 id="hero-title">На участке<br>становится <em>лучше.</em></h1></div>
        <div class="hero-aside"><p>Продуманные постройки для простых радостей. Готовить на воздухе, собираться вместе и чувствовать себя дома.</p><a class="button button-dark" href="#catalog">Найти своё решение ${arrow}</a><span class="micro-copy">От первой идеи до своего места в саду</span></div>
      </div>
      <div class="hero-photo"><img src="${imagePath("garden")}" alt="Концепция участка с деревянным павильоном и летней кухней среди берёз" width="1536" height="1024" fetchpriority="high"/><div class="photo-top"><span class="photo-pill">ЕСТЕСТВЕННО. ПРОДУМАННО. ВМЕСТЕ.</span><span class="image-label">Архитектурная визуализация</span></div><div class="hero-photo-bottom"><span>Место для того,<br>что действительно важно.</span><a href="#approach" class="circle-link" aria-label="Узнать о подходе Homini">${diagonal}</a></div><span class="photo-index">HOMINI / ЖИЗНЬ ЗА ГОРОДОМ — 01</span></div>
      <div class="hero-foot"><span>Дерево. Простые формы. Ваш характер.</span><a href="#catalog">Листайте, вдохновляйтесь <span>↓</span></a></div>
    </section>

    <section class="catalog section-wrap section-space" id="catalog" aria-labelledby="catalog-title">
      <div class="section-top"><p class="eyebrow">01 / КОЛЛЕКЦИЯ HOMINI</p><span class="section-aside">Небольшие постройки.<br>Большие перемены.</span></div>
      <div class="section-heading"><h2 id="catalog-title">Для каждой идеи —<br><em>своё место.</em></h2><p>От летней кухни до аккуратного хозблока.<br>Начните с того, что нужно вам сейчас.</p></div>
      <div class="catalog-toolbar"><div class="filters" role="group" aria-label="Фильтр каталога"><button class="filter active" data-filter="all" aria-pressed="true">Все постройки <span>06</span></button><button class="filter" data-filter="rest" aria-pressed="false">Для отдыха</button><button class="filter" data-filter="order" aria-pressed="false">Для порядка</button></div><span class="catalog-note">Визуализации · комплектация обсуждается</span></div>
      <div class="product-grid">${products.map((p, i) => `<button class="product-card" data-product="${p.id}" data-group="${p.group}" aria-label="Подробнее: ${p.name}"><div class="product-image"><img src="${imagePath(p.image)}" alt="Визуализация: ${p.name.toLowerCase()} из светлого дерева" width="600" height="650" loading="lazy"/><span class="product-number">0${i + 1}</span><span class="product-open">${diagonal}</span></div><div class="product-info"><div><h3>${p.name}</h3><p>${p.tag}</p></div><span>↗</span></div></button>`).join("")}</div>
      <p class="catalog-extra">Думаете о домике или бане? <button class="inline-link" data-quiz data-purpose="Домик или баня">Обсудим вашу идею ${arrow}</button></p>
    </section>

    <section class="help-strip section-wrap"><div class="help-icon" aria-hidden="true"><svg viewBox="0 0 48 48" fill="none" aria-hidden="true"><path d="M24 4v40M4 24h40M10 10l28 28M10 38l28-28" stroke="currentColor" stroke-width="4" stroke-linecap="round"/></svg></div><div><h3>Хороший участок начинается с вашей идеи.</h3><p>Необязательно знать модель или размеры. Расскажите, чего вам не хватает.</p></div><button class="button button-outline" data-quiz>Подобрать решение ${arrow}</button></section>

    <section class="approach section-space" id="approach" aria-labelledby="approach-title">
      <div class="approach-inner section-wrap"><div class="approach-copy"><p class="eyebrow">02 / НАШ ПОДХОД</p><h2 id="approach-title">Один участок.<br>Один <em>архитектурный</em><br>язык.</h2><p>Участок складывается постепенно. Сначала место для встреч, потом летняя кухня, затем — порядок в саду.</p><p>Пусть эти решения выглядят как части одной истории. Спокойные формы, натуральное дерево и детали, которые сочетаются между собой.</p><a class="text-link" href="#details">Из чего складывается Homini ${diagonal}</a><span class="approach-signature">Всё на своём месте.</span></div><div class="approach-visual"><img src="${imagePath("garden")}" alt="Архитектурная концепция: павильон и летняя кухня в едином стиле" width="1536" height="1024" loading="lazy"/><span class="image-label">Концепция благоустройства · визуализация</span><div class="material-tag"><span class="material-dot"></span><span>Тёплое дерево.<br>Спокойная архитектура.</span></div></div></div>
    </section>

    <section class="details section-wrap section-space" id="details" aria-labelledby="details-title"><div class="section-top"><p class="eyebrow">03 / ВНИМАНИЕ К ДЕТАЛЯМ</p></div><div class="section-heading"><h2 id="details-title">Красота — в том,<br><em>как всё устроено.</em></h2><p>Не только внешний вид.<br>Удобство, которое остаётся с вами каждый день.</p></div><div class="detail-grid"><article class="detail-card"><div class="detail-image wood-texture"><img src="${imagePath("wood")}" alt="Деревянная обшивка на визуализации хозблока" width="600" height="540" loading="lazy"/><span>01</span></div><h3>Материал с характером</h3><p>Фактура дерева задаёт настроение. Породу, покрытие и рекомендации по уходу согласуем под условия использования.</p></article><article class="detail-card"><div class="detail-image"><img src="${imagePath("joint")}" alt="Металлическое соединение деревянных элементов из приложенного макета" width="600" height="540" loading="lazy"/><span>02</span></div><h3>Честные детали</h3><p>Соединения, пропорции и аккуратные линии. Конструктивные решения уточняются для каждого типа постройки.</p></article><article class="detail-card"><div class="detail-image"><img src="${imagePath("living")}" alt="Визуализация летней кухни с местом для хранения дров и рабочей зоной" width="600" height="540" loading="lazy"/><span>03</span></div><h3>Место для жизни</h3><p>Где поставить стол, как подойти к грилю, куда убрать нужное. Начинаем с того, как вы будете пользоваться пространством.</p></article></div></section>

    <section class="budget section-wrap" aria-labelledby="budget-title"><div><p class="eyebrow">ПОНЯТНЫЙ СОСТАВ ПРОЕКТА</p><h2 id="budget-title">Сначала ясность.<br><em>Потом — стройка.</em></h2><p>Стоимость — это не только сама постройка.<br>Обсудим детали, чтобы вы понимали,<br>из чего складывается ваш бюджет.</p><button class="button button-dark" data-quiz>Подготовить запрос на расчёт ${arrow}</button></div><div class="estimate"><div class="estimate-top"><span>ВАШ ПРОЕКТ HOMINI</span><span>↗</span></div><h3>Всё по пунктам</h3><div class="estimate-row"><span><i>01</i> Постройка</span><span>Конструкция и размеры</span></div><div class="estimate-row"><span><i>02</i> Комплектация</span><span>Отделка и оснащение</span></div><div class="estimate-row"><span><i>03</i> Доставка</span><span>Маршрут до участка</span></div><div class="estimate-row"><span><i>04</i> Установка</span><span>Основание и монтаж</span></div><p>Точный состав и стоимость фиксируются<br>после согласования проекта.</p><span class="estimate-stamp">h.</span></div></section>

    <section class="process section-wrap section-space" id="process" aria-labelledby="process-title"><div class="section-top"><p class="eyebrow">04 / ПУТЬ К ВАШЕМУ ПРОСТРАНСТВУ</p></div><div class="section-heading"><h2 id="process-title">От «а что, если»<br><em>до «как же хорошо».</em></h2><p>Пять понятных шагов.<br>Детали и условия согласуем для вашего проекта.</p></div><ol class="steps"><li><span>01</span><h3>Ваша идея</h3><p>Что хотите построить, для кого и где находится участок.</p></li><li><span>02</span><h3>Своё решение</h3><p>Подбираем формат, обсуждаем размеры, отделку и опции.</p></li><li><span>03</span><h3>Понятный расчёт</h3><p>Согласуем комплектацию, состав работ и условия.</p></li><li><span>04</span><h3>Изготовление</h3><p>Уточняем сроки и порядок информирования о ходе работ.</p></li><li><span>05</span><h3>Место для жизни</h3><p>Согласуем доставку, установку и передачу результата.</p></li></ol></section>

    <section class="faq section-wrap section-space" id="faq" aria-labelledby="faq-title"><div class="faq-intro"><p class="eyebrow">05 / ЕСТЬ ВОПРОСЫ?</p><h2 id="faq-title">Давайте<br><em>разберёмся.</em></h2><p>Важное, о чём стоит поговорить<br>до начала вашего проекта.</p><button class="text-link" data-quiz>Задать свой вопрос ${diagonal}</button></div><div class="faq-list">${faqs.map(([q, a]) => `<details><summary>${q}<span class="faq-plus" aria-hidden="true"></span></summary><p>${a}</p></details>`).join("")}</div></section>

    <section class="contact section-wrap" id="contact" aria-labelledby="contact-title"><div class="contact-copy"><p class="eyebrow">С ЧЕГО НАЧНЁТСЯ ВАША ИСТОРИЯ?</p><h2 id="contact-title">В саду есть место<br><em>для вашей идеи.</em></h2><p>Расскажите, каким вы видите свой участок.<br>Начнём с задачи, а детали соберём вместе.</p><span class="contact-flower" aria-hidden="true"><svg viewBox="0 0 48 48" fill="none" aria-hidden="true"><path d="M24 4v40M4 24h40M10 10l28 28M10 38l28-28" stroke="currentColor" stroke-width="4" stroke-linecap="round"/></svg></span></div><form id="contact-form" class="contact-form"><label for="project-purpose">Что хотите построить?</label><select id="project-purpose" name="purpose" required><option value="" disabled selected>Выберите постройку</option>${["Летняя кухня", "Беседка", "Гриль-зона", "Хозблок", "Навес", "Постройка для техники", "Домик или баня", "Пока не определился"].map((p) => `<option>${p}</option>`).join("")}</select><label for="project-region">Где находится участок?</label><input id="project-region" name="region" placeholder="Область, населённый пункт" maxlength="160" required autocomplete="address-level2"/><label for="project-contact">Как с вами связаться?</label><input id="project-contact" name="contact" placeholder="Телефон, Telegram или email" maxlength="160" required/><label class="check-label"><input type="checkbox" name="local-processing" required/><span>Согласен использовать указанные данные для подготовки письма Homini. До отправки они остаются в моём браузере.</span></label><button class="button button-dark" type="submit">Подготовить заявку ${arrow}</button><p class="form-note">Подготовим письмо на ${contactEmail}. Проверьте текст и отправьте его в своём почтовом приложении.</p></form></section>
  </main>
  <footer class="footer section-wrap"><div class="footer-top"><a class="brand" href="#top" aria-label="Homini — в начало страницы">${logo}</a><p>Постройки, с которыми<br>на участке становится лучше.</p><a class="footer-email" href="mailto:${contactEmail}">${contactEmail} ${diagonal}</a><a class="footer-up" href="#top">Наверх ↑</a></div><div class="footer-bottom"><span>© ${new Date().getFullYear()} Homini</span><button class="subtle-link" id="privacy-button">О данных и визуализациях</button><span>Создаём место для жизни.</span></div></footer>

  <dialog id="product-dialog" class="product-dialog" aria-labelledby="product-title"><button class="dialog-close" data-close aria-label="Закрыть">×</button><div id="product-content"></div></dialog>
  <dialog id="quiz-dialog" class="quiz-dialog" aria-labelledby="quiz-title"><button class="dialog-close" data-close aria-label="Закрыть">×</button><div id="quiz-content"></div></dialog>
  <dialog id="result-dialog" class="result-dialog" aria-labelledby="result-title"><button class="dialog-close" data-close aria-label="Закрыть">×</button><p class="eyebrow">ПЕРВЫЙ ШАГ СДЕЛАН</p><h2 id="result-title">Ваша идея<br><em>уже в деталях.</em></h2><p class="result-explanation">Письмо подготовлено для ${contactEmail}. Откройте его в почтовом приложении, проверьте и отправьте. Если почта не настроена, скопируйте текст.</p><textarea id="request-text" aria-label="Текст подготовленной заявки" readonly rows="8"></textarea><a id="email-request" class="button button-dark">Открыть письмо ${arrow}</a><button id="copy-request" class="text-link">Скопировать заявку ${arrow}</button><p id="copy-status" role="status" aria-live="polite"></p><button id="download-request" class="text-link">Скачать текст заявки ↓</button></dialog>
  <dialog id="privacy-dialog" class="privacy-dialog" aria-labelledby="privacy-title"><button class="dialog-close" data-close aria-label="Закрыть">×</button><p class="eyebrow">ПРОЗРАЧНОСТЬ</p><h2 id="privacy-title">О сайте и данных</h2><p>Сайт представляет концепцию коллекции Homini. Изображения построек — визуализации, а не фотографии реализованных объектов. Итоговые характеристики, материалы, условия, цены и сроки необходимо согласовать отдельно.</p><p>Формы подготавливают текст письма только в вашем браузере. Сайт не отправляет данные на сервер и не сохраняет их в localStorage. Вы самостоятельно отправляете письмо на ${contactEmail} через свой почтовый сервис. Аналитика и рекламные cookies не используются. Для серверного приёма заявок потребуется отдельная политика обработки персональных данных с реквизитами оператора.</p><p>Визуализации каталога взяты из предоставленного макета. Изображение сада создано как архитектурная концепция.</p></dialog>
`;

// Dialogs retain native focus trapping and return focus to their trigger.
document.querySelectorAll("dialog").forEach((dialog) => {
  dialog
    .querySelector("[data-close]")
    .addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) {
      const r = dialog.getBoundingClientRect();
      if (
        event.clientX < r.left ||
        event.clientX > r.right ||
        event.clientY < r.top ||
        event.clientY > r.bottom
      )
        dialog.close();
    }
  });
  dialog.addEventListener("close", () => {
    if (!document.querySelector("dialog[open]"))
      document.body.classList.remove("dialog-open");
    if (dialog.id === "quiz-dialog") {
      quizData.contact = "";
      const field = dialog.querySelector('[name="contact"]');
      if (field) field.value = "";
    }
    if (dialog.id === "result-dialog") {
      document.querySelector("#request-text").value = "";
      document.querySelector("#email-request").removeAttribute("href");
    }
  });
});
function openDialog(id) {
  document.querySelector(`#${id}`).showModal();
  document.body.classList.add("dialog-open");
}
document
  .querySelector("#privacy-button")
  .addEventListener("click", () => openDialog("privacy-dialog"));

document.querySelectorAll("[data-filter]").forEach((button) =>
  button.addEventListener("click", () => {
    document.querySelectorAll("[data-filter]").forEach((b) => {
      const active = b === button;
      b.classList.toggle("active", active);
      b.setAttribute("aria-pressed", String(active));
    });
    document.querySelectorAll(".product-card").forEach((card) => {
      card.hidden =
        button.dataset.filter !== "all" &&
        card.dataset.group !== button.dataset.filter;
    });
  }),
);

const menuToggle = document.querySelector(".menu-toggle");
const mobileNav = document.querySelector("#mobile-nav");
function closeMenu() {
  mobileNav.hidden = true;
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Открыть меню");
}
menuToggle.addEventListener("click", () => {
  const open = menuToggle.getAttribute("aria-expanded") === "true";
  mobileNav.hidden = open;
  menuToggle.setAttribute("aria-expanded", String(!open));
  menuToggle.setAttribute("aria-label", open ? "Открыть меню" : "Закрыть меню");
});
mobileNav
  .querySelectorAll("a")
  .forEach((a) => a.addEventListener("click", closeMenu));
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeMenu();
});
window.matchMedia("(min-width: 961px)").addEventListener("change", (e) => {
  if (e.matches) closeMenu();
});

document.querySelectorAll("[data-product]").forEach((button) =>
  button.addEventListener("click", () => {
    const p = products.find((p) => p.id === button.dataset.product);
    document.querySelector("#product-content").innerHTML =
      `<div class="modal-product-image"><img src="${imagePath(p.image)}" alt="Визуализация: ${p.name}"/><span class="image-label">Визуализация</span></div><div class="modal-product-copy"><p class="eyebrow">КОЛЛЕКЦИЯ HOMINI</p><h2 id="product-title">${p.name}</h2><p>${p.description}</p><ul>${p.details.map((d) => `<li>${d}</li>`).join("")}</ul><div class="product-terms"><strong>Под ваш участок</strong><p>Размеры, комплектация, стоимость, основание, сроки и условия гарантии уточняются при расчёте. Изображение показывает концепцию.</p></div><button class="button button-dark" id="product-request">Обсудить это решение ${arrow}</button></div>`;
    document.querySelector("#product-request").addEventListener("click", () => {
      document.querySelector("#product-dialog").close();
      startQuiz(p.purpose);
    });
    openDialog("product-dialog");
  }),
);

let quizStep = 0;
let quizData = { purpose: "", region: "", contact: "" };
function escapeHtml(s) {
  return String(s).replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );
}
function startQuiz(purpose = "") {
  closeMenu();
  quizStep = 0;
  quizData = { purpose, region: "", contact: "" };
  renderQuiz();
  openDialog("quiz-dialog");
}
document
  .querySelectorAll("[data-quiz]")
  .forEach((button) =>
    button.addEventListener("click", () =>
      startQuiz(button.dataset.purpose || ""),
    ),
  );
function renderQuiz() {
  const purposes = [
    "Отдых и встречи",
    "Домик или баня",
    "Хранение",
    "Автомобиль и техника",
    "Пока не определился",
  ];
  const title = [
    "Что появится<br><em>на вашем участке?</em>",
    "Где начинается<br><em>ваша история?</em>",
    "Оставим место<br><em>для разговора.</em>",
  ][quizStep];
  document.querySelector("#quiz-content").innerHTML =
    `<p class="eyebrow">ПОДБОР РЕШЕНИЯ / 0${quizStep + 1} ИЗ 03</p><div class="quiz-progress"><span style="width:${((quizStep + 1) / 3) * 100}%"></span></div><h2 id="quiz-title">${title}</h2><p class="quiz-subtitle">${["Начнём со сценария. Размеры и материалы обсудим позже.", "Укажите область и населённый пункт — это поможет обсудить доставку.", "Укажите удобный способ связи. Затем подготовим письмо для Homini."][quizStep]}</p><form id="quiz-form">${quizStep === 0 ? `<fieldset class="purpose-options"><legend class="sr-only">Для чего нужна постройка?</legend>${[...new Set([...(quizData.purpose && !purposes.includes(quizData.purpose) ? [quizData.purpose] : []), ...purposes])].map((p) => `<label><input type="radio" name="purpose" value="${escapeHtml(p)}" ${quizData.purpose === p ? "checked" : ""} required/><span>${escapeHtml(p)} ${diagonal}</span></label>`).join("")}</fieldset>` : quizStep === 1 ? `<label class="field-label" for="quiz-region">Местоположение участка</label><input id="quiz-region" name="region" placeholder="Например, Московская область, Истра" autocomplete="address-level2" maxlength="160" value="${escapeHtml(quizData.region)}" required/>` : `<label class="field-label" for="quiz-contact">Телефон, Telegram или email</label><input id="quiz-contact" name="contact" placeholder="Как с вами связаться?" maxlength="160" value="${escapeHtml(quizData.contact)}" required/><label class="check-label"><input type="checkbox" required/><span>Понимаю, что письмо нужно проверить и отправить в моём почтовом приложении.</span></label>`}<div class="quiz-actions">${quizStep ? '<button type="button" id="quiz-back" class="back-button">← Назад</button>' : '<span class="quiz-time">Всего три простых шага</span>'}<button type="submit" class="button button-dark">${quizStep === 2 ? "Подготовить заявку" : "Дальше"} ${arrow}</button></div></form>`;
  const form = document.querySelector("#quiz-form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(form);
    if (quizStep === 0) quizData.purpose = data.get("purpose");
    if (quizStep === 1) quizData.region = data.get("region").trim();
    if (quizStep === 2) {
      quizData.contact = data.get("contact").trim();
      if (!validateContact(form.querySelector('[name="contact"]'))) return;
      const request = { ...quizData };
      document.querySelector("#quiz-dialog").close();
      showRequest(request);
      return;
    }
    if (
      quizStep === 1 &&
      !validateNonBlank(form.querySelector('[name="region"]'))
    )
      return;
    quizStep++;
    renderQuiz();
    document.querySelector("#quiz-title").setAttribute("tabindex", "-1");
    document.querySelector("#quiz-title").focus();
  });
  document.querySelector("#quiz-back")?.addEventListener("click", () => {
    if (quizStep === 1) quizData.region = form.elements.region.value;
    else quizData.contact = form.elements.contact.value;
    quizStep--;
    renderQuiz();
  });
  form
    .querySelectorAll("input")
    .forEach((input) =>
      input.addEventListener("input", () => input.setCustomValidity("")),
    );
}
function validateNonBlank(input) {
  input.setCustomValidity(input.value.trim() ? "" : "Заполните это поле.");
  return input.reportValidity();
}
function validateContact(input) {
  const value = input.value.trim();
  const valid =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ||
    /^@[A-Za-z][A-Za-z0-9_]{4,31}$/.test(value) ||
    /^https:\/\/(t\.me|telegram\.me)\/[A-Za-z][A-Za-z0-9_]{4,31}\/?$/.test(
      value,
    ) ||
    (/^[+\d\s()\-]+$/.test(value) &&
      value.replace(/\D/g, "").length >= 10 &&
      value.replace(/\D/g, "").length <= 15);
  input.setCustomValidity(
    valid
      ? ""
      : "Укажите телефон с кодом страны, email или Telegram в формате @username.",
  );
  return input.reportValidity();
}
const contactForm = document.querySelector("#contact-form");
contactForm
  .querySelectorAll("input")
  .forEach((input) =>
    input.addEventListener("input", () => input.setCustomValidity("")),
  );
contactForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (
    !validateNonBlank(contactForm.elements.region) ||
    !validateContact(contactForm.elements.contact)
  )
    return;
  const data = new FormData(contactForm);
  showRequest({
    purpose: data.get("purpose"),
    region: data.get("region").trim(),
    contact: data.get("contact").trim(),
  });
  contactForm.reset();
});
function showRequest(data) {
  document.querySelector("#request-text").value =
    `Здравствуйте! Хочу обсудить проект Homini.\n\nПостройка / задача: ${data.purpose}\nУчасток: ${data.region}\nСвязь со мной: ${data.contact}\n\nПрошу уточнить варианты, комплектацию, стоимость, доставку, установку, сроки и гарантию.`;
  document.querySelector("#email-request").href =
    "mailto:" +
    contactEmail +
    "?subject=" +
    encodeURIComponent("Проект Homini — " + data.purpose) +
    "&body=" +
    encodeURIComponent(document.querySelector("#request-text").value);
  document.querySelector("#copy-status").textContent = "";
  openDialog("result-dialog");
}
document.querySelector("#copy-request").addEventListener("click", async () => {
  const area = document.querySelector("#request-text");
  try {
    await navigator.clipboard.writeText(area.value);
    document.querySelector("#copy-status").textContent =
      `Заявка скопирована. Отправьте её на ${contactEmail}.`;
  } catch {
    area.focus();
    area.select();
    document.querySelector("#copy-status").textContent =
      "Текст выделен. Скопируйте его вручную или скачайте файл.";
  }
});
document.querySelector("#download-request").addEventListener("click", () => {
  const blob = new Blob([document.querySelector("#request-text").value], {
    type: "text/plain;charset=utf-8",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "homini-project.txt";
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
});
