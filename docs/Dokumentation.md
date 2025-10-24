# Kurzdokumentation – Projekt „Dokumentenmanager“

**Stand:** 22.10.2025  
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
- Beginn mit der Implementierung des **Passwort-Reset-Systems** und Verbesserung der Zugriffskontrolle.  
- Test des Dashboard-Templates und Fehlerbehebung.  

### Raphael Hirschmann
- Hat die grafische Benutzeroberfläche für **Login und Upload** fertiggestellt.  
- Nutzer können Dokumente über das Interface hochladen.  
- Arbeitet an der Anzeige hochgeladener Dateien und am **Light-/Dark-Mode**.  
- Ziel: automatische Aktualisierung der Dokumentenliste bei Uploads.  

### Cristian Radici
- Das **logische Datenbankmodell** wurde vollständig umgesetzt und in MariaDB integriert.  
- Tabellen für Nutzer, Dokumente und Versionierung erfolgreich erstellt und getestet.  
- Verbindung zwischen Backend und Datenbank eingerichtet.  
- Beginn der **Versionierungsfunktion**, um ältere Versionen automatisch zu speichern.  
- Abstimmung mit Schweitzer über API-Kommunikation zwischen FastAPI und SQLAlchemy.  

---

## 5. Weekly 3 – 22.10.2025

In der dritten Woche stand die Systemoptimierung im Fokus.  
Datenbank, Passwort-Reset und Benutzeroberfläche wurden weiterentwickelt.

### Christian Schweitzer
- Das **Passwort-Reset-System** läuft stabil, inkl. funktionierendem E-Mail-Versand.  
- Token-Validierung wurde optimiert (1 Stunde Gültigkeit, einmalige Verwendung).  
- Erste Tests zur Zeichencodierung und Fehlerbehandlung durchgeführt.  
- Implementierung der **Audit-Logs** begonnen, um sicherheitsrelevante Aktionen zu protokollieren.  
- Vorbereitung einer **Passwort-Policy** zur Validierung von Eingaben.  
- Zusammenarbeit mit Radici zur Tabellenanpassung und mit Hirschmann für UI-Tests.  

### Raphael Hirschmann
- Die **Reset-UI** für den Passwort-Reset-Prozess wurde erstellt und mit dem Backend verknüpft.  
- Feedback aus der Review wurde umgesetzt (neues Ticket „Light/Dark-Mode – Anpassung nach Feedback“).  
- Optimierung von Farbkontrasten, Fokus-Ringen und Hover-Effekten.  
- Tests der Reset-UI in beiden Themes.  
- Dokumentation der Änderungen mit Screenshots für das Sprint-Review.  
- Abstimmung mit Schweitzer zu API-Rückmeldungen (Token-Fehler, Passwort-Policy).  

### Cristian Radici
- **Datenbankoptimierung** begonnen: neue Indizes für häufige Abfragen erstellt.  
- **Integrität** der Versionierungstabellen verbessert.  
- Verbindung zwischen Auth-Tokens und Benutzer-IDs stabilisiert.  
- Start der Funktion **„Doppelte Dokumente erkennen / löschen“** aus dem Sprint-Backlog.  
- Analyse potenzieller Konflikte durch Fremdschlüssel und Cascade-Verhalten.  
- Zusammenarbeit mit Schweitzer (API) und Hirschmann (UI-Handling bei Löschungen).  

---

## 6. Projektfortschritt bis zum 22.10.2025

Bisherige Meilensteine:
- Projektidee, Rollenverteilung und Zieldefinition abgeschlossen.  
- MariaDB-Datenbank erstellt, optimiert und in Nutzung.  
- Login-, Upload- und Passwort-Reset-System voll funktionsfähig.  
- Versionierung und Dublettenprüfung in Arbeit.  
- GUI mit Light-/Dark-Mode implementiert, Reset-UI integriert.  
- Audit-Logs in Entwicklung.  
- GitHub-Repositories gepflegt und strukturiert.  

Nächste Schritte:
- Abschluss der Audit-Log-Implementierung (Schweitzer).  
- Finalisierung der Dublettenprüfung & Löschlogik (Radici).  
- Feinschliff an UI-Elementen, Theme-System und Dokumentenanzeige (Hirschmann).  
- Integration aller Komponenten für das Sprint-Review am **13. November 2025**.  

---

*(Weitere Weeklys werden fortlaufend ergänzt – z. B. „Weekly 4 – 29.10.2025“, „Weekly 5 – 05.11.2025“ usw., bis zum Projektabschluss.)*
