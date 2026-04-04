# Betrieb & Deployment

Diese Seite bündelt Hinweise für den Betrieb des Dokumentenmanagers außerhalb des reinen Entwicklungskontexts.

---

## Lokaler Entwicklungsbetrieb

Für lokale Entwicklung eignet sich Uvicorn mit `--reload`. Änderungen am Code werden automatisch nachgeladen:

```bash
python -m uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
```

Diese Betriebsform ist komfortabel, aber nicht für den produktionsnahen Einsatz gedacht.

---

## Produktivnahe Ausführung

Für einen stabileren Betrieb sollte die Anwendung hinter einem Reverse Proxy (z. B. Nginx) laufen. HTTPS, Header-Handling, Request-Größenbegrenzung und Logging lassen sich dort kontrollierter konfigurieren.

Empfohlene Uvicorn-Konfiguration für Produktion:

```bash
python -m uvicorn app.main:app --host 0.0.0.0 --port 8000 --workers 4
```

!!! warning "Sicherheit"
    In produktionsnahen Umgebungen dürfen Datenbank und Mailserver nicht ohne Netzsegmentierung öffentlich erreichbar sein. `APP_ENV` sollte nicht auf `development` stehen.

---

## Geheimnismanagement

- `.env` niemals in das Repository einchecken
- Produktionsschlüssel getrennt von Entwicklungswerten halten
- Zugriffsrechte auf Konfigurationsdateien beschränken
- Schlüsselrotation konzeptionell berücksichtigen – insbesondere bei `FILES_FERNET_KEY`

---

## Backup-Strategie

### Datenbank

Regelmäßige Dumps mit dokumentierten Restore-Tests:

```bash
# Backup
mysqldump -u dm -p dokumentenmanager > backup_$(date +%Y%m%d).sql

# Restore
mysql -u dm -p dokumentenmanager < backup_20260404.sql
```

### Dateispeicher

Der Inhalt von `FILES_DIR` muss gemeinsam mit der Datenbank gesichert werden, weil Metadaten und verschlüsselte Dateien logisch zusammengehören. Ohne den passenden Fernet-Schlüssel können gesicherte Dateien nicht wiederhergestellt werden.

!!! danger "Wichtig"
    Ein Backup ohne zugehörigen `FILES_FERNET_KEY` ist wertlos. Der Schlüssel muss separat und sicher aufbewahrt werden.

---

## Updates und Migrationen

Nach Änderungen am Projektstand:

```bash
git pull
pip install -r requirements.txt
alembic upgrade head
# Anwendung neu starten
```

---

## Automatische Papierkorb-Bereinigung

Der `trash_service` führt beim Start der Anwendung einen periodischen Hintergrund-Task aus, der abgelaufene Papierkorb-Einträge automatisch bereinigt. Die Bereinigungsfrist ist konfigurierbar.

---

## GitHub Pages für die Dokumentation

Die Projektdokumentation ist für GitHub Pages ausgelegt. Der Workflow unter `.github/workflows/docs-pages.yml` baut die MkDocs-Seite automatisiert:

```bash
# Lokale Vorschau
pip install mkdocs-material
mkdocs serve
```

Die Dokumentation ist unter [https://chfchris.github.io/Dokumentation-zur-Projektarbeit/](https://chfchris.github.io/Dokumentation-zur-Projektarbeit/) öffentlich erreichbar.
