# Task Manager (CRUD)

🇧🇷 Leia em português: [README.pt-BR.md](README.pt-BR.md)

A simple card-styled task management web app built with **HTML, CSS, and JavaScript**.

## Features

- Create tasks with title and description
- View tasks as responsive cards
- Edit existing tasks
- Delete tasks
- Set task status to:
  - Pending
  - In Progress
  - Done
- Filter tasks by status (All, Pending, In Progress, Done)
- Toggle Light/Dark mode
- Persist data using `localStorage`

## Project Structure

- `index.html` – app layout and controls
- `styles.css` – card UI and theme styles
- `app.js` – CRUD logic, filters, status handling, and persistence

## Run Locally

### Option 1: Open directly

Open `index.html` in your browser.

### Option 2: Use a local server (recommended)

If you have Python installed:

```bash
python -m http.server
```

Then open:

```text
http://localhost:8000
```

## Notes

- Tasks and selected theme are saved in your browser storage.
- To reset data, clear `localStorage` for this site in the browser.

## License

This project is for study and personal use.
