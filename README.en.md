# Task Manager

🇧🇷 Leia em portugues: [README.md](README.md)

A responsive task management web app built with **vanilla HTML, CSS, and JavaScript** (no frameworks and no external dependencies).

## Features

- **Full CRUD**: create, list, edit, and delete tasks
- **Task priority**: None, Low, Medium, and High, with badges and automatic sorting
- **Due dates**: assign deadlines and visually highlight overdue tasks
- **Live search**: instant filtering by title or description
- **Status workflow**: Pending, In Progress, and Done, including restore from Done back to Pending
- **Status filters with counters**: All, Pending, In Progress, and Done with dynamic counts
- **Drag-and-drop reorder**: reorder task cards on desktop
- **Light/Dark theme**: theme toggle persisted in `localStorage`
- **Bilingual UI**: switch between Portuguese (pt-BR) and English (en)
- **Local persistence**: tasks, theme, and language saved in `localStorage`

## Tech Stack

| Layer      | Technology |
| ---------- | ---------- |
| Structure  | Semantic HTML5 |
| Styling    | CSS3 (custom properties, Grid/Flex, responsive layout) |
| Logic      | Vanilla JavaScript (ES2022+) |
| Storage    | Web Storage API (`localStorage`) |
| IDs        | `crypto.randomUUID()` |

## Project Structure

```
index.html   - UI structure and controls
styles.css   - styling, themes, and responsive layout
app.js       - CRUD, status, priority, due date, filters, search, drag-and-drop, i18n, and persistence
```

## How to Run

Live version (GitHub Pages): https://mihawkx.github.io/gestao-tarefas/

**Option 1 - Open directly in the browser**

Open `index.html` in your browser.

**Option 2 - Local server (recommended)**

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

- The app does not use a backend and makes no network requests at runtime.
- The default language (when no preference is saved) is **pt-BR**.
- The default theme (when no preference is saved) is **dark**.
- To reset data, clear this site's `localStorage` in your browser.

## License

This project is for study and personal use.
