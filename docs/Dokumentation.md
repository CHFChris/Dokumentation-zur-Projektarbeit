# Kurzdokumentation – Projekt „Dokumentenmanager“

**Stand:** 15.10.2025  
**Team:**  
- Christian Schweitzer  
- Raphael Hirschmann  
- Cristian Radici  

---

## 1. Projektstart und Zielsetzung

Das Team entwickelte die Idee eines Dokumentenmanagers – einer Anwendung zur sicheren Verwaltung, Speicherung und Bereitstellung digitaler Dokumente (z. B. PDF, DOCX, PNG).  
Das System soll Nutzern ermöglichen, ihre Dateien zentral zu verwalten, Duplikate automatisch zu erkennen und über Rollenrechte (System, Mitarbeiter) zu steuern.

Ein zentraler Bestandteil ist die Integration einer **eigenen Cloud-Funktion**:  
Nutzer können von verschiedenen Geräten (PC, Laptop, Smartphone) auf ihre Dokumente zugreifen – egal ob von zu Hause, im Büro oder unterwegs.  
Die Anwendung verwendet dafür keinen externen Cloud-Dienst wie Google Drive oder Dropbox, sondern läuft auf einem **eigenen Server** mit sicherer Authentifizierung.  
Damit wird eine **private, datenschutzkonforme Cloud-Lösung** geschaffen, die Kontrolle und Zugänglichkeit vereint.

---

## 2. Technische Entscheidungen bis zum 08.10.2025

In der Planungsphase wurden folgende Grundlagen beschlossen:

### Datenbank  
- Verwendung von **MariaDB** als zentrale Datenbank.  
- Speicherung von Benutzern, Dokumenten, Rollen und Audit-Logs.  
- Nutzung von Primär- und Fremdschlüsseln zur konsistenten Datenverwaltung.  

### Anwendung  
- Entwicklung als **Webanwendung** mit Python-Backend.  
- Optionales GUI-Frontend (Tkinter oder Weboberfläche mit HTML/CSS).  
- Upload-, Login- und Cloudzugriff über REST-Schnittstellen.  

### Projektmanagement  
- Einführung eines **Scrumboards** in GitHub zur Sprint-Planung und Aufgabenverteilung.  
- Definition von **EPICs**, **User Stories** und **Akzeptanzkriterien**.  
- Regelmäßige Teamabstimmungen über Fortschritte.  

### Repositories  
- `Dokumentenmanager` – enthält den vollständigen Quellcode (Python, SQL, Cloud-Logik, Schnittstellen).  
- `Dokumentation-zur-Projektarbeit` – beinhaltet Dokumentation, Weeklys, Diagramme, EPICs und Fortschrittsberichte.  

### Zugriffssystem  
- Benutzer-Login mit **Passwort-Hashing (bcrypt)**.  
- Token-basierte Authentifizierung für Web- und Mobile-Zugriff.  
- Rollenmodell mit differenzierten Berechtigungen (System / Mitarbeiter).  

### Sprintplanung  
- Sprint 1 läuft bis **13. November 2025**.  
- Fokus: Aufbau des Grundsystems (Login, Upload, Datenbankstruktur, Rollen).  

---

## 3. Weekly 1 – 08.10.2025

Am 08.10.2025 fand das erste Weekly-Meeting statt.  
Hier wurden die aktuellen Aufgaben überprüft, neue Arbeitspakete verteilt und das Scrumboard angepasst.

### Christian Schweitzer
- Hat die GitHub-Struktur aufgebaut und gepflegt.  
- Repositories angelegt und mit dem Scrumboard verknüpft.  
- Dokumentation erweitert und Projektbeschreibung überarbeitet.  
- Verantwortlich für Git-Verwaltung, Branchstruktur und technische Abstimmung.  

### Raphael Hirschmann
- Zuständig für die Funktion **„Dokumente hochladen“**.  
- Arbeitsumgebung vorbereitet und erste Planung abgeschlossen.  
- Ziel: Upload-Funktion für verschiedene Dateitypen (PDF, DOCX, PNG).  
- Diese Funktion dient als Grundlage für den späteren Cloud-Zugriff.  

### Cristian Radici
- Zuständig für das **logische Datenbankmodell** und die technische Umsetzung in MariaDB.  
- Beginn der Modellierung der Tabellen: `user`, `document`, `audit_log`, `document_version`.  
- Definition der Beziehungen, Schlüssel und Hash-Felder.  

---

## 4. Weekly 2 – 15.10.2025

In der zweiten Projektwoche wurden große Fortschritte bei Backend, Datenbank und Frontend erzielt.

### Christian Schweitzer
- Das Backend wurde um **Login- und Upload-Routen** erweitert.  
- Verbindung zwischen Backend und Datenbank erfolgreich hergestellt.  
- Zugriffsschutz ergänzt, sodass nur registrierte Nutzer Dokumente hochladen können.  
- Beginnt mit der Implementierung des **Passwort-Reset-Systems** und verbessert die Zugriffskontrolle.  
- Testet aktuell das Dashboard-Template und behebt kleinere Fehler.  

### Raphael Hirschmann
- Hat die grafische Benutzeroberfläche für **Login und Upload** fertiggestellt.  
- Nutzer können Dokumente über das Interface hochladen.  
- Arbeitet an der Anzeige hochgeladener Dateien und am **Light-/Dark-Mode** zur Anpassung der Ansicht.  
- Ziel ist, dass die Dokumentenliste automatisch aktualisiert wird, sobald neue Dateien hochgeladen wurden.  

### Cristian Radici
- Das **logische Datenbankmodell** wurde vollständig umgesetzt und in MariaDB integriert.  
- Tabellen für Nutzer, Dokumente und Versionierung erfolgreich erstellt und getestet.  
- Verbindung zwischen Backend und Datenbank eingerichtet.  
- Beginnt nun mit der **Funktion zur Versionierung von Dokumenten**, sodass ältere Versionen automatisch gespeichert bleiben.  
- Abstimmung mit Schweitzer über die API-Kommunikation zwischen FastAPI und SQLAlchemy.  

---

## 5. Projektfortschritt bis zum 15.10.2025

Bisherige Meilensteine:
- Projektidee und Zieldefinition abgeschlossen.  
- MariaDB als Datenbank implementiert und getestet.  
- Backend-Routen (Login, Upload) funktionsfähig.  
- GUI für Login und Upload fertiggestellt.  
- Datenbankmodell und Versionierung vorbereitet.  
- Zugriffsschutz und Authentifizierung umgesetzt.  

Nächste Schritte:
- Fertigstellung der Versionierungsfunktion (Radici).  
- Implementierung des Passwort-Reset-Systems (Schweitzer).  
- Dynamische Dokumentenanzeige und Light-/Dark-Mode (Hirschmann).  
- Erste Gesamtintegration von Frontend, Backend und Datenbank.  

---

*(Weitere Weeklys werden fortlaufend ergänzt – z. B. „Weekly 3 – 22.10.2025“, „Weekly 4 – 29.10.2025“ usw., bis zum Projektabschluss.)*
