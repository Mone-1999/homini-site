import { test, expect } from "@playwright/test";

test("страница загружается без ошибок, все локальные изображения доступны", async ({
  page,
}) => {
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  const failedResponses = [];
  page.on("response", (response) => {
    if (response.status() >= 400) failedResponses.push(response.url());
  });
  await page.goto("/");
  await expect(page).toHaveTitle(/Homini/);
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "На участке",
  );
  for (const image of await page.locator("main img:visible").all()) {
    await image.scrollIntoViewIfNeeded();
    await expect
      .poll(() => image.evaluate((img) => img.complete && img.naturalWidth > 0))
      .toBe(true);
  }
  expect(errors).toEqual([]);
  expect(failedResponses).toEqual([]);
});

test("фильтры показывают соответствующие постройки", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator(".product-card:visible")).toHaveCount(8);
  await page.getByRole("button", { name: "Для отдыха", exact: true }).click();
  await expect(page.locator(".product-card:visible")).toHaveCount(5);
  await expect(
    page.getByRole("button", { name: "Подробнее: Хозблоки" }),
  ).toBeHidden();
  await page.getByRole("button", { name: "Для порядка", exact: true }).click();
  await expect(page.locator(".product-card:visible")).toHaveCount(3);
  await expect(
    page.getByRole("button", { name: "Подробнее: Хозблоки" }),
  ).toBeVisible();
  await page.getByRole("button", { name: /Все постройки/ }).click();
  await expect(page.locator(".product-card:visible")).toHaveCount(8);
});

test("карточка открывается с клавиатуры и возвращает фокус после Escape", async ({
  page,
}) => {
  await page.goto("/");
  const trigger = page.getByRole("button", { name: "Подробнее: Летние кухни" });
  await trigger.focus();
  await page.keyboard.press("Enter");
  const dialog = page.locator("#product-dialog");
  await expect(dialog).toBeVisible();
  await expect(dialog.getByRole("heading")).toHaveText("Летние кухни");
  await expect(dialog).toContainText("стоимость");
  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
  await expect(trigger).toBeFocused();
});

test("детский домик и качели открываются и передают выбор в подбор", async ({
  page,
}) => {
  await page.goto("/");
  for (const [category, purpose] of [
    ["Детские домики", "Детский домик"],
    ["Качели", "Качели"],
  ]) {
    await page
      .getByRole("button", { name: `Подробнее: ${category}`, exact: true })
      .click();
    const dialog = page.locator("#product-dialog");
    await expect(dialog.getByRole("heading")).toHaveText(category);
    await expect
      .poll(() =>
        dialog
          .locator("img")
          .evaluate((img) => img.complete && img.naturalWidth > 0),
      )
      .toBe(true);
    await dialog.getByRole("button", { name: "Обсудить это решение" }).click();
    await expect(
      page.getByRole("radio", { name: purpose, exact: true }),
    ).toBeChecked();
    await page.keyboard.press("Escape");
    await expect(
      page
        .locator("#contact-form")
        .getByRole("option", { name: purpose, exact: true }),
    ).toHaveCount(1);
  }
});

test("подбор из карточки сохраняет выбор и готовит письмо без отправки", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Подробнее: Летние кухни" }).click();
  await page.getByRole("button", { name: "Обсудить это решение" }).click();
  await expect(
    page.getByRole("radio", { name: "Летняя кухня", exact: true }),
  ).toBeChecked();
  await page.getByRole("button", { name: "Дальше", exact: true }).click();
  await page
    .getByLabel("Местоположение участка")
    .fill("Калужская область, Таруса");
  await page.getByRole("button", { name: "Дальше", exact: true }).click();
  await page.getByRole("button", { name: "Назад" }).click();
  await expect(page.getByLabel("Местоположение участка")).toHaveValue(
    "Калужская область, Таруса",
  );
  await page.getByRole("button", { name: "Дальше", exact: true }).click();
  await page
    .getByLabel("Телефон, Telegram или email", { exact: true })
    .fill("@homini_client");
  await page.locator('#quiz-form input[type="checkbox"]').check();
  await page
    .locator("#quiz-form")
    .getByRole("button", { name: "Подготовить заявку" })
    .click();
  await expect(page.locator("#result-dialog")).toBeVisible();
  await expect(page.getByLabel("Текст подготовленной заявки")).toHaveValue(
    /Летняя кухня/,
  );
  const href = await page
    .getByRole("link", { name: "Открыть письмо" })
    .getAttribute("href");
  expect(href).toMatch(/^mailto:sokolov.design@gmail.com\?/);
  const params = new URLSearchParams(href.split("?")[1]);
  expect(params.get("body")).toContain("Калужская область, Таруса");
  expect(params.get("body")).toContain("@homini_client");
  await page.locator("#result-dialog [data-close]").click();
  await expect(page.getByLabel("Текст подготовленной заявки")).toHaveValue("");
  expect(await page.locator("#email-request").getAttribute("href")).toBeNull();
});

test("форма проверяет контакт и создаёт скачиваемую заявку", async ({
  page,
}) => {
  await page.goto("/");
  const form = page.locator("#contact-form");
  await form.getByLabel("Что хотите построить?").selectOption("Хозблок");
  await form.getByLabel("Где находится участок?").fill("Истра");
  await form.getByLabel("Как с вами связаться?").fill("неверный контакт");
  await form.locator('input[type="checkbox"]').check();
  await form.getByRole("button", { name: "Подготовить заявку" }).click();
  await expect(page.locator("#result-dialog")).not.toBeVisible();
  expect(
    await form.locator('[name="contact"]').evaluate((el) => el.validity.valid),
  ).toBe(false);
  await form.getByLabel("Как с вами связаться?").fill("client@example.com");
  await form.getByRole("button", { name: "Подготовить заявку" }).click();
  await expect(page.getByLabel("Текст подготовленной заявки")).toHaveValue(
    /Хозблок[\s\S]*Истра[\s\S]*client@example.com/,
  );
  const downloadPromise = page.waitForEvent("download");
  await page.getByRole("button", { name: "Скачать текст заявки" }).click();
  const download = await downloadPromise;
  expect(download.suggestedFilename()).toBe("homini-project.txt");
  expect(await download.failure()).toBeNull();
});

test("FAQ раскрывается, примечание о данных открывается", async ({ page }) => {
  await page.goto("/");
  const summary = page.locator("summary").first();
  await summary.click();
  await expect(page.locator("details").first()).toHaveAttribute("open", "");
  await expect(page.locator("details").first().locator("p")).toBeVisible();
  await page.getByRole("button", { name: "О данных и визуализациях" }).click();
  await expect(page.locator("#privacy-dialog")).toBeVisible();
  await expect(page.locator("#privacy-dialog")).toContainText(
    "sokolov.design@gmail.com",
  );
});

test("мобильное меню работает и закрывается при выборе раздела", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.getByRole("button", { name: "Открыть меню" }).click();
  await expect(page.locator("#mobile-nav")).toBeVisible();
  await page
    .locator("#mobile-nav")
    .getByRole("link", { name: "Каталог" })
    .click();
  await expect(page.locator("#mobile-nav")).not.toBeVisible();
  await expect(page).toHaveURL(/#catalog$/);
  await page.getByRole("button", { name: "Открыть меню" }).click();
  await page
    .locator("#mobile-nav")
    .getByRole("button", { name: "Обсудить проект" })
    .click();
  await expect(page.locator("#mobile-nav")).not.toBeVisible();
  await expect(page.locator("#quiz-dialog")).toBeVisible();
});

for (const width of [320, 390, 768, 1024, 1440]) {
  test(`адаптивная вёрстка без горизонтального скролла: ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    await page.evaluate(() => document.fonts.ready);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    await page.getByRole("button", { name: "Подробнее: Беседки" }).click();
    const box = await page.locator("#product-dialog").boundingBox();
    expect(box.x).toBeGreaterThanOrEqual(0);
    expect(box.x + box.width).toBeLessThanOrEqual(width);
    await page.keyboard.press("Escape");
    if (width <= 390) {
      await page.getByRole("button", { name: "Открыть меню" }).click();
      await page
        .locator("#mobile-nav")
        .getByRole("button", { name: "Обсудить проект" })
        .click();
    } else {
      await page.locator(".help-strip [data-quiz]").click();
    }
    const quiz = await page.locator("#quiz-dialog").boundingBox();
    expect(quiz.x).toBeGreaterThanOrEqual(0);
    expect(quiz.x + quiz.width).toBeLessThanOrEqual(width);
  });
}
