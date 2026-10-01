(() => {
  const output = document.querySelector("#output");
  const scenePanel = document.querySelector(".workspace .panel:nth-child(2)");
  const notice = scenePanel?.querySelector(".notice");

  if (!output || !notice || typeof MUSIC_CATALOG === "undefined") return;

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

  const genreProfiles = MUSIC_CATALOG.genres.flatMap(group =>
    group.items.map(item => ({
      ...item,
      family: group.family
    }))
  );

  const panel = document.createElement("section");
  panel.className = "arrangement-logic";

  panel.innerHTML = `
    <strong>ЖАНРОВАЯ АРХИТЕКТУРА</strong>
    <span>логика смешения и аранжировки</span>

    <div class="architecture-controls">
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

    <button class="architecture-apply" id="applyRecommendation">
      Применить рекомендации
    </button>

    <p class="architecture-status" id="architectureStatus">
      Добавь основу и жанр-влияние, чтобы получить рекомендацию.
    </p>

    <p class="architecture-note">
      Основа остаётся главным музыкальным миром.
      Каталог предлагает стартовую настройку, но не ограничивает твой выбор.
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

    .arrangement-logic > span,
    .architecture-note {
      color: var(--muted);
      font-size: 11px;
    }

    .architecture-controls {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 10px;
      margin-top: 14px;
    }

    .architecture-controls label {
      color: var(--muted);
      font-size: 11px;
    }

    .architecture-controls select {
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

    .architecture-apply {
      width: 100%;
      margin-top: 12px;
      padding: 9px 10px;
      border: 1px solid var(--accent);
      border-radius: 8px;
      color: #07120f;
      background: var(--accent);
      font-size: 11px;
      font-weight: bold;
    }

    .architecture-apply:hover {
      background: #a0f3d5;
    }

    .architecture-status {
      min-height: 32px;
      margin: 10px 0 0;
      padding: 9px 10px;
      border-left: 3px solid var(--orange);
      color: var(--muted);
      background: rgba(242, 170, 101, 0.07);
      font-size: 11px;
      line-height: 1.45;
    }

    .architecture-status.compatible {
      border-left-color: var(--accent);
      background: rgba(114, 224, 186, 0.07);
    }

    .architecture-status.bridge {
      border-left-color: var(--orange);
    }

    .architecture-status.conflict {
      border-left-color: #e68080;
      background: rgba(230, 128, 128, 0.08);
    }

    .architecture-note {
      margin: 10px 0 0;
      line-height: 1.45;
    }

    @media (max-width: 760px) {
      .architecture-controls {
        grid-template-columns: 1fr;
      }
    }
  `;

  document.head.append(style);

  const status = panel.querySelector("#architectureStatus");
  const applyButton = panel.querySelector("#applyRecommendation");

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

  function getGenreProfile(name) {
    return genreProfiles.find(profile => profile.name === name) || null;
  }

  function getGenreKeys(profile) {
    if (!profile) return [];

    return [
      profile.name,
      profile.family,
      ...(profile.tags || [])
    ].map(value => String(value).toLowerCase());
  }

  function relationMatches(relations = [], targetProfile) {
    const targetKeys = getGenreKeys(targetProfile);

    return relations.some(relation => {
      const reference = String(relation).toLowerCase();

      return targetKeys.some(key =>
        key === reference ||
        key.includes(reference) ||
        reference.includes(key)
      );
    });
  }

  function classifyPair(mainProfile, influenceProfile) {
    if (!mainProfile || !influenceProfile) {
      return {
        type: "neutral",
        label: "Свободное сочетание",
        message: "Для этой пары пока нет специального правила. Настрой роли вручную или используй нейтральную стартовую схему."
      };
    }

    const hasConflict =
      relationMatches(mainProfile.conflict, influenceProfile) ||
      relationMatches(influenceProfile.conflict, mainProfile);

    if (hasConflict) {
      return {
        type: "conflict",
        label: "Контрастное сочетание",
        message: `${influenceProfile.name} лучше использовать как лёгкий оттенок или отдельный слой, не заменяя музыкальное ядро ${mainProfile.name}.`
      };
    }

    const isCompatible =
      relationMatches(mainProfile.compatible, influenceProfile) ||
      relationMatches(influenceProfile.compatible, mainProfile);

    if (isCompatible) {
      return {
        type: "compatible",
        label: "Совместимое сочетание",
        message: `${influenceProfile.name} естественно сочетается с ${mainProfile.name}. Каталог предложит музыкально безопасную стартовую настройку.`
      };
    }

    const isBridge =
      relationMatches(mainProfile.bridge, influenceProfile) ||
      relationMatches(influenceProfile.bridge, mainProfile);

    if (isBridge) {
      return {
        type: "bridge",
        label: "Мостовое сочетание",
        message: `${influenceProfile.name} лучше вводить через конкретную роль: ритм, гармонию, оркестровку или атмосферу, сохраняя ${mainProfile.name} основой.`
      };
    }

    return {
      type: "neutral",
      label: "Свободное сочетание",
      message: `Для пары ${mainProfile.name} + ${influenceProfile.name} нет готовой записи в каталоге. Используй мягкое влияние как безопасную стартовую точку.`
    };
  }

  function isLatin(profile) {
    return profile?.family === "Latin";
  }

  function isCabaret(profile) {
    return profile?.family === "Cabaret";
  }

  function isJazz(profile) {
    return profile?.family === "Jazz";
  }

  function isClassicalOrCinematic(profile) {
    return (
      profile?.family === "Classical" ||
      profile?.family === "Cinematic"
    );
  }

  function isFolkOrAmbient(profile) {
    return (
      profile?.family === "Folk" ||
      profile?.name === "Ambient"
    );
  }

  function isRock(profile) {
    return profile?.family === "Rock";
  }

  function getRecommendation(mainProfile, influenceProfile, relation) {
    const recommendation = {
      influence: 0,
      rhythm: 1,
      instruments: 1,
      density: 1
    };

    if (relation.type === "conflict") {
      return recommendation;
    }

    if (isLatin(influenceProfile)) {
      return {
        influence: 1,
        rhythm: relation.type === "compatible" ? 0 : 1,
        instruments: 1,
        density: 1
      };
    }

    if (isCabaret(influenceProfile)) {
      return {
        influence: 0,
        rhythm: 1,
        instruments: 1,
        density: 1
      };
    }

    if (isJazz(influenceProfile)) {
      return {
        influence: 2,
        rhythm: 1,
        instruments: 1,
        density: 1
      };
    }

    if (isClassicalOrCinematic(influenceProfile)) {
      return {
        influence: 3,
        rhythm: 1,
        instruments: 4,
        density: 2
      };
    }

    if (isFolkOrAmbient(influenceProfile)) {
      return {
        influence: 4,
        rhythm: 1,
        instruments: 4,
        density: 0
      };
    }

    if (isRock(influenceProfile)) {
      return {
        influence: 3,
        rhythm: 2,
        instruments: 3,
        density: 1
      };
    }

    return recommendation;
  }

  function setControlsFromState() {
    panel.querySelectorAll("[data-architecture]").forEach(select => {
      select.value = String(state[select.dataset.architecture]);
    });
  }

  function updateRecommendationStatus() {
    const draft = getDraft();
    const mainProfile = getGenreProfile(draft.main);
    const influenceProfile = getGenreProfile(draft.influence);

    if (!draft.main || !draft.influence) {
      status.className = "architecture-status";
      status.textContent = "Добавь основу и жанр-влияние, чтобы получить рекомендацию.";
      return;
    }

    const relation = classifyPair(mainProfile, influenceProfile);

    status.className = `architecture-status ${relation.type}`;
    status.textContent = `${relation.label}: ${relation.message}`;
  }

function getInfluenceDescription(main, influence) {
  const mainProfile = getGenreProfile(main);
  const influenceProfile = getGenreProfile(influence);

  const relation = classifyPair(mainProfile, influenceProfile);

  if (relation.type === "conflict") {
    if (influence === "Ambient") {
      return [
        "Use Ambient only as a restrained atmospheric layer:",
        "soft pads, spacious textures and subtle transitions.",
        `Preserve the driving ${main} groove, pulse and stylistic energy.`
      ].join("\n");
    }

    return [
      `Use ${influence} only as a restrained supporting color.`,
      `Preserve the rhythmic and stylistic core of ${main}.`
    ].join("\n");
  }

  if (relation.type === "bridge") {
    if (isLatin(influenceProfile)) {
      return [
        `Use ${influence} as a restrained rhythmic influence.`,
        `${main} remains the primary musical identity.`
      ].join("\n");
    }

    if (isClassicalOrCinematic(influenceProfile)) {
      return [
        `Use ${influence} for cinematic depth and orchestral color.`,
        `Keep ${main} as the primary musical identity.`
      ].join("\n");
    }

    return [
      `Use ${influence} through a focused musical role.`,
      `Keep ${main} as the primary musical identity.`
    ].join("\n");
  }

  if (relation.type === "compatible") {
    if (isCabaret(influenceProfile)) {
      return [
        `${influence} adds elegant cabaret color`,
        `and subtle theatrical character without replacing the ${main} core.`
      ].join(" ");
    }

    if (isJazz(influenceProfile)) {
      return [
        `${influence} adds subtle harmonic color`,
        `and flexible phrasing while preserving the ${main} identity.`
      ].join(" ");
    }

    if (isLatin(influenceProfile)) {
      return [
        `${influence} adds a natural rhythmic lift`,
        `while ${main} remains the primary musical identity.`
      ].join(" ");
    }
  }

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
      updateRecommendationStatus();
      return;
    }

    const nextOutput = `${draft.base}\n\n${buildFullArchitecture()}`;

    if (output.textContent !== nextOutput) {
      output.textContent = nextOutput;
    }

    updateRecommendationStatus();
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

  applyButton.addEventListener("click", () => {
    const draft = getDraft();
    const mainProfile = getGenreProfile(draft.main);
    const influenceProfile = getGenreProfile(draft.influence);

    if (!mainProfile || !influenceProfile) {
      status.className = "architecture-status";
      status.textContent = "Сначала выбери один жанр как основу и второй жанр как влияние.";
      return;
    }

    const relation = classifyPair(mainProfile, influenceProfile);
    const recommendation = getRecommendation(mainProfile, influenceProfile, relation);

    Object.assign(state, recommendation);
    setControlsFromState();
    updateFullDraft();

    applyButton.textContent = "Рекомендации применены";

    setTimeout(() => {
      applyButton.textContent = "Применить рекомендации";
    }, 1500);
  });

  new MutationObserver(() => {
    if (!output.textContent.includes("GENRE ARCHITECTURE:")) {
      updateFullDraft();
    } else {
      updateRecommendationStatus();
    }
  }).observe(output, {
    childList: true,
    characterData: true,
    subtree: true
  });

  updateFullDraft();
})();
