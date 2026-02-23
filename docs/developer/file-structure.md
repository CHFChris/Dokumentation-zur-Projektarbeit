# Technische Dokumentation – Projektstruktur

## Repository-Root

```text
.
├─ app/                        FastAPI Backend (API + Web-UI)
├─ dokumentenmanager_frontend/ Optionales Frontend (Vite/React)
├─ migrations/                 Alembic Migrationen
├─ requirements.txt            Abhängigkeiten (aktuell als Notizformat)
├─ alembic.ini                 Alembic Konfiguration (script_location=migrations)
└─ start_project.bat           Windows-Startscript (Backend + Frontend)
```

## Backend: app/

```text
app/
├─ api/
│  ├─ routes/                  JSON-Router (auth, files, users, debug_ocr, ...)
│  └─ deps.py                  Dependencies (Auth/Web-User)
├─ core/
│  └─ config.py                Settings (.env, required keys, extra=forbid)
├─ db/
│  └─ database.py              Engine/Session/Base, init_models()
├─ models/                     ORM-Modelle
├─ repositories/               DB-Zugriff (CRUD)
├─ services/                   Business-Logik (OCR, Versionen, Papierkorb, ...)
├─ utils/                      Hilfsfunktionen (Verschlüsselung, Hashing, Files)
└─ web/
   ├─ templates/               Jinja2 Templates
   └─ static/                  CSS/JS/Assets
```

## Schichtenmodell (3-Schichten)

- Präsentation: Web-UI (Jinja2) und optional Frontend (Vite)
- Logik: FastAPI Router + Services
- Daten: SQLAlchemy + MariaDB/MySQL + verschlüsselte Dateien im Dateisystem
