# API-Referenz

Die API-Dokumentation beschreibt die wichtigsten Schnittstellen des Dokumentenmanagers. Sie richtet sich primär an Entwickler und technisch versierte Dritte, die nachvollziehen möchten, welche Endpunkte existieren, wie sie sich semantisch unterscheiden und welche Arten von Antworten oder Fehlerfällen auftreten können. Die Live-Quelle der Wahrheit bleibt die automatische OpenAPI-Spezifikation, die über FastAPI generiert wird. Diese Seite verdichtet jedoch die wesentlichen Schnittstellen und ordnet sie fachlich ein.

## OpenAPI

- **Swagger UI:** `GET /docs`
- **OpenAPI JSON:** `GET /openapi.json`

Dass FastAPI automatisch eine OpenAPI-Beschreibung erzeugt, ist nicht nur bequem, sondern ein methodischer Vorteil. Die API ist dadurch nicht bloß implizit im Code versteckt, sondern formal dokumentierbar und testbar.

## Überblick über wichtige Routen

### Web-Routen (HTML)

| Methode | Pfad | Zweck |
|---|---|---|
| GET | `/dashboard` | Zentrale Startseite nach Login |
| GET | `/upload` | Upload-Formular |
| GET | `/documents` | Dokumentliste |
| GET | `/documents/{id}` | Detailansicht eines Dokuments |
| GET | `/search` | Volltext- und Filter-Suche |
| GET | `/favorites` | Favoritenübersicht |
| GET | `/trash` | Papierkorb |

### Upload- und Dokumentrouten

| Methode | Pfad | Zweck |
|---|---|---|
| POST | `/upload-web` | Upload aus Web-Formular |
| POST | `/upload` | Upload mit JSON-Response |
| POST | `/upload-web/duplicate/commit` | Duplikat-Upload bewusst übernehmen |
| POST | `/upload-web/duplicate/discard` | Zwischengespeicherten Upload verwerfen |

### Debug- und Hilfsrouten

| Methode | Pfad | Zweck |
|---|---|---|
| POST | `/debug-ocr/test` | OCR-Test für PDF, Bild oder DOCX |

## Authentifizierung und Zugriff

Die Anwendung arbeitet mit Benutzerkonten, Verifikation und optionaler MFA. Daraus ergibt sich, dass nicht jeder Endpunkt öffentlich sinnvoll nutzbar ist. Je nach Router und Funktion werden Authentifizierung und Benutzerkontext vorausgesetzt. Für API-orientierte Nutzung ist deshalb immer zu prüfen, ob Cookies, Session-Mechanismen oder Token-basierte Zugriffe relevant sind.

## Beispiel: OCR-Debug-Endpunkt

```bash
curl -X POST "http://127.0.0.1:8000/debug-ocr/test" \
  -H "accept: application/json" \
  -F "file=@sample.pdf"
```

### Typische Erfolgsausgabe

```json
{
  "filename": "sample.pdf",
  "pages": 3,
  "extracted_text_preview": "Dies ist ein Beispieltext ..."
}
```

### Typische Fehlerfälle

```json
{
  "detail": "Unsupported file type"
}
```

```json
{
  "detail": "OCR dependencies not available"
}
```

## Beispielhafte semantische Request-/Response-Muster

### Upload (JSON-orientiert)

**Request:** Multipart-Datei mit optionalen Metadaten

**Mögliche Erfolgsausgabe:**

```json
{
  "id": 42,
  "filename": "Vertrag.pdf",
  "status": "created",
  "duplicate_detected": false
}
```

**Möglicher Duplikatfall:**

```json
{
  "status": "pending_decision",
  "duplicate_detected": true,
  "pending_upload_id": 17
}
```

Diese Art von Response ist fachlich wertvoll, weil der Client nicht nur „ja oder nein“ erhält, sondern den nächsten sinnvollen Entscheidungspfad.

### Dokumentliste

```json
[
  {
    "id": 1,
    "filename": "Rechnung_2026.pdf",
    "mime_type": "application/pdf",
    "is_favorite": true,
    "is_deleted": false
  },
  {
    "id": 2,
    "filename": "Vertrag.docx",
    "mime_type": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "is_favorite": false,
    "is_deleted": false
  }
]
```

## Fehlercodes und Validierungslogik

Eine brauchbare API zeigt nicht nur Glücksfälle, sondern auch ihr Verhalten an der Kante. Für den Dokumentenmanager sind insbesondere folgende Fehlerklassen relevant:

| HTTP-Code | Bedeutung | Typischer Auslöser |
|---|---|---|
| 400 | Bad Request | Fehlende oder ungültige Eingaben |
| 401 | Unauthorized | Nicht authentifizierter Zugriff |
| 403 | Forbidden | Authentifiziert, aber ohne Berechtigung |
| 404 | Not Found | Dokument oder Ressource existiert nicht |
| 409 | Conflict | Konflikte, z. B. bei Dubletten oder Statuswechseln |
| 422 | Validation Error | FastAPI/Pydantic-Validierungsfehler |
| 500 | Internal Server Error | Unerwarteter Serverfehler |

### Warum diese Fehlerdokumentation wichtig ist

Viele Projektdokumentationen nennen nur die Existenz von Endpunkten. Für Entwickler ist aber entscheidend, welche Verträge zwischen Client und Server gelten. Fehlercodes sind Teil dieses Vertrags. Sie zeigen, ob das System sauber zwischen Eingabefehler, Berechtigungsproblem und interner Störung unterscheidet.

## API als Teil der Wartbarkeit

Die API des Dokumentenmanagers ist nicht nur eine externe Schnittstelle, sondern auch ein internes Strukturierungswerkzeug. Selbst wenn Endanwender überwiegend mit HTML-Seiten arbeiten, führt die klare Trennung von Routen und Verantwortlichkeiten dazu, dass das System testbarer und erweiterbarer wird. Eine gut dokumentierte API ist daher kein Luxus, sondern ein Wartbarkeitsgewinn.
