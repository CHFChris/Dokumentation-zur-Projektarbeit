# Installation & Quick Start

Diese Anleitung ist so geschrieben, dass eine technisch versierte Person das Projekt **ohne Rückfragen** lokal oder via Docker starten kann.

## Voraussetzungen

### Minimal (Backend + DB)

- Python **3.11+** (empfohlen 3.12)
- MariaDB/MySQL (oder Docker)
- Node.js **18+** nur falls das React‑Frontend genutzt wird
- Git

### OCR (optional, aber Feature‑kritisch)

- **Tesseract OCR** (System‑Binary)
- **Poppler** / `poppler-utils` (für `pdf2image` PDF→Bild)

## Schnellstart mit Docker Compose (empfohlen)

```bash
git clone https://github.com/CHFChris/Dokumentenmanager.git
cd Dokumentenmanager

cp .env.example .env
# .env: SECRET_KEY, FILES_FERNET_KEY, DB_URL prüfen/anpassen

docker compose up --build
