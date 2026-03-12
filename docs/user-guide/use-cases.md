# Use-Cases

Dieser Abschnitt beschreibt typische Nutzungsszenarien. Die Darstellung ist bewusst prozessorientiert, weil Anwender selten nach Menüpunkten denken, sondern nach Aufgaben. Use-Cases sind deshalb die sinnvollste Form, um Bedienung und Fachnutzen zusammenzuführen.

## Use-Case 1: Erstmaliges Anmelden und Arbeiten mit dem Dashboard

Ein neuer Benutzer meldet sich an und landet auf dem Dashboard. Dort erhält er einen strukturierten Überblick über seine zuletzt genutzten oder relevanten Dokumente. Das Dashboard dient nicht bloß als dekorative Startseite, sondern als Navigationsanker. Von hier aus werden Suchvorgänge, Uploads, Favoriten und Papierkorb zugänglich.

**Nutzen:** Der Einstiegspunkt reduziert Orientierungskosten und führt direkt zu den Kernfunktionen.

## Use-Case 2: Dokument hochladen

1. Upload-Seite öffnen
2. Datei auswählen
3. Optional Kategorien oder Schlüsselwörter zuweisen
4. Upload bestätigen
5. Verarbeitung und Speicherung abwarten

Im Hintergrund wird die Datei geprüft, verschlüsselt gespeichert und in der Datenbank als neues Dokument erfasst. Falls OCR aktiviert und technisch verfügbar ist, wird zusätzlicher Text extrahiert. Dies erhöht die spätere Auffindbarkeit erheblich.

**Besonderheit:** Erkennt das System einen möglichen Duplikatfall, wird der Benutzer nicht mit stillschweigender Überschreibung überrascht, sondern in einen Entscheidungsworkflow geführt.

## Use-Case 3: Dokument über Volltextsuche finden

Ein Benutzer erinnert sich nicht an den genauen Dateinamen, aber an einen inhaltlichen Begriff. Genau hier zeigt sich der Mehrwert der OCR-gestützten Suche. Die Suchseite erlaubt nicht nur klassische Titel- oder Filterabfragen, sondern erschließt Inhalte gescannter Dokumente, sofern OCR erfolgreich durchgeführt wurde.

**Nutzen:** Die Anwendung wird von einer Ablage zu einem aktiven Wiederauffindungssystem.

## Use-Case 4: Dokumentdetail prüfen

In der Detailansicht sieht der Benutzer Metadaten, Kategorien, eventuell Vorschauinformationen, Versionen und weitere Funktionen. Diese Seite ist wichtig, weil sie aus einer simplen Listenanzeige eine nachvollziehbare Dokumenthistorie macht.

**Nutzen:** Der Benutzer kann Kontext und Zustand eines Dokuments verstehen, statt nur einen Dateinamen vor sich zu haben.

## Use-Case 5: Favoriten markieren

Häufig genutzte Dokumente können als Favoriten markiert werden. Das wirkt auf den ersten Blick wie eine kleine Komfortfunktion, ist aber in der täglichen Nutzung enorm relevant. Favoriten reduzieren Suchaufwand und schaffen einen Schnellzugriff auf besonders wichtige Unterlagen.

## Use-Case 6: Dokument in den Papierkorb verschieben und wiederherstellen

Anstatt Dokumente direkt irreversibel zu löschen, werden sie zunächst in den Papierkorb verschoben. Dadurch wird Fehlbedienung abgefangen. Die Wiederherstellungsmöglichkeit zeigt, dass Löschung im System als kontrollierter Zustand und nicht als sofortige Vernichtung gedacht wird.

**Nutzen:** Sicherheit im Bedienablauf und höhere Fehlertoleranz.

## Use-Case 7: Kategorien verwalten

Benutzer können eigene Kategorien definieren und bei Bedarf durch Schlüsselwörter anreichern. Dies verbessert nicht nur Ordnung, sondern unterstützt auch Such- und Filterprozesse.

## Fazit aus Nutzersicht

Die Use-Cases zeigen, dass der Dokumentenmanager nicht bloß „Dateien ablegt“, sondern strukturierte Informationsarbeit unterstützt. Besonders Upload-Workflow, Suche, Detailansicht und Papierkorb greifen ineinander. Genau diese Prozesssicht macht die Anwendung im Alltag brauchbar.

## Visuelle Orientierung

Zur Unterstützung der Use-Cases enthält die Dokumentation zusätzlich Mockups für Login, Dashboard, Upload, Dokumentübersicht, Suche und Detailansicht. Diese Abbildungen werden bewusst neutral benannt und zeigen die beabsichtigten Arbeitsbereiche der Anwendung, ohne personenbezogene Benennung in der Doku zu verwenden.
