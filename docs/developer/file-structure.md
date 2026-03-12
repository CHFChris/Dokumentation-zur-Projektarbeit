# Projektstruktur

Die Projektstruktur des Dokumentenmanagers wurde so aufgebaut, dass Verantwortlichkeiten im Code erkennbar bleiben. Eine nachvollziehbare Ordnerstruktur ist kein Schönheitswettbewerb, sondern ein Wartbarkeitsmerkmal. Wer nach Wochen oder Monaten in ein Projekt zurückkehrt, sollte aus der Struktur selbst bereits Rückschlüsse auf Zuständigkeiten, Integrationspunkte und Erweiterungsmöglichkeiten ziehen können.

## Typische Hauptbereiche

```text
app/
  api/
  core/
  db/
  models/
  services/
  utils/
  web/

alembic/
data/
docs/
```

## Einordnung der Bereiche

### `app/api/`

Hier liegen API-nahe Routen, Abhängigkeiten und requestorientierte Schnittstellen. Ziel ist eine saubere Trennung zwischen transportbezogener Ebene und eigentlicher Geschäftslogik.

### `app/core/`

Konfigurationslogik, zentrale Einstellungen und allgemeine Initialisierung. Dieser Bereich ist besonders wichtig, weil hier Umgebungsvariablen validiert und sicherheitsrelevante Defaults zusammengeführt werden.

### `app/db/`

Datenbankinitialisierung, Session-Handling und migrationsnahe Infrastruktur. Ohne saubere Datenbankschicht entsteht schnell Kopplung zwischen Geschäftslogik und Persistenzzugriff.

### `app/models/`

ORM-Modelle für Benutzer, Dokumente, Kategorien, Versionen und Token-Entitäten. Dieser Bereich bildet das Bindeglied zwischen fachlichem Modell und relationalem Schema.

### `app/services/`

Hier sollte die eigentliche Geschäftslogik konzentriert werden: Uploadverarbeitung, OCR-Workflows, Berechtigungslogik, Versionierung, Suchfunktionalität, Papierkorbverhalten. Diese Schicht ist entscheidend für Wartbarkeit, weil sie verhindert, dass Logik in Routern zerfließt.

### `app/utils/`

Hilfsfunktionen für Dateiverarbeitung, Kryptografie, OCR, Hashing oder Validierung. Saubere Utility-Bereiche vermeiden Copy-and-Paste-Logik.

### `app/web/`

HTML-nahe Webrouten und Templates für die serverseitig gerenderte Oberfläche. Die Trennung zwischen Web und API hilft dabei, Benutzeroberfläche und maschinenlesbare Schnittstellen unabhängig zu denken.

## Warum diese Struktur sinnvoll ist

Die Struktur des Dokumentenmanagers zeigt, dass das Projekt modular gedacht wurde. Das ist nicht nur für Teamarbeit relevant, sondern auch für Bewertungskriterien wie Nachvollziehbarkeit, Wartbarkeit und technische Kompetenz. Eine gute Struktur verhindert nicht automatisch Fehler, aber eine schlechte Struktur macht saubere Weiterentwicklung fast unmöglich. Anders gesagt: Architektur beginnt nicht erst beim großen Diagramm, sondern schon bei Ordnern, Abhängigkeiten und Benennungen.
