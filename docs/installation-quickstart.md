# Installation & Quick Start

Diese Anleitung ist so geschrieben, dass eine technisch versierte Person das Projekt ohne Rückfragen starten kann.

## Voraussetzungen

### Software

- Git
- Python 3.11+ (empfohlen 3.12)
- MariaDB oder MySQL (lokal installiert)
- Node.js 18+ (nur für das optionale Frontend)

### OCR (optional, aber Feature-relevant)

- Tesseract OCR (System-Binary)
- Poppler (für pdf2image; wird bei PDF-OCR benötigt)

## Repository klonen

```bash
git clone https://github.com/CHFChris/Dokumentenmanager.git
cd Dokumentenmanager
```

## Virtuelle Umgebung erstellen und aktivieren

```bash
python -m venv .venv

# Windows
.venv\Scripts\activate

# Linux/Mac
# source .venv/bin/activate
```

## Python-Abhängigkeiten installieren

Aktueller Stand im Repository: Die Datei requirements.txt ist als Notizzeile formatiert und wird von pip nicht zuverlässig als Paketliste gelesen.
Für einen reproduzierbaren Start wird eine echte requirements.txt benötigt.

### Option A: requirements.txt ersetzen (empfohlen für Reproduzierbarkeit)

Ersetze den Inhalt von requirements.txt durch diese Zeilen:

```text
fastapi
uvicorn[standard]
python-multipart
jinja2
sqlalchemy
alembic
pymysql
pydantic>=2
pydantic-settings
python-dotenv
passlib[bcrypt]
python-jose[cryptography]
cryptography
Pillow
pytesseract
pdf2image
pypdf
python-docx
email-validator
scikit-learn
```

Dann installieren:

```bash
pip install -r requirements.txt
```

### Option B: Direkt installieren (wenn requirements.txt unverändert bleibt)

```bash
pip install fastapi uvicorn[standard] python-multipart jinja2 sqlalchemy alembic pymysql pydantic>=2 pydantic-settings python-dotenv passlib[bcrypt] python-jose[cryptography] cryptography Pillow pytesseract pdf2image pypdf python-docx email-validator scikit-learn
```

## Datenbank vorbereiten

MariaDB/MySQL: Datenbank und Nutzer anlegen (Beispiel):

```sql
CREATE DATABASE dokumentenmanager CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'dm'@'localhost' IDENTIFIED BY 'dm_password';
GRANT ALL PRIVILEGES ON dokumentenmanager.* TO 'dm'@'localhost';
FLUSH PRIVILEGES;
```

## .env anlegen (Pflicht)

Wichtig: Die Settings erlauben nur bekannte Variablen. Zusätzliche Keys in der .env können den Start verhindern.

Datei .env im Projekt-Root erstellen:

```dotenv
APP_ENV=development
PUBLIC_BASE_URL=http://127.0.0.1:8000

SECRET_KEY=CHANGE_ME_MIN_16_CHARS
DB_URL=mysql+pymysql://dm:dm_password@127.0.0.1:3306/dokumentenmanager?charset=utf8mb4

FILES_FERNET_KEY=CHANGE_ME_FERNET_KEY

MAIL_FROM=no-reply@example.org
MAIL_FROM_NAME=Dokumentenmanager
MAIL_SERVER=127.0.0.1
MAIL_PORT=1025
MAIL_USE_TLS=false
```

Fernet-Key generieren:

```bash
python -c "from cryptography.fernet import Fernet; print(Fernet.generate_key().decode())"
```

## Migrationen ausführen (Pflicht)

Alembic nutzt die DB_URL aus der .env.

```bash
alembic upgrade head
```

## Backend starten

```bash
python -m uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
```

Danach erreichbar:

- Web-UI: http://127.0.0.1:8000/ (Redirect auf /dashboard)
- Swagger: http://127.0.0.1:8000/docs
- OpenAPI JSON: http://127.0.0.1:8000/openapi.json

## Frontend starten (optional)

```bash
cd dokumentenmanager_frontend
npm ci || npm install
npm run dev -- --port 5173
```

Frontend:

- http://127.0.0.1:5173/

## Windows-Shortcut

start_project.bat startet Backend und Frontend in getrennten Fenstern und zeigt die URLs im Terminal an.
