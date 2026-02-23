const STORAGE_KEY = "task-manager-tasks";
const THEME_KEY = "task-manager-theme";
const LANG_KEY = "task-manager-lang";

const TRANSLATIONS = {
  en: {
    appTitle: "Task Manager",
    appDescription: "Manage your tasks with a simple card-based CRUD flow.",
    createTask: "Create Task",
    editTask: "Edit Task",
    labelTitle: "Title",
    labelDescription: "Description",
    placeholderTitle: "Task title",
    placeholderDescription: "What needs to be done?",
    addTask: "Add Task",
    saveChanges: "Save Changes",
    cancelEdit: "Cancel Edit",
    yourTasks: "Your Tasks",
    filterAll: "All",
    filterPending: "Pending",
    filterInProgress: "In Progress",
    filterDone: "Done",
    emptyNoTasks: "No tasks yet. Add your first one above.",
    emptyNoFilter: "No tasks for this filter.",
    darkMode: "Dark Mode",
    lightMode: "Light Mode",
    langToggle: "PT-BR",
    statusPending: "Pending",
    statusInProgress: "In Progress",
    statusDone: "Done",
    noDescription: "No description",
    restore: "Restore",
    edit: "Edit",
    deleteConfirm: "Are you sure you want to delete this task?",
    deleteLabel: "Delete task",
    taskFilters: "Task filters",
  },
  "pt-br": {
    appTitle: "Gerenciador de Tarefas",
    appDescription: "Gerencie suas tarefas com um fluxo simples baseado em cartões.",
    createTask: "Criar Tarefa",
    editTask: "Editar Tarefa",
    labelTitle: "Título",
    labelDescription: "Descrição",
    placeholderTitle: "Título da tarefa",
    placeholderDescription: "O que precisa ser feito?",
    addTask: "Adicionar Tarefa",
    saveChanges: "Salvar Alterações",
    cancelEdit: "Cancelar Edição",
    yourTasks: "Suas Tarefas",
    filterAll: "Todas",
    filterPending: "Pendente",
    filterInProgress: "Em Andamento",
    filterDone: "Concluída",
    emptyNoTasks: "Nenhuma tarefa ainda. Adicione a primeira acima.",
    emptyNoFilter: "Nenhuma tarefa para este filtro.",
    darkMode: "Modo Escuro",
    lightMode: "Modo Claro",
    langToggle: "EN",
    statusPending: "Pendente",
    statusInProgress: "Em Andamento",
    statusDone: "Concluída",
    noDescription: "Sem descrição",
    restore: "Restaurar",
    edit: "Editar",
    deleteConfirm: "Tem certeza que deseja excluir esta tarefa?",
    deleteLabel: "Excluir tarefa",
    taskFilters: "Filtros de tarefa",
  },
};

function t(key) {
  return (TRANSLATIONS[currentLang] ?? TRANSLATIONS.en)[key] ?? key;
}

const STATUS_PENDING = "pending";
const STATUS_IN_PROGRESS = "in-progress";
const STATUS_DONE = "done";

const form = document.getElementById("task-form");
const formTitle = document.getElementById("form-title");
const taskIdInput = document.getElementById("task-id");
const titleInput = document.getElementById("title");
const descriptionInput = document.getElementById("description");
const saveButton = document.getElementById("save-btn");
const cancelButton = document.getElementById("cancel-btn");
const taskList = document.getElementById("task-list");
const emptyState = document.getElementById("empty-state");
const filtersContainer = document.getElementById("filters");
const themeToggleButton = document.getElementById("theme-toggle");
const langToggleButton = document.getElementById("lang-toggle");

let tasks = loadTasks();
let editingTaskId = null;
let currentFilter = "all";
let currentTheme = loadTheme();
let currentLang = loadLang();
let draggedTaskId = null;

applyTheme(currentTheme);
applyLanguage(currentLang);

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const title = titleInput.value.trim();
  const description = descriptionInput.value.trim();

  if (!title) {
    titleInput.focus();
    return;
  }

  if (editingTaskId) {
    updateTask(editingTaskId, { title, description });
    resetForm();
  } else {
    const newTask = {
      id: crypto.randomUUID(),
      title,
      description,
      status: STATUS_PENDING,
      createdAt: Date.now(),
    };

    tasks.unshift(newTask);
    saveTasks();
    renderTasks();
    form.reset();
    titleInput.focus();
  }
});

cancelButton.addEventListener("click", () => {
  resetForm();
});

taskList.addEventListener("click", (event) => {
  const targetButton = event.target.closest("button[data-action]");

  if (!targetButton) {
    return;
  }

  const { action, id } = targetButton.dataset;

  if (action === "edit") {
    startEditTask(id);
  }

  if (action === "status") {
    const { status } = targetButton.dataset;
    setTaskStatus(id, status);
  }

  if (action === "delete") {
    const confirmed = window.confirm(t("deleteConfirm"));

    if (confirmed) {
      deleteTask(id);
    }
  }
});

taskList.addEventListener("dragstart", (event) => {
  const card = event.target.closest(".task-card[data-id]");

  if (!card) {
    return;
  }

  draggedTaskId = card.dataset.id;
  card.classList.add("is-dragging");

  if (event.dataTransfer) {
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("text/plain", draggedTaskId);
  }
});

taskList.addEventListener("dragover", (event) => {
  const card = event.target.closest(".task-card[data-id]");

  if (!card || card.dataset.id === draggedTaskId) {
    return;
  }

  event.preventDefault();
  const dropAfter = shouldDropAfterTarget(event, card);

  clearDragState();
  card.classList.add(dropAfter ? "drag-over-after" : "drag-over-before");
});

taskList.addEventListener("dragleave", (event) => {
  const card = event.target.closest(".task-card[data-id]");

  if (!card) {
    return;
  }

  card.classList.remove("drag-over-before", "drag-over-after");
});

taskList.addEventListener("drop", (event) => {
  const targetCard = event.target.closest(".task-card[data-id]");

  if (!targetCard || !draggedTaskId) {
    return;
  }

  event.preventDefault();
  targetCard.classList.remove("drag-over-before", "drag-over-after");

  const targetTaskId = targetCard.dataset.id;

  if (targetTaskId !== draggedTaskId) {
    const dropAfter = shouldDropAfterTarget(event, targetCard);
    moveTaskRelativeToTarget(draggedTaskId, targetTaskId, dropAfter);
  }
});

taskList.addEventListener("dragend", () => {
  draggedTaskId = null;
  clearDragState();
});

filtersContainer.addEventListener("click", (event) => {
  const filterButton = event.target.closest("button[data-filter]");

  if (!filterButton) {
    return;
  }

  currentFilter = filterButton.dataset.filter;
  renderTasks();
});

themeToggleButton.addEventListener("click", () => {
  currentTheme = currentTheme === "dark" ? "light" : "dark";
  applyTheme(currentTheme);
  saveTheme(currentTheme);
});

langToggleButton.addEventListener("click", () => {
  const newLang = currentLang === "en" ? "pt-br" : "en";
  applyLanguage(newLang);
  saveLang(newLang);
});

function renderTasks() {
  taskList.innerHTML = "";
  updateFilterUI();

  const visibleTasks = getFilteredTasks();

  if (visibleTasks.length === 0) {
    emptyState.classList.remove("hidden");
    emptyState.textContent = tasks.length === 0 ? t("emptyNoTasks") : t("emptyNoFilter");
    return;
  }

  emptyState.classList.add("hidden");

  for (const task of visibleTasks) {
    const card = document.createElement("article");
    card.className = "task-card" + (task.status === STATUS_DONE ? " is-done" : "");
    card.dataset.id = task.id;
    card.draggable = true;

    const statusClass = `status-pill--${task.status}`;
    const statusText = getStatusLabel(task.status);

    card.innerHTML = `
      <h3 class="task-card__title"></h3>
      <p class="task-card__description"></p>
      <div class="task-meta">
        <span class="status-pill ${statusClass}">${statusText}</span>
      </div>
      <div class="task-actions">
        ${task.status === STATUS_DONE ? `
        <button class="btn-status-pending" data-action="status" data-status="${STATUS_PENDING}" data-id="${task.id}">${t("restore")}</button>
        ` : `
        <button class="btn-edit" data-action="edit" data-id="${task.id}">${t("edit")}</button>
        <button class="btn-status-pending" data-action="status" data-status="${STATUS_PENDING}" data-id="${task.id}">${t("statusPending")}</button>
        <button class="btn-status-progress" data-action="status" data-status="${STATUS_IN_PROGRESS}" data-id="${task.id}">${t("statusInProgress")}</button>
        <button class="btn-status-done" data-action="status" data-status="${STATUS_DONE}" data-id="${task.id}">${t("statusDone")}</button>
        `}
      </div>
      <button class="btn-delete-x" data-action="delete" data-id="${task.id}" aria-label="${t("deleteLabel")}">&times;</button>
    `;

    card.querySelector(".task-card__title").textContent = task.title;
    card.querySelector(".task-card__description").textContent = task.description || t("noDescription");

    taskList.append(card);
  }
}

function getFilteredTasks() {
  const filtered = currentFilter === "all" ? tasks : tasks.filter((task) => task.status === currentFilter);

  return [...filtered].sort((a, b) => {
    if (a.status === STATUS_DONE && b.status !== STATUS_DONE) return 1;
    if (a.status !== STATUS_DONE && b.status === STATUS_DONE) return -1;
    return 0;
  });
}

function updateFilterUI() {
  const filterButtons = filtersContainer.querySelectorAll("button[data-filter]");

  for (const button of filterButtons) {
    const isActive = button.dataset.filter === currentFilter;
    button.classList.toggle("is-active", isActive);
  }
}

function getStatusLabel(status) {
  if (status === STATUS_DONE) return t("statusDone");
  if (status === STATUS_IN_PROGRESS) return t("statusInProgress");
  return t("statusPending");
}

function startEditTask(taskId) {
  const task = tasks.find((item) => item.id === taskId);

  if (!task) {
    return;
  }

  editingTaskId = task.id;
  taskIdInput.value = task.id;
  titleInput.value = task.title;
  descriptionInput.value = task.description;

  formTitle.textContent = t("editTask");
  saveButton.textContent = t("saveChanges");
  cancelButton.hidden = false;
  titleInput.focus();
}

function updateTask(taskId, updates) {
  tasks = tasks.map((task) => {
    if (task.id === taskId) {
      return {
        ...task,
        ...updates,
      };
    }

    return task;
  });

  saveTasks();
  renderTasks();
}

function setTaskStatus(taskId, status) {
  if (![STATUS_PENDING, STATUS_IN_PROGRESS, STATUS_DONE].includes(status)) {
    return;
  }

  tasks = tasks.map((task) => {
    if (task.id === taskId && task.status !== status) {
      return {
        ...task,
        status,
      };
    }

    return task;
  });

  saveTasks();
  renderTasks();
}

function deleteTask(taskId) {
  tasks = tasks.filter((task) => task.id !== taskId);

  if (editingTaskId === taskId) {
    resetForm();
  }

  saveTasks();
  renderTasks();
}

function moveTaskRelativeToTarget(draggedId, targetId, dropAfter) {
  const draggedIndex = tasks.findIndex((task) => task.id === draggedId);
  const originalTargetIndex = tasks.findIndex((task) => task.id === targetId);

  if (draggedIndex < 0 || originalTargetIndex < 0 || draggedIndex === originalTargetIndex) {
    return;
  }

  const [draggedTask] = tasks.splice(draggedIndex, 1);
  const targetIndex = tasks.findIndex((task) => task.id === targetId);
  const destinationIndex = dropAfter ? targetIndex + 1 : targetIndex;

  tasks.splice(destinationIndex, 0, draggedTask);

  saveTasks();
  renderTasks();
}

function clearDragState() {
  const draggingCards = taskList.querySelectorAll(
    ".task-card.is-dragging, .task-card.drag-over-before, .task-card.drag-over-after"
  );

  for (const card of draggingCards) {
    card.classList.remove("is-dragging", "drag-over-before", "drag-over-after");
  }
}

function shouldDropAfterTarget(event, targetCard) {
  const rect = targetCard.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  const distanceX = event.clientX - centerX;
  const distanceY = event.clientY - centerY;

  if (Math.abs(distanceX) >= Math.abs(distanceY)) {
    return distanceX > 0;
  }

  return distanceY > 0;
}

function resetForm() {
  editingTaskId = null;
  taskIdInput.value = "";
  form.reset();

  formTitle.textContent = t("createTask");
  saveButton.textContent = t("addTask");
  cancelButton.hidden = true;
}

function saveTasks() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

function applyTheme(theme) {
  document.body.dataset.theme = theme;
  themeToggleButton.textContent = theme === "dark" ? t("lightMode") : t("darkMode");
}

function saveTheme(theme) {
  localStorage.setItem(THEME_KEY, theme);
}

function loadTheme() {
  const savedTheme = localStorage.getItem(THEME_KEY);

  if (savedTheme === "light" || savedTheme === "dark") {
    return savedTheme;
  }

  return "dark";
}

function applyLanguage(lang) {
  currentLang = lang;
  document.documentElement.lang = lang === "pt-br" ? "pt-BR" : "en";
  document.title = t("appTitle");

  document.querySelector(".app__header h1").textContent = t("appTitle");
  document.querySelector(".app__header p").textContent = t("appDescription");
  document.querySelector("label[for='title']").textContent = t("labelTitle");
  document.querySelector("label[for='description']").textContent = t("labelDescription");
  titleInput.placeholder = t("placeholderTitle");
  descriptionInput.placeholder = t("placeholderDescription");
  document.querySelector(".tasks-header-row h2").textContent = t("yourTasks");
  filtersContainer.setAttribute("aria-label", t("taskFilters"));

  const filterMap = { all: "filterAll", pending: "filterPending", "in-progress": "filterInProgress", done: "filterDone" };
  filtersContainer.querySelectorAll("button[data-filter]").forEach((btn) => {
    btn.textContent = t(filterMap[btn.dataset.filter]);
  });

  if (editingTaskId) {
    formTitle.textContent = t("editTask");
    saveButton.textContent = t("saveChanges");
  } else {
    formTitle.textContent = t("createTask");
    saveButton.textContent = t("addTask");
  }
  cancelButton.textContent = t("cancelEdit");

  applyTheme(currentTheme);
  langToggleButton.textContent = t("langToggle");

  renderTasks();
}

function saveLang(lang) {
  localStorage.setItem(LANG_KEY, lang);
}

function loadLang() {
  const saved = localStorage.getItem(LANG_KEY);
  return saved === "en" ? "en" : "pt-br";
}

function loadTasks() {
  const raw = localStorage.getItem(STORAGE_KEY);

  if (!raw) {
    return [];
  }

  try {
    const parsed = JSON.parse(raw);

    if (Array.isArray(parsed)) {
      return parsed.map((task) => normalizeTask(task)).filter(Boolean);
    }

    return [];
  } catch {
    return [];
  }
}

function normalizeTask(task) {
  if (!task || typeof task !== "object") {
    return null;
  }

  const normalizedStatus = normalizeStatus(task.status, task.completed);

  return {
    id: typeof task.id === "string" ? task.id : crypto.randomUUID(),
    title: typeof task.title === "string" ? task.title : "Untitled task",
    description: typeof task.description === "string" ? task.description : "",
    status: normalizedStatus,
    createdAt: typeof task.createdAt === "number" ? task.createdAt : Date.now(),
  };
}

function normalizeStatus(status, completed) {
  if ([STATUS_PENDING, STATUS_IN_PROGRESS, STATUS_DONE].includes(status)) {
    return status;
  }

  if (typeof completed === "boolean") {
    return completed ? STATUS_DONE : STATUS_PENDING;
  }

  return STATUS_PENDING;
}
