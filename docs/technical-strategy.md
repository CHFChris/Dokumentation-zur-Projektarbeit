# Technische Strategie

Die technische Strategie des Dokumentenmanagers beschreibt nicht nur, *welche* Technologien eingesetzt werden, sondern *warum* diese Auswahl für das konkrete Projekt sinnvoll ist. Gerade dieser Abschnitt zeigt methodische Reflexionsfähigkeit: Gute Projekte bestehen nicht aus zufällig zusammengesuchten Bibliotheken, sondern aus bewusst abgewogenen Entscheidungen unter realen Randbedingungen.

## Technologie-Stack

| Bereich | Auswahl | Begründung |
|---|---|---|
| Backend | FastAPI | Schnelle Entwicklung, starke Typisierung, integrierte OpenAPI-Dokumentation, klare Router-Struktur |
| ORM/Migrationen | SQLAlchemy + Alembic | Wartbarkeit, saubere Modellierung, reproduzierbare Schema-Entwicklung |
| Datenbank | MariaDB/MySQL | Verbreitet, stabil, ausreichend stark für relationale CRUD- und Such-Metadaten |
| Web-UI | Jinja2 | Serverseitiges Rendering reduziert Komplexität im Kernworkflow |
| Frontend optional | Vite/React | Moderne UI-Experimente möglich, aber nicht zwingend für Kernnutzen |
| OCR | Tesseract + pdf2image/Poppler + pypdf | Offline-fähig, keine laufenden Cloud-Kosten, datenschutzfreundlicher |
| Security | Fernet, JWT, Passlib/Bcrypt | Datei- und Textschutz, Token-Handling, sicheres Passwort-Hashing |

## Begründung der Auswahl

### Warum FastAPI?

FastAPI bietet hohe Entwicklungsgeschwindigkeit bei zugleich strukturierter Typisierung und automatischer API-Dokumentation. Gerade in einem Teamprojekt ist das nützlich, weil Schnittstellen nicht mündlich erraten werden müssen. Der direkte OpenAPI-Mehrwert erhöht Transparenz und Testbarkeit.

### Warum SQLAlchemy und Alembic?

Ein Projekt dieser Größe profitiert von sauberer Modellierung und migrationsfähiger Datenbankschicht. SQLAlchemy erlaubt die nachvollziehbare Definition von Domänenobjekten und deren Beziehungen. Alembic ergänzt dies um einen reproduzierbaren Änderungsverlauf des Schemas. Das ist methodisch deutlich besser als spontane SQL-Eingriffe auf Live-Datenbanken.

### Warum MariaDB/MySQL?

Für den Dokumentenmanager sind relationale Strukturen, Fremdschlüssel und konsistente Zustände zentral. MariaDB/MySQL ist hierfür eine angemessene Wahl. PostgreSQL wäre ebenfalls stark gewesen, aber die aktuelle Auswahl ist technisch vollkommen vertretbar und im Projektumfeld gut handhabbar.

### Warum keine reine SPA als Pflichtweg?

Eine reine Single-Page-Application hätte moderne Frontend-Möglichkeiten eröffnet, aber gleichzeitig Authentifizierung, CORS, Deployment und Fehlerfläche vergrößert. Für ein Projekt mit Fokus auf Dokumentenmanagement, Datenmodell und Sicherheitslogik ist ein serverseitig gerenderter Kernweg strategisch vernünftig. Die optionale Frontend-Komponente bleibt dennoch als Erweiterung denkbar.

## Abwägung gegenüber Alternativen

### PostgreSQL statt MariaDB/MySQL

PostgreSQL bietet in vielen Szenarien Vorteile bei komplexen Datentypen, Volltext und fortgeschrittener Query-Optimierung. Für die Kernanforderungen des Projekts ist MariaDB/MySQL aber ausreichend und im Schulkontext oft leichter verfügbar. Die gewählte Datenbank ist daher kein Notbehelf, sondern eine sinnvolle pragmatische Entscheidung.

### Cloud-OCR statt Tesseract

Cloudbasierte OCR-Dienste liefern teilweise bessere Erkennungsqualität, bringen aber Kosten, Internetabhängigkeit und Datenschutzfragen mit sich. Tesseract ist lokal betreibbar und damit für ein selbst gehostetes, datensensibles Schulprojekt passender. Die Kehrseite ist höherer Installations- und Kalibrierungsaufwand. Dieser Trade-off wurde bewusst akzeptiert.

### MongoDB statt relationalem Modell

Ein dokumentenorientierter Datenspeicher klingt auf dem Papier verführerisch, würde aber bei Benutzerbeziehungen, Kategorien, Versionen, Tokens und kontrollierten Zuständen keinen klaren Vorteil bringen. Das Projekt lebt von konsistenten Beziehungen, also ist ein relationales Modell die schlüssigere Wahl.

## Skalierbarkeit

Skalierbarkeit bedeutet hier nicht nur „mehr Benutzer“, sondern auch die Fähigkeit, bei wachsender Komplexität nicht auseinanderzufallen.

### Horizontale Skalierung

Die Kernlogik ist grundsätzlich geeignet, später stärker zu entkoppeln:

- OCR kann in Worker ausgelagert werden
- Retention-Aufgaben können periodisch getrennt laufen
- API und Web-UI lassen sich klar trennen
- Dateispeicher und Datenbank sind bereits logisch entkoppelt

### Grenzen der aktuellen Lösung

Die aktuelle Projektlösung ist kein massiv verteiltes System. Sie priorisiert Verständlichkeit und saubere Grundarchitektur über maximale Infrastrukturkomplexität. Diese Begrenzung ist nicht negativ, sondern angemessen. Übertriebene Verteilarchitekturen in Schulprojekten sind oft nur dekorativer Nebel mit vielen Servern und wenig Erkenntnisgewinn.

## Wartbarkeit

Wartbarkeit entsteht im Dokumentenmanager aus mehreren Faktoren:

- modulare Ordnerstruktur
- nachvollziehbare Router- und Serviceaufteilung
- Alembic-Migrationen
- dokumentierte `.env`
- automatische API-Dokumentation
- klare Trennung zwischen Metadaten und Dateiinhalten

Diese Kombination sorgt dafür, dass neue Teammitglieder oder spätere Bearbeiter nicht bei null anfangen müssen.

## Performance

Die teuersten Operationen sind:

- OCR-Verarbeitung
- Dateiverschlüsselung
- größere Datei-Uploads
- datenbankseitige Filter- und Suchabfragen bei wachsenden Beständen

### Gegenmaßnahmen

- Uploadgrößenlimit über `MAX_UPLOAD_MB`
- sinnvolle Indizierung in der Datenbank
- spätere Auslagerung teurer OCR-Schritte
- mögliche Ergebnisvorschau statt Vollverarbeitung im Request-Pfad

## Testbarkeit und Erweiterbarkeit

Ein gutes Projekt lässt sich nicht nur starten, sondern auch weiterentwickeln. Die Architektur des Dokumentenmanagers ist dafür geeignet, weil zentrale Funktionen fachlich trennbar sind. Denkbare Erweiterungen:

- KI-gestützte Zusammenfassungen
- feinere Rollenmodelle
- Protokollierung / Audit-Log
- zusätzliche Vorschauformate
- externe Speicherziele
- asynchrone Task-Queues

## Herausforderungen und konkrete Lösungen

### Herausforderung 1: OCR-Abhängigkeiten

**Problem:** OCR ist nützlich, aber betrieblich fehleranfällig, weil Systemtools wie Tesseract und Poppler vorhanden sein müssen.  
**Lösung:** Klare Dokumentation der Abhängigkeiten, separater Debug-Endpunkt und Smoke-Test.

### Herausforderung 2: Duplikatbehandlung

**Problem:** Blindes Überschreiben oder Verwerfen ist fachlich unbrauchbar.  
**Lösung:** `pending_uploads` als kontrollierter Zwischenzustand und explizite Benutzerentscheidung.

### Herausforderung 3: Sichere Dateiablage

**Problem:** Dateien dürfen nicht ungeschützt im Dateisystem liegen.  
**Lösung:** Fernet-basierte Verschlüsselung und Trennung zwischen Dateiinhalt und relationalen Metadaten.

### Herausforderung 4: Nachvollziehbare Schema-Entwicklung

**Problem:** Schemaänderungen im Team werden schnell chaotisch.  
**Lösung:** Alembic-Migrationen und konsistente Modellpflege.

## Fazit zur technischen Strategie

Die technische Strategie des Dokumentenmanagers ist durch bewusste Pragmatik geprägt: genug Tiefe für saubere Architektur, aber keine künstliche Komplexität um ihrer selbst willen. Gerade diese Balance ist ein Qualitätsmerkmal. Das Projekt zeigt, dass technologische Entscheidungen nicht isoliert, sondern im Spannungsfeld von Skalierbarkeit, Wartbarkeit, Performance, Datenschutz und Umsetzbarkeit getroffen wurden.
