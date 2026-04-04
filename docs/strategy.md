# Technische Strategie

Die technische Strategie beschreibt nicht nur, welche Technologien eingesetzt werden, sondern warum diese Auswahl für das konkrete Projekt sinnvoll ist. Technologische Entscheidungen wurden im Spannungsfeld von Skalierbarkeit, Wartbarkeit, Performance, Datenschutz und Umsetzbarkeit getroffen.

---

## Technologie-Stack

| Bereich | Technologie | Begründung |
|---|---|---|
| **Backend** | FastAPI (Python) | Schnelle Entwicklung, starke Typisierung, integrierte OpenAPI-Dokumentation |
| **ORM** | SQLAlchemy | Wartbare Modellierung, datenbankagnostisch, objektorientierter Zugriff |
| **Migrationen** | Alembic | Reproduzierbare, versionskontrollierte Schema-Entwicklung |
| **Datenbank** | MariaDB / MySQL | Verbreitet, stabil, ausreichend für relationale CRUD- und Suchoperationen |
| **Web-UI** | Jinja2 (serverseitig) | Reduzierte Komplexität im Kernworkflow, kein separater Build-Prozess |
| **Frontend (optional)** | Vite / React | Moderne UI-Experimente, nicht zwingend für den Kernnutzen |
| **OCR** | Tesseract + pdf2image + pypdf | Offline-fähig, keine Cloud-Kosten, datenschutzfreundlich |
| **Verschlüsselung** | Fernet (cryptography) | AES-128-CBC für Dateien und Texte |
| **Auth** | JWT + Bcrypt (passlib) | Zustandslose Authentifizierung, sicheres Passwort-Hashing |
| **NLP** | scikit-learn | Textähnlichkeit und Keyword-Extraktion für Auto-Tagging |

---

## Begründung der Kernentscheidungen

### Warum FastAPI?

FastAPI kombiniert hohe Entwicklungsgeschwindigkeit mit strukturierter Typisierung und automatischer API-Dokumentation. Pydantic-Schemas validieren Eingaben bereits auf Transportebene. Die automatisch generierte OpenAPI-Spezifikation erhöht Transparenz und Testbarkeit – besonders wertvoll in der Teamarbeit.

### Warum SQLAlchemy + Alembic?

SQLAlchemy erlaubt die nachvollziehbare Definition von Domänenobjekten und deren Beziehungen. Alembic ergänzt dies um einen reproduzierbaren Änderungsverlauf des Schemas. Das ist methodisch deutlich besser als manuelle SQL-Eingriffe – sowohl für die Erstinstallation als auch für spätere Weiterentwicklungen.

### Warum MariaDB/MySQL statt PostgreSQL?

Für die Kernanforderungen (relationale Metadaten, Fremdschlüssel, konsistente Zustände) ist MariaDB/MySQL ausreichend und im Schulkontext gut handhabbar. PostgreSQL wäre bei komplexen Datentypen oder fortgeschrittener Volltextsuche vorteilhafter, wurde aber zugunsten der einfacheren Verfügbarkeit nicht gewählt. Die Entscheidung ist pragmatisch, nicht technisch limitierend.

### Warum Jinja2 statt SPA?

Eine reine Single-Page-Application hätte Authentifizierung, CORS, Deployment und Fehlerquellen vergrößert. Für ein Projekt mit Fokus auf Dokumentenmanagement, Datenmodell und Sicherheitslogik ist serverseitiges Rendering strategisch vernünftig. Die optionale React-Komponente bleibt als Erweiterung nutzbar.

### Warum lokales OCR statt Cloud?

Cloudbasierte OCR-Dienste liefern teilweise bessere Erkennungsqualität, bringen aber Kosten, Internetabhängigkeit und Datenschutzfragen mit sich. Tesseract ist lokal betreibbar und damit für ein selbst gehostetes, datensensibles Projekt passender. Der höhere Installations- und Kalibrierungsaufwand wurde bewusst akzeptiert.

### Warum kein dokumentenorientiertes NoSQL?

MongoDB klingt bei einem „Dokumentenmanager" naheliegend, würde aber bei Benutzerbeziehungen, Kategorien, Versionen, Token und kontrollierten Zuständen keinen Vorteil bringen. Das Projekt lebt von konsistenten Beziehungen – ein relationales Modell ist die schlüssigere Wahl.

---

## Bewertung: Skalierbarkeit

Skalierbarkeit bedeutet hier nicht nur „mehr Benutzer", sondern die Fähigkeit, bei wachsender Komplexität nicht auseinanderzufallen.

**Möglichkeiten zur horizontalen Skalierung:**

- OCR-Verarbeitung kann in asynchrone Worker ausgelagert werden
- Papierkorb-Bereinigung (`trash_service`) läuft bereits als periodischer Task
- API und Web-UI sind logisch getrennt und könnten separat deployed werden
- Dateispeicher und Datenbank sind bereits physisch entkoppelt

**Grenzen der aktuellen Lösung:**

Die aktuelle Lösung ist kein massiv verteiltes System. Sie priorisiert Verständlichkeit und saubere Grundarchitektur über Infrastrukturkomplexität. Diese Begrenzung ist angemessen – übertriebene Verteilarchitekturen in Schulprojekten sind oft dekorativer Nebel mit wenig Erkenntnisgewinn.

---

## Bewertung: Wartbarkeit

Wartbarkeit entsteht aus der Kombination mehrerer Faktoren:

- **Modulare Ordnerstruktur** – Klare Zuständigkeiten in `api/`, `services/`, `models/`, `utils/`
- **Schichtentrennung** – Router → Service → Repository → Datenbank
- **Alembic-Migrationen** – Nachvollziehbare Schema-Entwicklung
- **Dokumentierte `.env`** – Konfiguration explizit und validiert
- **Automatische API-Dokumentation** – OpenAPI/Swagger immer aktuell
- **Pydantic-Schemas** – Typvalidierung an der Eingabegrenze

Diese Kombination sorgt dafür, dass neue Teammitglieder nicht bei null anfangen müssen und Änderungen kontrolliert eingeführt werden können.

---

## Bewertung: Performance

Die teuersten Operationen im System:

| Operation | Kostenfaktor | Gegenmaßnahme |
|---|---|---|
| OCR-Verarbeitung | CPU-intensiv, abhängig von Seitenzahl | Uploadgrößenlimit, perspektivisch asynchrone Verarbeitung |
| Dateiverschlüsselung | Proportional zur Dateigröße | `MAX_UPLOAD_MB`-Begrenzung |
| Datenbank-Suche | Wächst mit Dokumentenbestand | Indizierung auf `owner_user_id`, `checksum_sha256`, `is_deleted` |
| Datei-Upload | Netzwerk + Disk I/O | Größenlimit, Streaming-Verarbeitung |

---

## Herausforderungen und konkrete Lösungen

### Herausforderung 1: OCR-Abhängigkeiten

**Problem:** OCR ist fachlich wertvoll, aber betrieblich fehleranfällig. Tesseract und Poppler müssen als Systempakete vorhanden sein – die Python-Wrapper allein reichen nicht.

**Lösung:** Klare Dokumentation der Systemabhängigkeiten, separater Debug-Endpunkt (`/debug-ocr/test`) für schnelle Diagnose, und Smoke-Test in der Installationsanleitung.

### Herausforderung 2: Duplikatbehandlung

**Problem:** Blindes Überschreiben oder Verwerfen bei Duplikaten ist fachlich unbrauchbar und führt zu Datenverlust oder Verwirrung.

**Lösung:** Die Tabelle `pending_uploads` speichert einen Zwischenzustand. Der Benutzer erhält eine Entscheidungsseite und kann bewusst übernehmen oder verwerfen. Pending-Uploads werden nach Ablauf automatisch bereinigt.

### Herausforderung 3: Sichere Dateiablage

**Problem:** Dateien dürfen nicht ungeschützt im Dateisystem liegen, besonders bei personenbezogenen oder vertraulichen Inhalten.

**Lösung:** Fernet-Verschlüsselung aller Dateiinhalte vor der Speicherung. Physische Trennung zwischen verschlüsselten Dateien (`FILES_DIR`) und relationalen Metadaten (Datenbank). SHA-256-Prüfsummen für Integritätskontrolle.

### Herausforderung 4: Schema-Entwicklung im Team

**Problem:** Schemaänderungen in der Datenbank werden bei mehreren Entwicklern schnell chaotisch – manuelle SQL-Anpassungen sind nicht reproduzierbar.

**Lösung:** Alembic-Migrationen mit automatischer Generierung (`--autogenerate`). Jede Schemaänderung wird als eigene Migration versioniert und ist über Git nachvollziehbar.

### Herausforderung 5: Authentifizierungs-Komplexität

**Problem:** Web-UI (Cookies) und API (Bearer-Token) brauchen unterschiedliche Auth-Mechanismen, die konsistent funktionieren müssen.

**Lösung:** Separate Dependency-Funktionen (`get_current_user_web` vs. `get_current_user_api`) in `app/api/deps.py`. Middleware für automatische Redirect-Logik bei nicht authentifizierten HTML-Requests.

---

## Testbarkeit und Erweiterbarkeit

Die Architektur ist auf Erweiterbarkeit ausgelegt. Denkbare nächste Schritte:

- KI-gestützte Dokumentzusammenfassungen
- Feinere Rollenmodelle und Berechtigungsmatrix
- Vollständiges Audit-Log mit Filterung
- Zusätzliche Vorschauformate (Excel, Bilder)
- Externe Speicherziele (S3, MinIO)
- Asynchrone Task-Queue für OCR und Bereinigung
