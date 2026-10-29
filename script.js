/* Coffeemeet — interações */
(() => {
  /* =========================================================
     CONFIGURAÇÃO — edite aqui
     ========================================================= */
  // Número do WhatsApp com DDI+DDD (ex.: "5594999999999"). Com ele, as mensagens já vão prontas.
  // Enquanto vazio, os botões usam o link da bio e a mensagem é copiada pra pessoa colar.
  const WA_NUMERO = "";
  const WA_LINK_BIO = "https://bit.ly/WhatsappCoffeemeet";

  // Barato do Dia (0 = domingo … 6 = sábado)
  const BARATO = {
    1: "Tostada de pepperoni e queijo de búfala",
    2: "Sanduíche de peito de peru e queijo minas",
    3: "Pão de queijo com bacon e requeijão",
    4: "Sanduíche de mortadela e queijo prato",
    5: "Tostada de manteiga e queijo parmesão",
    6: "Pão de cacau com três queijos",
  };

  // Cardápio (ajuste com o cardápio oficial da casa)
  const CARDAPIO = [
    { id: "quentes", nome: "Bebidas quentes", img: "assets/ig-latte.webp", legenda: "tirado na hora", itens: [
      ["Espresso", "Curto, encorpado, do jeito certo."],
      ["Cappuccino", "Espresso, leite vaporizado e espuma cremosa.", "queridinho"],
      ["Latte", "Mais leite, mais macio — com latte art."],
      ["Café na prensa francesa", "Pra quem gosta de sentir o café."],
      ["Café em camadas", "Leite, espresso e espuma no copo de vidro."],
    ]},
    { id: "geladas", nome: "Bebidas geladas", img: "assets/ig-time.webp", legenda: "coffeemeet time", itens: [
      ["Café gelado", "Espresso, leite e gelo pra refrescar a tarde."],
      ["Bebidas cremosas", "Com chantilly e calda — a cara do coffeemeet time."],
    ]},
    { id: "salgados", nome: "Salgados", img: "assets/tostada.webp", legenda: "barato do dia!", itens: [
      ["Tostadas", "Pepperoni e búfala, manteiga e parmesão…", "barato do dia"],
      ["Sanduíches", "Peito de peru com queijo minas, mortadela com queijo prato."],
      ["Pão de queijo", "Com bacon e requeijão, ou de cacau com três queijos."],
      ["Pastéis de forno e salgados da vitrine", "Sempre quentinhos."],
    ]},
    { id: "doces", nome: "Doces", img: "assets/ig-pudim.webp", legenda: "com cafezinho", itens: [
      ["Pudim", "Clássico, cremoso, pra acompanhar o café."],
      ["Muffins", "Com gotas de chocolate."],
      ["Cookies", "Embalados, pra comer aqui ou levar."],
    ]},
    { id: "brunch", nome: "Brunch", img: "assets/ig-brunch.webp", legenda: "sem pressa", itens: [
      ["Ovos mexidos com bacon", "Com croissant e um cappuccino do lado."],
      ["Mesa pra compartilhar", "Salgados, doces e cafés pra dividir com a turma."],
    ]},
  ];

  /* ========================================================= */
  const temNumero = WA_NUMERO.replace(/\D/g, "").length >= 12;
  const waHref = (msg) => (temNumero ? `https://wa.me/${WA_NUMERO.replace(/\D/g, "")}?text=${encodeURIComponent(msg)}` : WA_LINK_BIO);
  const toast = document.getElementById("toast");
  let tTimer;
  const avisar = (txt) => { toast.textContent = txt; toast.classList.add("show"); clearTimeout(tTimer); tTimer = setTimeout(() => toast.classList.remove("show"), 3800); };
  async function copiar(txt) { try { await navigator.clipboard.writeText(txt); return true; } catch (e) { return false; } }

  // sem número configurado: copia a mensagem antes de abrir o link da bio
  function prepararLink(a, getMsg) {
    a.href = waHref(getMsg());
    a.addEventListener("click", async () => {
      a.href = waHref(getMsg());
      if (!temNumero && (await copiar(getMsg()))) avisar("Mensagem copiada! É só colar na conversa do WhatsApp.");
    });
  }
  document.querySelectorAll("[data-wa]").forEach((a) => prepararLink(a, () => a.dataset.wa));
  const ano = document.getElementById("ano");
  if (ano) ano.textContent = new Date().getFullYear();

  // ---------- dia da semana em Parauapebas ----------
  const diaPA = () => ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(new Intl.DateTimeFormat("en-US", { timeZone: "America/Belem", weekday: "short" }).format(new Date()));
  const NOMES = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];

  // ---------- Barato do Dia ----------
  const hoje = diaPA();
  const week = document.getElementById("week");
  week.innerHTML = [1, 2, 3, 4, 5, 6].map((d) => `<li class="${d === hoje ? "is-today" : ""}"><b>${NOMES[d].slice(0, 3)}</b><span>${BARATO[d]}</span></li>`).join("");
  const k = document.getElementById("todayK"), item = document.getElementById("todayItem"), cta = document.getElementById("todayCta");
  if (BARATO[hoje]) {
    k.textContent = `Hoje é ${NOMES[hoje].toLowerCase()}`;
    item.textContent = BARATO[hoje];
    cta.dataset.wa = `Olá! Quero o Barato do Dia de hoje: ${BARATO[hoje]} (R$ 11,90).`;
  } else {
    k.textContent = "Domingo";
    item.textContent = `Amanhã tem: ${BARATO[1]}`;
    cta.dataset.wa = "Olá! Vim pelo site da Coffeemeet.";
    cta.lastChild.textContent = " Chama no WhatsApp";
  }

  // ---------- cardápio ----------
  const tabs = document.getElementById("tabs");
  const menu = document.getElementById("menu");
  function render(id) {
    const c = CARDAPIO.find((x) => x.id === id);
    menu.style.animation = "none"; void menu.offsetWidth; menu.style.animation = "";
    menu.innerHTML = `<figure class="menu__img"><img src="${c.img}" alt="${c.nome}" width="420" height="420" loading="lazy"><figcaption>${c.legenda}</figcaption></figure>
      <ul class="menu__list">${c.itens.map(([n, d, t]) => `<li><h3>${n}${t ? `<span class="tagline">${t}</span>` : ""}</h3><p>${d}</p></li>`).join("")}</ul>`;
    tabs.querySelectorAll("button").forEach((b) => b.setAttribute("aria-selected", b.dataset.id === id));
  }
  tabs.innerHTML = CARDAPIO.map((c) => `<button role="tab" data-id="${c.id}" aria-selected="false">${c.nome}</button>`).join("");
  tabs.addEventListener("click", (e) => { const b = e.target.closest("button"); if (b) render(b.dataset.id); });
  render("quentes");

  // ---------- pauta / reserva ----------
  const pauta = document.getElementById("pauta");
  const data = document.getElementById("data");
  const hojeISO = new Intl.DateTimeFormat("en-CA", { timeZone: "America/Belem" }).format(new Date());
  data.min = hojeISO;
  data.value = hojeISO;
  function msgReserva() {
    const f = new FormData(pauta);
    const d = f.get("data") ? f.get("data").split("-").reverse().join("/") : "a combinar";
    return `Olá! Quero reservar um espaço na Coffeemeet.\n• Para: ${f.get("tipo")}\n• Pessoas: ${f.get("pessoas")}\n• Data: ${d}, período da ${f.get("periodo")}\nPodem confirmar a disponibilidade?`;
  }
  pauta.addEventListener("submit", async (e) => {
    e.preventDefault();
    const msg = msgReserva();
    if (!temNumero && (await copiar(msg))) avisar("Pauta copiada! Cole na conversa do WhatsApp que vai abrir.");
    window.open(waHref(msg), "_blank", "noopener");
  });

  // ---------- nav ----------
  const nav = document.querySelector(".nav");
  const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 30);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
  const burger = document.querySelector(".nav__burger");
  const fechar = () => { nav.classList.remove("open"); burger.setAttribute("aria-expanded", false); document.body.style.overflow = ""; };
  burger.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    burger.setAttribute("aria-expanded", open);
    document.body.style.overflow = open ? "hidden" : "";
  });
  document.querySelectorAll(".nav__links a").forEach((a) => a.addEventListener("click", fechar));

  // ---------- reveal + vídeo sob demanda ----------
  const io = new IntersectionObserver((es) => es.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } }), { threshold: 0.1 });
  document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
  document.querySelectorAll("video[data-lazy]").forEach((v) => {
    new IntersectionObserver((es, o) => { if (es[0].isIntersecting) { v.preload = "auto"; v.play().catch(() => {}); o.disconnect(); } }, { rootMargin: "200px" }).observe(v);
  });
})();
