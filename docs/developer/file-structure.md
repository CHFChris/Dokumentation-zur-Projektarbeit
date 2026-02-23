# Technische Dokumentation – Projektstruktur

```text
.
├─ app/                       # FastAPI Backend (API + Web UI)
│  ├─ api/                    # Router/Endpunkte
│  ├─ core/                   # Settings, Security
│  ├─ db/                     # DB-Initialisierung
│  ├─ models/                 # ORM Models
│  ├─ repositories/           # DB-Zugriffe
│  ├─ services/               # Business Logic (OCR, Versionen, Trash, etc.)
│  ├─ utils/                  # Helpers (z. B. Verschlüsselung)
│  └─ web/                    # Jinja2 Templates + Web Router
├─ migrations/                # Alembic Migrationen
├─ dokumentenmanager_frontend/# React/Vite (optional/prototypisch)
├─ requirements.txt
├─ alembic.ini
└─ start_project.bat