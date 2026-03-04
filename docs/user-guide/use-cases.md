# Nutzungshandbuch – Use-Cases

## Use-Case 1: Dokument hochladen und wiederfinden

1. Einloggen.
2. `/upload` öffnen.
3. Datei hochladen.
4. In `/documents` prüfen.
5. In `/search` nach Begriffen aus dem Dokument suchen (OCR vorausgesetzt).

## Use-Case 2: Duplikat-Workflow

1. Datei A hochladen.
2. Dieselbe Datei A erneut hochladen.
3. System erkennt Duplikat und zeigt Optionen (Pending-Upload).
4. Entscheidung:
   - neues Dokument zusätzlich speichern oder
   - bestehendes ersetzen oder
   - Pending verwerfen.

## Use-Case 3: Kategorien und Keywords pflegen

1. `/category-keywords` öffnen.
2. Kategorie anlegen (z. B. "Finanzen").
3. Keywords hinzufügen (z. B. "Rechnung, Steuer, IBAN").
4. Uploads werden durch OCR/Auto-Tagging unterstützt (best effort).

## Use-Case 4: Versionierung

1. Dokumentdetails öffnen.
2. Neue Version hinzufügen (je nach UI/Flow).
3. Versionen vergleichen und nachvollziehen.

## Use-Case 5: Papierkorb

1. Dokument löschen (Soft-Delete).
2. `/trash` öffnen.
3. Wiederherstellen oder endgültig löschen.
4. Automatische Bereinigung nach 30 Tagen.
