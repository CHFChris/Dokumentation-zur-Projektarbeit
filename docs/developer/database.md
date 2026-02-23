
---

## 7) `docs/developer/database.md`
```md
# Technische Dokumentation – Datenbankmodell

## Ziel

Das Datenbankmodell bildet Benutzerkonten, Dokumente, Versionen, Kategorien (inkl. Keywords) sowie Security- und Workflow-Tabellen ab.

## Tabellenübersicht (logisch)

| Tabelle | Zweck | Beziehungen (vereinfacht) |
|---|---|---|
| users | Benutzerkonten | 1:n zu documents, 1:n zu tokens/codes |
| documents | Dokument-Metadaten | n:1 users, 1:n versions, n:m categories |
| document_versions | Versionierung | n:1 documents |
| categories | Kategorien/Keywords | n:1 users, n:m documents |
| document_categories | Join-Tabelle | verbindet documents <-> categories |
| mfa_codes | MFA/2FA Codes | n:1 users |
| pending_uploads | Duplikat-Workflow | n:1 users |
| email_verification_tokens | Verifikations-Token | n:1 users |
| password_reset_tokens | Reset-Token | n:1 users |
| audit_logs | Audit-Trail | logisch n:1 users |

## ER-Diagramm

```mermaid
erDiagram
  USERS ||--o{ DOCUMENTS : owns
  DOCUMENTS ||--o{ DOCUMENT_VERSIONS : versions
  USERS ||--o{ CATEGORIES : defines
  DOCUMENTS }o--o{ CATEGORIES : tagged
  USERS ||--o{ MFA_CODES : has
  USERS ||--o{ PENDING_UPLOADS : owns
  USERS ||--o{ EMAIL_VERIFICATION_TOKENS : verifies
  USERS ||--o{ PASSWORD_RESET_TOKENS : resets