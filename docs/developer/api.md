# Technische Dokumentation – API-Referenz

## OpenAPI / Swagger

- Swagger UI: GET /docs
- OpenAPI JSON: GET /openapi.json

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

Antwort:

- Token-Response (bei Login ohne MFA)
- oder Challenge-Response mit challenge_id (wenn MFA aktiv)

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

- file: PDF, JPG/PNG oder DOCX

Antwort:

- preview: erste Zeichen des extrahierten Textes

## Weitere Router (Orientierung)

- /files/... (Datei-Endpunkte)
- /users/... (User-Endpunkte)
- /upload/... (Upload-Logik, je nach Router-Definition)
- /category-keywords (Web-UI)
- /api/... (Kategorie-API, je nach Router-Definition)

Exakte Pfade, Parameter und Response-Modelle stehen in /docs.
