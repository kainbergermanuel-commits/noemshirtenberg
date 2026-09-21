// Sanftes Einschweben beim Scrollen.
// Grundsatz: Ohne JavaScript und bei reduzierter Bewegung ist alles sofort sichtbar.
// Die Startzustände greifen erst, wenn die Klasse "anim" gesetzt ist.
(function () {
  var ruhig = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (ruhig || !('IntersectionObserver' in window)) return;

  var wurzel = document.documentElement;
  wurzel.classList.add('anim');

  var ziele = document.querySelectorAll('.card, .fig, .big-link');

  var beobachter = new IntersectionObserver(function (eintraege) {
    eintraege.forEach(function (e) {
      if (!e.isIntersecting) return;
      e.target.classList.add('sichtbar');
      beobachter.unobserve(e.target);
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.06 });

  ziele.forEach(function (el) { beobachter.observe(el); });
})();
