# Dokumentenmanager 2026

![Dokumentenmanager Logo](assets/logo.svg){ .logo }

[![Docs](https://github.com/CHFChris/Dokumentation-zur-Projektarbeit/actions/workflows/docs-pages.yml/badge.svg)](https://github.com/CHFChris/Dokumentation-zur-Projektarbeit/actions/workflows/docs-pages.yml)
![Stand](https://img.shields.io/badge/Stand-2026--03-blue)
![Deployment](https://img.shields.io/badge/Deployment-GitHub%20Pages-success)

Projekt-Repository (Code): https://github.com/CHFChris/Dokumentenmanager

## Kurzbeschreibung (Value Proposition)

Viele Studierende, Freelancer und kleine Teams verlieren Zeit, weil Dokumente verstreut abgelegt sind und Scans/PDFs ohne OCR kaum durchsuchbar sind.
Der Dokumentenmanager richtet sich an Nutzerinnen und Nutzer, die eine selbst gehostete, nachvollziehbare Ablage mit klaren Kategorien, schneller Suche und sinnvollen Sicherheitsmechanismen benötigen.
Die Anwendung verwaltet Metadaten in MariaDB/MySQL, speichert Dateien verschlüsselt im Dateisystem und extrahiert Text aus PDFs und Bildern per OCR, damit Inhalte im Volltext auffindbar werden.
Zusätzlich unterstützt sie Versionierung, Favoriten und einen Papierkorb mit automatischer Bereinigung, damit Änderungen nachvollziehbar bleiben und Fehlbedienungen abgefedert werden.

## Innerhalb weniger Sekunden klar

- Startpunkt: Web-UI des Backends (Root leitet auf `/dashboard` um), API-Dokumentation unter `/docs`.
- Dateien werden nicht im Klartext gespeichert: Ablage verschlüsselt (Fernet).
- OCR läuft offline (Tesseract) und macht Inhalte aus Bildern/PDFs durchsuchbar.
- Kategorien/Keywords + Suche + Versionierung sind der Kern des Workflows.

## Einstiegspunkte (lokal)

- Web-UI: http://127.0.0.1:8000/ (Weiterleitung auf /dashboard)
- Swagger UI: http://127.0.0.1:8000/docs
- OCR-Debug: POST http://127.0.0.1:8000/debug-ocr/test
- Frontend (optional): http://127.0.0.1:5173/

## Navigation

- Installation & Quick Start
- Technische Dokumentation (Architektur, Datenbankmodell, API, Projektstruktur)
- Nutzungshandbuch (Use-Cases, UI-Screenshots, Beispieldaten)
- Technische Strategie (Trade-offs, Workarounds)
