# Installation & Quick Start

Diese Anleitung ist so geschrieben, dass eine technisch versierte Person das Projekt ohne Rückfragen starten kann.

!!! info "Zwei Repositories"
    - Projektcode: https://github.com/CHFChris/Dokumentenmanager  
    - Diese Dokumentation: https://github.com/CHFChris/Dokumentation-zur-Projektarbeit

## Voraussetzungen

### Laufzeitumgebungen
- Git
- Python 3.11+ (empfohlen 3.12)

### Datenbank
- MariaDB oder MySQL (lokal installiert)

### Optional (Frontend)
- Node.js 18+ (nur für das optionale Frontend)

### Optional (OCR, aber Feature-relevant)
- Tesseract OCR (System-Binary)
- Poppler (für `pdf2image`; wird bei PDF-OCR benötigt)

## Schritt-für-Schritt (Backend + Web-UI)

### 1) Repository klonen

```bash
git clone https://github.com/CHFChris/Dokumentenmanager.git
cd Dokumentenmanager
```

### 2) Virtuelle Umgebung erstellen und aktivieren

```bash
python -m venv .venv

# Windows
.venv\Scripts\activate

# Linux/Mac
# source .venv/bin/activate
```

### 3) Datenbank anlegen (MariaDB/MySQL)

Erstelle Datenbank und Benutzer (Beispiel):

```sql
CREATE DATABASE dokumentenmanager CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'dm'@'localhost' IDENTIFIED BY 'dm_password';
GRANT ALL PRIVILEGES ON dokumentenmanager.* TO 'dm'@'localhost';
FLUSH PRIVILEGES;
```

### 4) Python-Abhängigkeiten installieren

Aktueller Stand im Projekt-Repository: `requirements.txt` ist als kommentierte Paketliste gepflegt (kein sauberes Pinning).  
Für einen reproduzierbaren Start gibt es zwei robuste Wege:

Variante A (falls pip die Datei akzeptiert):
```bash
pip install -r requirements.txt
```

Variante B (robust, unabhängig von `requirements.txt`):
```bash
pip install fastapi uvicorn[standard] python-multipart jinja2 sqlalchemy alembic pymysql pydantic-settings python-dotenv passlib[bcrypt] python-jose[cryptography] cryptography pillow pytesseract pdf2image pypdf python-docx scikit-learn email-validator
```

### 5) .env anlegen (Pflicht)

Wichtig: Die Settings erlauben nur bekannte Variablen. Zusätzliche Keys in der `.env` können den Start verhindern (`extra="forbid"`).

Datei `.env` im Projekt-Root erstellen:

```dotenv
APP_NAME=Dokumentenmanager
APP_ENV=development

PUBLIC_BASE_URL=http://127.0.0.1:8000

SECRET_KEY=CHANGE_ME_MIN_16_CHARS
DB_URL=mysql+pymysql://dm:dm_password@127.0.0.1:3306/dokumentenmanager?charset=utf8mb4

FILES_FERNET_KEY=CHANGE_ME_FERNET_KEY

MAIL_FROM=no-reply@example.org
MAIL_FROM_NAME=Dokumentenmanager
MAIL_SERVER=127.0.0.1
MAIL_PORT=1025
MAIL_USERNAME=
MAIL_PASSWORD=
MAIL_USE_TLS=false

ACCESS_TOKEN_EXPIRE_MINUTES=60
REFRESH_TOKEN_EXPIRE_DAYS=7

RESET_RATE_LIMIT_MINUTES=10
RESET_TOKEN_EXPIRE_MINUTES=60
```

Fernet-Key generieren:

```bash
python -c "from cryptography.fernet import Fernet; print(Fernet.generate_key().decode())"
```

#### Erklärung relevanter Parameter

| Variable | Zweck |
|---|---|
| SECRET_KEY | Signierung/Token-Sicherheit; darf nicht geleakt werden |
| DB_URL | SQLAlchemy URL zu MariaDB/MySQL |
| FILES_FERNET_KEY | Schlüssel für die Datei-Verschlüsselung; ohne ihn sind gespeicherte Dateien nicht wiederherstellbar |
| FILES_DIR | Ablagepfad verschlüsselter Dateien (Default: `./data/files`) |
| MAIL_* | SMTP für Verifikation/Reset/MFA (lokal oft ohne TLS) |
| PUBLIC_BASE_URL | Basis-URL für Links in E-Mails |

Sicherheitsrelevante Hinweise:
- `.env` nicht committen (über `.gitignore`).
- `FILES_FERNET_KEY` und `SECRET_KEY` müssen geheim bleiben und bei Verdacht rotiert werden.
- Backups: Ohne `FILES_FERNET_KEY` sind verschlüsselte Dateien wertlos.

### 6) Migrationen ausführen (Pflicht)

Alembic nutzt die `DB_URL` aus der `.env`.

```bash
alembic upgrade head
```

### 7) Backend starten

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

`start_project.bat` startet Backend und Frontend in getrennten Fenstern und zeigt die URLs im Terminal an.

## Smoke-Test (5 Minuten)

1. Öffne `/dashboard` und prüfe Navigation.
2. Registrieren und Login.
3. Datei über `/upload` hochladen.
4. Suche testen (`/search`) und Dokumentliste (`/documents`).
5. OCR-Test (optional): Swagger -> POST `/debug-ocr/test` mit PDF/JPG/PNG/DOCX.
