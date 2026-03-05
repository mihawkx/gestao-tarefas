# Task Manager

🇧🇷 Leia em português: [README.pt-BR.md](README.pt-BR.md)

A responsive, full-featured task management web app built with **vanilla HTML, CSS, and JavaScript** — no frameworks, no dependencies.

## Features

- **Full CRUD** — create, read, update, and delete tasks
- **Task priority** — mark tasks as High, Medium, or Low priority, with colored badges and automatic sort (high priority tasks surface first)
- **Due dates** — set deadlines per task; overdue tasks are visually flagged with a red indicator
- **Live search** — instantly filter tasks by title or description as you type
- **Status workflow** — move tasks between Pending → In Progress → Done
- **Status filters** — view all tasks or filter by status; each filter shows a live count badge
- **Drag-and-drop reorder** — rearrange cards by dragging them on desktop
- **Light / Dark mode** — theme persists across sessions via `localStorage`
- **Bilingual UI** — full English and Brazilian Portuguese support, toggled at runtime
- **Persistent data** — all tasks, theme, and language preference are saved to `localStorage`
- **Accessible markup** — semantic HTML5 elements, ARIA labels, and keyboard-navigable controls

## Tech Stack

| Layer      | Technology                          |
| ---------- | ----------------------------------- |
| Structure  | HTML5 (semantic elements)           |
| Styling    | CSS3 (custom properties, CSS Grid, Flexbox, responsive layout) |
| Logic      | Vanilla JavaScript (ES2022+)        |
| Storage    | Web Storage API (`localStorage`)    |
| IDs        | `crypto.randomUUID()`               |

> Built without any frameworks or build tools — everything runs directly in the browser.

## Project Structure

```
index.html   – app layout and controls
styles.css   – design system, card UI, theme, and responsive styles
app.js       – CRUD logic, priority/due-date handling, filters, search, drag-and-drop, i18n, and persistence
```

## Run Locally

**Option 1 — Open directly**

Open `index.html` in your browser.

**Option 2 — Local dev server (recommended)**

Using Python:
```bash
python -m http.server
```
Then open `http://localhost:8000`.

Using Node.js (`npx`):
```bash
npx serve .
```

## Notes

- All data lives in the browser. To reset, clear `localStorage` for this site in DevTools.
- The app is fully offline — no network requests are made at runtime.

## License

This project is for study and personal use.
