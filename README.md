# 📄 Dokumentenmanager – Projektdokumentation

[![Build & Deploy](https://github.com/CHFChris/Dokumentation-zur-Projektarbeit/actions/workflows/docs-pages.yml/badge.svg)](https://github.com/CHFChris/Dokumentation-zur-Projektarbeit/actions)
[![MkDocs Material](https://img.shields.io/badge/MkDocs-Material-blue?logo=materialdesign&logoColor=white)](https://squidfunk.github.io/mkdocs-material/)
[![Live Doku](https://img.shields.io/badge/Live-Dokumentation-brightgreen)](https://chfchris.github.io/Dokumentation-zur-Projektarbeit/)

> Vollständige technische Dokumentation zum **Dokumentenmanager** – einer webbasierten Anwendung zur sicheren, strukturierten und durchsuchbaren Verwaltung digitaler Dokumente.

🔗 **Live-Dokumentation:** [chfchris.github.io/Dokumentation-zur-Projektarbeit](https://chfchris.github.io/Dokumentation-zur-Projektarbeit/)

🔗 **Anwendungs-Repository:** [github.com/CHFChris/Dokumentenmanager](https://github.com/CHFChris/Dokumentenmanager)

---

## Inhalt der Dokumentation

| Bereich | Beschreibung |
|---|---|
| **Landingpage** | Produktübersicht, Kernfunktionen, Schnelleinstieg |
| **Installation & Quickstart** | Schritt-für-Schritt-Anleitung von `git clone` bis zur laufenden Instanz |
| **Architektur** | C4-Modell, Schichtenarchitektur, Sequenzdiagramme |
| **Datenbankmodell** | Vollständiges ER-Diagramm, Tabellenbeschreibungen, Normalisierung |
| **API-Referenz** | Endpunkte, Request/Response-Muster, Fehlercodes |
| **Projektstruktur** | Modulaufbau und Verantwortlichkeiten |
| **Sicherheitskonzept** | Verschlüsselung, Hashing, MFA, Token-Prozesse |
| **Nutzungshandbuch** | Use-Cases, Screenshots, Beispieldaten |
| **Technische Strategie** | Stack-Begründung, Skalierbarkeit, Herausforderungen |
| **Betrieb & Deployment** | Produktivbetrieb, Backup, Updates |

---

## Lokal starten

### Voraussetzungen

- Python 3.11+

### Setup

```bash
# Repository klonen
git clone https://github.com/CHFChris/Dokumentation-zur-Projektarbeit.git
cd Dokumentation-zur-Projektarbeit

# Virtuelle Umgebung erstellen und aktivieren
python -m venv .venv
source .venv/bin/activate        # Linux/macOS
# .venv\Scripts\activate         # Windows

# Abhängigkeiten installieren
pip install mkdocs-material pymdown-extensions

# Lokalen Server starten
mkdocs serve
```

Danach erreichbar unter: **http://127.0.0.1:8000**

Änderungen an `.md`-Dateien werden automatisch live nachgeladen.

---

## Projektstruktur

```text
.
├── docs/
│   ├── assets/
│   │   ├── images/           # Logo, Datenbankmodell
│   │   ├── screenshots/      # UI-Screenshots und Mockups
│   │   └── downloads/        # Downloadbare Dateien (.drawio)
│   ├── developer/
│   │   ├── architecture.md   # Systemarchitektur (C4)
│   │   ├── database.md       # Datenbankmodell
│   │   ├── api.md            # API-Referenz
│   │   ├── file-structure.md # Projektstruktur
│   │   └── security.md       # Sicherheitskonzept
│   ├── user-guide/
│   │   ├── overview.md       # Use-Cases und Features
│   │   ├── screenshots.md    # UI-Screenshots
│   │   └── example-data.md   # Testdaten und Demo
│   ├── stylesheets/
│   │   └── extra.css
│   ├── index.md              # Landingpage
│   ├── installation.md       # Setup-Anleitung
│   ├── strategy.md           # Technische Strategie
│   ├── operations.md         # Betrieb & Deployment
│   └── project-info.md       # Projektinfo und Team
├── .github/
│   └── workflows/
│       └── docs-pages.yml    # GitHub Pages Deployment
└── mkdocs.yml                # MkDocs-Konfiguration
```

---

## Deployment

Das Deployment auf GitHub Pages erfolgt automatisch über GitHub Actions bei jedem Push auf den `main`-Branch. Der Workflow (`.github/workflows/docs-pages.yml`) installiert die Abhängigkeiten, baut die Seite mit `mkdocs build` und deployed sie.

### Manueller Build

```bash
mkdocs build
```

Die statische Seite wird im Ordner `site/` erzeugt.

---

## Team

| Name | Schwerpunkt |
|---|---|
| **Christian Schweitzer** | Backend, Sicherheitslogik, technische Kernfunktionen |
| **Cristian Radici** | Datenbank, fachliche Logik, Integrationsanteile |
| **Raphael Hirschmann** | UI, Frontend, Oberflächenstruktur und Präsentation |
