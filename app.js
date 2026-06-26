const STORAGE_KEY = "ruta-digital-mype-state-v1";

const blocks = [
  {
    id: "negocio",
    title: "Tipo de negocio",
    intro:
      "Primero necesito entender qué vendes y por dónde atiendes a tus clientes.",
    questions: [
      {
        id: "actividad",
        label: "¿A qué se dedica el negocio?",
        help: "Ejemplo: bodega, barbería, consultorio, restaurante, venta de ropa, servicios técnicos.",
        type: "textarea",
      },
      {
        id: "oferta",
        label: "¿Vende productos, servicios o ambos?",
        type: "select",
        options: ["Productos", "Servicios", "Ambos"],
      },
      {
        id: "canales",
        label: "¿Qué canales usa hoy?",
        help: "Tienda física, redes sociales, web, WhatsApp, marketplace u otros.",
        type: "textarea",
      },
    ],
  },
  {
    id: "tamano",
    title: "Tamaño del negocio",
    intro:
      "Ahora miremos el volumen. No necesitas datos exactos; un aproximado sirve.",
    questions: [
      {
        id: "personas",
        label: "¿Cuántas personas trabajan en el negocio?",
        type: "number",
      },
      {
        id: "clientes_mes",
        label: "¿Cuántos clientes atiende aproximadamente al mes?",
        type: "number",
      },
      {
        id: "ventas_mes",
        label: "¿Cuántas ventas realiza aproximadamente al mes?",
        type: "number",
      },
    ],
  },
  {
    id: "situacion",
    title: "Situación actual",
    intro:
      "Esta parte nos dice qué tan ordenada está la operación diaria y dónde se pierde información.",
    questions: [
      {
        id: "registro_ventas",
        label: "¿Cómo registra sus ventas?",
        type: "textarea",
      },
      {
        id: "control_gastos",
        label: "¿Cómo controla sus gastos?",
        type: "textarea",
      },
      {
        id: "inventario",
        label: "¿Cómo controla su inventario, si aplica?",
        help: "Si no maneja inventario, escribe 'No aplica'.",
        type: "textarea",
      },
      {
        id: "seguimiento_clientes",
        label: "¿Cómo hace seguimiento a clientes y emite cotizaciones, pedidos o comprobantes?",
        type: "textarea",
      },
      {
        id: "herramientas_actuales",
        label: "¿Qué herramientas usa hoy?",
        help: "Excel, cuaderno, POS, ERP, sistema propio, WhatsApp, Forms u otras.",
        type: "textarea",
      },
    ],
  },
  {
    id: "problemas",
    title: "Problemas principales",
    intro:
      "Con esto priorizamos. La mejor transformación digital empieza por el dolor más caro o repetitivo.",
    questions: [
      {
        id: "tareas_tiempo",
        label: "¿Qué tareas le quitan más tiempo?",
        type: "textarea",
      },
      {
        id: "procesos_manuales",
        label: "¿Qué procesos se hacen de forma manual?",
        type: "textarea",
      },
      {
        id: "errores",
        label: "¿Dónde se generan más errores?",
        type: "textarea",
      },
      {
        id: "info_dificil",
        label: "¿Qué información le cuesta obtener para tomar decisiones?",
        type: "textarea",
      },
      {
        id: "area_prioritaria",
        label: "¿Qué área desea mejorar primero?",
        type: "select",
        options: [
          "Ventas",
          "Marketing",
          "Atención al cliente",
          "Finanzas",
          "Inventario",
          "Operaciones",
          "Administración",
        ],
      },
    ],
  },
  {
    id: "digital",
    title: "Nivel digital",
    intro:
      "Ahora revisamos herramientas, datos e IA. Esto ayuda a recomendar algo realista, no sobredimensionado.",
    questions: [
      {
        id: "redes",
        label: "¿Usa redes sociales para vender?",
        type: "select",
        options: ["Sí", "No", "A veces"],
      },
      {
        id: "whatsapp_business",
        label: "¿Usa WhatsApp Business?",
        type: "select",
        options: ["Sí", "No", "No estoy seguro"],
      },
      {
        id: "base_clientes",
        label: "¿Tiene base de datos de clientes?",
        type: "select",
        options: ["Sí", "No", "Parcial"],
      },
      {
        id: "indicadores",
        label: "¿Mide ventas, margen, gastos o rentabilidad?",
        type: "select",
        options: ["Sí, de forma regular", "A veces", "No"],
      },
      {
        id: "ia_presupuesto",
        label: "¿Usa IA y qué presupuesto mensual tiene para tecnología?",
        help: "Ejemplo: No uso IA y mi presupuesto es bajo.",
        type: "textarea",
      },
    ],
  },
  {
    id: "objetivo",
    title: "Objetivo",
    intro:
      "Último bloque. Con esto armo una ruta mensual enfocada en el resultado que más te importa.",
    questions: [
      {
        id: "meta",
        label: "¿Qué quiere lograr en los próximos 6 o 12 meses?",
        type: "textarea",
      },
      {
        id: "resultado_buscado",
        label: "¿Qué resultado busca principalmente?",
        type: "select",
        options: [
          "Vender más",
          "Ahorrar tiempo",
          "Reducir errores",
          "Ordenar información",
          "Atender mejor a clientes",
          "Automatizar procesos",
        ],
      },
      {
        id: "roadmap",
        label: "¿Desea un roadmap de 6 meses o de 12 meses?",
        type: "select",
        options: ["6 meses", "12 meses"],
      },
    ],
  },
];

const state = loadState();
const els = {
  startButton: document.querySelector("#startButton"),
  resetButton: document.querySelector("#resetButton"),
  progressList: document.querySelector("#progressList"),
  phaseTitle: document.querySelector("#phaseTitle"),
  savedState: document.querySelector("#savedState"),
  conversation: document.querySelector("#conversation"),
  questionForm: document.querySelector("#questionForm"),
  planOutput: document.querySelector("#planOutput"),
  fieldTemplate: document.querySelector("#fieldTemplate"),
};

render();

els.startButton.addEventListener("click", () => {
  document.querySelector(".workspace").scrollIntoView({ behavior: "smooth" });
});

els.resetButton.addEventListener("click", () => {
  if (!confirm("¿Deseas borrar el diagnóstico actual y empezar de cero?")) return;
  localStorage.removeItem(STORAGE_KEY);
  Object.assign(state, { currentBlock: 0, answers: {}, generated: false });
  render();
});

function loadState() {
  const fallback = { currentBlock: 0, answers: {}, generated: false };
  try {
    return { ...fallback, ...JSON.parse(localStorage.getItem(STORAGE_KEY)) };
  } catch {
    return fallback;
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  els.savedState.textContent = "Guardado";
  window.setTimeout(() => {
    els.savedState.textContent = state.generated ? "Plan generado" : "Listo";
  }, 900);
}

function render() {
  renderProgress();
  renderConversation();
  if (state.generated) {
    renderPlan();
    return;
  }
  renderForm();
}

function renderProgress() {
  els.progressList.innerHTML = "";
  blocks.forEach((block, index) => {
    const item = document.createElement("li");
    item.className =
      index < state.currentBlock ? "done" : index === state.currentBlock ? "active" : "";
    item.innerHTML = `<span class="step-dot">${index < state.currentBlock ? "✓" : index + 1}</span><span>${block.title}</span>`;
    els.progressList.appendChild(item);
  });
}

function renderConversation() {
  els.conversation.innerHTML = "";
  blocks.slice(0, Math.min(state.currentBlock + 1, blocks.length)).forEach((block, index) => {
    appendMessage(block.intro, "agent");
    if (index < state.currentBlock) {
      const summary = block.questions
        .map((question) => `${question.label} ${valueFor(question.id)}`)
        .join(" ");
      appendMessage(summary, "user");
    }
  });
}

function appendMessage(text, type) {
  const message = document.createElement("div");
  message.className = `message ${type}`;
  message.innerHTML = `<p>${escapeHtml(text)}</p>`;
  els.conversation.appendChild(message);
}

function renderForm() {
  const block = blocks[state.currentBlock];
  els.phaseTitle.textContent = block.title;
  els.planOutput.hidden = true;
  els.questionForm.hidden = false;
  els.questionForm.innerHTML = "";

  block.questions.forEach((question) => {
    const field = els.fieldTemplate.content.firstElementChild.cloneNode(true);
    field.querySelector(".field-label").textContent = question.label;
    field.querySelector(".field-help").textContent = question.help || "";
    const input = createInput(question);
    input.name = question.id;
    input.required = true;
    input.value = state.answers[question.id] || "";
    field.appendChild(input);
    els.questionForm.appendChild(field);
  });

  const actions = document.createElement("div");
  actions.className = "form-actions";
  actions.innerHTML = `
    <span class="hint">Bloque ${state.currentBlock + 1} de ${blocks.length}</span>
    ${state.currentBlock > 0 ? '<button class="ghost-button" type="button" data-back>Anterior</button>' : ""}
    <button class="primary-button" type="submit">${state.currentBlock === blocks.length - 1 ? "Generar plan" : "Continuar"}</button>
  `;
  els.questionForm.appendChild(actions);

  const backButton = els.questionForm.querySelector("[data-back]");
  if (backButton) {
    backButton.addEventListener("click", () => {
      state.currentBlock -= 1;
      saveState();
      render();
    });
  }

  els.questionForm.onsubmit = (event) => {
    event.preventDefault();
    new FormData(els.questionForm).forEach((value, key) => {
      state.answers[key] = String(value).trim();
    });
    if (state.currentBlock === blocks.length - 1) {
      state.generated = true;
    } else {
      state.currentBlock += 1;
    }
    saveState();
    render();
  };
}

function createInput(question) {
  if (question.type === "textarea") {
    const textarea = document.createElement("textarea");
    textarea.rows = 4;
    return textarea;
  }
  if (question.type === "select") {
    const select = document.createElement("select");
    select.innerHTML = `<option value="">Selecciona una opción</option>${question.options
      .map((option) => `<option value="${escapeHtml(option)}">${escapeHtml(option)}</option>`)
      .join("")}`;
    return select;
  }
  const input = document.createElement("input");
  input.type = question.type || "text";
  if (question.type === "number") input.min = "0";
  return input;
}

function renderPlan() {
  const analysis = analyze();
  els.phaseTitle.textContent = "Plan generado";
  els.questionForm.hidden = true;
  els.planOutput.hidden = false;
  els.conversation.innerHTML = "";
  appendMessage(
    "Listo. Con tus respuestas preparé una ruta práctica y realista para tu MYPE.",
    "agent",
  );
  els.planOutput.innerHTML = `
    <div class="plan-actions">
      <span class="copy-feedback" id="copyFeedback" aria-live="polite"></span>
      <button class="tool-button" type="button" id="copyPlan">Copiar plan</button>
      <button class="tool-button" type="button" id="downloadPlan">Descargar TXT</button>
      <button class="primary-button" type="button" id="editAnswers">Editar respuestas</button>
    </div>
    ${buildReportHtml(analysis)}
  `;
  document.querySelector("#copyPlan").addEventListener("click", copyPlan);
  document.querySelector("#downloadPlan").addEventListener("click", downloadPlan);
  document.querySelector("#editAnswers").addEventListener("click", () => {
    state.generated = false;
    state.currentBlock = 0;
    saveState();
    render();
  });
}

function analyze() {
  const a = state.answers;
  const text = Object.values(a).join(" ").toLowerCase();
  let score = 1;
  const hasDigital = /excel|sheet|sheets|whatsapp business|pos|sistema|form|forms|trello|notion|power bi|canva/.test(text);
  const hasOrganized = /base de datos|reporte|indicador|dashboard|control|crm|inventario|margen|rentabilidad/.test(text);
  const hasAutomation = /automat|zapier|make|power automate|alerta|integr/.test(text);
  const hasAi = /chatgpt|gemini|claude|ia|inteligencia artificial/.test(text);
  if (hasDigital || ["Sí", "A veces"].includes(a.redes) || a.whatsapp_business === "Sí") score = 2;
  if (hasOrganized || a.base_clientes === "Sí" || a.indicadores === "Sí, de forma regular") score = 3;
  if (hasAutomation) score = 4;
  if (hasAutomation && hasAi && /dashboard|predict|pronostic|power bi/.test(text)) score = 5;

  const roadmapMonths = a.roadmap === "12 meses" ? 12 : 6;
  const priority = a.area_prioritaria || "Ventas";
  const digitalBudget = /alto/i.test(a.ia_presupuesto || "")
    ? "alto"
    : /medio/i.test(a.ia_presupuesto || "")
      ? "medio"
      : "bajo";

  return {
    level: score,
    levelName: ["", "Manual", "Digital básico", "Organizado", "Automatizado", "Inteligente"][score],
    roadmapMonths,
    priority,
    budget: digitalBudget,
    appliesInventory: !/no aplica|no manejo|sin inventario/.test((a.inventario || "").toLowerCase()),
  };
}

function buildReportHtml(analysis) {
  const a = state.answers;
  const roadmap = buildRoadmap(analysis);
  return `
    <div class="report" id="report">
      <section class="report-section">
        <h2>Ruta Digital para tu MYPE</h2>
        <p class="report-byline">Consultoría preparada por Ing. Segundo Morales</p>
        <p>Este plan usa tus respuestas y evita asumir datos no indicados. Donde falte precisión, trabaja con acciones de ordenamiento antes de recomendar herramientas más complejas.</p>
      </section>
      <section class="report-section">
        <h2>1. Resumen del negocio</h2>
        <p><strong>Actividad:</strong> ${v("actividad")}. <strong>Oferta:</strong> ${v("oferta")}. <strong>Canales:</strong> ${v("canales")}.</p>
        <p>El objetivo principal declarado es: <strong>${v("resultado_buscado")}</strong>. Meta: ${v("meta")}.</p>
      </section>
      <section class="report-section">
        <h2>2. Diagnóstico de madurez digital</h2>
        <p><strong>Nivel ${analysis.level}: ${analysis.levelName}.</strong> ${levelReason(analysis)}</p>
        <p><strong>Brechas principales:</strong> ${brechas(analysis).join("; ")}.</p>
        <p><strong>Riesgos si no mejora:</strong> pérdida de ventas por falta de seguimiento, decisiones con información incompleta, errores repetidos y más tiempo operativo del necesario.</p>
      </section>
      <section class="report-section">
        <h2>3. Principales problemas detectados</h2>
        <ul>${problems().map((item) => `<li>${item}</li>`).join("")}</ul>
      </section>
      <section class="report-section">
        <h2>4. Oportunidades de mejora con tecnología e IA</h2>
        <ul>${opportunities(analysis).map((item) => `<li>${item}</li>`).join("")}</ul>
      </section>
      <section class="report-section">
        <h2>5. Roadmap de transformación digital</h2>
        <table class="roadmap">
          <thead><tr><th>Mes</th><th>Enfoque</th><th>Acciones clave</th><th>Herramientas sugeridas</th><th>Resultado esperado</th><th>Indicador</th></tr></thead>
          <tbody>${roadmap
            .map(
              (row) => `<tr><td>${row.mes}</td><td>${row.enfoque}</td><td>${row.acciones}</td><td>${row.herramientas}</td><td>${row.resultado}</td><td>${row.indicador}</td></tr>`,
            )
            .join("")}</tbody>
        </table>
      </section>
      <section class="report-section">
        <h2>6. Primeras 5 acciones para empezar esta semana</h2>
        <ul>
          <li>Crear una hoja simple con fecha, cliente, producto o servicio, monto, canal y estado de pago.</li>
          <li>Separar gastos fijos, variables y compras en una hoja de control mensual.</li>
          <li>Ordenar contactos de clientes en una base con nombre, celular, última compra e interés.</li>
          <li>Configurar respuestas rápidas en WhatsApp Business para preguntas frecuentes.</li>
          <li>Elegir 3 indicadores semanales: ventas, clientes nuevos y cotizaciones convertidas.</li>
        </ul>
      </section>
      <section class="report-section">
        <h2>7. Herramientas recomendadas</h2>
        <div class="tool-grid">
          <div class="tool-group"><h3>Gratuitas o bajo costo</h3><p>Google Sheets, Excel, WhatsApp Business, Google Forms, Canva, Trello, Notion, ChatGPT o Gemini en plan gratuito.</p></div>
          <div class="tool-group"><h3>Intermedias</h3><p>Power BI, Looker Studio, Meta Business Suite, Make, Zapier, Power Automate, un POS simple o CRM ligero.</p></div>
          <div class="tool-group"><h3>Avanzadas</h3><p>ERP, CRM completo, e-commerce integrado, automatizaciones con APIs y modelos de IA conectados a datos. Usarlas solo después de ordenar procesos.</p></div>
        </div>
      </section>
      <section class="report-section">
        <h2>8. Indicadores mínimos que debería medir</h2>
        <ul>${[
          "Ventas mensuales",
          "Ticket promedio",
          "Clientes nuevos",
          "Clientes recurrentes",
          "Productos o servicios más vendidos",
          "Gastos principales",
          "Margen estimado",
          "Tiempo dedicado a tareas manuales",
          "Tasa de conversión de cotizaciones",
          "Nivel de atención a clientes",
        ]
          .map((item) => `<li>${item}</li>`)
          .join("")}</ul>
      </section>
      <section class="report-section">
        <h2>9. Automatizaciones sugeridas</h2>
        <ul>${automations(analysis).map((item) => `<li>${item}</li>`).join("")}</ul>
      </section>
      <section class="report-section">
        <h2>10. Uso práctico de IA</h2>
        <ul>${prompts(analysis).map((item) => `<li><strong>${item.title}:</strong> ${item.prompt}</li>`).join("")}</ul>
      </section>
      <section class="report-section">
        <h2>11. Recomendación final</h2>
        <p>La prioridad no es comprar más tecnología, sino ordenar el flujo comercial y operativo para que la información sea confiable. Empieza con controles simples, revisa indicadores cada semana y automatiza solo lo repetitivo. Con esa base, la IA se vuelve una ayuda real para vender mejor, responder más rápido y decidir con más claridad.</p>
        <p><strong>Ing. Segundo Morales</strong></p>
      </section>
    </div>
  `;
}

function levelReason(analysis) {
  if (analysis.level === 1) return "El negocio parece depender principalmente de registros manuales, memoria o conversaciones sin estructura.";
  if (analysis.level === 2) return "Ya usa herramientas digitales básicas, pero todavía falta integración, indicadores y seguimiento consistente.";
  if (analysis.level === 3) return "Cuenta con registros o controles digitales, aunque aún puede mejorar automatización y tableros de decisión.";
  if (analysis.level === 4) return "Ya aparecen automatizaciones o herramientas conectadas; el siguiente paso es consolidar datos e IA práctica.";
  return "El negocio muestra uso de datos, IA y automatización; conviene enfocarse en mejora continua y predicción.";
}

function brechas(analysis) {
  const items = [
    "estandarizar registros de ventas, clientes y gastos",
    "definir responsables y frecuencia de actualización",
    "crear indicadores simples para revisar cada semana",
  ];
  if (analysis.appliesInventory) items.push("ordenar inventario y alertas de stock");
  if (analysis.level < 4) items.push("automatizar tareas repetitivas después de ordenar datos");
  return items;
}

function problems() {
  return [
    `Tiempo consumido: ${v("tareas_tiempo")}`,
    `Procesos manuales: ${v("procesos_manuales")}`,
    `Errores frecuentes: ${v("errores")}`,
    `Información difícil de obtener: ${v("info_dificil")}`,
    `Área prioritaria: ${v("area_prioritaria")}`,
  ];
}

function opportunities(analysis) {
  const inventory = analysis.appliesInventory
    ? "Inventario y operaciones: controlar entradas, salidas y stock mínimo para evitar quiebres o compras innecesarias."
    : "Operaciones: documentar pasos repetitivos y tiempos de atención para reducir reprocesos.";
  return [
    "Ventas: registrar prospectos, cotizaciones y cierres para saber qué canal trae mejores clientes.",
    "Marketing: crear calendario de publicaciones y reutilizar IA para ideas, copys y guiones cortos.",
    "Atención al cliente: usar WhatsApp Business con etiquetas, respuestas rápidas y seguimiento.",
    "Finanzas: separar ventas, costos y gastos para estimar margen y rentabilidad.",
    inventory,
    "Administración: pasar controles dispersos a una hoja maestra con responsables y fechas.",
    "Toma de decisiones con datos: revisar semanalmente ventas, ticket promedio, conversión y gastos principales.",
  ];
}

function buildRoadmap(analysis) {
  const base = [
    ["Ordenar información", "Crear plantillas de ventas, gastos, clientes y cotizaciones. Definir campos obligatorios.", "Google Sheets o Excel, Google Forms", "Información mínima en un solo lugar", "Registros completos por semana"],
    ["Seguimiento comercial", "Crear pipeline simple: prospecto, cotizado, ganado, perdido. Etiquetar clientes en WhatsApp.", "WhatsApp Business, Trello o Sheets", "Menos oportunidades olvidadas", "Cotizaciones con seguimiento"],
    ["Control financiero", "Clasificar gastos, calcular ticket promedio y margen estimado. Revisar resultados cada semana.", "Excel, Sheets, Looker Studio básico", "Mayor claridad de rentabilidad", "Margen estimado mensual"],
    [analysis.appliesInventory ? "Inventario y operación" : "Operación", analysis.appliesInventory ? "Definir stock mínimo, registrar entradas y salidas, listar productos de mayor rotación." : "Mapear tareas repetitivas, responsables y tiempos de atención.", "Sheets, Forms, Trello", "Menos errores operativos", analysis.appliesInventory ? "Alertas de stock bajo" : "Tiempo por proceso"],
    ["Marketing e IA", "Crear calendario de contenidos, prompts para publicaciones y respuestas frecuentes.", "Canva, ChatGPT, Gemini, Meta Business Suite", "Más constancia comercial", "Publicaciones por semana"],
    ["Dashboard y hábitos", "Armar reporte semanal de ventas, clientes, gastos y conversión. Tomar decisiones en reunión corta.", "Looker Studio, Power BI o Sheets", "Decisiones con datos", "Reporte revisado cada semana"],
  ];
  const extra = [
    ["Automatización inicial", "Automatizar captura de prospectos desde Forms y recordatorios de seguimiento.", "Make, Zapier o Power Automate", "Menos digitación manual", "Prospectos registrados automáticamente"],
    ["Atención escalable", "Crear banco de respuestas y guiones con IA para objeciones, reclamos y consultas frecuentes.", "WhatsApp Business, ChatGPT, Gemini", "Respuestas más rápidas y consistentes", "Tiempo promedio de respuesta"],
    ["Optimización de ventas", "Analizar productos, servicios o canales más rentables. Mejorar ofertas y combos.", "Sheets, Power BI, IA", "Mejores decisiones comerciales", "Ventas por canal o categoría"],
    ["Integración ligera", "Conectar formularios, hojas y alertas. Evitar copiar datos entre herramientas.", "Make, Zapier, Power Automate", "Flujo más automático", "Tareas manuales reducidas"],
    ["Estandarización", "Documentar procesos clave y crear checklist de apertura, cierre, ventas y postventa.", "Notion, Trello, Docs", "Operación más ordenada", "Procesos documentados"],
    ["Mejora continua", "Revisar indicadores, ajustar automatizaciones y definir el siguiente nivel tecnológico.", "Dashboard, IA, reuniones mensuales", "Sistema sostenible", "Acciones de mejora ejecutadas"],
  ];
  return base.concat(analysis.roadmapMonths === 12 ? extra : []).map((row, index) => ({
    mes: index + 1,
    enfoque: row[0],
    acciones: row[1],
    herramientas: row[2],
    resultado: row[3],
    indicador: row[4],
  }));
}

function automations(analysis) {
  const items = [
    "Registro automático de prospectos desde un formulario hacia una hoja de cálculo.",
    "Respuestas frecuentes con IA para consultas repetidas en WhatsApp.",
    "Seguimiento de cotizaciones con fecha de próximo contacto.",
    "Recordatorios de pago para clientes pendientes.",
    "Reporte semanal de ventas enviado al responsable.",
    "Calendario de publicaciones con ideas generadas por IA.",
  ];
  if (analysis.appliesInventory) {
    items.push("Control básico de inventario con alertas de stock bajo.");
  }
  return items;
}

function prompts() {
  return [
    {
      title: "Crear publicaciones",
      prompt:
        "Actúa como especialista en marketing para una MYPE. Crea 5 publicaciones para [tipo de negocio] enfocadas en [producto o servicio], con tono cercano y llamada a la acción por WhatsApp.",
    },
    {
      title: "Responder clientes",
      prompt:
        "Redacta una respuesta breve, amable y vendedora para un cliente que pregunta: [pegar consulta]. Incluye precio o próximos pasos si corresponde.",
    },
    {
      title: "Analizar ventas",
      prompt:
        "Analiza esta tabla de ventas y dime los productos más vendidos, ticket promedio, días fuertes y 3 recomendaciones prácticas: [pegar datos].",
    },
    {
      title: "Crear campañas",
      prompt:
        "Propón una campaña de 7 días para vender [producto o servicio] a [tipo de cliente], con mensajes para redes y WhatsApp.",
    },
    {
      title: "Mejorar ofertas",
      prompt:
        "Dame 5 ideas de paquetes, combos u ofertas para aumentar el ticket promedio de este negocio: [describir negocio].",
    },
    {
      title: "Redactar correos",
      prompt:
        "Redacta un correo profesional para enviar una cotización de [servicio/producto], con beneficios, condiciones y cierre claro.",
    },
    {
      title: "Ideas de contenido",
      prompt:
        "Genera 20 ideas de contenido educativo y comercial para una MYPE de [rubro], ordenadas por objetivo: atraer, convertir y fidelizar.",
    },
    {
      title: "Videos cortos",
      prompt:
        "Crea 5 guiones de video corto de 30 segundos para promocionar [producto/servicio], con gancho inicial, demostración y llamada a la acción.",
    },
  ];
}

function copyPlan() {
  navigator.clipboard.writeText(buildPlainText()).then(() => {
    document.querySelector("#copyFeedback").textContent = "Plan copiado";
  });
}

function downloadPlan() {
  const blob = new Blob([buildPlainText()], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "ruta-digital-mype.txt";
  link.click();
  URL.revokeObjectURL(url);
}

function buildPlainText() {
  const report = document.querySelector("#report");
  return report ? report.innerText.replace(/\n{3,}/g, "\n\n") : "";
}

function v(id) {
  return escapeHtml(valueFor(id));
}

function valueFor(id) {
  return state.answers[id] || "No indicado";
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
