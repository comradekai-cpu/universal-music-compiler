(() => {
  const output = document.querySelector("#output");
  const scenePanel = document.querySelector(".workspace .panel:nth-child(2)");
  const notice = scenePanel?.querySelector(".notice");

  if (!output || !notice) return;

  const options = {
    influence: [
      "Лёгкий оттенок",
      "Ритм",
      "Гармония",
      "Оркестровка",
      "Атмосфера",
      "Драматургия"
    ],
    rhythm: [
      "Основной пульс",
      "Лёгкий оттенок",
      "Акценты"
    ],
    instruments: [
      "Фундамент",
      "Поддержка",
      "Ведущая линия",
      "Акценты",
      "Атмосфера"
    ],
    density: [
      "Камерная",
      "Сбалансированная",
      "Насыщенная"
    ]
  };

  const state = {
    influence: 0,
    rhythm: 1,
    instruments: 1,
    density: 1
  };

  const panel = document.createElement("section");
  panel.className = "arrangement-logic";

  panel.innerHTML = `
    <strong>ЖАНРОВАЯ АРХИТЕКТУРА</strong>
    <span>логика смешения и аранжировки</span>

    <div>
      ${Object.keys(options).map(key => `
        <label>
          ${{
            influence: "Роль влияния",
            rhythm: "Ритмический приоритет",
            instruments: "Роль инструментов",
            density: "Плотность аранжировки"
          }[key]}

          <select data-architecture="${key}">
            ${options[key].map((value, index) => `
              <option
                value="${index}"
                ${index === state[key] ? "selected" : ""}
              >
                ${value}
              </option>
            `).join("")}
          </select>
        </label>
      `).join("")}
    </div>

    <p>
      Основа остаётся главным музыкальным миром.
      Влияние получает только выбранную роль.
    </p>
  `;

  notice.before(panel);

  const style = document.createElement("style");

  style.textContent = `
    .arrangement-logic {
      margin: 18px 0;
      padding: 15px;
      border: 1px solid var(--line);
      border-radius: 13px;
      background: rgba(255, 255, 255, 0.025);
    }

    .arrangement-logic strong {
      display: block;
      color: var(--orange);
      font-size: 13px;
      letter-spacing: .06em;
    }

    .arrangement-logic span,
    .arrangement-logic p {
      color: var(--muted);
      font-size: 11px;
    }

    .arrangement-logic div {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 10px;
      margin-top: 14px;
    }

    .arrangement-logic label {
      color: var(--muted);
      font-size: 11px;
    }

    .arrangement-logic select {
      display: block;
      width: 100%;
      margin-top: 5px;
      padding: 8px;
      border: 1px solid var(--line);
      border-radius: 8px;
      color: var(--text);
      background: #0f151f;
      font-size: 11px;
    }

    @media (max-width: 760px) {
      .arrangement-logic div {
        grid-template-columns: 1fr;
      }
    }
  `;

  document.head.append(style);

  function getDraftValue(text, label, emptyValue) {
    const match = text.match(new RegExp(`${label}: (.+)`));

    return match && match[1] !== emptyValue
      ? match[1].trim()
      : "";
  }

  function getDraft() {
    const base = output.textContent
      .split("\n\nGENRE ARCHITECTURE:")[0]
      .trim();

    return {
      base,
      main: getDraftValue(base, "Основа", "не задана"),
      influence: getDraftValue(base, "Влияние", "не задано"),
      rhythm: getDraftValue(base, "Ритмика", "не задана"),
      instruments: getDraftValue(base, "Инструменты", "не заданы")
    };
  }

  function getInfluenceDescription(main, influence) {
    const descriptions = [
      `${influence} adds a subtle stylistic color without replacing the ${main} core.`,
      `${influence} shapes the rhythmic movement while ${main} remains primary.`,
      `${influence} adds harmonic color while preserving the ${main} identity.`,
      `${influence} contributes orchestral and instrumental color without replacing the ${main} core.`,
      `${influence} adds atmosphere and mood while ${main} remains primary.`,
      `${influence} adds storytelling character while preserving the ${main} identity.`
    ];

    return descriptions[state.influence];
  }

  function getRhythmDescription(rhythm) {
    const descriptions = [
      "Use it as the main rhythmic engine.",
      "Keep it as a light rhythmic influence.",
      "Use it for occasional rhythmic accents."
    ];

    return rhythm
      ? `${rhythm}: ${descriptions[state.rhythm]}`
      : "";
  }

  function getInstrumentDescription(instruments) {
    const descriptions = [
      "as the structural foundation",
      "as supportive layers",
      "as featured melodic voices",
      "as focused accents",
      "as atmospheric texture"
    ];

    return instruments
      ? `Use ${instruments} ${descriptions[state.instruments]}.`
      : "";
  }

  function getDensityDescription() {
    const descriptions = [
      "Keep a sparse, intimate arrangement.",
      "Keep a balanced arrangement with space for the lead vocal.",
      "Keep a rich, layered arrangement while preserving vocal clarity."
    ];

    return descriptions[state.density];
  }

  function buildFullArchitecture() {
    const draft = getDraft();

    if (!draft.base || draft.base.startsWith("Выбери хотя бы")) {
      return "";
    }

    const lines = [
      "GENRE ARCHITECTURE:",
      draft.main
        ? `${draft.main} is the primary musical identity.`
        : "Keep one clear primary musical identity."
    ];

    if (draft.influence) {
      lines.push(getInfluenceDescription(draft.main || "primary style", draft.influence));
    }

    const rhythmLine = getRhythmDescription(draft.rhythm);

    if (rhythmLine) {
      lines.push(rhythmLine);
    }

    const strategyLines = [
      "ARRANGEMENT STRATEGY:",
      getInstrumentDescription(draft.instruments),
      getDensityDescription()
    ].filter(Boolean);

    return `${lines.join("\n")}\n\n${strategyLines.join("\n")}`;
  }

  function updateFullDraft() {
    const draft = getDraft();

    if (!draft.base || draft.base.startsWith("Выбери хотя бы")) {
      return;
    }

    const nextOutput = `${draft.base}\n\n${buildFullArchitecture()}`;

    if (output.textContent !== nextOutput) {
      output.textContent = nextOutput;
    }
  }

  window.buildCompactGenreArchitecture = function () {
    const draft = getDraft();

    if (!draft.main) {
      return "";
    }

    const lines = [
      `Create a ${draft.main} composition.`,
      `${draft.main} remains the primary musical identity.`
    ];

    if (draft.influence) {
      lines.push(getInfluenceDescription(draft.main, draft.influence));
    }

    const rhythmLine = getRhythmDescription(draft.rhythm);

    if (rhythmLine) {
      lines.push(rhythmLine);
    }

    lines.push(getDensityDescription());

    return lines.join("\n");
  };

  panel.querySelectorAll("[data-architecture]").forEach(select => {
    select.addEventListener("change", event => {
      state[event.currentTarget.dataset.architecture] = Number(event.currentTarget.value);
      updateFullDraft();
    });
  });

  new MutationObserver(() => {
    const hasArchitecture = output.textContent.includes("GENRE ARCHITECTURE:");

    if (!hasArchitecture) {
      updateFullDraft();
    }
  }).observe(output, {
    childList: true,
    characterData: true,
    subtree: true
  });

  updateFullDraft();
})();
