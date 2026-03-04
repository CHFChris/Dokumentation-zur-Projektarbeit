# Technische Strategie

## Technologie-Stack

| Bereich | Auswahl | Begründung |
|---|---|---|
| Backend | FastAPI | schnelle Entwicklung, integrierte OpenAPI/Swagger-Doku |
| ORM/Migrationen | SQLAlchemy + Alembic | Wartbarkeit, Schema-Entwicklung, Migrationen |
| Datenbank | MariaDB/MySQL | verbreitet, stabil, geeignet für CRUD-lastige Systeme |
| Web-UI | Jinja2 | reproduzierbar, wenig Client-Komplexität |
| Frontend (optional) | Vite/React | moderne UI möglich, getrennte Entwicklung |
| OCR | Tesseract + pdf2image + pypdf | offline, keine laufenden Kosten; PDF-Textlayer zuerst |
| Security | JWT + HttpOnly-Cookie + Fernet | nachvollziehbare Schutzmechanismen, Verschlüsselung at rest |

## Abwägung gegenüber Alternativen

- PostgreSQL statt MariaDB: stark bei komplexen Queries, aber nicht zwingend für die Kernanforderungen.
- Cloud-OCR statt Tesseract: oft bessere Erkennung, aber kostenpflichtig und datenschutzkritisch.
- Nur-SPA statt Web-UI: erhöht Integrationsaufwand (Auth, CORS, Deployment); Web-UI ist für reproduzierbare Bewertung stabiler.

## Skalierbarkeit

- OCR und Papierkorb-Bereinigung sind Kandidaten für Worker/Queues.
- Trennung Router -> Services -> Repositories erleichtert Erweiterungen.

## Wartbarkeit

- Zentrale Settings über `.env`, strikt validiert (`extra="forbid"`).
- Migrationen über Alembic statt manueller SQL-Skripte.

## Performance

- OCR ist der teuerste Schritt; PDF-Textlayer wird zuerst genutzt.
- Suche und Snippets werden aus OCR-Text erzeugt; Verschlüsselung bleibt im Storage erhalten.

## Bekannte Stolperstellen und Lösungen

- `requirements.txt` ist aktuell kommentiert: Installation enthält eine robuste Paketliste.
- `.env` darf keine unbekannten Variablen enthalten, sonst schlägt der Start fehl.
- OCR benötigt Systemtools; ohne Tesseract/Poppler laufen Kernfunktionen weiterhin, OCR-Features sind dann eingeschränkt.
