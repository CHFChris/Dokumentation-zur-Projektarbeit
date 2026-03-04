# Technische Dokumentation – Projektstruktur

## Projekt-Repository (Code)

Repository: https://github.com/CHFChris/Dokumentenmanager

```text
.
├─ app/                         FastAPI Backend (API + Web-UI)
├─ dokumentenmanager_frontend/  Optionales Frontend (Vite/React)
├─ migrations/                  Alembic Migrationen
├─ .gitignore
├─ README.md
├─ alembic.ini
├─ requirements.txt             kommentierte Paketliste (kein Pinning)
└─ start_project.bat            Windows Starter (Backend + Frontend)
```

## Dokumentations-Repository

Repository: https://github.com/CHFChris/Dokumentation-zur-Projektarbeit

```text
.
├─ docs/                        MkDocs Seiten (Markdown)
├─ mkdocs.yml                   Navigation/Theme/Plugins
└─ .github/workflows/           GitHub Pages Deployment (Actions)
```

## 3-Schichtenmodell (vereinfacht)

- Präsentation:
  - Web-UI via Jinja2 (Backend)
  - Optional: React/Vite Frontend
- Logik:
  - FastAPI Router + Services (Upload, OCR, Duplikate, Versionen, Suche, Trash)
- Daten:
  - SQLAlchemy + MariaDB/MySQL
  - Verschlüsselte Dateiablage im Dateisystem (`FILES_DIR`)
