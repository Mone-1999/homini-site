import { products, projectPurposes, faqs } from "./data.js";
import { contactEmail } from "./config.js";
import { arrow, diagonal, icon } from "./icons.js";

const imagePath = (name) => `${import.meta.env.BASE_URL}images/${name}.webp`;
const assetPath = (name) => `${import.meta.env.BASE_URL}images/${name}`;
const slides = [
  {
    image: "banner-garden",
    width: 1774,
    height: 887,
    name: "Общий участок",
    caption: "Один участок. Одна история.",
    alt: "Визуализация участка с летней кухней, беседкой и хозблоком",
  },
  {
    image: "kitchen-garden-study",
    width: 1536,
    height: 1024,
    name: "Летняя кухня",
    caption: "Летняя кухня. Больше поводов собраться.",
    alt: "Летняя кухня с чёрными коннекторами в саду",
  },
  {
    image: "gazebo-garden-study",
    width: 1536,
    height: 1024,
    name: "Беседка",
    caption: "Беседка. Свой ритм отдыха.",
    alt: "Беседка из светлого дерева в саду",
  },
];
const navLinks = `<a href="#catalog">Каталог</a><a href="#details">Детали</a><a href="#process">Как заказать</a><a href="#faq">Вопросы</a>`;

function renderCarousel() {
  return `<div class="hero-visual" tabindex="0" role="region" aria-roledescription="карусель" aria-label="Постройки Homini">
    <div class="slider-stage" aria-label="Изображения построек">
      <div class="slider-track">${slides
        .map(
          (slide, i) => `
        <div class="slide" id="slide-${i + 1}" role="group" aria-roledescription="слайд" aria-label="${i + 1} из ${slides.length}" aria-hidden="${i !== 0}" ${i ? "inert" : ""} data-caption="${slide.caption}">
          <img src="${imagePath(slide.image)}" ${i ? 'loading="lazy"' : 'fetchpriority="high"'} decoding="async" draggable="false" alt="${slide.alt}" width="${slide.width}" height="${slide.height}">
        </div>`,
        )
        .join("")}
      </div>
      <span class="caption">Архитектурные визуализации</span>
    </div>
    <div class="slider-bottom">
      <div role="status" aria-live="polite" aria-atomic="true"><p class="slide-count" id="slide-count">01 / 03</p><p class="slide-caption" id="slide-caption">${slides[0].caption}</p></div>
      <div class="slider-buttons"><button id="previous-slide" aria-label="Предыдущий слайд">${icon("previous")}</button><button id="next-slide" aria-label="Следующий слайд">${arrow}</button></div>
    </div>
    <div class="slider-dots" role="group" aria-label="Выбрать слайд">${slides.map((slide, i) => `<button class="slider-dot" data-slide="${i}" aria-controls="slide-${i + 1}" aria-label="Слайд ${i + 1} — ${slide.name}" aria-pressed="${i === 0}"><span></span></button>`).join("")}</div>
  </div>`;
}

function renderCatalog() {
  return `<section class="catalog wrap" id="catalog" aria-labelledby="catalog-title">
    <div class="section-heading"><div><p class="eyebrow">Коллекция Homini</p><h2 id="catalog-title">Своё место.<br>Для каждого дня.</h2></div><p>Готовить, отдыхать и хранить нужное.<br>Выберите, с чего начнётся ваш участок.</p></div>
    <div class="catalog-filter" role="group" aria-label="Фильтр каталога">
      <button class="active" data-filter="all" aria-pressed="true">Все постройки <span>${String(products.length).padStart(2, "0")}</span></button>
      <button data-filter="rest" aria-pressed="false">Для отдыха</button><button data-filter="order" aria-pressed="false">Для порядка</button>
      <span class="filter-note">Визуализации · комплектация обсуждается</span>
    </div>
    <p class="sr-only" id="catalog-status" role="status" aria-live="polite">Показано построек: ${products.length}</p>
    <div class="product-grid">${products
      .map(
        (p) => `
      <button class="product-card" data-product="${p.id}" data-group="${p.group}" aria-label="Подробнее: ${p.name}">
        <span class="card-image"><img src="${imagePath(p.image)}" alt="Визуализация: ${p.name}" width="1254" height="1254" loading="lazy" decoding="async"><span class="card-arrow">${diagonal}</span></span>
        <span class="product-name">${p.name}</span><span class="product-tag">${p.tag}</span>
      </button>`,
      )
      .join("")}</div>
  </section>`;
}

function renderDetails() {
  return `<section class="details-section" id="details" aria-labelledby="details-title">
    <div class="detail-copy"><p class="eyebrow">Характер Homini — в деталях</p><h2 id="details-title">Продумано<br>до соединения.</h2><p>Светлое дерево и чёрный металл. Одна узнаваемая деталь связывает постройки в целую коллекцию.</p>
      <ul class="detail-list"><li>${icon("joint")}<div><h3>Выразительный узел</h3><p>Открытые соединения становятся частью архитектуры.</p></div></li><li>${icon("leaf")}<div><h3>Естественная фактура</h3><p>Дерево задаёт тёплый тон, металл подчёркивает линии.</p></div></li></ul>
      <button class="text-link" data-quiz>Обсудить комплектацию ${arrow}</button>
    </div>
    <figure class="detail-picture"><img src="${imagePath("connector-detail")}" alt="Визуализация: металлический коннектор в соединении деревянных балок" width="1254" height="1254" loading="lazy" decoding="async"><figcaption class="caption">Визуализация соединения</figcaption></figure>
  </section>`;
}

function renderApproach() {
  return `<section class="approach wrap" id="approach" aria-labelledby="approach-title">
    <div class="approach-picture"><img src="${imagePath("gazebo-garden-study")}" alt="Визуализация беседки Homini в саду" width="1536" height="1024" loading="lazy" decoding="async"><span class="caption">Концепция участка · визуализация</span></div>
    <div class="approach-copy"><p class="eyebrow">Один архитектурный язык</p><h2 id="approach-title">Участок растёт.<br>История продолжается.</h2><p>Сегодня — беседка для долгих разговоров. Потом — летняя кухня и место для хранения. Начните с нужного, сохраняя общее настроение сада.</p><button class="text-link" data-quiz>Обсудить мой участок ${arrow}</button></div>
  </section>`;
}

export function renderPage() {
  return `<a class="skip-link" href="#main">К содержимому</a>
  <header class="header wrap" id="top">
    <a class="brand" href="#top" aria-label="Homini — на главную"><img class="logo-image" src="${assetPath("logo.svg")}" alt="Homini" width="137" height="33"></a>
    <nav class="desktop-nav" aria-label="Основная навигация">${navLinks}</nav>
    <button class="button header-cta" data-quiz>Обсудить проект</button>
    <button class="menu-toggle" aria-label="Открыть меню" aria-expanded="false" aria-controls="mobile-nav"><span></span><span></span></button>
  </header>
  <nav class="mobile-nav wrap" id="mobile-nav" aria-label="Мобильная навигация" hidden>${navLinks}<button data-quiz>Обсудить проект ${diagonal}</button></nav>
  <main id="main" tabindex="-1">
    <section class="hero" aria-labelledby="hero-title"><div class="hero-copy"><p class="eyebrow">Homini · жизнь за городом</p><h1 id="hero-title">Постройки<br>для жизни<br>за городом.</h1><p>Летние кухни, беседки и&nbsp;хозяйственные решения. Один стиль для&nbsp;всего участка.</p><div class="actions"><a class="button" href="#catalog">Смотреть каталог</a><button class="text-link" data-quiz>Обсудить проект ${arrow}</button></div></div>${renderCarousel()}</section>
    ${renderCatalog()}
    ${renderDetails()}
    <section class="help-strip wrap"><div><h3>Начнём с вашей идеи.</h3><p>Необязательно сразу знать модель и размеры. Расскажите, чего не хватает вашему участку.</p></div><button class="button" data-quiz>Подобрать решение ${arrow}</button></section>
    ${renderApproach()}
    <section class="budget wrap" aria-labelledby="budget-title"><div class="budget-copy"><p class="eyebrow">Понятный состав проекта</p><h2 id="budget-title">Сначала ясность.<br>Потом — стройка.</h2><p>Обсудим постройку, оснащение и работы. Чтобы вы понимали, из чего складывается ваш бюджет.</p><button class="text-link" data-quiz>Обсудить расчёт ${arrow}</button></div><div class="estimate"><p class="eyebrow">Ваш проект Homini</p><h3>Всё по пунктам</h3><dl><div><dt>01 · Постройка</dt><dd>Конструкция и размеры</dd></div><div><dt>02 · Комплектация</dt><dd>Отделка и оснащение</dd></div><div><dt>03 · Доставка</dt><dd>Маршрут до участка</dd></div><div><dt>04 · Установка</dt><dd>Основание и монтаж</dd></div></dl><p>Точный состав и стоимость фиксируются после согласования проекта.</p></div></section>
    <section class="process wrap" id="process" aria-labelledby="process-title"><div class="section-heading"><div><p class="eyebrow">Как мы работаем</p><h2 id="process-title">От идеи —<br>к своему месту в саду.</h2></div><p>Пять шагов до вашего решения.<br>Детали и условия согласуем вместе.</p></div><ol class="five-steps"><li><span class="num" aria-hidden="true">01</span><h3>Ваша идея</h3><p>Обсуждаем задачу и расположение участка.</p></li><li><span class="num" aria-hidden="true">02</span><h3>Подбор решения</h3><p>Выбираем формат, размеры и комплектацию.</p></li><li><span class="num" aria-hidden="true">03</span><h3>Понятный расчёт</h3><p>Согласуем состав проекта, работы и условия.</p></li><li><span class="num" aria-hidden="true">04</span><h3>Изготовление</h3><p>Уточняем сроки и порядок информирования.</p></li><li><span class="num" aria-hidden="true">05</span><h3>Доставка и установка</h3><p>Согласуем подготовку места и передачу результата.</p></li></ol></section>
    <section class="faq wrap" id="faq" aria-labelledby="faq-title"><div class="faq-intro"><p class="eyebrow">Важное до начала проекта</p><h2 id="faq-title">Давайте<br>разберёмся.</h2><button class="text-link" data-quiz>Задать свой вопрос ${arrow}</button></div><div class="faq-list">${faqs.map(([question, answer]) => `<details><summary>${question}<span class="faq-plus" aria-hidden="true"></span></summary><p>${answer}</p></details>`).join("")}</div></section>
    <section class="contact wrap" id="contact" aria-labelledby="contact-title"><div class="contact-copy"><p class="eyebrow">С чего начнётся ваша история?</p><h2 id="contact-title">Есть идея?<br>Давайте обсудим.</h2><p>Расскажите, что хотите построить и где находится участок. Детали соберём вместе.</p><a class="contact-email" href="mailto:${contactEmail}">${contactEmail} ${diagonal}</a></div>
      <form id="contact-form" class="contact-form">
        <div class="field"><label for="project-purpose">Что хотите построить?</label><select id="project-purpose" name="purpose" required><option value="" disabled selected>Выберите постройку</option>${projectPurposes.map((p) => `<option>${p}</option>`).join("")}</select></div>
        <div class="field"><label for="project-region">Где находится участок?</label><input id="project-region" name="region" placeholder="Область, населённый пункт" maxlength="160" required autocomplete="address-level2"></div>
        <div class="field"><label for="project-contact">Как с вами связаться?</label><input id="project-contact" name="contact" placeholder="Телефон, @telegram или email" maxlength="160" required aria-describedby="contact-hint"><p class="field-hint" id="contact-hint">Например, +7 999 123-45-67 или name@mail.ru</p></div>
        <div class="check-field"><label class="check-label"><input type="checkbox" name="local-processing" required><span>Согласен использовать указанные данные для подготовки письма Homini. До отправки они остаются в моём браузере.</span></label></div>
        <button class="button button-dark" type="submit">Подготовить заявку ${arrow}</button><p class="form-note">Подготовим текст письма. Вы проверите его и отправите через свою почту.</p>
      </form>
    </section>
  </main>
  <footer class="footer"><div class="wrap"><div class="footer-top"><a href="#top" class="footer-logo" aria-label="Homini — в начало страницы"><img class="logo-image" src="${assetPath("logo-white.svg")}" alt="Homini" width="137" height="33"></a><div><h3>Коллекция</h3><a href="#catalog">Постройки</a><a href="#details">Детали</a><button class="footer-link" data-quiz>Подбор решения</button></div><div><h3>О Homini</h3><a href="#approach">Наш подход</a><a href="#process">Как заказать</a><a href="#faq">Вопросы</a></div><div><h3>Связаться</h3><a href="mailto:${contactEmail}">${contactEmail}</a><button class="footer-link" data-quiz>Обсудить проект</button></div></div><div class="footer-bottom"><span>© ${new Date().getFullYear()} Homini · Постройки для загородной жизни</span><button class="subtle-link" id="privacy-button">О данных и визуализациях</button><a href="#top" class="footer-up">Наверх ${icon("previous")}</a></div></div></footer>
  <dialog id="product-dialog" class="product-dialog" aria-labelledby="product-title"><button class="dialog-close" data-close aria-label="Закрыть">×</button><div id="product-content"></div></dialog>
  <dialog id="quiz-dialog" class="quiz-dialog" aria-labelledby="quiz-title"><button class="dialog-close" data-close aria-label="Закрыть">×</button><div id="quiz-content"></div></dialog>
  <dialog id="result-dialog" class="result-dialog" aria-labelledby="result-title"><button class="dialog-close" data-close aria-label="Закрыть">×</button><p class="eyebrow">Можно переходить к деталям</p><h2 id="result-title">Ваша идея<br>уже в письме.</h2><p class="result-explanation">Письмо подготовлено для ${contactEmail}. Откройте его в почтовом приложении, проверьте и отправьте. Если почта не настроена, скопируйте текст.</p><textarea id="request-text" aria-label="Текст подготовленной заявки" readonly rows="8"></textarea><a id="email-request" class="button button-dark">Открыть письмо ${arrow}</a><button id="copy-request" class="text-link">Скопировать заявку ${arrow}</button><p id="copy-status" role="status" aria-live="polite"></p><button id="download-request" class="text-link">Скачать текст заявки ↓</button></dialog>
  <dialog id="privacy-dialog" class="privacy-dialog" aria-labelledby="privacy-title"><button class="dialog-close" data-close aria-label="Закрыть">×</button><p class="eyebrow">Открыто о важном</p><h2 id="privacy-title">О сайте и данных</h2><p>Сайт представляет концепцию коллекции Homini. Изображения построек — визуализации, а не фотографии реализованных объектов. Итоговые характеристики, материалы, условия, цены и сроки необходимо согласовать отдельно.</p><p>Формы подготавливают текст письма только в вашем браузере. Сайт не отправляет данные на сервер и не сохраняет их в localStorage. Вы самостоятельно отправляете письмо на ${contactEmail} через свой почтовый сервис. Аналитика и рекламные cookies не используются. Для серверного приёма заявок потребуется отдельная политика обработки персональных данных с реквизитами оператора.</p><p>Изображения созданы как визуализации по предоставленным референсам построек и чёрных коннекторов Homini. Общий вид сада показывает архитектурную концепцию.</p></dialog>`;
}
