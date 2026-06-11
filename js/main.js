// GOYEN · EPK — carga content.json y rellena el DOM.
// Regla: campo vacío o "[FALTA]" => el elemento/sección se oculta.

const WEB3FORMS_ACCESS_KEY = 'a2c68a87-e638-4d44-8227-a31bcf6722cf'; // access key de web3forms.com (envía a sebastian.bartaburu@gmail.com)

const $ = (sel) => document.querySelector(sel);

function missing(v) {
  return v == null || typeof v !== 'string' || v.trim() === '' || v.includes('[FALTA]');
}

/* ---------------------------------------------------------- */
/* Nav: fondo con blur al scrollear                            */
/* ---------------------------------------------------------- */
const nav = $('#site-nav');
const onScroll = () => nav.classList.toggle('is-scrolled', window.scrollY > 24);
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

/* ---------------------------------------------------------- */
/* Render                                                      */
/* ---------------------------------------------------------- */
async function init() {
  let data;
  try {
    const res = await fetch('content.json');
    data = await res.json();
  } catch (err) {
    console.error('No se pudo cargar content.json', err);
    return;
  }

  renderIdentidad(data.identidad || {});
  renderBio(data.bio || {});
  renderSets(data.sets || []);
  renderFotos(data.fotos || [], data.drive_fotos_url);
  renderTrayectoria(data.trayectoria || []);
  renderRider(data.rider || {}, data.presskit_pdf);
  renderContacto(data.contacto || {});
  hideOrphanNavLinks();
  renumberSections();
}

// Los índices de los eyebrows quedan correlativos aunque haya secciones ocultas
function renumberSections() {
  document
    .querySelectorAll('main > section:not([hidden]) .gy-eyebrow .idx')
    .forEach((el, i) => { el.textContent = String(i + 1).padStart(2, '0'); });
}

function dataBand(identidad) {
  const parts = [];
  if (!missing(identidad.generos)) parts.push(identidad.generos);
  if (!missing(identidad.bpm)) {
    parts.push(identidad.bpm.toUpperCase().includes('BPM') ? identidad.bpm : `${identidad.bpm} BPM`);
  }
  if (!missing(identidad.ciudad)) parts.push(identidad.ciudad);
  return parts.join(' · ').toUpperCase();
}

function renderIdentidad(identidad) {
  const band = dataBand(identidad);
  if (band) {
    $('#hero-band').textContent = band;
    $('#footer-band').textContent = band;
  } else {
    $('#hero-band').hidden = true;
  }
  const tagline = $('#hero-tagline');
  if (missing(identidad.tagline)) tagline.hidden = true;
  else tagline.textContent = identidad.tagline;
}

function renderBio(bio) {
  const corta = $('#bio-corta');
  if (missing(bio.corta)) {
    $('#bio').hidden = true;
    return;
  }
  corta.textContent = bio.corta;

  if (!missing(bio.larga)) {
    $('#bio-larga-text').textContent = bio.larga;
    const toggle = $('#bio-toggle');
    toggle.hidden = false;
    toggle.addEventListener('click', () => {
      const more = $('#bio-larga');
      const open = more.hidden;
      more.hidden = !open;
      toggle.setAttribute('aria-expanded', String(open));
      toggle.textContent = open ? 'Leer menos' : 'Leer más';
    });
  }
}

/* ---- Música: embeds generados desde sets[] ---- */
function youtubeId(url) {
  const m = url.match(/(?:youtube\.com\/(?:watch\?.*v=|embed\/|live\/|shorts\/)|youtu\.be\/)([\w-]{11})/);
  return m ? m[1] : null;
}

function buildEmbed(set) {
  const holder = document.createElement('div');
  holder.className = 'set-embed';
  const platform = (set.plataforma || '').toLowerCase();

  let make = null;
  if (platform === 'soundcloud') {
    holder.style.height = '166px';
    make = () => {
      const f = document.createElement('iframe');
      f.height = '166';
      f.title = `SoundCloud: ${set.titulo || 'set de GOYEN'}`;
      f.loading = 'lazy';
      f.allow = 'autoplay';
      f.src = 'https://w.soundcloud.com/player/?url=' + encodeURIComponent(set.url) +
        '&color=%23170eff&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_teaser=false';
      return f;
    };
  } else if (platform === 'youtube') {
    const id = youtubeId(set.url);
    if (id) {
      holder.classList.add('set-embed--video');
      make = () => {
        const f = document.createElement('iframe');
        f.title = `YouTube: ${set.titulo || 'set de GOYEN'}`;
        f.loading = 'lazy';
        f.allow = 'accelerometer; encrypted-media; picture-in-picture; web-share';
        f.allowFullscreen = true;
        f.src = `https://www.youtube-nocookie.com/embed/${id}`;
        return f;
      };
    }
  }

  if (!make) return null; // plataforma sin embed: queda solo el link directo

  // Lazy-load real: el iframe se inyecta recién cerca del viewport
  const io = new IntersectionObserver((entries) => {
    if (entries.some((e) => e.isIntersecting)) {
      holder.appendChild(make());
      io.disconnect();
    }
  }, { rootMargin: '400px 0px' });
  io.observe(holder);
  return holder;
}

function platformLabel(p) {
  const labels = { soundcloud: 'SoundCloud', youtube: 'YouTube' };
  return labels[(p || '').toLowerCase()] || (p || 'Link');
}

function renderSets(sets) {
  const valid = sets.filter((s) => !missing(s.url));
  if (!valid.length) {
    $('#musica').hidden = true;
    return;
  }
  $('#musica').hidden = false;
  $('#hero-cta-sets').hidden = false;
  const list = $('#sets-list');

  for (const set of valid) {
    const item = document.createElement('article');
    item.className = 'set-item';

    if (!missing(set.titulo)) {
      const h = document.createElement('h3');
      h.className = 'set-title';
      h.textContent = set.titulo;
      item.appendChild(h);
    }

    const embed = buildEmbed(set);
    if (embed) item.appendChild(embed);

    // Link directo siempre visible debajo del embed
    const a = document.createElement('a');
    a.className = 'gy-linkrow';
    a.href = set.url;
    a.target = '_blank';
    a.rel = 'noopener';
    a.innerHTML = `<span class="platform"></span><span class="label">Abrir set</span><span class="arrow" aria-hidden="true">↗</span>`;
    a.querySelector('.platform').textContent = platformLabel(set.plataforma);
    item.appendChild(a);

    list.appendChild(item);
  }
}

/* ---- Fotos: grilla con duotono + lightbox ---- */
function renderFotos(fotos, driveUrl) {
  const valid = fotos.filter((f) => !missing(f.src));
  if (!valid.length) {
    $('#fotos').hidden = true;
    return;
  }
  $('#fotos').hidden = false;
  const grid = $('#photo-grid');

  valid.forEach((foto, i) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'photo-cell';
    btn.setAttribute('aria-label', `Ampliar foto: ${foto.alt || 'foto de prensa de GOYEN'}`);

    const frame = document.createElement('div');
    frame.className = 'gy-duotone gy-frame';
    const pic = document.createElement('picture');
    if (foto.srcset) {
      const source = document.createElement('source');
      source.type = 'image/webp';
      source.srcset = foto.srcset;
      source.sizes = '(min-width: 1024px) 33vw, (min-width: 600px) 50vw, 100vw';
      pic.appendChild(source);
    }
    const img = document.createElement('img');
    img.src = foto.fallback || foto.src;
    img.alt = foto.alt || '';
    img.loading = 'lazy';
    img.decoding = 'async';
    pic.appendChild(img);
    frame.appendChild(pic);

    const scan = document.createElement('div');
    scan.className = 'gy-scanlines';
    scan.setAttribute('aria-hidden', 'true');
    frame.appendChild(scan);

    btn.appendChild(frame);
    btn.addEventListener('click', () => openLightbox(valid, i));
    grid.appendChild(btn);
  });

  if (!missing(driveUrl)) {
    const pack = $('#photos-pack');
    pack.href = driveUrl;
    pack.hidden = false;
  }
}

/* ---- Lightbox vanilla, navegable por teclado ---- */
let lightbox = null;

function ensureLightbox() {
  if (lightbox) return lightbox;
  const el = document.createElement('div');
  el.className = 'lightbox';
  el.hidden = true;
  el.setAttribute('role', 'dialog');
  el.setAttribute('aria-modal', 'true');
  el.setAttribute('aria-label', 'Visor de fotos');
  el.innerHTML = `
    <img alt="">
    <div class="lightbox-bar">
      <button class="lightbox-btn" data-lb="prev" aria-label="Foto anterior">←</button>
      <span class="lightbox-counter" aria-live="polite"></span>
      <button class="lightbox-btn" data-lb="next" aria-label="Foto siguiente">→</button>
      <button class="lightbox-btn" data-lb="close" aria-label="Cerrar visor">✕</button>
    </div>`;
  document.body.appendChild(el);
  lightbox = el;
  return el;
}

function openLightbox(fotos, start) {
  const el = ensureLightbox();
  const img = el.querySelector('img');
  const counter = el.querySelector('.lightbox-counter');
  let index = start;
  const opener = document.activeElement;

  const show = (i) => {
    index = (i + fotos.length) % fotos.length;
    img.src = fotos[index].src;
    img.alt = fotos[index].alt || '';
    counter.textContent = `${index + 1} / ${fotos.length}`;
  };

  const close = () => {
    el.hidden = true;
    document.removeEventListener('keydown', onKey);
    document.body.style.overflow = '';
    if (opener && opener.focus) opener.focus();
  };

  const onKey = (e) => {
    if (e.key === 'Escape') return close();
    if (e.key === 'ArrowLeft') return show(index - 1);
    if (e.key === 'ArrowRight') return show(index + 1);
    if (e.key === 'Tab') {
      // foco contenido dentro del diálogo
      const focusables = el.querySelectorAll('button');
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  };

  el.querySelector('[data-lb="prev"]').onclick = () => show(index - 1);
  el.querySelector('[data-lb="next"]').onclick = () => show(index + 1);
  el.querySelector('[data-lb="close"]').onclick = close;
  el.onclick = (e) => { if (e.target === el) close(); };

  show(start);
  el.hidden = false;
  document.body.style.overflow = 'hidden';
  document.addEventListener('keydown', onKey);
  el.querySelector('[data-lb="close"]').focus();
}

/* ---- Trayectoria: fecha desc ---- */
function renderTrayectoria(items) {
  const valid = items.filter((t) => !missing(t.evento));
  if (!valid.length) {
    $('#trayectoria').hidden = true;
    return;
  }
  $('#trayectoria').hidden = false;
  valid.sort((a, b) => String(b.fecha || '').localeCompare(String(a.fecha || '')));

  const ul = $('#timeline');
  for (const t of valid) {
    const li = document.createElement('li');
    const meta = [t.venue, t.ciudad].filter((v) => !missing(v)).join(' · ');
    const fecha = missing(t.fecha) ? '' : t.fecha;
    li.innerHTML = `<span class="t-fecha"></span><span class="t-evento"></span><span class="t-meta"></span>`;
    li.querySelector('.t-fecha').textContent = fecha;
    li.querySelector('.t-evento').textContent = t.evento;
    li.querySelector('.t-meta').textContent = meta;
    ul.appendChild(li);
  }
}

/* ---- Rider ---- */
function renderRider(rider, pdf) {
  const rows = [
    ['Mixer', rider.mixer],
    ['Players', rider.players],
    ['Formato', rider.formato],
    ['Monitoreo', rider.monitoreo],
  ].filter(([, v]) => !missing(v));

  if (!rows.length && missing(pdf)) {
    $('#rider').hidden = true;
    return;
  }

  const dl = $('#rider-rows');
  for (const [label, value] of rows) {
    const row = document.createElement('div');
    row.className = 'gy-datarow';
    row.innerHTML = `<dt></dt><span class="leader" aria-hidden="true"></span><dd></dd>`;
    row.querySelector('dt').textContent = label;
    row.querySelector('dd').textContent = value;
    dl.appendChild(row);
  }

  if (!missing(pdf)) {
    const btn = $('#presskit-btn');
    btn.href = pdf;
    btn.hidden = false;
  }
}

/* ---- Contacto ---- */
function renderContacto(contacto) {
  if (!missing(contacto.email)) {
    const row = $('#contact-email-row');
    row.hidden = false;
    const link = $('#contact-email-link');
    link.textContent = contacto.email;
    link.href = `mailto:${contacto.email}`;
    $('#contact-email-copy').addEventListener('click', async (e) => {
      const btn = e.currentTarget;
      try {
        await navigator.clipboard.writeText(contacto.email);
        btn.textContent = 'copiado';
        btn.classList.add('is-copied');
        setTimeout(() => { btn.textContent = 'copiar'; btn.classList.remove('is-copied'); }, 1400);
      } catch (_) { /* clipboard no disponible: el mail sigue visible como texto */ }
    });
  }

  if (!missing(contacto.instagram)) {
    const row = $('#contact-ig-row');
    row.hidden = false;
    const handle = contacto.instagram.replace(/^@/, '');
    const link = $('#contact-ig-link');
    link.textContent = `@${handle}`;
    link.href = `https://instagram.com/${handle}`;
  }

  if (!missing(contacto.disponibilidad)) {
    const disp = $('#booking-disponibilidad');
    disp.textContent = contacto.disponibilidad;
    disp.hidden = false;
  }
}

/* ---- Nav: ocultar links a secciones ocultas ---- */
function hideOrphanNavLinks() {
  document.querySelectorAll('[data-section-link]').forEach((a) => {
    const section = document.getElementById(a.dataset.sectionLink);
    if (section && section.hidden) a.style.display = 'none';
  });
}

/* ---------------------------------------------------------- */
/* Formulario de booking — Web3Forms                           */
/* ---------------------------------------------------------- */
const form = $('#booking-form');

function validateField(input, errorEl, validator) {
  const ok = validator(input.value.trim());
  input.setAttribute('aria-invalid', String(!ok));
  errorEl.hidden = ok;
  return ok;
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const status = $('#form-status');
  status.className = 'form-status';
  status.textContent = '';

  const okNombre = validateField($('#f-nombre'), $('#err-nombre'), (v) => v.length > 0);
  const okEmail = validateField($('#f-email'), $('#err-email'), (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v));
  const okMensaje = validateField($('#f-mensaje'), $('#err-mensaje'), (v) => v.length > 0);
  if (!okNombre || !okEmail || !okMensaje) {
    form.querySelector('[aria-invalid="true"]')?.focus();
    return;
  }

  if (missing(WEB3FORMS_ACCESS_KEY)) {
    status.classList.add('is-error');
    status.textContent = 'El formulario aún no está configurado. Escribinos por email o Instagram.';
    return;
  }

  const submitBtn = $('#form-submit');
  submitBtn.disabled = true;
  status.textContent = 'Enviando…';

  try {
    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        access_key: WEB3FORMS_ACCESS_KEY,
        subject: 'Booking GOYEN — solicitud desde el EPK',
        from_name: 'EPK GOYEN',
        nombre: $('#f-nombre').value.trim(),
        email: $('#f-email').value.trim(),
        fecha_tentativa: $('#f-fecha').value,
        mensaje: $('#f-mensaje').value.trim(),
        botcheck: form.querySelector('[name="botcheck"]').checked,
      }),
    });
    const json = await res.json();
    if (!res.ok || !json.success) throw new Error(json.message || res.statusText);

    form.hidden = true;
    $('#form-done').hidden = false;
    status.textContent = '';
  } catch (err) {
    status.classList.add('is-error');
    status.textContent = 'No se pudo enviar. Probá de nuevo o escribinos por email.';
    console.error('Web3Forms error', err);
  } finally {
    submitBtn.disabled = false;
  }
});

$('#form-reset').addEventListener('click', () => {
  form.reset();
  form.hidden = false;
  $('#form-done').hidden = true;
  $('#f-nombre').focus();
});

init();
