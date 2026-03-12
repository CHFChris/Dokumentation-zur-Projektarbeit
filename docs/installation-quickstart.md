# Installation & Quick Start

Diese Seite beschreibt eine reproduzierbare lokale Inbetriebnahme des Dokumentenmanagers. Der Schwerpunkt liegt auf einem Setup, das ein technisch versierter Dritter ohne zusätzliche Rückfragen umsetzen kann. Gleichzeitig werden die zentralen Konfigurationsparameter erläutert, damit nicht bloß eine lauffähige Instanz entsteht, sondern auch verstanden wird, welche Abhängigkeiten für Sicherheit, OCR, Datenhaltung und Dateiverschlüsselung relevant sind.

## Voraussetzungen

### Laufzeitumgebungen

- Git
- Python 3.11 oder neuer, empfohlen 3.12
- MariaDB oder MySQL
- Optional: Node.js 18 oder neuer für das separate Frontend
- Optional für OCR: Tesseract OCR, Poppler und systemabhängige Konfiguration von `pytesseract` bzw. `pdf2image`

### Warum diese Voraussetzungen notwendig sind

Der Dokumentenmanager ist kein reines Dateiupload-Tool. Die Anwendung führt mehrere technische Aufgaben zusammen: HTTP-Handling, Template-Rendering, Datenbankzugriffe, Dateiverschlüsselung, OCR-Extraktion und gegebenenfalls Mailversand für Verifikation, MFA oder Reset-Prozesse. Aus diesem Grund reicht eine einfache Python-Installation allein nicht aus. Insbesondere OCR ist ein Bereich, in dem viele Projekte an stillschweigenden Systemabhängigkeiten scheitern. Deshalb werden diese Voraussetzungen explizit genannt und später im Abschnitt zu bekannten Problemen erneut aufgegriffen.

## Schritt 1: Repository klonen

```bash
git clone https://github.com/CHFChris/Dokumentenmanager.git
cd Dokumentenmanager
```

Nach dem Klonen sollte zuerst geprüft werden, auf welchem Branch gearbeitet wird und ob der lokale Stand mit dem dokumentierten Setup übereinstimmt. Für eine saubere Reproduktion empfiehlt sich ein frischer Klon in ein leeres Verzeichnis ohne Altbestände früherer virtueller Umgebungen.

## Schritt 2: Virtuelle Umgebung erstellen und aktivieren

```bash
python -m venv .venv
```

**Windows:**

```bash
.venv\Scripts\activate
```

**Linux / macOS:**

```bash
source .venv/bin/activate
```

Die Nutzung einer virtuellen Umgebung ist nicht optional, sondern fachlich sinnvoll. Sie verhindert Versionskonflikte mit global installierten Paketen und sorgt dafür, dass ein anderer Rechner das Setup reproduzierbar nachbilden kann. Gerade bei Projekten mit OCR-, Kryptografie- und Web-Abhängigkeiten ist eine saubere Paketisolation ein wesentlicher Bestandteil technischer Professionalität.

## Schritt 3: Python-Abhängigkeiten installieren

```bash
pip install -r requirements.txt
```

Falls im verwendeten Stand des Repositories keine vollständige klassische `requirements.txt` vorhanden ist oder einzelne Bibliotheken ergänzt werden müssen, kann diese robuste Minimalinstallation verwendet werden:

```bash
pip install fastapi uvicorn[standard] python-multipart jinja2 sqlalchemy alembic pymysql pydantic-settings python-dotenv cryptography PyJWT passlib[bcrypt] pillow pytesseract pdf2image pypdf python-docx email-validator scikit-learn
```

### Einordnung der wichtigsten Pakete

- **FastAPI** stellt die Webanwendung und OpenAPI-Dokumentation bereit.
- **Uvicorn** dient als ASGI-Server.
- **SQLAlchemy** kapselt den Datenbankzugriff objektorientiert.
- **Alembic** verwaltet reproduzierbare Schema-Migrationen.
- **cryptography** wird für Fernet-gestützte Verschlüsselung genutzt.
- **pytesseract**, **pdf2image** und **pypdf** bilden die OCR-Verarbeitung ab.
- **passlib[bcrypt]** unterstützt sicheres Passwort-Hashing.

## Schritt 4: `.env`-Datei anlegen

Im Root-Verzeichnis des Repositories muss eine Datei `.env` erstellt werden. Dieser Schritt ist besonders wichtig, weil das Projekt seine Einstellungen strikt validiert. Unbekannte oder fehlerhafte Einträge können den Start blockieren. Genau dadurch wird zwar die Fehlersuche am Anfang etwas strenger, langfristig erhöht dieser Ansatz aber die Wartbarkeit und reduziert stille Fehlkonfigurationen.

```dotenv
APP_NAME=Dokumentenmanager
APP_ENV=development

PUBLIC_BASE_URL=http://127.0.0.1:8000

SECRET_KEY=CHANGE_ME_MIN_16_CHARS
FILES_FERNET_KEY=CHANGE_ME_FERNET_BASE64

DB_URL=mysql+pymysql://dm:dm_password@127.0.0.1:3306/dokumentenmanager?charset=utf8mb4

FILES_DIR=./data/files
MAX_UPLOAD_MB=50

ACCESS_TOKEN_EXPIRE_MINUTES=60
REFRESH_TOKEN_EXPIRE_DAYS=7

MAIL_FROM=no-reply@example.org
MAIL_FROM_NAME=Dokumentenmanager
MAIL_SERVER=127.0.0.1
MAIL_PORT=1025
MAIL_USERNAME=
MAIL_PASSWORD=
MAIL_USE_TLS=false

RESET_RATE_LIMIT_MINUTES=10
RESET_TOKEN_EXPIRE_MINUTES=60
```

## Erklärung der relevanten Konfigurationsparameter

| Variable | Zweck | Fachliche Bedeutung |
|---|---|---|
| `APP_NAME` | Anzeigename der Anwendung | Nützlich für Mails, Logs und konsistente Systemidentität |
| `APP_ENV` | Laufzeitmodus | Unterscheidung zwischen Entwicklung und produktionsnahen Setups |
| `PUBLIC_BASE_URL` | Öffentliche Basis-URL | Wichtig für Links in Verifikations- oder Reset-Mails |
| `SECRET_KEY` | Geheimschlüssel für Token / Integritätsfunktionen | Sicherheitssensitiver Kernparameter |
| `FILES_FERNET_KEY` | Schlüssel für Datei- und Textverschlüsselung | Schützt sensible Dateiinhalte im Dateisystem |
| `DB_URL` | Datenbankverbindung | Verknüpft Anwendung und relationale Persistenz |
| `FILES_DIR` | Speicherort verschlüsselter Dateien | Trennt Binärdaten von relationalen Metadaten |
| `MAX_UPLOAD_MB` | Maximale Uploadgröße | Schutz vor Überlastung und Fehlbedienung |
| `MAIL_*` | SMTP-Konfiguration | Erforderlich für Verifikation, MFA und Passwort-Reset |
| `RESET_*` | Limitierung und Lebensdauer von Tokens | Schutz gegen Missbrauch und unsaubere Token-Lebenszyklen |

## Sicherheitsrelevante Hinweise zur `.env`

- Die Datei `.env` darf niemals in das Repository eingecheckt werden.
- `SECRET_KEY` und `FILES_FERNET_KEY` müssen zufällig und geheim erzeugt werden.
- In produktionsnahen Umgebungen dürfen Datenbank und Mailserver nicht ohne Netzsegmentierung öffentlich erreichbar sein.
- Werden Schlüssel nachträglich geändert, können bestehende Tokens oder verschlüsselte Inhalte unbrauchbar werden. Schlüsselrotation muss daher geplant und dokumentiert erfolgen.

## Schritt 5: Datenbank vorbereiten

Beispiel für MariaDB oder MySQL:

```sql
CREATE DATABASE dokumentenmanager CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'dm'@'%' IDENTIFIED BY 'dm_password';
GRANT ALL PRIVILEGES ON dokumentenmanager.* TO 'dm'@'%';
FLUSH PRIVILEGES;
```

Dieser Schritt erzeugt die technische Grundlage, auf der Alembic später das eigentliche Schema aufbauen kann. Die Wahl von `utf8mb4` ist wichtig, damit auch Sonderzeichen, Umlaute und unterschiedliche Dokumenttitel konsistent verarbeitet werden.

## Schritt 6: Migrationen ausführen

```bash
alembic upgrade head
```

Alembic stellt sicher, dass sich das Datenbankschema nachvollziehbar und versionskontrolliert entwickelt. Damit wird nicht nur die Erstinstallation reproduzierbar, sondern auch spätere Weiterentwicklungen können konsistent nachgezogen werden. Das ist wesentlich professioneller als manuelle SQL-Anpassungen direkt in der Datenbank.

## Schritt 7: Backend starten

```bash
python -m uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
```

Danach ist die Anwendung unter folgenden URLs erreichbar:

- **Web-UI:** `http://127.0.0.1:8000/`
- **Dashboard:** `http://127.0.0.1:8000/dashboard`
- **Swagger UI:** `http://127.0.0.1:8000/docs`
- **OpenAPI JSON:** `http://127.0.0.1:8000/openapi.json`

## Optional: Frontend separat starten

Wenn im Projektstand zusätzlich ein separates Frontend gepflegt wird:

```bash
cd dokumentenmanager_frontend
npm install
npm run dev -- --port 5173
```

Dieser Schritt ist für den Kernnutzen des Projekts nicht zwingend, kann aber für getrennte UI-Experimente oder modernere Oberflächenvarianten relevant sein.

## Smoke Test für die Erstprüfung

1. Registrierung oder Login aufrufen
2. Dashboard laden
3. Datei hochladen
4. Kategorien und Schlüsselwörter prüfen
5. Suche aufrufen
6. Dokumentdetail öffnen
7. Favorit setzen
8. Papierkorb testen
9. Optional OCR-Debug-Endpunkt aufrufen

## Häufige Fehlerbilder

### OCR funktioniert nicht

Meist fehlen Tesseract oder Poppler auf dem Systempfad. Die Python-Bibliotheken allein reichen nicht. Dieses Problem ist typisch für OCR-Projekte und sollte deshalb bei Vorführungen immer im Vorfeld geprüft werden.

### Anwendung startet nicht trotz installierter Pakete

Oft ist die Ursache eine fehlerhafte `.env`, ein falscher Datenbanktreiber oder eine ungültige Datenbank-URL. Da die Settings bewusst streng validiert werden, ist dieses Verhalten gewollt und verbessert langfristig die Stabilität.

### Uploads schlagen fehl

Hier lohnt sich ein Blick auf `FILES_DIR`, Dateiberechtigungen, Uploadgrößen und verfügbare Schreibrechte. Gerade unter Windows können gesperrte Verzeichnisse oder OneDrive-Synchronisation zusätzlichen Ärger verursachen. Kleine Kobolde in Dateipfaden sind erstaunlich ausdauernd.
