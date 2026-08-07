# Flask + SQLite + HTML/CSS/JS Project

This project uses:

- Frontend: HTML, CSS, JavaScript
- Backend: Flask
- Database: SQLite

## Folder Structure

```text
backend-db-starter/
  app.py
  database.db
  requirements.txt
  templates/
    index.html
  static/
    css/
      style.css
    js/
      script.js
```

## Run The Project

Install Flask:

```powershell
pip install -r requirements.txt
```

Start the Flask server:

```powershell
python app.py
```

Open this in your browser:

```text
http://127.0.0.1:5000
```

## Database

SQLite creates the database automatically as:

```text
database.db
```

The app stores contact form data in a `contacts` table.

## API Routes

```text
GET  /
GET  /api/health
GET  /api/contacts
POST /api/contacts
```

## Connect Your Existing Frontend

Put your HTML inside `templates/index.html`.

Put CSS here:

```text
static/css/style.css
```

Put JavaScript here:

```text
static/js/script.js
```

Use this in your HTML:

```html
<link rel="stylesheet" href="{{ url_for('static', filename='css/style.css') }}">
<script src="{{ url_for('static', filename='js/script.js') }}"></script>
```
