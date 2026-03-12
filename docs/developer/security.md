# Security-Konzept

Das Security-Konzept des Dokumentenmanagers verfolgt keinen Anspruch auf maximale Enterprise-Komplexität, wohl aber auf fachlich sinnvolle Schutzmechanismen für ein realistisches Schul- und Praxisprojekt. Sicherheitsmaßnahmen sind hier nicht Dekoration, sondern direkte Antwort auf die Tatsache, dass Dokumente personenbezogene, vertrauliche oder organisatorisch sensible Inhalte enthalten können.

## Schutzziele

- **Vertraulichkeit:** Unbefugte dürfen Dateiinhalte nicht lesen können.
- **Integrität:** Inhalte und Zustände sollen nicht unbemerkt manipuliert werden.
- **Authentizität:** Zugriffe sollen Benutzern eindeutig zuordenbar sein.
- **Verfügbarkeit:** Wichtige Dokumente sollen nicht leichtfertig verloren gehen.

## Passwortschutz

Passwörter werden nicht im Klartext gespeichert. Stattdessen werden Hashverfahren eingesetzt, typischerweise über `passlib[bcrypt]`. Diese Entscheidung ist grundlegend und nicht verhandelbar, weil ein Datenleck sonst sofort zur Preisgabe von Benutzerpasswörtern führen würde.

## Datei- und Textverschlüsselung

Dateiinhalte werden verschlüsselt im Dateisystem abgelegt. Dafür wird ein Fernet-Schlüssel verwendet. Diese Trennung zwischen Metadatenbank und verschlüsselter Dateispeicherung ist sicherheitstechnisch sinnvoll, weil sie die unmittelbare Lesbarkeit sensibler Inhalte aus dem Dateivolume verhindert.

## Token-basierte Prozesse

Für Verifikation, MFA oder Passwort-Reset werden Tokens bzw. Codes verwendet. Wichtig sind dabei:

- klare Gültigkeitsdauer
- Rate Limits
- nachvollziehbarer Ablauf
- Trennung zwischen Besitznachweis und eigentlicher Kontonutzung

## Rollen und Zugriff

Die Anwendung trennt Benutzerkontexte, Dokumenteigentum und organisatorische Funktionen. Auch wenn das Projekt keine komplexe Unternehmensrollenmatrix abbildet, ist die grundlegende Idee klar: Nicht jede Funktion soll jedem Benutzer in jedem Kontext offenstehen.

## Sicherheitsrelevante Schwachstellen und Gegenmaßnahmen

### Risiko: Unsichere `.env`

Wenn Schlüssel im Repository landen oder zwischen Teammitgliedern unkontrolliert kopiert werden, ist die Sicherheitsarchitektur faktisch beschädigt. Gegenmaßnahme: `.gitignore`, klare Dokumentation und getrennte lokale Schlüssel.

### Risiko: OCR als Angriffsfläche

Dateiverarbeitung ist grundsätzlich ein riskanter Bereich, weil Dateien komplexe Formate enthalten können. Gegenmaßnahme: begrenzte Dateitypen, Größenlimits, kontrollierte Verarbeitung und keine blind ausgeführten Fremdinhalte.

### Risiko: Fehlkonfigurierte Berechtigungen im Dateisystem

Wenn `FILES_DIR` für falsche Konten beschreibbar oder lesbar ist, nützt Verschlüsselung allein nicht mehr genug. Gegenmaßnahme: gezielte Rechtevergabe, getrennte Volumes, klare Betriebsanweisungen.

## Fazit

Das Security-Konzept des Dokumentenmanagers zeigt, dass Schutzmechanismen systematisch mitgedacht wurden: Hashing, Verschlüsselung, Token-Prozesse, Zugriffstrennung und sicherheitsrelevante Konfiguration sind dokumentiert. Für ein Schulprojekt ist das nicht bloß „nett“, sondern ein deutlicher Nachweis technischer Reife.
