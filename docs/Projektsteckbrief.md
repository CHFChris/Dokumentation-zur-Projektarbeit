# Projektsteckbrief

## Allgemeine Informationen

**Arbeitstitel des Projekts:**  
Smart Personal Knowledge Hub

**Art der Anwendung:**  
Web App

**Teammitglieder:**  
1. Raphael Hirschmann  
2. Christian Schweitzer  
3. Cristian Radici

**Arbeitszeitraum:**  
September 2025 – April 2026

---

## Produktvision

### Ausgangssituation
Viele Nutzer arbeiten mit einer Vielzahl von Dokumenten (PDF, DOCX, TXT, Notizen), die unübersichtlich auf dem Rechner, in E-Mails oder Cloud-Ordnern verteilt sind. Klassische Suchfunktionen finden nur exakte Textstellen.  
Es fehlt eine einfache Möglichkeit, Dokumente lokal oder in einer Webumgebung intelligent zu durchsuchen und zusammenzufassen – ohne Abhängigkeit von externen Cloud-Diensten und mit Fokus auf Datenschutz.

### Grobe Zielbeschreibung
Unsere Anwendung soll ein intelligentes Wissens- und Dokumentenmanagementsystem sein, das als Web-App im Browser läuft.

Nutzer können Dokumente hochladen und in einer lokalen Datenbank (SQLite, optional MariaDB) speichern.  
Die Anwendung nutzt KI, um Dokumente automatisch zu verschlagworten, zu clustern und zusammenzufassen.  
Eine semantische Suche ermöglicht es, Inhalte nach Bedeutung statt nur nach Schlüsselworten zu finden.  
Optional: Integration einer OneNote-Anbindung, sodass Notizen direkt importiert oder synchronisiert werden können.

Statt mühsam Schlagwörter in verschiedenen Dateien oder Notizen zu suchen, lädst du deine Dokumente in unsere App.  
Die KI erstellt automatisch Zusammenfassungen, Schlagwörter und bietet eine semantische Suche – so findest du Inhalte nach Bedeutung, nicht nur nach dem exakten Wort.  
Alles bleibt lokal und sicher.

### Sinn und Nutzen der Anwendung
Die Anwendung erleichtert die Organisation von Wissen und spart Zeit bei der Informationssuche.

**Zielgruppe:**  
Studierende, Lehrkräfte, kleine Unternehmen oder Privatpersonen mit vielen Dokumenten.

**Mehrwert:**  
- Datensouveränität: Alle Daten bleiben lokal oder im eigenen Netz  
- KI-gestützte Suche und Zusammenfassungen  
- Übersichtliches Web-Dashboard für einfache Bedienung  
- Erweiterbarkeit (z. B. Benutzerverwaltung, Versionierung, OneNote-Schnittstelle)

---

## Entwicklungsetappen

1. **Architektur & Setup**  
   Grundgerüst der Web-App, Datenbankanbindung (SQLite als Standard).

2. **Datenbankdesign**  
   Tabellen für Dokumente, Metadaten, Schlagwörter, optional Nutzerverwaltung.

3. **Dokumentenimport & Parsing**  
   Upload-Funktion für PDF, TXT, DOCX.  
   Extraktion von Text und Speicherung in der Datenbank.

4. **Einfache GUI**  
   Web-Frontend (HTML/CSS/JS) mit Upload-Seite und Dokumentliste.

5. **KI-Integration (Basis)**  
   Automatische Schlagwortgenerierung und erste Textzusammenfassungen.

6. **Semantische Suche**  
   Implementierung einer Vektor-Suche (z. B. Speicherung von Embeddings in der Datenbank).

7. **Erweiterte GUI**  
   Suchfeld, Ergebnisanzeige mit Vorschlägen, Detailseiten mit Zusammenfassungen.

8. **Export-Funktionen**  
   Speicherung von Zusammenfassungen oder Suchergebnissen als TXT oder PDF.

9. **Optionale Erweiterungen**  
   OneNote-Anbindung über Microsoft Graph API, Benutzerverwaltung (Login, Rollen), Versionierung von Dokumenten, visuelle Analysen (z. B. Schlagwortwolken).

10. **Testing & Dokumentation**  
    Fehlerprüfung, Optimierung und Benutzerhandbuch.

---

## Sonstiges
Keine weiteren Anmerkungen.
