const root = document.body.dataset.root || '';
const actual = document.body.dataset.page;
// Menú: [id, español, inglés, ruta]. El orden de esta lista es el orden del menú.
const paginas = [
  ['inicio', 'Inicio', 'Home', 'index.html'],
  ['sobre-mi', 'Sobre mí', 'About me', 'html/sobre-mi.html'],
  ['habilidades', 'Habilidades', 'Skills', 'html/habilidades.html'],
  ['proyectos', 'Proyectos', 'Projects', 'html/proyectos.html'],
  ['contacto', 'Contacto', 'Contact', 'html/contacto.html']
];
const NOMBRE = 'Mauricio Dahinten';                       // nombre del header y del pie
const PIE = { es: 'Hecho con cariño y muchas partidas.', en: 'Made with care and lots of games.' };

const leer = k => { try { return localStorage.getItem(k); } catch { return null; } };
const guardar = (k, v) => { try { localStorage.setItem(k, v); } catch {} };
let lang = leer('lang') || 'es';                          // español por defecto
let tema = leer('tema') || (matchMedia('(prefers-color-scheme:dark)').matches ? 'dark' : 'light');

document.body.insertAdjacentHTML('afterbegin',
  `<header><div class="bar"><a class="logo" href="${root}index.html">${NOMBRE}</a>
  <nav>${paginas.map(([id, es, en, u]) => `<a href="${root + u}" class="${id === actual ? 'on' : ''}" data-en="${en}">${es}</a>`).join('')}</nav>
  <div class="ctl"><a class="tog cv" id="cv" href="${root}cv/CV-Mauricio-Dahinten.pdf" download>CV</a><button class="tog" id="idioma"></button><button class="tog" id="tema"></button>
  <button id="menu" aria-label="Menu">MENU</button></div></div></header>`);
document.body.insertAdjacentHTML('beforeend', '<footer id="pie"></footer>');

function aplicar() {
  document.documentElement.lang = lang;
  document.documentElement.dataset.tema = tema;
  document.querySelectorAll('[data-en]').forEach(el => {       // el español original se guarda y se restaura
    if (el.dataset.es === undefined) el.dataset.es = el.innerHTML;
    el.innerHTML = lang === 'en' ? el.dataset.en : el.dataset.es;
  });
  document.getElementById('pie').textContent = `© ${new Date().getFullYear()} ${NOMBRE}. ${PIE[lang]}`;
  const en = lang === 'en';
  cv.title = en ? 'Download CV' : 'Descargar CV';
  cv.setAttribute('aria-label', cv.title);
  idioma.textContent = en ? 'ES' : 'EN';
  idioma.setAttribute('aria-label', en ? 'Cambiar a español' : 'Switch to English');
  temaBtn.textContent = tema === 'dark' ? '☀' : '☾';
  temaBtn.setAttribute('aria-label', tema === 'dark' ? (en ? 'Light mode' : 'Modo claro') : (en ? 'Dark mode' : 'Modo oscuro'));
  document.querySelectorAll('.pips').forEach(p => p.title = en ? `Level ${p.dataset.n} of 5` : `Nivel ${p.dataset.n} de 5`);
}
const cv = document.getElementById('cv'), idioma = document.getElementById('idioma'), temaBtn = document.getElementById('tema');
idioma.onclick = () => { lang = lang === 'es' ? 'en' : 'es'; guardar('lang', lang); aplicar(); };
temaBtn.onclick = () => { tema = tema === 'dark' ? 'light' : 'dark'; guardar('tema', tema); aplicar(); };
document.getElementById('menu').onclick = () => document.querySelector('nav').classList.toggle('abierto');

// Habilidades: crear las casillas (antes de aplicar() para poder ponerles título)
document.querySelectorAll('.pips').forEach(p => {
  const n = +p.dataset.n;
  p.innerHTML = '<i></i>'.repeat(5);
  new IntersectionObserver(([e], o) => {
    if (!e.isIntersecting) return;
    p.querySelectorAll('i').forEach((i, k) => k < n && setTimeout(() => i.classList.add('on'), k * 120));
    o.disconnect();
  }).observe(p);
});
aplicar();

// Inicio: el rol se escribe solo (cambia con el idioma)
const rol = document.getElementById('rol');
if (rol) {
  let r = 0, c = 0, borrando = false;
  (function tick() {
    const roles = (lang === 'en' ? rol.dataset.rolesEn : rol.dataset.roles).split('|');
    const t = roles[r % roles.length];
    rol.firstChild.textContent = t.slice(0, c);
    c += borrando ? -1 : 1;
    let espera = borrando ? 40 : 90;
    if (!borrando && c > t.length) { borrando = true; espera = 1600; }
    else if (borrando && c < 0) { borrando = false; r++; espera = 300; }
    setTimeout(tick, espera);
  })();
}

// Inicio: la foto se inclina con el mouse
const foto = document.querySelector('.foto img');
if (foto && matchMedia('(hover:hover)').matches) {
  document.addEventListener('mousemove', e => {
    const x = (e.clientX / innerWidth - .5) * 10, y = (e.clientY / innerHeight - .5) * -10;
    foto.style.transform = `perspective(600px) rotateY(${x}deg) rotateX(${y}deg)`;
  });
}

// Inicio: moneda clicable; el aviso desaparece con el primer clic
const moneda = document.getElementById('moneda');
if (moneda) {
  let n = 0;
  moneda.onclick = () => { moneda.textContent = ++n; document.getElementById('pista')?.remove(); };
}

// Contacto: abre la app de correo con el destinatario y el asunto listos.
// Si el equipo no tiene app de correo configurada, abre Gmail en el navegador.
const correo = document.getElementById('correo');
if (correo) {
  const EMAIL = correo.getAttribute('href').replace('mailto:', '').split('?')[0];
  correo.onclick = e => {
    e.preventDefault();
    const asunto = encodeURIComponent(lang === 'en' ? 'Contact from your portfolio' : 'Contacto desde tu portafolio');
    location.href = `mailto:${EMAIL}?subject=${asunto}`;
    setTimeout(() => {
      if (document.hasFocus() && document.visibilityState === 'visible')
        window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${EMAIL}&su=${asunto}`, '_blank', 'noopener');
    }, 900);
  };
}