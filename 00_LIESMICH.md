# noemshirtenberg

Website der NÖMS Hirtenberg unter **nöms-hirtenberg.at**, ausgeliefert über GitHub Pages.

## Aufbau

| Pfad | Inhalt |
|---|---|
| `index.html` | Startseite, verteilt auf die Bereiche |
| `mappe/index.html` | Die digitale Mappe, Ziel des QR-Codes auf den Metallkarten |
| `img/` | Bilder der Mappe, aus dem Repo `ideenboerse` übernommen |
| `impressum.html` | Impressum, enthält noch Platzhalter in doppelten eckigen Klammern |
| `assets/stil.css` | Gemeinsames Stylesheet für alle Seiten |
| `CNAME` | Die Domain in Punycode-Schreibweise, von GitHub Pages benötigt |
| `.nojekyll` | Verhindert, dass Pages die Dateien umschreibt |

## Die Adresse

Der QR-Code auf den 200 Metallkarten zeigt auf **https://nöms-hirtenberg.at/mappe/**

Beim Erzeugen des Codes die Adresse mit Umlaut eintippen und nicht in Punycode umwandeln, dann
zeigt die Scanner-Vorschau sie lesbar an.

⚠️ **`/mappe/` darf nie gelöscht werden.** Der Pfad ist in Metall graviert. Der Inhalt darf sich
jederzeit ändern, etwa wenn die Karten später beim Tag der offenen Tür ausgegeben werden.

## Einrichtung bei GitHub Pages

1. Settings → Pages → Source: Deploy from a branch, Branch `main`, Ordner `/ (root)`
2. Custom Domain: `nöms-hirtenberg.at` eintragen
3. „Enforce HTTPS" ankreuzen, sobald es anwählbar ist

DNS beim Registrar: vier A-Records auf 185.199.108.153, 185.199.109.153, 185.199.110.153 und
185.199.111.153, dazu die vier AAAA-Records von GitHub und ein CNAME für `www` auf
`kainbergermanuel-commits.github.io`.

## Offen

- **Die `[[Platzhalter]]` in der Mappe füllen.** Vier Hürden (Geld, Können, Sprache und Herkunft,
  Zutrauen), der Abschnitt „Was wir falsch gemacht haben" und die Kontaktadresse. Das Material
  kommt aus der Kollegiumsrunde, siehe Konzept im Repo `ideenboerse`.
- **Die Mailadresse im Kontaktformular eintragen.** Sie steht an genau einer Stelle in
  `mappe/index.html`, im Link mit der id `f-mailto`. Das Skript liest sie von dort, es gibt also
  keine zweite Stelle zu pflegen. Solange dort `[[E-MAIL-ADRESSE]]` steht, führt der Knopf ins
  Leere.
- Die Platzhalter im Impressum ausfüllen. **Vor dem Verteilen der Karten**, eine öffentlich
  beworbene Seite braucht in Österreich ein vollständiges Impressum.
- Die Mappe inhaltlich füllen, siehe Konzept im Repo `ideenboerse`.
