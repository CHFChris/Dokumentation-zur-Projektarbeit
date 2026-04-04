# Sicherheitskonzept

Das Sicherheitskonzept des Dokumentenmanagers verfolgt keinen Anspruch auf maximale Enterprise-Komplexität, wohl aber auf fachlich sinnvolle Schutzmechanismen. Dokumente können personenbezogene, vertrauliche oder organisatorisch sensible Inhalte enthalten – Sicherheitsmaßnahmen sind daher keine Dekoration, sondern direkte Notwendigkeit.

---

## Schutzziele

| Ziel | Maßnahme |
|---|---|
| **Vertraulichkeit** | Fernet-Verschlüsselung aller Dateiinhalte, Bcrypt-Hashing der Passwörter |
| **Integrität** | SHA-256-Prüfsummen, transaktionale Datenbankoperationen |
| **Authentizität** | JWT-Token, MFA, E-Mail-Verifikation |
| **Verfügbarkeit** | Soft-Delete mit Papierkorb, Versionierung, geplante Backup-Strategie |

---

## Authentifizierung

### Passwort-Hashing

Passwörter werden mit `passlib[bcrypt]` gehasht. Klartext-Passwörter werden zu keinem Zeitpunkt gespeichert oder geloggt. Bcrypt ist bewusst rechenintensiv und erschwert Brute-Force-Angriffe.

### JWT-Token

Die Anwendung nutzt JSON Web Tokens für zustandslose Authentifizierung. Token enthalten Benutzer-ID und Ablaufzeit. Für Web-Routen werden sie als HTTP-Only-Cookies transportiert, für API-Aufrufe als Bearer-Token.

| Token-Typ | Lebensdauer | Konfiguration |
|---|---|---|
| Access-Token | 60 Minuten | `ACCESS_TOKEN_EXPIRE_MINUTES` |
| Refresh-Token | 7 Tage | `REFRESH_TOKEN_EXPIRE_DAYS` |

### Multi-Faktor-Authentifizierung (MFA)

Benutzer können MFA per E-Mail aktivieren. Nach dem Login wird ein temporärer Code an die registrierte E-Mail-Adresse gesendet. Der Code hat eine begrenzte Gültigkeitsdauer (`MFA_CODE_TTL_MINUTES`). MFA wird nach dem ersten Login automatisch vorgeschlagen.

### E-Mail-Verifikation

Neue Benutzerkonten müssen per E-Mail verifiziert werden. Erst nach erfolgreicher Verifikation ist der volle Funktionsumfang zugänglich. Verifikations-Token haben eine begrenzte Gültigkeitsdauer.

---

## Verschlüsselung

### Dateiverschlüsselung

Alle hochgeladenen Dateien werden vor der Speicherung mit Fernet (AES-128-CBC) verschlüsselt. Der Schlüssel wird über `FILES_FERNET_KEY` in der `.env` konfiguriert. Die verschlüsselten Dateien liegen im Dateisystem (`FILES_DIR`), getrennt von den relationalen Metadaten in der Datenbank.

### Keyword-Verschlüsselung

Kategorie-Keywords werden ebenfalls verschlüsselt in der Datenbank gespeichert (`encrypt_text` / `decrypt_text`). Dadurch sind auch Metadaten bei einem Datenbankzugriff nicht direkt lesbar.

### Trennung von Metadaten und Dateiinhalten

Diese Architekturentscheidung ist sicherheitstechnisch zentral: Ein Zugriff auf die Datenbank allein gibt keine Dateiinhalte preis. Ein Zugriff auf das Dateisystem allein liefert nur verschlüsselte Binärdaten.

---

## Token-basierte Prozesse

### Passwort-Reset

1. Benutzer gibt E-Mail-Adresse ein
2. System erzeugt zeitlich begrenzten Reset-Token
3. Token wird per E-Mail verschickt
4. Benutzer setzt neues Passwort mit gültigem Token

Rate-Limiting (`RESET_RATE_LIMIT_MINUTES`) verhindert Missbrauch durch wiederholte Anfragen.

### Verifikation

E-Mail-Verifikation und Verifikations-Events werden protokolliert, um den Verifikationsprozess nachvollziehbar zu machen.

---

## Zugriffskontrolle

Die Anwendung trennt Benutzerkontexte und Dokumenteigentum:

- Jeder Benutzer sieht nur eigene Dokumente
- Kategorien sind benutzerbezogen
- Administrative Funktionen sind über `role_id` gesteuert
- Audit-Logs protokollieren sicherheitsrelevante Aktionen

---

## Sicherheitsrelevante Risiken und Gegenmaßnahmen

!!! warning "Risiko: Unsichere `.env`"
    **Szenario:** Schlüssel werden ins Repository eingecheckt oder zwischen Teammitgliedern unkontrolliert kopiert.
    **Gegenmaßnahme:** `.gitignore`, dokumentierte Schlüsselerzeugung, getrennte Entwicklungs- und Produktionsschlüssel.

!!! warning "Risiko: OCR als Angriffsfläche"
    **Szenario:** Manipulierte Dateien könnten bei der OCR-Verarbeitung Schwachstellen ausnutzen.
    **Gegenmaßnahme:** Begrenzte Dateitypen (PDF, DOCX), Größenlimits (`MAX_UPLOAD_MB`), kontrollierte Verarbeitung.

!!! warning "Risiko: Fehlkonfigurierte Dateisystem-Berechtigungen"
    **Szenario:** `FILES_DIR` ist für unbefugte Konten lesbar.
    **Gegenmaßnahme:** Restriktive Dateiberechtigungen, getrennte Volumes, dokumentierte Betriebsanweisungen.

!!! warning "Risiko: Schlüsselrotation"
    **Szenario:** Fernet-Schlüssel muss getauscht werden, bestehende Dateien werden unlesbar.
    **Gegenmaßnahme:** Schlüsselrotation muss geplant erfolgen, inklusive Re-Verschlüsselung bestehender Dateien.
