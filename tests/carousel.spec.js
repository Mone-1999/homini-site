import { test, expect } from "@playwright/test";

test("слайдер переключается стрелками, индикаторами и по кругу", async ({
  page,
}) => {
  await page.goto("/");
  const heading = await page.getByRole("heading", { level: 1 }).textContent();
  const next = page.getByRole("button", { name: "Следующий слайд" });
  const previous = page.getByRole("button", { name: "Предыдущий слайд" });
  await expect(page.locator("#slide-count")).toHaveText("01 / 03");
  for (const count of ["02 / 03", "03 / 03", "01 / 03"]) {
    await next.click();
    await expect(page.locator("#slide-count")).toHaveText(count);
    await expect(page.locator(".slide:visible")).toHaveCount(1);
    await expect
      .poll(() =>
        page
          .locator(".slide:visible img")
          .evaluate((img) => img.complete && img.naturalWidth > 0),
      )
      .toBe(true);
  }
  await previous.click();
  await expect(page.locator("#slide-count")).toHaveText("03 / 03");
  await page
    .getByRole("button", { name: "Слайд 2 — Летняя кухня", exact: true })
    .click();
  await expect(page.locator("#slide-count")).toHaveText("02 / 03");
  await expect(page.locator("#slide-caption")).toContainText("Летняя кухня");
  await expect(
    page.getByRole("button", { name: "Слайд 2 — Летняя кухня", exact: true }),
  ).toHaveAttribute("aria-pressed", "true");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(heading);
});

test("слайдер доступен с клавиатуры и не перелистывается сам", async ({
  page,
}) => {
  await page.clock.install();
  await page.goto("/");
  const carousel = page.getByRole("region", { name: "Постройки Homini" });
  await carousel.focus();
  await page.keyboard.press("ArrowRight");
  await expect(page.locator("#slide-count")).toHaveText("02 / 03");
  await page.keyboard.press("End");
  await expect(page.locator("#slide-count")).toHaveText("03 / 03");
  await page.keyboard.press("Home");
  await expect(page.locator("#slide-count")).toHaveText("01 / 03");
  await page.clock.fastForward(60000);
  await expect(page.locator("#slide-count")).toHaveText("01 / 03");
});

test("жест переключает изображение, вертикальное движение сохраняет слайд", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const stage = page.locator(".slider-stage");
  await stage.scrollIntoViewIfNeeded();
  const box = await stage.boundingBox();
  const y = box.y + box.height / 2;
  await page.mouse.move(box.x + box.width - 45, y);
  await page.mouse.down();
  await page.mouse.move(box.x + 45, y, { steps: 10 });
  await page.mouse.up();
  await expect(page.locator("#slide-count")).toHaveText("02 / 03");
  await page.mouse.move(box.x + box.width / 2, y - 40);
  await page.mouse.down();
  await page.mouse.move(box.x + box.width / 2 + 5, y + 40, { steps: 5 });
  await page.mouse.up();
  await expect(page.locator("#slide-count")).toHaveText("02 / 03");
});

test("загружаются Inter и разные версии логотипа для шапки и подвала", async ({
  page,
}) => {
  const failed = [];
  page.on("response", (r) => {
    if (r.status() >= 400) failed.push(r.url());
  });
  await page.goto("/");
  await page.evaluate(() => document.fonts.ready);
  expect(
    await page
      .getByRole("heading", { level: 1 })
      .evaluate((el) => getComputedStyle(el).fontFamily),
  ).toContain("Inter Variable");
  for (const selector of [".brand img", ".footer-logo img"]) {
    const image = page.locator(selector);
    await image.scrollIntoViewIfNeeded();
    await expect
      .poll(() => image.evaluate((img) => img.complete && img.naturalWidth > 0))
      .toBe(true);
  }
  const url = await page.locator(".footer-logo img").getAttribute("src");
  const svg = await (await page.request.get(url)).text();
  expect(svg).toContain('fill="white"');
  expect(svg).toContain("#FF3B36");
  expect(failed).toEqual([]);
});

test("при уменьшении движения анимация слайда отключена", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page.getByRole("button", { name: "Следующий слайд" }).click();
  await expect(page.locator("#slide-count")).toHaveText("02 / 03");
  expect(
    await page
      .locator(".slide:visible")
      .evaluate((el) => getComputedStyle(el).animationName),
  ).toBe("none");
});
