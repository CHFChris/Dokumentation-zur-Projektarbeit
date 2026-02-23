# Technische Strategie

## Technologie-Stack

| Bereich | Auswahl | Begründung |
|---|---|---|
| Backend | FastAPI | schnelle API-Entwicklung, integrierte OpenAPI/Swagger-Doku |
| ORM/Migrationen | SQLAlchemy + Alembic | Wartbarkeit, Schema-Entwicklung, Migrationen |
| Datenbank | MariaDB/MySQL | verbreitet, stabil, geeignet für CRUD-lastige Systeme |
| Web-UI | Jinja2 | reproduzierbar, wenig Client-Komplexität |
| Frontend (optional) | Vite/React | moderne UI möglich, getrennte Entwicklung |
| OCR | Tesseract + pdf2image + pypdf | offline, keine laufenden Kosten, PDF-Textlayer zuerst |
| Security | JWT + HttpOnly-Cookie + Fernet | nachvollziehbare Schutzmechanismen, Verschlüsselung at rest |

## Skalierbarkeit

- OCR und Papierkorb-Bereinigung sind Kandidaten für Worker/Queues.
- Klare Trennung Router -> Services -> Repositories erleichtert Erweiterungen.

## Wartbarkeit

- Zentrale Settings über .env, strikt validiert (nur erlaubte Keys).
- Migrationen über Alembic statt manueller SQL-Skripte.

## Performance

- OCR ist der teuerste Schritt; PDF-Textlayer wird zuerst genutzt.
- Suche nutzt entschlüsselten OCR-Text zur Laufzeit; gespeicherte Werte bleiben verschlüsselt.

## Bekannte Stolperstellen und Lösungen

- requirements.txt ist aktuell nicht pip-kompatibel: echte Paketliste bereitstellen (siehe Installation).
- .env darf keine unbekannten Variablen enthalten, sonst schlägt der Start fehl.
- OCR benötigt Systemtools; ohne Tesseract/Poppler laufen Kernfunktionen weiterhin, OCR-Features sind dann eingeschränkt.
