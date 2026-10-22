const isContact = (value) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ||
  /^@[A-Za-z][A-Za-z0-9_]{4,31}$/.test(value) ||
  /^https:\/\/(t\.me|telegram\.me)\/[A-Za-z][A-Za-z0-9_]{4,31}\/?$/.test(
    value,
  ) ||
  (/^[+\d\s()\-]+$/.test(value) &&
    value.replace(/\D/g, "").length >= 10 &&
    value.replace(/\D/g, "").length <= 15);

// Native constraints remain the source of validity; messages are visible in-page.
export function bindValidation(form) {
  form.noValidate = true;
  const touched = new Set();
  const controls = [...form.querySelectorAll("input, select")];
  const fields = controls.filter(
    (field, i) =>
      field.type !== "radio" ||
      controls.findIndex((other) => other.name === field.name) === i,
  );
  const primary = (field) =>
    field.type === "radio"
      ? fields.find((other) => other.name === field.name)
      : field;

  function validate(control) {
    const field = primary(control);
    field.setCustomValidity("");
    let message = "";
    if (field.type === "checkbox" && !field.checked)
      message = "Подтвердите согласие, чтобы подготовить письмо.";
    else if (field.validity.valueMissing)
      message =
        field.name === "purpose"
          ? "Выберите, что хотите построить."
          : "Заполните это поле.";
    else if (field.name === "region" && !field.value.trim())
      message = "Укажите область и населённый пункт.";
    else if (field.name === "contact" && !isContact(field.value.trim()))
      message = "Укажите телефон, email или @username.";
    else if (!field.validity.valid) message = "Проверьте значение в этом поле.";
    field.setCustomValidity(message);
    const container = field.closest(".field, .check-field, fieldset");
    const id = `${form.id}-${field.name || field.id || "consent"}-error`;
    let error = document.getElementById(id);
    if (!error) {
      error = document.createElement("p");
      error.id = id;
      error.className = "field-error";
      error.setAttribute("aria-live", "polite");
      container.append(error);
    }
    if (error) error.textContent = message;
    const related =
      field.type === "radio"
        ? controls.filter((other) => other.name === field.name)
        : [field];
    related.forEach((input) => {
      const ids = (input.getAttribute("aria-describedby") || "")
        .split(/\s+/)
        .filter((value) => value && value !== id);
      if (message) {
        input.setAttribute("aria-invalid", "true");
        ids.push(id);
      } else input.removeAttribute("aria-invalid");
      if (ids.length) input.setAttribute("aria-describedby", ids.join(" "));
      else input.removeAttribute("aria-describedby");
    });
    return !message;
  }

  // Reserve a feedback line so blur validation cannot move the next tap target.
  fields.forEach((field) => {
    const container = field.closest(".field, .check-field, fieldset");
    const error = document.createElement("p");
    error.id = `${form.id}-${field.name || field.id || "consent"}-error`;
    error.className = "field-error";
    error.setAttribute("aria-live", "polite");
    container.append(error);
  });

  controls.forEach((field) => {
    field.addEventListener("blur", () => {
      touched.add(primary(field));
      validate(field);
    });
    field.addEventListener("input", () => {
      field.setCustomValidity("");
      if (touched.has(primary(field))) validate(field);
    });
    field.addEventListener("change", () => {
      touched.add(primary(field));
      validate(field);
    });
  });

  return {
    validateAll() {
      let firstInvalid;
      fields.forEach((field) => {
        touched.add(field);
        if (!validate(field) && !firstInvalid) firstInvalid = field;
      });
      firstInvalid?.focus();
      return !firstInvalid;
    },
    reset() {
      touched.clear();
      controls.forEach((field) => {
        field.setCustomValidity("");
        field.removeAttribute("aria-invalid");
        const ids = (field.getAttribute("aria-describedby") || "")
          .split(/\s+/)
          .filter((id) => id && !id.endsWith("-error"));
        if (ids.length) field.setAttribute("aria-describedby", ids.join(" "));
        else field.removeAttribute("aria-describedby");
      });
      form.querySelectorAll(".field-error").forEach((error) => {
        error.textContent = "";
      });
    },
  };
}
