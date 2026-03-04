# Technische Dokumentation – API-Referenz

## OpenAPI / Swagger

- Swagger UI: `GET /docs`
- OpenAPI JSON: `GET /openapi.json`

Swagger ist die Quelle der Wahrheit für Parameter, Request/Response-Modelle und alle verfügbaren Routen.

## Authentifizierung (wichtig)

Es gibt zwei Auth-Varianten:

- Web (Browser): Cookie `access_token` (HttpOnly)
- API (Clients): `Authorization: Bearer <token>`

In `app/api/deps.py` existieren dafür drei Abhängigkeiten:
- `get_current_user_web` (Cookie)
- `get_current_user_api` (Bearer)
- `get_current_user_any` (erst Bearer, sonst Cookie)

## Router-Übersicht (aus dem App-Setup)

Im App-Setup werden u. a. folgende Router eingebunden:
- `/auth/...` (Login/Register/Verifikation/MFA)
- `/files/...` (Datei-Operationen)
- `/users/...` (User-Operationen)
- `/debug-ocr/test` (OCR-Test)
- Web-UI: `/dashboard`, `/upload`, `/documents`, `/search`, `/trash`, `/favorites`, `/category-keywords`

## Auth (Auszug)

### POST /auth/register

Request (JSON):
```json
{
  "username": "chris",
  "email": "chris@example.org",
  "password": "Sicher!123"
}
```

### POST /auth/login

Request (JSON):
```json
{
  "identifier": "chris@example.org",
  "password": "Sicher!123"
}
```

Antwort (Prinzip):
- Token-Response (bei Login ohne MFA)
- oder Challenge-Response mit `challenge_id` (wenn MFA aktiv)

### POST /auth/mfa/verify

Request (JSON):
```json
{
  "challenge_id": "<id>",
  "code": "123456"
}
```

## OCR Debug

### POST /debug-ocr/test

Multipart:
- `file`: PDF, JPG/PNG oder DOCX

Antwort:
- `length`: Anzahl Zeichen
- `preview`: erste 500 Zeichen

Beispiel:
```bash
curl -X POST "http://127.0.0.1:8000/debug-ocr/test"   -H "accept: application/json"   -F "file=@sample.pdf"
```
