# Installation & Quickstart

Diese Anleitung beschreibt die vollständige lokale Inbetriebnahme des Dokumentenmanagers. Eine technisch versierte Drittperson soll das Projekt ohne zusätzliche Rückfragen reproduzierbar aufsetzen können.

---

## Voraussetzungen

| Komponente | Version | Zweck |
|---|---|---|
| **Git** | aktuell | Repository klonen |
| **Python** | 3.11+, empfohlen 3.12 | Backend-Laufzeit |
| **MariaDB / MySQL** | 10.6+ / 8.0+ | Relationale Datenhaltung |
| **Tesseract OCR** | 5.x | OCR-Textextraktion (optional) |
| **Poppler** | aktuell | PDF-zu-Bild-Konvertierung für OCR (optional) |
| **Node.js** | 18+ | Separates Frontend (optional) |

!!! warning "OCR-Abhängigkeiten"
    Tesseract und Poppler sind **Systempakete**, die separat installiert werden müssen. Die Python-Bibliotheken `pytesseract` und `pdf2image` sind lediglich Wrapper und funktionieren ohne die zugehörigen Systemtools nicht.

---

## Schritt 1: Repository klonen

```bash
git clone https://github.com/CHFChris/Dokumentenmanager.git
cd Dokumentenmanager
```

Für eine saubere Reproduktion empfiehlt sich ein frischer Klon in ein leeres Verzeichnis ohne Altbestände früherer virtueller Umgebungen.

## Schritt 2: Virtuelle Umgebung erstellen

=== "Linux / macOS"

    ```bash
    python -m venv .venv
    source .venv/bin/activate
    ```

=== "Windows"

    ```bash
    python -m venv .venv
    .venv\Scripts\activate
    ```

!!! info "Warum eine virtuelle Umgebung?"
    Eine virtuelle Umgebung verhindert Versionskonflikte mit global installierten Paketen und stellt sicher, dass das Setup auf anderen Rechnern reproduzierbar bleibt. Bei Projekten mit OCR-, Kryptografie- und Web-Abhängigkeiten ist saubere Paketisolation besonders wichtig.

## Schritt 3: Python-Abhängigkeiten installieren

```bash
pip install -r requirements.txt
```

Falls keine vollständige `requirements.txt` vorhanden ist, kann alternativ diese Minimalinstallation verwendet werden:

```bash
pip install fastapi uvicorn[standard] python-multipart jinja2 sqlalchemy \
    alembic pymysql pydantic-settings python-dotenv cryptography PyJWT \
    passlib[bcrypt] pillow pytesseract pdf2image pypdf python-docx \
    email-validator scikit-learn
```

??? note "Einordnung der wichtigsten Pakete"
    | Paket | Zweck |
    |---|---|
    | `fastapi` | Webanwendung und OpenAPI-Dokumentation |
    | `uvicorn` | ASGI-Server |
    | `sqlalchemy` | ORM für objektorientierten Datenbankzugriff |
    | `alembic` | Reproduzierbare Schema-Migrationen |
    | `cryptography` | Fernet-basierte Dateiverschlüsselung |
    | `pytesseract` / `pdf2image` / `pypdf` | OCR-Pipeline |
    | `passlib[bcrypt]` | Sicheres Passwort-Hashing |
    | `PyJWT` | Token-basierte Authentifizierung |

## Schritt 4: Umgebungsvariablen konfigurieren

Im Root-Verzeichnis des Projekts eine Datei `.env` anlegen. Die Anwendung validiert ihre Einstellungen strikt – fehlende oder fehlerhafte Einträge blockieren den Start bewusst, um stille Fehlkonfigurationen zu vermeiden.

```dotenv
# Allgemein
APP_NAME=Dokumentenmanager
APP_ENV=development
PUBLIC_BASE_URL=http://127.0.0.1:8000

# Sicherheit
SECRET_KEY=CHANGE_ME_MIN_16_CHARS
FILES_FERNET_KEY=CHANGE_ME_FERNET_BASE64

# Datenbank
DB_URL=mysql+pymysql://dm:dm_password@127.0.0.1:3306/dokumentenmanager?charset=utf8mb4

# Dateispeicher
FILES_DIR=./data/files
MAX_UPLOAD_MB=50

# Token-Konfiguration
ACCESS_TOKEN_EXPIRE_MINUTES=60
REFRESH_TOKEN_EXPIRE_DAYS=7

# E-Mail (SMTP)
MAIL_FROM=no-reply@example.org
MAIL_FROM_NAME=Dokumentenmanager
MAIL_SERVER=127.0.0.1
MAIL_PORT=1025
MAIL_USERNAME=
MAIL_PASSWORD=
MAIL_USE_TLS=false

# Rate Limiting
RESET_RATE_LIMIT_MINUTES=10
RESET_TOKEN_EXPIRE_MINUTES=60
```

### Erklärung der wichtigsten Parameter

| Variable | Zweck |
|---|---|
| `SECRET_KEY` | Geheimschlüssel für JWT-Token und Integritätsfunktionen. Muss zufällig und geheim sein. |
| `FILES_FERNET_KEY` | Schlüssel für Fernet-Verschlüsselung der Dateiinhalte. Erzeugung z. B. mit `python -c "from cryptography.fernet import Fernet; print(Fernet.generate_key().decode())"` |
| `DB_URL` | SQLAlchemy-Verbindungsstring zur Datenbank |
| `FILES_DIR` | Verzeichnis für verschlüsselte Dateien, getrennt von der Datenbank |
| `MAIL_*` | SMTP-Konfiguration für Verifikations-Mails, MFA-Codes und Passwort-Reset |

!!! danger "Sicherheitshinweise zur `.env`"
    - Die `.env` darf **niemals** in das Repository eingecheckt werden (`.gitignore` prüfen).
    - `SECRET_KEY` und `FILES_FERNET_KEY` müssen zufällig und geheim erzeugt werden.
    - Werden Schlüssel nachträglich geändert, können bestehende Token und verschlüsselte Dateien unbrauchbar werden. Schlüsselrotation muss geplant erfolgen.

## Schritt 5: Datenbank vorbereiten

```sql
CREATE DATABASE dokumentenmanager
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

CREATE USER 'dm'@'%' IDENTIFIED BY 'dm_password';
GRANT ALL PRIVILEGES ON dokumentenmanager.* TO 'dm'@'%';
FLUSH PRIVILEGES;
```

Die Wahl von `utf8mb4` stellt sicher, dass Umlaute, Sonderzeichen und unterschiedliche Dokumenttitel konsistent verarbeitet werden.

## Schritt 6: Migrationen ausführen

```bash
alembic upgrade head
```

Alembic erzeugt das vollständige Datenbankschema nachvollziehbar und versionskontrolliert. Spätere Schemaänderungen lassen sich damit konsistent nachziehen.

## Schritt 7: Backend starten

```bash
python -m uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
```

Nach dem Start ist die Anwendung unter folgenden URLs erreichbar:

| URL | Funktion |
|---|---|
| `http://127.0.0.1:8000/` | Web-UI (Redirect zum Dashboard) |
| `http://127.0.0.1:8000/dashboard` | Dashboard |
| `http://127.0.0.1:8000/docs` | Swagger UI (OpenAPI) |
| `http://127.0.0.1:8000/openapi.json` | OpenAPI-Spezifikation |

## Optional: Frontend separat starten

Falls ein separates Frontend gepflegt wird:

```bash
cd dokumentenmanager_frontend
npm install
npm run dev -- --port 5173
```

---

## Smoke-Test nach der Installation

1. Registrierung oder Login aufrufen
2. Dashboard laden – Kennzahlen und Navigation prüfen
3. Datei hochladen (PDF oder DOCX)
4. Kategorien und Schlüsselwörter zuweisen
5. Volltextsuche aufrufen und hochgeladenes Dokument finden
6. Dokumentdetail öffnen und Metadaten prüfen
7. Favorit setzen und in Favoritenübersicht prüfen
8. Dokument in den Papierkorb verschieben und wiederherstellen

---

## Häufige Fehler und Lösungen

!!! failure "OCR funktioniert nicht"
    Meist fehlen Tesseract oder Poppler auf dem Systempfad. Die Python-Bibliotheken allein reichen nicht. Unter Windows muss der Installationspfad von Tesseract ggf. in der Umgebungsvariable `TESSERACT_CMD` konfiguriert werden.

!!! failure "Anwendung startet nicht trotz installierter Pakete"
    Häufige Ursache: fehlerhafte `.env`, falscher Datenbanktreiber oder ungültige `DB_URL`. Die strikte Validierung der Settings ist gewollt und schützt vor stillen Fehlkonfigurationen.

!!! failure "Uploads schlagen fehl"
    Prüfenswert: `FILES_DIR` existiert und ist beschreibbar, `MAX_UPLOAD_MB` ist ausreichend dimensioniert. Unter Windows können gesperrte Verzeichnisse oder OneDrive-Synchronisation zusätzliche Probleme verursachen.
