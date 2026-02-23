
---

## 8) `docs/developer/api.md`
```md
# Technische Dokumentation – API-Referenz

## OpenAPI / Swagger

- Swagger UI: GET /docs
- OpenAPI JSON: GET /openapi.json

Die Dokumentation fokussiert auf die wichtigsten Endpunkte, die für Auth, Upload, Kategorien und Debug relevant sind.

## Auth (JSON)

### POST /auth/register

Request:
```json
{
  "username": "chris",
  "email": "chris@example.org",
  "password": "Sicher!123"
}