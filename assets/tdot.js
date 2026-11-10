// Tag der offenen Tür: schaltet die Seite je nach Datum um.
// Datum und Uhrzeit stehen nur in data-tdot-start und data-tdot-ende (Abschnitt #besuch).
//   vorher  -> Einladung mit Kalenderknopf
//   heute   -> Willkommen am Tag selbst (ab Mitternacht bis Ende)
//   danach  -> Hinweis auf Schnuppertermin
// Ohne JavaScript bleibt die Einladung sichtbar.
(function () {
  var box = document.querySelector('[data-tdot-start]');
  if (!box) return;

  var start = new Date(box.getAttribute('data-tdot-start'));
  var ende = new Date(box.getAttribute('data-tdot-ende'));
  if (isNaN(start) || isNaN(ende)) return;

  var jetzt = new Date();
  var tagesbeginn = new Date(start.getFullYear(), start.getMonth(), start.getDate());
  var phase = jetzt >= ende ? 'danach' : (jetzt >= tagesbeginn ? 'heute' : 'vorher');
  // Zum Testen: ?phase=heute oder ?phase=danach an die Adresse hängen.
  var test = /[?&]phase=(vorher|heute|danach)/.exec(location.search);
  if (test) phase = test[1];
  document.documentElement.setAttribute('data-phase', phase);

  // Datumstext aus den Attributen erzeugen, damit er nie abweicht.
  var tage = ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'];
  var monate = ['Jänner', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August',
    'September', 'Oktober', 'November', 'Dezember'];
  function uhr(d) {
    return d.getHours() + (d.getMinutes() ? ':' + ('0' + d.getMinutes()).slice(-2) : '');
  }
  var text = tage[start.getDay()] + ', ' + start.getDate() + '. ' + monate[start.getMonth()] + ' '
    + start.getFullYear() + ', ' + uhr(start) + ' bis ' + uhr(ende) + ' Uhr';
  document.querySelectorAll('[data-tdot-text]').forEach(function (el) { el.textContent = text; });

  // Kalendereintrag als .ics-Datei, entsteht direkt im Browser.
  var knopf = document.getElementById('kalender');
  if (!knopf) return;
  function ics(d) {
    function z(n) { return ('0' + n).slice(-2); }
    return d.getFullYear() + z(d.getMonth() + 1) + z(d.getDate()) + 'T' + z(d.getHours()) + z(d.getMinutes()) + '00';
  }
  knopf.addEventListener('click', function () {
    var inhalt = [
      'BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//NOEMS Hirtenberg//Tag der offenen Tuer//DE',
      'BEGIN:VEVENT',
      'UID:tdot-' + ics(start) + '@noems-hirtenberg.at',
      'DTSTAMP:' + ics(new Date()),
      'DTSTART;TZID=Europe/Vienna:' + ics(start),
      'DTEND;TZID=Europe/Vienna:' + ics(ende),
      'SUMMARY:Tag der offenen Tür · NÖMS Hirtenberg',
      'LOCATION:NÖMS Hirtenberg\\, Leobersdorfer Straße 66\\, 2552 Hirtenberg',
      'URL:https://nöms-hirtenberg.at/mappe/',
      'END:VEVENT', 'END:VCALENDAR'
    ].join('\r\n');
    var url = URL.createObjectURL(new Blob([inhalt], { type: 'text/calendar;charset=utf-8' }));
    var a = document.createElement('a');
    a.href = url;
    a.download = 'tag-der-offenen-tuer.ics';
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
  });
})();
