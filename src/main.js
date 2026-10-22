import "@fontsource-variable/inter/opsz.css";
import "./style.css";
import { products } from "./data.js";
import { contactEmail } from "./config.js";
import { arrow, diagonal } from "./icons.js";
import { renderPage } from "./layout.js";
import { initCarousel } from "./carousel.js";
const imagePath = (name) => `${import.meta.env.BASE_URL}images/${name}.webp`;
document.querySelector("#app").innerHTML = renderPage();
initCarousel(document.querySelector(".hero-visual"));

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
    "Игры на участке",
    "Домик или баня",
    "Хранение",
    "Автомобиль и техника",
    "Пока не определился",
  ];
  const title = [
    "Что появится<br>на вашем участке?",
    "Где начинается<br>ваша история?",
    "Оставим место<br>для разговора.",
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
