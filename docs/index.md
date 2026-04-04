# Dokumentenmanager

![Dokumentenmanager Logo](assets/images/logo.jpg){ width="240" }

![Build Status](https://img.shields.io/badge/Build-passing-brightgreen)
![Version](https://img.shields.io/badge/Version-1.0.0-blue)
![Python](https://img.shields.io/badge/Python-3.11+-3776AB?logo=python&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-0.100+-009688?logo=fastapi&logoColor=white)
![Lizenz](https://img.shields.io/badge/Lizenz-Schulprojekt-lightgrey)

---

## Strukturierte, sichere und nachvollziehbare Dokumentenverwaltung

In vielen kleinen Teams, Projektgruppen und Lernumgebungen werden Dateien unstrukturiert auf lokalen Laufwerken, in Messenger-Verläufen oder in unsystematischen Ordnern verteilt. Die spätere Wiederauffindbarkeit, Nachvollziehbarkeit und sichere Verwaltung dieser Dokumente wird schnell zum Problem.

Der **Dokumentenmanager** löst genau dieses Problem: Eine webbasierte Anwendung zur zentralen Ablage, Kategorisierung, Verschlüsselung und Recherche digitaler Dokumente – gebaut für Nutzer, die eine nachvollziehbare, selbst kontrollierbare und technisch saubere Dokumentenorganisation benötigen.

---

## Kernfunktionen auf einen Blick

| Funktion | Beschreibung |
|---|---|
| **Verschlüsselte Ablage** | Dateien werden mit Fernet-Verschlüsselung im Dateisystem gesichert |
| **OCR-Volltextsuche** | PDFs und Bilder werden per Tesseract durchsuchbar gemacht |
| **Kategorien & Keywords** | Benutzerdefinierte Kategorisierung mit automatischem Tagging |
| **Versionierung** | Dokumenthistorie mit Wiederherstellung älterer Stände |
| **Duplikaterkennung** | Intelligenter Workflow bei erkannten Duplikaten |
| **Favoriten & Papierkorb** | Schnellzugriff und sichere Löschung mit Wiederherstellung |
| **MFA & E-Mail-Verifikation** | Mehrstufige Authentifizierung für erhöhte Sicherheit |
| **Audit-Logging** | Nachvollziehbare Protokollierung sicherheitsrelevanter Aktionen |

---

## Schnelleinstieg

```bash
git clone https://github.com/CHFChris/Dokumentenmanager.git
cd Dokumentenmanager
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
# .env anlegen (siehe Installationsanleitung)
alembic upgrade head
python -m uvicorn app.main:app --reload --port 8000
```

Danach erreichbar unter: [http://127.0.0.1:8000](http://127.0.0.1:8000)

→ Vollständige Anleitung: [Installation & Quickstart](installation.md)

---

## Dokumentationsübersicht

| Bereich | Inhalt |
|---|---|
| [Installation & Quickstart](installation.md) | Setup von Klon bis laufende Instanz |
| [Architektur](developer/architecture.md) | C4-Modell, Schichtenarchitektur, Datenflüsse |
| [Datenbankmodell](developer/database.md) | ER-Diagramm, Tabellenbeschreibungen, Normalisierung |
| [API-Referenz](developer/api.md) | Endpunkte, Request/Response-Muster, Fehlercodes |
| [Projektstruktur](developer/file-structure.md) | Ordneraufbau und Modulverantwortlichkeiten |
| [Sicherheitskonzept](developer/security.md) | Verschlüsselung, Hashing, Token, Zugriffsschutz |
| [Nutzungshandbuch](user-guide/overview.md) | Features, Use-Cases, Screenshots |
| [Technische Strategie](strategy.md) | Stack-Begründung, Skalierbarkeit, Herausforderungen |
| [Betrieb & Deployment](operations.md) | Produktivbetrieb, Backup, Updates |
