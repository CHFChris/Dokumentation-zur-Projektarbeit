# Technische Strategie

## Technologie-Stack

| Bereich | Auswahl | Grund |
|---|---|---|
| Backend | FastAPI | schnelle Entwicklung, Swagger/OpenAPI |
| ORM/Migrationen | SQLAlchemy + Alembic | Wartbarkeit, Schema-Entwicklung |
| Datenbank | MariaDB/MySQL | stabil, verbreitet, Setup-freundlich |
| Web-UI | Jinja2 | reproduzierbar, robust fuer Bewertung |
| Frontend (optional) | Vite/React | moderne UI moeglich |
| OCR | Tesseract + pdf2image/Poppler | offline, keine laufenden Kosten |
| Security | Argon2id, JWT, Fernet | zeitgemaess, nachvollziehbar |

## Trade-offs

- Cloud-OCR waere oft besser in der Erkennung, ist aber kostenpflichtig und datenschutzkritisch.
- Nur-SPA waere moeglich, erhoeht aber Integrationsaufwand (Auth, CORS, Deployment).

## Skalierbarkeit

- OCR und Bereinigung (Papierkorb) sind Kandidaten fuer Worker/Queues.
- Modultrennung Router -> Services -> Repositories erleichtert Erweiterungen.

## Workarounds

- mysqlclient ist unter Windows manchmal hakelig: pymysql ueber DB_URL=mysql+pymysql://...
- OCR ist abhaengig von Systemtools: klare Installationshinweise und Betrieb ohne OCR weiterhin moeglich.