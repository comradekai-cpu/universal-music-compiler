(() => {
  const scene = document.querySelector("#scene");
  const out = document.querySelector("#output");

  if (!scene || !out) return;

  const names = [
    "Свободный выбор",
    "Гармония",
    "Басовый фундамент",
    "Ритмический фундамент",
    "Ведущая линия",
    "Ответы вокалу",
    "Акценты",
    "Атмосфера"
  ];

  const eng = [
    "free choice",
    "harmony",
    "bass foundation",
    "rhythmic foundation",
    "featured melodic line",
    "vocal responses",
    "focused accents",
    "atmospheric support"
  ];

  const state = new Map();
const instrumentOrder = new Map();
let nextInstrumentOrder = 0;
  const defaults = {
    piano: 1,
    accordion: 1,
    "upright piano": 1,
    "nylon-string guitar": 1,
    "upright bass": 2,
    "bass guitar": 2,
    "live rhythm section": 3,
    "electric guitar": 4,
    saxophone: 5,
    "muted trumpet": 5,
    "brass section": 6,
    "string section": 7,
    choir: 7
  };

  function getCurrentInstrumentValues() {
    const values = [];

    scene.querySelectorAll(".selection").forEach(card => {
      const type = card.querySelector(".selection-label")?.textContent.trim();
      const value = card.querySelector(".selection-value")?.textContent.trim();

      if (type === "Инструмент" && value) {
        values.push(value);
      }
    });

    return [...new Set(values)];
  }

  function syncState() {
    const currentValues = getCurrentInstrumentValues();
    const currentSet = new Set(currentValues);

    for (const value of state.keys()) {
      if (!currentSet.has(value)) {
        state.delete(value);
      }
    }

  currentValues.forEach(value => {
  if (!state.has(value)) {
    state.set(value, defaults[value] ?? 0);
  }

  if (!instrumentOrder.has(value)) {
    instrumentOrder.set(value, nextInstrumentOrder++);
  }
});

    return currentValues;
  }

  function buildRoleLines(values = getCurrentInstrumentValues()) {
    const groups = {};

    values.forEach(value => {
      const role = state.get(value) ?? defaults[value] ?? 0;

      if (role === 0) return;

      if (!groups[role]) groups[role] = [];
      groups[role].push(value);
    });

    return Object.entries(groups).map(([role, items]) => {
      const uniqueItems = [...new Set(items)];

      return (
        eng[role][0].toUpperCase() +
        eng[role].slice(1) +
        ": " +
        uniqueItems.join(", ") +
        "."
      );
    });
  }

  function add() {
    const currentValues = syncState();
    const base = out.textContent.split("\n\nARRANGEMENT ROLES:")[0].trim();

    if (!base || base.startsWith("Выбери хотя бы")) return;

    const lines = buildRoleLines(currentValues);

    out.textContent =
      base +
      (lines.length
        ? "\n\nARRANGEMENT ROLES:\n" + lines.join("\n")
        : "");
  }

  function inject() {
    const currentValues = syncState();
    const handledValues = new Set();

    scene.querySelectorAll(".selection").forEach(card => {
      const type = card.querySelector(".selection-label")?.textContent.trim();
      const value = card.querySelector(".selection-value")?.textContent.trim();

      if (type !== "Инструмент" || !value) return;

      handledValues.add(value);

      if (!state.has(value)) {
        state.set(value, defaults[value] ?? 0);
      }

      if (card.dataset.instrumentRole) {
        const select = card.querySelector(".instrument-role select");

if (select) {
  const select = card.querySelector(".instrument-role select");

if (select) {
  select.value = String(state.get(value));
}
}

        if (select) {
          select.value = String(state.get(value));
        }

        return;
      }

      card.dataset.instrumentRole = "1";

      const label = document.createElement("label");
      label.className = "instrument-role";
      label.textContent = "Музыкальная функция";

      const select = document.createElement("select");

      names.forEach((name, index) => {
        select.add(new Option(name, index, index === state.get(value)));
      });

      select.value = String(state.get(value));

      select.onchange = () => {
        state.set(value, Number(select.value));
        add();
      };

      label.append(select);
      card.querySelector(".selection-info").append(label);
    });

    for (const value of state.keys()) {
      if (!handledValues.has(value)) {
        state.delete(value);
      }
    }

    add();
  }

  window.buildCompactArrangementRoles = function (selectionsList = []) {
    let values = [];

    if (Array.isArray(selectionsList) && selectionsList.length) {
      values = [
        ...new Set(
          selectionsList
            .filter(
              item =>
                item.type === "Инструмент" ||
                item.role === "Инструмент"
            )
            .map(item => item.value)
        )
      ];
    }

    if (!values.length) {
      values = getCurrentInstrumentValues();
    }

    values = values.filter(value => state.has(value) || defaults[value] !== undefined);

    const lines = buildRoleLines(values);

    return lines.length ? lines.join("\n") : "";
  };

  const style = document.createElement("style");
  style.textContent = `
    .instrument-role {
      display: block;
      margin-top: 8px;
      color: var(--orange);
      font-size: 10px;
      letter-spacing: .06em;
    }

    .instrument-role select {
      display: block;
      width: 100%;
      margin-top: 4px;
      padding: 7px 8px;
      border: 1px solid var(--line);
      border-radius: 7px;
      color: var(--text);
      background: #0f151f;
      font-size: 11px;
    }

    .instrument-role select:focus {
      border-color: var(--accent);
      outline: none;
    }
  `;
  document.head.append(style);

  new MutationObserver(inject).observe(scene, {
    childList: true,
    subtree: true
  });

  new MutationObserver(() => {
    if (!out.textContent.includes("ARRANGEMENT ROLES:")) {
      add();
    }
  }).observe(out, {
    childList: true,
    characterData: true,
    subtree: true
  });

  inject();
})();
