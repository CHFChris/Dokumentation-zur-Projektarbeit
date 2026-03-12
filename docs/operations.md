# Betrieb & Deployment

Diese Seite bündelt Hinweise für den Betrieb des Dokumentenmanagers außerhalb des reinen Entwicklungskontexts. Auch wenn es sich um ein Schulprojekt handelt, ist es fachlich sinnvoll, Betriebsfragen zu dokumentieren, weil genau dort oft sichtbar wird, ob eine Anwendung nur für die Vorführung gebaut oder tatsächlich als System gedacht wurde.

## Lokaler Entwicklungsbetrieb

Für lokale Entwicklung eignet sich Uvicorn mit `--reload`. Änderungen am Code werden damit automatisch nachgeladen. Diese Betriebsform ist komfortabel, aber nicht für produktionsnahe Nutzung gedacht.

## Produktivnahe Ausführung

Für einen stabileren Betrieb sollte die Anwendung hinter einem Reverse Proxy wie Nginx laufen. HTTPS, Header-Handling, Request-Größenbegrenzung und Logging lassen sich dort kontrollierter konfigurieren. Die Dokumentation benennt diesen Punkt bewusst, weil Sicherheit und Betrieb nicht an der Python-Datei enden.

## Geheimnismanagement

- `.env` niemals committen
- Produktionsschlüssel getrennt von Entwicklungswerten halten
- Zugriffsrechte auf Konfigurationsdateien beschränken
- Schlüsselrotation zumindest konzeptionell berücksichtigen

## Backup-Strategie

### Datenbank

Regelmäßige Dumps, dokumentierte Restore-Tests und klare Verantwortlichkeiten sind notwendig. Ein Backup, das nie zurückgespielt wurde, ist eher ein Glaube als ein Plan.

### Dateispeicher

Der Inhalt von `FILES_DIR` muss gemeinsam mit der Datenbank gesichert werden, weil Metadaten und Dateien logisch zusammengehören. Ohne passenden Verschlüsselungsschlüssel können gesicherte Dateien nicht sinnvoll wiederhergestellt werden.

## Updates

Nach Änderungen am Projektstand sollten Migrationsskripte ausgeführt und die Anwendung neu gestartet werden:

```bash
alembic upgrade head
python -m uvicorn app.main:app --reload
```

## GitHub Pages für die Doku

Die Projektdokumentation selbst ist für GitHub Pages ausgelegt. Der Workflow unter `.github/workflows/docs-pages.yml` baut die MkDocs-Seite automatisiert und veröffentlicht sie. Dadurch ist die Dokumentation öffentlich erreichbar, versioniert und sauber von der eigentlichen Anwendung getrennt.
