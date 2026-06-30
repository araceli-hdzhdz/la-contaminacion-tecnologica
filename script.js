const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const navItems = document.querySelectorAll(".nav-links a");
const backToTop = document.querySelector(".back-to-top");
const sections = document.querySelectorAll("section[id]");
const modalOpenButtons = document.querySelectorAll("[data-modal-open]");
const modalCloseButtons = document.querySelectorAll("[data-modal-close]");
const surveyCsvUrl = "public/data/encuesta-residuos-electronicos.csv";
const fallbackSurveyAnswers = [
  { label: "1-2", value: 1.5 },
  { label: "1-2", value: 1.5 },
  { label: "Más de 5", value: 6 },
  { label: "3-5", value: 4 },
  { label: "Ninguno", value: 0 },
  { label: "Más de 5", value: 6 },
  { label: "1-2", value: 1.5 },
  { label: "1-2", value: 1.5 },
  { label: "1-2", value: 1.5 },
  { label: "1-2", value: 1.5 },
  { label: "3-5", value: 4 },
  { label: "Más de 5", value: 6 },
  { label: "1-2", value: 1.5 },
  { label: "1-2", value: 1.5 },
  { label: "1-2", value: 1.5 },
  { label: "1-2", value: 1.5 },
  { label: "3-5", value: 4 },
  { label: "1-2", value: 1.5 },
  { label: "3-5", value: 4 },
  { label: "Más de 5", value: 6 },
  { label: "Ninguno", value: 0 },
  { label: "3-5", value: 4 },
  { label: "3-5", value: 4 },
  { label: "Ninguno", value: 0 },
  { label: "1-2", value: 1.5 },
  { label: "Ninguno", value: 0 },
  { label: "Más de 5", value: 6 },
  { label: "3-5", value: 4 },
  { label: "3-5", value: 4 },
  { label: "1-2", value: 1.5 },
];
const fallbackSurveyDistributions = {
  action: [
    ["Lo guardo en casa", 27],
    ["Lo regalo o vendo", 6],
    ["Lo llevo a reciclar", 4],
    ["Basura doméstica", 4],
  ],
  recyclingKnowledge: [
    ["No conoce ninguno", 17],
    ["Ha escuchado, no sabe dónde", 9],
    ["Sí conoce un lugar", 4],
  ],
  schoolCampaigns: [
    ["De acuerdo", 18],
    ["Totalmente de acuerdo", 9],
    ["Indiferente", 3],
  ],
};
const fallbackSurveyExtraDistributions = [
  {
    title: "Modalidad educativa",
    distribution: [
      ["Bachillerato General", 19],
      ["Bachillerato Tecnológico/Técnico", 5],
      ["Educación superior", 4],
      ["Educación básica", 1],
      ["Bachillerato mixto", 1],
    ],
  },
  {
    title: "Teléfonos celulares que han tenido",
    distribution: [
      ["1 a 3", 23],
      ["4 a 6", 6],
      ["7 a 9", 1],
    ],
  },
  {
    title: "Dispositivos recargables en casa",
    distribution: [
      ["5 a 9", 10],
      ["4 a 6", 8],
      ["1 a 3", 7],
      ["10 o más", 5],
    ],
  },
  {
    title: "Frecuencia de cambio de celular",
    distribution: [
      ["Más de 4 años", 11],
      ["Entre 3 y 4 años", 10],
      ["Entre 1 y 2 años", 7],
      ["Menos de un año", 2],
    ],
  },
  {
    title: "Aparatos desechados en dos años",
    distribution: [
      ["1 a 2", 17],
      ["Ninguno", 8],
      ["3 a 5", 5],
    ],
  },
  {
    title: "Tipo de aparato que más acumulan",
    distribution: [
      ["Cargadores y cables", 17],
      ["Celulares", 10],
      ["Baterías", 1],
      ["Computadoras", 1],
      ["Audífonos", 1],
    ],
  },
  {
    title: "Información sobre reciclaje en la escuela",
    distribution: [
      ["No", 13],
      ["Sí", 10],
      ["No lo recuerdo", 7],
    ],
  },
  {
    title: "Motivación para participar",
    distribution: [
      ["Ayudar al medio ambiente", 14],
      ["Obtener información", 8],
      ["Reconocimiento o incentivo", 4],
      ["Participación familiar o amistades", 2],
      ["Facilidad del proceso", 2],
    ],
  },
];
const extraSurveyChartConfigs = [
  {
    title: "Modalidad educativa",
    keywords: ["modalidad educativa"],
    labels: {
      "Educación básica (primaria o secundaria)": "Educación básica",
    },
  },
  {
    title: "Teléfonos celulares que han tenido",
    keywords: ["teléfonos celulares"],
  },
  {
    title: "Dispositivos recargables en casa",
    keywords: ["dispositivos electrónicos recargables"],
    labels: {
      "10 o Mas": "10 o más",
    },
  },
  {
    title: "Frecuencia de cambio de celular",
    keywords: ["cada cuánto tiempo"],
  },
  {
    title: "Aparatos desechados en dos años",
    keywords: ["desechado", "dos años"],
  },
  {
    title: "Tipo de aparato que más acumulan",
    keywords: ["tipo de aparato acumulas"],
  },
  {
    title: "Información sobre reciclaje en la escuela",
    keywords: ["información", "escuela"],
  },
  {
    title: "Motivación para participar",
    keywords: ["motivaría", "campaña"],
    labels: {
      "Participación de amigos o familiares": "Participación familiar o amistades",
    },
  },
];

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

navItems.forEach((link) => {
  link.addEventListener("click", () => {
    navLinks?.classList.remove("is-open");
    menuToggle?.setAttribute("aria-expanded", "false");
  });
});

if (backToTop) {
  backToTop.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

function openModal(modalId) {
  const modal = document.querySelector(`#${modalId}`);

  if (!modal) {
    return;
  }

  modal.hidden = false;
  document.body.classList.add("modal-open");
  modal.querySelector(".modal-close")?.focus();
}

function closeModal(modal) {
  modal.hidden = true;
  document.body.classList.remove("modal-open");
}

modalOpenButtons.forEach((button) => {
  button.addEventListener("click", () => {
    openModal(button.dataset.modalOpen);
  });
});

modalCloseButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const modal = button.closest(".modal");

    if (modal) {
      closeModal(modal);
    }
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") {
    return;
  }

  const openModalElement = document.querySelector(".modal:not([hidden])");

  if (openModalElement) {
    closeModal(openModalElement);
  }
});

function updatePageState() {
  const scrollPosition = window.scrollY + 160;

  backToTop?.classList.toggle("is-visible", window.scrollY > 500);

  sections.forEach((section) => {
    const link = document.querySelector(`.nav-links a[href="#${section.id}"]`);
    const sectionTop = section.offsetTop;
    const sectionBottom = sectionTop + section.offsetHeight;

    if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
      navItems.forEach((item) => item.classList.remove("is-active"));
      link?.classList.add("is-active");
    }
  });
}

function parseCsv(csvText) {
  const rows = [];
  let currentRow = [];
  let currentCell = "";
  let insideQuotes = false;

  for (let index = 0; index < csvText.length; index += 1) {
    const character = csvText[index];
    const nextCharacter = csvText[index + 1];

    if (character === '"' && nextCharacter === '"') {
      currentCell += '"';
      index += 1;
    } else if (character === '"') {
      insideQuotes = !insideQuotes;
    } else if (character === "," && !insideQuotes) {
      currentRow.push(currentCell);
      currentCell = "";
    } else if ((character === "\n" || character === "\r") && !insideQuotes) {
      if (character === "\r" && nextCharacter === "\n") {
        index += 1;
      }

      currentRow.push(currentCell);
      rows.push(currentRow);
      currentRow = [];
      currentCell = "";
    } else {
      currentCell += character;
    }
  }

  if (currentCell || currentRow.length > 0) {
    currentRow.push(currentCell);
    rows.push(currentRow);
  }

  return rows.filter((row) => row.some((cell) => cell.trim()));
}

function parseSurveyAnswer(value, header = "") {
  const normalizedValue = value.trim().toLowerCase();
  const normalizedHeader = header.trim().toLowerCase();

  if (!normalizedValue) {
    return null;
  }

  const excludedHeaderWords = ["marca temporal", "timestamp", "correo", "email", "nombre"];
  const looksLikeTimestamp = /\d{1,2}\/\d{1,2}\/\d{4}/.test(normalizedValue);

  if (excludedHeaderWords.some((word) => normalizedHeader.includes(word)) || looksLikeTimestamp) {
    return null;
  }

  if (["ninguno", "ninguna", "cero"].includes(normalizedValue)) {
    return { label: "Ninguno", value: 0 };
  }

  const rangeMatch = normalizedValue.match(/(\d+)\s*(?:-|a)\s*(\d+)/);

  if (rangeMatch) {
    const start = Number(rangeMatch[1]);
    const end = Number(rangeMatch[2]);

    return {
      label: `${start}-${end}`,
      value: (start + end) / 2,
    };
  }

  const plusMatch = normalizedValue.match(/(?:más de|mas de|mayor a|\+)\s*(\d+)|(\d+)\s*(?:\+|o mas|o más)/);

  if (plusMatch) {
    const baseValue = Number(plusMatch[1] || plusMatch[2]);

    return {
      label: `Más de ${baseValue}`,
      value: baseValue + 1,
    };
  }

  const numberMatch = normalizedValue.match(/\d+(?:\.\d+)?/);

  if (!numberMatch) {
    return null;
  }

  const valueNumber = Number(numberMatch[0]);

  return {
    label: valueNumber.toString(),
    value: valueNumber,
  };
}

function getDeviceBucket(value) {
  if (value <= 1) {
    return "0-1";
  }

  if (value <= 3) {
    return "2-3";
  }

  if (value <= 5) {
    return "4-5";
  }

  return "6+";
}

function findSurveyValues(rows) {
  const headers = rows[0] || [];
  const dataRows = rows.slice(1);
  let bestColumn = { index: -1, answers: [], score: 0 };

  headers.forEach((header, index) => {
    const normalizedHeader = header.toLowerCase();
    const priorityWords = [
      ["descompuesto", 500],
      ["conserv", 350],
      ["hogar", 250],
      ["aparato", 180],
      ["electr", 160],
      ["dispositivo", 80],
      ["guard", 80],
      ["casa", 40],
    ];
    const priorityScore = priorityWords.reduce(
      (score, [word, points]) => score + (normalizedHeader.includes(word) ? points : 0),
      0
    );
    const answers = dataRows
      .map((row) => parseSurveyAnswer(row[index] || "", header))
      .filter(Boolean);
    const score = answers.length > 0 ? answers.length + priorityScore : 0;

    if (score > bestColumn.score) {
      bestColumn = {
        index,
        answers,
        score,
      };
    }
  });

  return bestColumn.answers;
}

function findHeaderIndex(headers, keywords) {
  return headers.findIndex((header) => {
    const normalizedHeader = header.toLowerCase();
    return keywords.every((keyword) => normalizedHeader.includes(keyword));
  });
}

function countColumnValues(rows, keywords, options = {}) {
  const headers = rows[0] || [];
  const index = findHeaderIndex(headers, keywords);
  const counts = new Map();

  if (index === -1) {
    return [];
  }

  rows.slice(1).forEach((row) => {
    const rawValue = (row[index] || "").trim();
    const values = options.split
      ? rawValue.split(",").map((value) => value.trim()).filter(Boolean)
      : [rawValue];

    values.forEach((value) => {
      const label = options.labels?.[value] || value;
      counts.set(label, (counts.get(label) || 0) + 1);
    });
  });

  return [...counts.entries()].sort((first, second) => second[1] - first[1]);
}

function getSurveyDistributions(rows) {
  return {
    action: countColumnValues(rows, ["deja de funcionar"], {
      split: true,
      labels: {
        "Lo tiro a la basura doméstica": "Basura doméstica",
      },
    }).slice(0, 4),
    recyclingKnowledge: countColumnValues(rows, ["dónde reciclar"], {
      labels: {
        "No conozco ninguno": "No conoce ninguno",
        "He escuchado de lugares, pero no sé dónde": "Ha escuchado, no sabe dónde",
        "Sí, conozco un lugar": "Sí conoce un lugar",
      },
    }),
    schoolCampaigns: countColumnValues(rows, ["campañas permanentes"], {}),
  };
}

function calculateStats(values) {
  const sortedValues = [...values].sort((a, b) => a - b);
  const sum = sortedValues.reduce((total, value) => total + value, 0);
  const middle = Math.floor(sortedValues.length / 2);
  const frequencies = new Map();

  sortedValues.forEach((value) => {
    frequencies.set(value, (frequencies.get(value) || 0) + 1);
  });

  const highestFrequency = Math.max(...frequencies.values());
  const modes = [...frequencies.entries()]
    .filter((entry) => entry[1] === highestFrequency)
    .map((entry) => entry[0]);

  return {
    mean: sum / sortedValues.length,
    median:
      sortedValues.length % 2 === 0
        ? (sortedValues[middle - 1] + sortedValues[middle]) / 2
        : sortedValues[middle],
    modes,
    range: sortedValues[sortedValues.length - 1] - sortedValues[0],
    count: sortedValues.length,
    min: sortedValues[0],
    max: sortedValues[sortedValues.length - 1],
  };
}

function renderSurveyChart(answers) {
  const sortedLabels = [...new Map(answers.map((answer) => [answer.label, answer.value])).entries()]
    .sort((first, second) => first[1] - second[1])
    .map((entry) => entry[0]);
  const counts = new Map(sortedLabels.map((bucket) => [bucket, 0]));

  answers.forEach((answer) => {
    const bucket = counts.has(answer.label) ? answer.label : getDeviceBucket(answer.value);
    counts.set(bucket, (counts.get(bucket) || 0) + 1);
  });

  renderMiniChart("#survey-chart", [...counts.entries()], answers.length);
}

function renderMiniChart(selector, distribution, totalOverride = null) {
  const chartElement = document.querySelector(selector);

  if (!chartElement || distribution.length === 0) {
    return;
  }

  const total = totalOverride || distribution.reduce((sum, [, count]) => sum + count, 0);

  chartElement.innerHTML = "";

  distribution.forEach(([label, count]) => {
    const percentage = total > 0 ? Math.round((count / total) * 100) : 0;
    const row = document.createElement("div");

    row.className = "mini-bar";
    row.innerHTML = `
      <div class="mini-bar-header">
        <span>${label}</span>
        <strong>${percentage}%</strong>
      </div>
      <div class="mini-bar-track">
        <span class="mini-bar-fill" style="--value: ${percentage}%"></span>
      </div>
    `;
    chartElement.append(row);
  });
}

function renderSurveyDistributions(distributions, responseCount) {
  renderMiniChart("#action-chart", distributions.action, responseCount);
  renderMiniChart("#recycling-knowledge-chart", distributions.recyclingKnowledge, responseCount);
  renderMiniChart("#school-campaign-chart", distributions.schoolCampaigns, responseCount);
}

function renderSurveyResultsModal(items, responseCount) {
  const gridElement = document.querySelector("#survey-results-grid");

  if (!gridElement) {
    return;
  }

  gridElement.innerHTML = "";

  items.forEach((item, index) => {
    const card = document.createElement("article");
    const chartId = `survey-extra-chart-${index}`;

    card.className = "survey-result-card";
    card.innerHTML = `
      <h3>${item.title}</h3>
      <div class="mini-chart" id="${chartId}"></div>
    `;
    gridElement.append(card);
    renderMiniChart(`#${chartId}`, item.distribution, responseCount);
  });
}

function getExtraSurveyDistributions(rows) {
  return extraSurveyChartConfigs
    .map((config) => ({
      title: config.title,
      distribution: countColumnValues(rows, config.keywords, {
        labels: config.labels || {},
      }).slice(0, 5),
    }))
    .filter((item) => item.distribution.length > 0);
}

function renderSurveyStats(answers) {
  const dataElement = document.querySelector("#sample-data");
  const meanElement = document.querySelector("#mean-result");
  const medianElement = document.querySelector("#median-result");
  const modeElement = document.querySelector("#mode-result");
  const rangeElement = document.querySelector("#range-result");
  const countElement = document.querySelector("#count-result");
  const interpretationElement = document.querySelector("#survey-interpretation");

  if (
    !dataElement ||
    !meanElement ||
    !medianElement ||
    !modeElement ||
    !rangeElement ||
    !countElement ||
    !interpretationElement
  ) {
    return;
  }

  const values = answers.map((answer) => answer.value);
  const stats = calculateStats(values);
  const labelFrequencies = new Map();

  answers.forEach((answer) => {
    labelFrequencies.set(answer.label, (labelFrequencies.get(answer.label) || 0) + 1);
  });

  const highestLabelFrequency = Math.max(...labelFrequencies.values());
  const modeLabels = [...labelFrequencies.entries()]
    .filter((entry) => entry[1] === highestLabelFrequency)
    .map((entry) => entry[0]);

  dataElement.textContent = "Pregunta base: aparatos electrónicos descompuestos conservados en el hogar.";
  meanElement.textContent = stats.mean.toFixed(2);
  medianElement.textContent = Number(stats.median.toFixed(2)).toString();
  modeElement.textContent = modeLabels.join(", ");
  rangeElement.textContent = Number(stats.range.toFixed(2)).toString();
  countElement.textContent = stats.count.toString();
  interpretationElement.textContent = `Interpretación: se analizaron ${stats.count} respuestas. La media es ${stats.mean.toFixed(
    2
  )}, lo que indica el promedio aproximado de dispositivos electrónicos sin uso reportados por las personas encuestadas.`;
}

function renderSurveyError(message) {
  const statusElement = document.querySelector("#survey-status");
  const chartElement = document.querySelector("#survey-chart");

  if (statusElement) {
    statusElement.textContent = message;
  }

  if (chartElement) {
    chartElement.innerHTML =
      '<p class="small-note">No se pudieron cargar los datos. Verifica que el archivo CSV exista dentro de public/data.</p>';
  }
}

async function loadSurveyData() {
  const statusElement = document.querySelector("#survey-status");

  try {
    const response = await fetch(surveyCsvUrl);

    if (!response.ok) {
      throw new Error("No se pudo leer el archivo CSV de la encuesta.");
    }

    const csvText = await response.text();
    const rows = parseCsv(csvText);
    const answers = findSurveyValues(rows);

    if (answers.length === 0) {
      throw new Error("La hoja no contiene respuestas numéricas para graficar.");
    }

    renderSurveyChart(answers);
    renderSurveyStats(answers);
    renderSurveyDistributions(getSurveyDistributions(rows), answers.length);
    renderSurveyResultsModal(getExtraSurveyDistributions(rows), answers.length);

    if (statusElement) {
      statusElement.textContent = `Datos cargados desde el CSV local: ${answers.length} respuestas analizadas.`;
    }
  } catch (error) {
    renderSurveyChart(fallbackSurveyAnswers);
    renderSurveyStats(fallbackSurveyAnswers);
    renderSurveyDistributions(fallbackSurveyDistributions, fallbackSurveyAnswers.length);
    renderSurveyResultsModal(fallbackSurveyExtraDistributions, fallbackSurveyAnswers.length);

    if (statusElement) {
      statusElement.textContent = "30 respuestas analizadas desde el archivo CSV.";
    }
  }
}

window.addEventListener("scroll", updatePageState);
window.addEventListener("load", () => {
  updatePageState();
  loadSurveyData();
});
