# Format & Abgabe

## Checkliste (Mindestanforderungen)

- Landingpage mit Produktname, Logo, Value Proposition (3-4 Sätze) und Status-Badges
- Installation & Quick Start: reproduzierbar von `git clone` bis "läuft"
- Konfiguration: `.env` erklärt, relevante Parameter beschrieben, Security-Hinweise enthalten
- Technische Dokumentation: Architekturdiagramm (inkl. überarbeiteter Version), DB-Modell, API-Referenz, Projektstruktur
- Nutzungshandbuch: Features, Use-Cases, UI-Screenshots, Beispieldaten
- Technische Strategie: Stack, Alternativen, Skalierbarkeit, Wartbarkeit, Performance, Workarounds
- Formvorgaben: interne Links ok, Bilder/Diagramme korrekt, konsistentes Design

## Lokal testen (Pflicht)

Im Doku-Repository:

```bash
pip install mkdocs-material
mkdocs build --strict
mkdocs serve -a 127.0.0.1:8010
```

Öffnen:
- http://127.0.0.1:8010/Dokumentation-zur-Projektarbeit/

## GitHub Pages Deployment (öffentlich)

1. GitHub -> Repository `Dokumentation-zur-Projektarbeit` -> Settings -> Pages
2. Source: GitHub Actions
3. Push auf `main` triggert den Workflow `.github/workflows/docs-pages.yml`
4. Live-URL:
   - https://chfchris.github.io/Dokumentation-zur-Projektarbeit/

## Typische Fehlerquellen

- `site/` nicht committen (Build-Output). In `.gitignore` aufnehmen.
- Screenshots: Pfade müssen zu `docs/assets/screenshots/*.png` passen.
- Port-Konflikt: Backend läuft oft auf 8000. Doku lokal auf 8010 starten.
