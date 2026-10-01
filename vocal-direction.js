(() => {
  const output = document.querySelector('#output');
  const scenePanel = document.querySelector('.workspace .panel:nth-child(2)');
  const notice = scenePanel?.querySelector('.notice');

  if (!output || !notice) return;

  const labels = {
    profile: [
      'Без голосового референса',
      'Мужской референс',
      'Женский референс'
    ],
    distance: [
      'Близко к микрофону',
      'Естественная студийная',
      'Далеко и просторно'
    ],
    verse: [
      'Разговорно',
      'Чисто спето',
      'Сдержанно',
      'Воздушно'
    ],
    chorus: [
      'Чуть шире',
      'Полнее',
      'Сильный выброс',
      'Сдержанно'
    ],
    register: [
      'Низкий',
      'Средний',
      'Смешанный'
    ],
    tone: [
      'Интимный',
      'Тёплый',
      'Стойкий',
      'Театральный',
      'Игривый'
    ]
  };

  const directions = {
    distance: [
      'Close-mic recording with a dry, intimate studio sound.',
      'Natural studio recording with a clear, balanced sound.',
      'More distant, spacious recording with natural room ambience.'
    ],
    verse: [
      'Verses: conversational and natural.',
      'Verses: clearly sung with natural phrasing.',
      'Verses: restrained, controlled and emotionally focused.',
      'Verses: soft and airy, but still clear.'
    ],
    chorus: [
      'Chorus: slightly wider and more open than the verses.',
      'Chorus: fuller and more projected while keeping the same vocal identity.',
      'Chorus: strong emotional release, fuller and more projected.',
      'Chorus: controlled and restrained, without an oversized climax.'
    ],
    register: [
      'Low register.',
      'Middle register.',
      'Mixed low-to-middle register.'
    ],
    tone: [
      'Emotional tone: intimate.',
      'Emotional tone: warm.',
      'Emotional tone: warm and resilient.',
      'Emotional tone: theatrical, expressive and controlled.',
      'Emotional tone: lightly playful.'
    ]
  };

  const state = {
    profile: 0,
    distance: 1,
    verse: 0,
    chorus: 1,
    register: 1,
    tone: 1
  };

  const panel = document.createElement('section');
  panel.className = 'vocal-direction';

  const fieldNames = {
    profile: 'Голосовой профиль',
    distance: 'Дистанция',
    verse: 'Куплет',
    chorus: 'Припев',
    register: 'Регистр',
    tone: 'Эмоциональный тон'
  };

  panel.innerHTML = `
    <strong>ВОКАЛЬНАЯ РЕЖИССУРА</strong>
    <span>точная настройка подачи</span>
    <div>
      ${Object.keys(labels).map(key => `
        <label>
          ${fieldNames[key]}
          <select data-v="${key}">
            ${labels[key].map((label, index) => `
              <option value="${index}" ${index === state[key] ? 'selected' : ''}>
                ${label}
              </option>
            `).join('')}
          </select>
        </label>
      `).join('')}
    </div>
    <p>Референс сохраняет вокальную личность. Настройки управляют подачей новой песни.</p>
  `;

  notice.before(panel);

  const style = document.createElement('style');

  style.textContent = `
    .vocal-direction {
      margin: 18px 0;
      padding: 15px;
      border: 1px solid var(--line);
      border-radius: 13px;
      background: rgba(255,255,255,.025);
    }

    .vocal-direction strong {
      display: block;
      color: var(--accent);
      font-size: 13px;
      letter-spacing: .06em;
    }

    .vocal-direction span,
    .vocal-direction p {
      color: var(--muted);
      font-size: 11px;
    }

    .vocal-direction div {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 10px;
      margin-top: 14px;
    }

    .vocal-direction label {
      color: var(--muted);
      font-size: 11px;
    }

    .vocal-direction select {
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
      .vocal-direction div {
        grid-template-columns: 1fr;
      }
    }
  `;

  document.head.append(style);

  function getLanguageDirection() {
    return window.vocalLanguage === 'en'
      ? 'Sung in English. Clear natural English diction. Native English pronunciation.'
      : 'Sung in Russian. Clear natural Russian diction. Native Russian pronunciation.';
  }

  function buildVocalDirection() {
    const basePrompt = output.textContent
      .split('\n\nVOICE REFERENCE:')[0]
      .split('\n\nVOCAL DIRECTION:')[0]
      .trim();

    if (!basePrompt || basePrompt.startsWith('Выбери хотя бы')) return;

    const voiceReference = state.profile
      ? '\n\nVOICE REFERENCE:\n' +
        'Use the uploaded audio only as a reference for vocal identity, timbre and natural delivery.\n' +
        'Do not copy or imitate the reference melody, rhythm, phrasing, arrangement, lyrics, harmony or song structure.\n' +
        'Create an original melody and new vocal phrasing.'
      : '';

    const leadVocal = state.profile === 1
      ? 'Male lead vocal.'
      : state.profile === 2
        ? 'Female lead vocal.'
        : 'Lead vocal.';

    output.textContent =
      basePrompt +
      voiceReference +
      '\n\nVOCAL DIRECTION:\n' +
      leadVocal + '\n' +
      directions.distance[state.distance] + '\n' +
      directions.verse[state.verse] + '\n' +
      directions.chorus[state.chorus] + '\n' +
      directions.register[state.register] + '\n' +
      directions.tone[state.tone] + '\n' +
      getLanguageDirection();
  }

  panel.querySelectorAll('select').forEach(select => {
    select.onchange = () => {
      state[select.dataset.v] = Number(select.value);
      buildVocalDirection();
    };
  });

  new MutationObserver(() => {
    if (!output.textContent.includes('VOCAL DIRECTION:')) {
      buildVocalDirection();
    }
  }).observe(output, {
    childList: true,
    characterData: true,
    subtree: true
  });

  buildVocalDirection();
})();
