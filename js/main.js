const $ = (s, c = document) => c.querySelector(s);
const $$ = (s, c = document) => [...c.querySelectorAll(s)];

const nav = $('#nav');
const onScroll = () => nav.classList.toggle('solid', scrollY > 60);
addEventListener('scroll', onScroll, { passive: true });
onScroll();

const links = $('#links');
$('#burger').addEventListener('click', () => links.classList.toggle('open'));
$$('a', links).forEach(a => a.addEventListener('click', () => links.classList.remove('open')));

// Thai is the default language; toggle swaps every [data-th]/[data-en] pair
let lang = localStorage.getItem('jsc-lang') || 'th';
function applyLang() {
  document.documentElement.lang = lang;
  $$('[data-th]').forEach(el => {
    const t = el.dataset[lang];
    if (t) el.textContent = t;
  });
  const [th, en] = $$('#lang span');
  th.classList.toggle('on', lang === 'th');
  en.classList.toggle('on', lang === 'en');
  localStorage.setItem('jsc-lang', lang);
}
$('#lang').addEventListener('click', () => { lang = lang === 'th' ? 'en' : 'th'; applyLang(); });
applyLang();

$$('.tab').forEach(t => t.addEventListener('click', () => {
  $$('.tab').forEach(x => x.classList.toggle('on', x === t));
  $$('.panel').forEach(p => p.classList.toggle('on', p.id === t.dataset.tab));
}));

const io = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
}), { threshold: .12 });
$$('.reveal').forEach(el => io.observe(el));
