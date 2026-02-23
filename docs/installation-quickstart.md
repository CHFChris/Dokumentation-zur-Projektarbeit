# Installation & Quick Start

Diese Anleitung ist so formuliert, dass eine technisch versierte Person den Dokumentenmanager ohne Rückfragen lokal starten kann.

## Voraussetzungen

### Minimal (Backend + Web-UI)

- Git
- Python 3.11+ (empfohlen 3.12)
- MariaDB oder MySQL (lokal oder Container)

### Optional (Frontend)

- Node.js 18+ (npm inklusive)

### Optional (OCR-Features)

- Tesseract OCR (System-Binary)
- Poppler (wird von pdf2image für PDF-OCR genutzt)

## Schritt-für-Schritt

### 1) Repository klonen

```bash
git clone https://github.com/CHFChris/Dokumentenmanager.git
cd Dokumentenmanager

### 2) Repository klonen
python -m venv .venv

# Windows
.venv\Scripts\activate

# Linux/Mac
# source .venv/bin/activate

### 3) Dependencies installieren

Primär:

pip install -r requirements.txt

Hinweis:
Im aktuellen Repo ist requirements.txt als kommentierte Checkliste formatiert. Wenn pip nichts installiert, installiere die Mindestpakete manuell (siehe unten).

Mindestpakete (Backend + OCR + DB):

pip install fastapi uvicorn[standard] python-multipart jinja2 sqlalchemy alembic pymysql pydantic-settings python-dotenv cryptography PyJWT passlib[argon2] pillow pytesseract pdf2image pypdf python-docx email-validator
### 4) .env anlegen

Im Repo-Root eine Datei .env erstellen:

APP_ENV=development
PUBLIC_BASE_URL=http://127.0.0.1:8000

SECRET_KEY=CHANGE_ME_MIN_16_CHARS
FILES_FERNET_KEY=CHANGE_ME_FERNET_BASE64

DB_URL=mysql+pymysql://dm:dm_password@127.0.0.1:3306/dokumentenmanager?charset=utf8mb4

FILES_DIR=./data/files
MAX_UPLOAD_MB=50

MAIL_FROM=no-reply@example.org
MAIL_FROM_NAME=Dokumentenmanager
MAIL_SERVER=127.0.0.1
MAIL_PORT=1025
MAIL_USERNAME=
MAIL_PASSWORD=
MAIL_USE_TLS=false

Sicherheitsrelevant:

.env nicht committen.

SECRET_KEY und FILES_FERNET_KEY sind Geheimnisse.

### 5) Datenbank initialisieren (Alembic)

Einmalig ausführen:

alembic upgrade head

Wenn das fehlschlägt:

DB nicht erreichbar oder DB_URL falsch.

### 6) Backend starten
python -m uvicorn app.main:app --reload --host 127.0.0.1 --port 8000

Danach:

Web-UI: http://127.0.0.1:8000/
 (Redirect auf /dashboard)

Swagger: http://127.0.0.1:8000/docs

### 7) Frontend starten (optional)
cd dokumentenmanager_frontend
npm install
npm run dev -- --port 5173

Frontend:

http://127.0.0.1:5173/

Windows Shortcut: start_project.bat

Unter Windows kann start_project.bat Backend und Frontend in getrennten Fenstern starten (inklusive npm install beim ersten Mal).

Voraussetzung:

DB erreichbar

Migrationen mindestens einmal angewendet (alembic upgrade head)