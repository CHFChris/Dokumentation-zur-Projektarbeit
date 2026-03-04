# Nutzungshandbuch – Überblick

## Einstieg (Web-UI)

Nach dem Start des Backends:
- Root: `/` leitet auf `/dashboard` um
- API-Dokumentation: `/docs`

## Hauptfunktionen

- Registrierung/Login mit E-Mail-Verifikation, optional MFA per E-Mail-Code
- Upload und sichere Speicherung (Dateien verschlüsselt)
- OCR (Bilder/PDFs/DOCX) und Volltextsuche
- Kategorien und Keywords (inkl. Vorschläge und Auto-Tagging, best effort)
- Versionierung
- Favoriten
- Papierkorb (Soft-Delete) mit automatischer Bereinigung

## Typischer Workflow

1. Login
2. Dokument hochladen und Kategorie zuweisen
3. Über Suche (Dateiname + OCR) wiederfinden
4. Optional: Favorit setzen
5. Bei Fehlern: Papierkorb nutzen (Restore)
