# Kurzdokumentation – Projekt „Dokumentenmanager“

**Stand:** 08.10.2025  
**Team:**  
- Christian Schweitzer  
- Raphael Hirschmann  
- Cristian Radici  

---

## 1. Projektstart und Zielsetzung

Das Team entwickelte die Idee eines Dokumentenmanagers, einer Anwendung zur sicheren Verwaltung, Speicherung und Bereitstellung digitaler Dokumente (z. B. PDF, DOCX, PNG).  
Das System soll Nutzern ermöglichen, ihre Dateien zentral zu verwalten, Duplikate automatisch zu erkennen und auf Basis ihrer Benutzerrolle (System, Mitarbeiter) zuzugreifen.

Ein wesentlicher Bestandteil der Anwendung ist die Integration einer eigenen Cloud-Funktion:  
Nutzer können ihre Dokumente von verschiedenen Geräten aus erreichen – ob am Arbeitsplatz, zu Hause oder mobil mit dem Smartphone.  
Dabei werden alle Daten über einen eigenen Server bereitgestellt, sodass keine externen Cloud-Anbieter (z. B. Google oder Dropbox) nötig sind.  
Ziel ist eine private, datenschutzkonforme Cloud-Lösung, die jederzeit Zugriff auf persönliche Dokumente ermöglicht.

---

## 2. Technische Entscheidungen vor dem 08.10.2025

In der frühen Projektphase wurden folgende Grundlagen beschlossen:

**Datenbank:**  
MariaDB wird als zentrales Datenbanksystem eingesetzt.  
Dadurch können Benutzer, Dokumente, Rollen und Logdaten sicher gespeichert und verwaltet werden.

**Anwendung:**  
Die App wird webbasiert entwickelt (Python-Backend, optionale GUI-Elemente mit HTML/Tkinter).

**Projektmanagement:**  
Das Scrumboard wurde in GitHub erstellt, um Aufgaben, EPICs und User Stories zu planen und den Projektfortschritt transparent zu machen.

**Repositories:**  
- `Dokumentenmanager` – enthält Quellcode (Python, SQL, Serveranbindung, Cloud-Logik)  
- `Dokumentation-zur-Projektarbeit` – enthält EPICs, Weeklys, Diagramme und Dokumentation  

**Zugriffssystem:**  
Login über Benutzerkonto mit Passwort-Hashing (bcrypt) und Token-basierter Authentifizierung für mobilen Zugriff.

Die Sprintplanung bis **13. November 2025** wurde abgeschlossen und erste User Stories ins Sprint Backlog übertragen.

---

## 3. Weekly 1 (08.10.2025)

Am 08.10.2025 fand das erste Weekly-Meeting statt.  
Hier wurden Aufgaben konkret zugewiesen und das Scrumboard aktualisiert.

### Christian Schweitzer
- Verantwortlich für GitHub-Struktur, Branchmanagement und Dokumentation.  
- Einrichtung der Repositories und Verknüpfung mit dem Scrumboard.  
- Pflege der Dokumentation und Überprüfung der technischen Basis.  

### Raphael Hirschmann
- Verantwortlich für die Funktion **„Dokumente hochladen“**.  
- Entwickelt eine Upload-Lösung, die verschiedene Dateitypen akzeptiert und die Grundlage für den späteren Cloud-Zugriff bildet.  
- Erste Tests zur Verarbeitung und Speicherung der Dateien werden durchgeführt.  

### Cristian Radici
- Verantwortlich für das **logische Datenbankmodell** und die technische Struktur der MariaDB.  
- Start mit der Modellierung der Tabellen, Attribute und Beziehungen (Benutzer, Dokumente, Audit-Logs).  
- Abstimmung mit Hirschmann über Datenschnittstellen für Upload und Dateizugriff.  

---

*(Weitere Weeklys werden fortlaufend ergänzt – z. B. „Weekly 2 – 15.10.2025“, „Weekly 3 – 22.10.2025“ usw., bis zum Projektabschluss.)*
