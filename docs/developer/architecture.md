# Architektur

Die Systemarchitektur des Dokumentenmanagers wird hier aus Entwicklerperspektive dokumentiert. Die Beschreibung folgt dem C4-Modell und arbeitet sich von der Kontextebene über die Container-Ebene bis zur Komponentenbeschreibung vor.

---

## C4 – Kontextebene

Im Kontextmodell steht der Dokumentenmanager als zentrale Anwendung zwischen Benutzern und mehreren technischen Subsystemen. Der fachliche Kern ist nicht einfach „Datei hochladen", sondern die Orchestrierung aus Benutzerinteraktion, Metadatenhaltung, verschlüsselter Speicherung, Volltextsuche und Sicherheitslogik.

```mermaid
flowchart LR
    U["👤 Benutzer"] --> W["🖥️ Dokumentenmanager"]
    A["🔧 Administrator"] --> W
    W --> DB["🗄️ MariaDB / MySQL"]
    W --> FS["🔒 Verschlüsselter Dateispeicher"]
    W --> OCR["📄 OCR-Werkzeuge"]
    W --> SMTP["✉️ SMTP-Server"]
```

Der Benutzer interagiert über den Browser mit der Anwendung. Im Hintergrund kommuniziert das System mit der relationalen Datenbank für Metadaten, dem Dateisystem für verschlüsselte Dokumente, OCR-Werkzeugen für Textextraktion und einem SMTP-Server für Verifikations- und Reset-Mails.

---

## C4 – Container-Ebene

Auf Container-Ebene besteht das System aus vier Hauptbausteinen:

```mermaid
flowchart TB
    Browser["🌐 Browser"] --> API["⚡ FastAPI-Backend"]
    API --> DB["🗄️ MariaDB / MySQL"]
    API --> Storage["📁 Dateispeicher<br/><small>Fernet-verschlüsselt</small>"]
    API --> OCR["📄 OCR-Pipeline<br/><small>Tesseract + Poppler</small>"]
    API --> Mail["✉️ SMTP"]
```

| Container | Technologie | Verantwortung |
|---|---|---|
| **Web-UI** | Jinja2-Templates, HTML/CSS/JS | Benutzeroberfläche für Upload, Suche, Verwaltung |
| **FastAPI-Backend** | Python, FastAPI, SQLAlchemy | Geschäftslogik, Authentifizierung, Verschlüsselung |
| **Datenbank** | MariaDB / MySQL | Relationale Metadaten, Benutzer, Token, Kategorien |
| **Dateispeicher** | Dateisystem mit Fernet | Verschlüsselte Binärdaten, getrennt von Metadaten |

---

## Komponentenarchitektur im Backend

Die Backend-Architektur folgt dem Prinzip der Schichtenarchitektur mit klarer Verantwortungstrennung. Routen, Geschäftslogik und Datenzugriff sind bewusst voneinander entkoppelt.

```mermaid
flowchart TB
    subgraph Router ["Router-Schicht"]
        R1["auth"]
        R2["upload"]
        R3["documents"]
        R4["categories"]
        R5["users / profile"]
        R6["audit_logs"]
    end

    subgraph Services ["Service-Schicht"]
        S1["auth_service"]
        S2["document_service"]
        S3["ocr_service"]
        S4["duplicate_service"]
        S5["trash_service"]
        S6["version_service"]
        S7["mfa_service"]
        S8["email_service"]
    end

    subgraph Data ["Datenzugriff"]
        D1["SQLAlchemy-Modelle"]
        D2["Repositories"]
        D3["Alembic-Migrationen"]
    end

    subgraph Utils ["Hilfsdienste"]
        U1["crypto_utils"]
        U2["file_storage"]
        U3["hashing"]
    end

    Router --> Services
    Services --> Data
    Services --> Utils
```

### Router-Schicht (`app/api/routes/`, `app/web/`)

Router definieren die extern sichtbaren Schnittstellen. Sie nehmen Anfragen entgegen, delegieren an die Service-Schicht und geben Antworten zurück. Die Trennung zwischen `api/routes/` (JSON-APIs) und `web/` (HTML-Routen) ermöglicht unabhängige Weiterentwicklung beider Kanäle.

### Service-Schicht (`app/services/`)

Hier lebt die eigentliche Geschäftslogik: Upload-Verarbeitung mit Duplikaterkennung, OCR-Workflows, Berechtigungsprüfungen, Versionierung, Favoritenverwaltung, Papierkorb-Bereinigung, MFA-Codes und E-Mail-Versand. Diese Schicht verhindert, dass Logik unkontrolliert in Routern zerfließt.

### Datenzugriff (`app/models/`, `app/repositories/`, `app/db/`)

SQLAlchemy-Modelle bilden die relationale Struktur ab. Repositories kapseln wiederkehrende Datenbankoperationen. Alembic sorgt für reproduzierbare Schema-Migrationen.

### Hilfsdienste (`app/utils/`)

Querschnittsfunktionen wie Fernet-Verschlüsselung, SHA-256-Hashing, Dateispeicher-Operationen und E-Mail-Hilfsfunktionen. Saubere Utility-Bereiche vermeiden Code-Duplikation.

---

## Beispielhafter Login-Ablauf

```mermaid
sequenceDiagram
    actor User as Benutzer
    participant Browser
    participant Backend as FastAPI
    participant DB as Datenbank

    User->>Browser: Zugangsdaten eingeben
    Browser->>Backend: POST /auth/login-web
    Backend->>DB: Benutzer laden (E-Mail / Username)
    DB-->>Backend: Benutzerdaten + Passwort-Hash
    Backend->>Backend: Passwort prüfen (bcrypt)

    alt MFA aktiviert
        Backend-->>Browser: MFA-Challenge anzeigen
        User->>Browser: MFA-Code eingeben
        Browser->>Backend: POST /auth/mfa/verify-web
        Backend->>DB: MFA-Code validieren
    end

    Backend->>Backend: JWT-Token erzeugen
    Backend-->>Browser: Cookie setzen, Redirect zum Dashboard
```

---

## Beispielhafter Upload-Ablauf

```mermaid
sequenceDiagram
    actor User as Benutzer
    participant Browser
    participant Backend as FastAPI
    participant DB as Datenbank
    participant FS as Dateispeicher
    participant OCR as OCR-Pipeline

    User->>Browser: Datei auswählen + Upload
    Browser->>Backend: POST /upload-web (Multipart)
    Backend->>Backend: SHA-256-Prüfsumme berechnen
    Backend->>DB: Duplikatprüfung (Checksum + Name + Größe)

    alt Duplikat erkannt
        Backend->>DB: pending_uploads anlegen
        Backend-->>Browser: Duplikat-Entscheidungsseite
    else Kein Duplikat
        Backend->>Backend: Datei mit Fernet verschlüsseln
        Backend->>FS: Verschlüsselte Datei speichern
        Backend->>DB: Dokument + Version anlegen
        Backend->>OCR: Textextraktion starten
        OCR-->>Backend: Extrahierter Text
        Backend->>DB: OCR-Text speichern
        Backend-->>Browser: Erfolg → Redirect zur Dokumentliste
    end
```

---

## Detailliertes Ablaufdiagramm: Duplikat-Upload-Workflow

Während das obenstehende Sequenzdiagramm den Upload-Pfad auf Komponentenebene zeigt, dokumentiert das folgende Aktivitätsdiagramm den vollständigen Kontrollfluss des Uploads inklusive der Duplikatbehandlung. Die Darstellung ist nach Verantwortungsbereichen in drei Swimlanes gegliedert – **Benutzer**, **System** (FastAPI-Backend) und **Datenbank** – und macht sichtbar, an welchen Stellen welche Komponente aktiv ist und welche Entscheidungen getroffen werden.

![Ablaufdiagramm Duplikat-Upload-Workflow](../assets/images/duplikat-ablaufdiagramm.png){ loading=lazy }

[🖼️ Ablaufdiagramm als PNG herunterladen](../assets/images/duplikat-ablaufdiagramm.png){ .md-button .md-button--primary }
[📥 Ablaufdiagramm als .drawio herunterladen](../assets/downloads/duplikat-ablaufdiagramm.drawio){ .md-button }

### Zentrale Entscheidungspunkte

Das Diagramm zeigt zwei kritische Verzweigungen, die den Workflow wesentlich prägen:

**1. Dateivalidierung (`Datei gültig?`)** – Bevor überhaupt eine Prüfsummenberechnung stattfindet, werden Dateityp, Dateigröße und Nicht-Leere geprüft. Ungültige Dateien werden mit einer Fehlermeldung abgewiesen und der Benutzer zur Upload-Seite zurückgeleitet. Dadurch wird verhindert, dass unbrauchbare Uploads überhaupt in die weitere Pipeline gelangen.

**2. Duplikaterkennung (`Duplikat gefunden?`)** – Nach der Hash-Berechnung fragt das System die Datenbank, ob bereits ein Dokument mit identischer Checksumme oder identischer Kombination aus Dateiname und Größe existiert. Ohne Treffer läuft der Upload ohne Unterbrechung durch. Bei einem Treffer wird ein `pending_uploads`-Eintrag angelegt und der Benutzer erhält einen Duplikathinweis mit drei Handlungsoptionen.

### Drei-Wege-Entscheidung bei Duplikaten

Die Entscheidung `Welche Option wurde gewählt?` ist das Herzstück des Duplikat-Workflows. Statt den Benutzer mit einem „Upload fehlgeschlagen" abzuweisen oder stillschweigend zu überschreiben, bietet das System drei klar unterscheidbare Pfade:

| Option | Ablauf | Ergebnis |
|---|---|---|
| **Neue Datei zusätzlich speichern** | Der gepufferte Upload wird als *neues, eigenständiges* Dokument übernommen. OCR und Auto-Kategorisierung laufen auf dem neuen Eintrag. | Zwei Dokumente bleiben parallel im System. |
| **Altes Dokument ersetzen** | Das bestehende Dokument wird gelöscht, der gepufferte Upload übernimmt dessen Position und wird neu verarbeitet. | Nur noch der neue Stand ist aktiv. |
| **Neue Datei verwerfen** | Der gepufferte Upload wird gelöscht, ein Audit-Log-Eintrag `DUPLICATE_DISCARD` wird geschrieben. | Ursprungszustand bleibt unverändert, die Entscheidung ist nachvollziehbar protokolliert. |

### Warum dieser Workflow fachlich sinnvoll ist

Ein naiver Upload-Handler würde bei Duplikaten entweder den neuen Upload verwerfen (Datenverlust-Risiko, wenn der Benutzer eine tatsächlich andere Version hochladen wollte) oder das bestehende Dokument blind überschreiben (Datenverlust-Risiko in der anderen Richtung). Beide Varianten sind in der Praxis unbrauchbar, weil sie die Entscheidung der Software überlassen, die den Kontext nicht kennen kann.

Die hier dokumentierte Lösung hebt die Entscheidung eine Ebene höher – zum Benutzer – und gewährleistet gleichzeitig durch die Zwischenspeicherung in `pending_uploads`, dass keine halbfertigen Zustände entstehen, wenn der Benutzer den Dialog abbricht. Nicht bestätigte Pending-Uploads werden nach Ablauf automatisch bereinigt.

---

## Architekturentscheidungen

Die Architektur wurde bewusst modular aufgebaut, obwohl eine simplere Struktur (eine Datei, ein paar Routen, direkte SQL-Statements) kurzfristig schneller gewesen wäre. Die gewählte Schichtentrennung bringt konkrete Vorteile:

- **Testbarkeit**: Services lassen sich unabhängig von HTTP-Transporten testen.
- **Wartbarkeit**: Neue Features wie zusätzliche Dateitypen oder erweiterte Suche erfordern keine Umstrukturierung.
- **Teamfähigkeit**: Klare Modulverantwortlichkeiten reduzieren Merge-Konflikte.
- **Nachvollziehbarkeit**: Die Struktur selbst dokumentiert, wo welche Logik zu finden ist.
