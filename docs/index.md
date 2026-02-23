# Dokumentenmanager

![Dokumentenmanager Logo](assets/logo.svg){ width="120" }

[![Docs](https://github.com/CHFChris/Dokumentenmanager/actions/workflows/docs-pages.yml/badge.svg)](https://github.com/CHFChris/Dokumentenmanager/actions/workflows/docs-pages.yml)

## Kurzbeschreibung (Value Proposition)

Viele Studierende, Freelancer und kleine Teams verlieren Zeit, weil Dokumente verstreut abgelegt sind und Scans/PDFs ohne OCR praktisch nicht durchsuchbar sind.
Der Dokumentenmanager richtet sich an Nutzerinnen und Nutzer, die eine selbst gehostete, nachvollziehbare Ablage mit klaren Kategorien, schneller Suche und sinnvollen Sicherheitsmechanismen benötigen.
Die Anwendung verwaltet Metadaten in MariaDB/MySQL, speichert Dateien verschlüsselt im Dateisystem und extrahiert Text aus PDFs/Bildern per OCR, damit Inhalte durchsuchbar werden.
Zusätzlich unterstützt sie Versionierung, Favoriten und einen Papierkorb mit automatischer Bereinigung, damit Änderungen nachvollziehbar bleiben und Fehlbedienungen abgefedert werden.

## Einstiegspunkte (lokal)

- Web-UI: http://127.0.0.1:8000/ (Weiterleitung auf /dashboard)
- Swagger UI: http://127.0.0.1:8000/docs
- OCR-Debug: POST http://127.0.0.1:8000/debug-ocr/test
- Frontend (optional): http://127.0.0.1:5173/

## Was in wenigen Sekunden klar sein muss

- Dateien liegen nicht im Klartext im Dateisystem, sondern werden mit Fernet verschlüsselt gespeichert.
- OCR ist offline (Tesseract) und macht Inhalte aus Bildern/PDFs durchsuchbar.
- Die Web-UI ist die Referenzoberfläche; das Frontend ist optional.
