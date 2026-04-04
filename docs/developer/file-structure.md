# Projektstruktur

Die Projektstruktur wurde so aufgebaut, dass Verantwortlichkeiten im Code erkennbar bleiben. Eine nachvollziehbare Ordnerstruktur ist kein Selbstzweck, sondern ein Wartbarkeitsmerkmal.

---

## Verzeichnisbaum

```text
Dokumentenmanager/
├── app/
│   ├── api/
│   │   ├── deps.py              # Dependency Injection (Auth, DB-Session)
│   │   └── routes/
│   │       ├── auth.py           # Login, Register, MFA, Password-Reset
│   │       ├── account.py        # Kontoverwaltung
│   │       ├── upload.py         # Upload mit Duplikaterkennung
│   │       ├── documents.py      # Dokumentliste, Detail, Download
│   │       ├── categories.py     # Kategorien (Web)
│   │       ├── categories_api.py # Kategorien (JSON-API)
│   │       ├── files.py          # Dateioperationen
│   │       ├── users.py          # Benutzerverwaltung
│   │       ├── profile.py        # Profilseite
│   │       ├── duplicates.py     # Duplikat-Handling
│   │       ├── audit_logs.py     # Audit-Protokoll
│   │       └── debug_ocr.py      # OCR-Debug-Endpunkt
│   │
│   ├── core/
│   │   ├── config.py             # Zentrale Konfiguration
│   │   ├── settings.py           # Pydantic-Settings (Umgebungsvariablen)
│   │   ├── security.py           # JWT-Handling
│   │   ├── password_policy.py    # Passwortregeln
│   │   └── errors.py             # Zentrale Fehlerbehandlung
│   │
│   ├── db/
│   │   ├── database.py           # Engine, Session, init_models()
│   │   └── models.py             # Modell-Importe
│   │
│   ├── models/
│   │   ├── user.py               # User-Entität
│   │   ├── document.py           # Document-Entität
│   │   ├── document_version.py   # Versionierung
│   │   ├── document_categories.py# Join-Tabelle
│   │   ├── category.py           # Kategorie mit verschlüsselten Keywords
│   │   ├── pending_upload.py     # Duplikat-Zwischenspeicher
│   │   ├── mfa_code.py           # MFA-Codes
│   │   ├── email_verification_token.py
│   │   ├── password_reset_token.py
│   │   ├── audit_log.py          # Audit-Log-Entität
│   │   ├── login_device.py       # Geräte-Tracking
│   │   └── associations.py       # Assoziationstabellen
│   │
│   ├── repositories/
│   │   ├── user_repo.py          # Benutzer-CRUD
│   │   ├── document_repo.py      # Dokument-CRUD + Duplikatprüfung
│   │   ├── category_repo.py      # Kategorie-CRUD
│   │   ├── audit_log_repo.py     # Audit-Log-Zugriff
│   │   ├── access_log_repo.py    # Zugriffsprotokolle
│   │   ├── email_verification_repo.py
│   │   ├── password_reset_repo.py
│   │   └── verification_events_repo.py
│   │
│   ├── schemas/
│   │   ├── auth.py               # Login/Register-Schemas
│   │   ├── user.py               # Benutzer-Schemas
│   │   ├── document.py           # Dokument-Schemas
│   │   ├── category.py           # Kategorie-Schemas
│   │   ├── mfa.py                # MFA-Schemas
│   │   └── common.py             # Geteilte Schemas
│   │
│   ├── services/
│   │   ├── auth_service.py       # Login, Register, Token-Logik
│   │   ├── document_service.py   # Upload, Download, Suche, OCR-Integration
│   │   ├── document_category_service.py  # Kategoriezuordnung
│   │   ├── duplicate_service.py  # Duplikaterkennung
│   │   ├── pending_upload_service.py     # Pending-Upload-Workflow
│   │   ├── version_service.py    # Versionierung
│   │   ├── favorite_service.py   # Favoriten-Toggle
│   │   ├── trash_service.py      # Papierkorb + automatische Bereinigung
│   │   ├── ocr_service.py        # OCR-Extraktion
│   │   ├── ocr_analysis.py       # OCR-Analyse-Logik
│   │   ├── auto_tagging.py       # Automatisches Tagging
│   │   ├── keyword_extraction.py # Keyword-Extraktion
│   │   ├── text_similarity.py    # Textähnlichkeit (scikit-learn)
│   │   ├── mfa_service.py        # MFA-Code-Verwaltung
│   │   ├── email_service.py      # E-Mail-Versand
│   │   ├── email_verification_service.py
│   │   ├── password_reset_service.py
│   │   ├── login_security_service.py    # Login-Sicherheit
│   │   ├── audit_log_service.py  # Audit-Protokollierung
│   │   └── user_preferences_service.py  # Benutzereinstellungen
│   │
│   ├── utils/
│   │   ├── crypto_utils.py       # Fernet-Verschlüsselung, Integrity-Tags
│   │   ├── file_storage.py       # Dateisystem-Operationen
│   │   ├── files.py              # Verzeichnis-Hilfsfunktionen
│   │   ├── hashing.py            # SHA-256, Bcrypt
│   │   └── email_utils.py        # E-Mail-Hilfsfunktionen
│   │
│   ├── web/
│   │   ├── routes_web.py         # HTML-Routen (Dashboard, Suche, Detail, ...)
│   │   ├── routes_dashboard_privacy.py  # Dashboard-Datenschutzfunktionen
│   │   ├── routes_favorites.py   # Favoriten-Routen
│   │   ├── templates.py          # Jinja2-Template-Setup
│   │   ├── toast.py              # Toast-Benachrichtigungen
│   │   ├── static/               # CSS, JS, Bilder
│   │   └── templates/            # Jinja2-HTML-Templates
│   │
│   └── main.py                   # FastAPI-App, Router-Registrierung, Startup
│
├── alembic/                      # Migrationsskripte
├── data/                         # Laufzeitdaten (FILES_DIR)
├── .env                          # Umgebungsvariablen (nicht im Repo!)
├── requirements.txt              # Python-Abhängigkeiten
└── alembic.ini                   # Alembic-Konfiguration
```

---

## Modulverantwortlichkeiten

### `app/api/` – Transport-Schicht

HTTP-Handling, Request-Validierung, Authentifizierungsprüfung. Router delegieren an Services und geben Antworten zurück. Die Trennung zwischen `routes/` (JSON-APIs) und `web/` (HTML) ermöglicht unabhängige Weiterentwicklung.

### `app/core/` – Konfiguration und Querschnitt

Zentrale Konfiguration, Settings-Validierung, JWT-Handling und Fehlerbehandlung. Hier werden Umgebungsvariablen validiert und sicherheitsrelevante Defaults zusammengeführt.

### `app/models/` – Domänenmodell

SQLAlchemy-ORM-Modelle als Bindeglied zwischen fachlichem Modell und relationalem Schema. Jede Entität (User, Document, Category, ...) hat ein eigenes Modul.

### `app/repositories/` – Datenzugriff

Kapseln wiederkehrende Datenbankoperationen und halten SQL-Logik aus Services und Routern heraus.

### `app/schemas/` – Validierung

Pydantic-Schemas für Request- und Response-Validierung. Stellen sicher, dass nur korrekt typisierte Daten die Service-Schicht erreichen.

### `app/services/` – Geschäftslogik

Der fachliche Kern: Upload-Verarbeitung, Duplikaterkennung, OCR-Integration, Versionierung, Papierkorb-Bereinigung, MFA, E-Mail-Versand. Diese Schicht ist der Ort, an dem Geschäftsregeln leben.

### `app/utils/` – Hilfsfunktionen

Querschnittsfunktionen: Fernet-Verschlüsselung, SHA-256-Hashing, Dateisystem-Operationen. Vermeiden Code-Duplikation über Modulgrenzen hinweg.

### `app/web/` – Präsentation

HTML-Routen, Jinja2-Templates, statische Assets. Die Web-Schicht ist bewusst von der API-Schicht getrennt, damit beide Kanäle unabhängig wartbar bleiben.
