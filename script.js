/* Coffeemeet — interações */
(() => {
  /* =========================================================
     CONFIGURAÇÃO — tudo que muda fica aqui
     ========================================================= */

  // WhatsApp com DDI+DDD (ex.: "5594999999999"). Com ele, as mensagens já vão escritas.
  // Vazio: os botões usam o link da bio e a mensagem é copiada pra pessoa colar.
  const WA_NUMERO = "";
  const WA_LINK_BIO = "https://bit.ly/WhatsappCoffeemeet";

  // Link das avaliações no Google (cole o link do perfil da empresa no Google Maps).
  const GOOGLE_REVIEWS = "https://www.google.com/search?q=Coffeemeet+Parauapebas+avalia%C3%A7%C3%B5es";

  const ENDERECO = "Av. F, Qd 97, Lt 24 - Parque dos Carajás, Parauapebas - PA";
  const MAPA_BUSCA = "Coffeemeet Av F Qd 97 Lt 24 Parque dos Carajás Parauapebas";

  // Horário de funcionamento — preencha pra aparecer no site. Ex.: ["Seg a sex · 7h às 20h", "Sáb · 8h às 13h"]
  const HORARIOS = [];

  // Barato do Dia (1 = segunda … 6 = sábado). foto: caminho da imagem (ou null)
  const BARATO = {
    1: { nome: "Tostada de pepperoni e queijo de búfala", foto: "assets/tostada.webp", chamada: "A queridinha da segunda: crocante, derretendo e com pepperoni." },
    2: { nome: "Sanduíche de peito de peru e queijo minas", foto: null, chamada: "Leve, gostoso e perfeito com um cappuccino." },
    3: { nome: "Pão de queijo com bacon e requeijão", foto: null, chamada: "Meio da semana pede um pão de queijo caprichado." },
    4: { nome: "Sanduíche de mortadela e queijo prato", foto: null, chamada: "Clássico que nunca erra. Vem com café?" },
    5: { nome: "Tostada de manteiga e queijo parmesão", foto: null, chamada: "Sextou com tostada crocante e parmesão gratinado." },
    6: { nome: "Pão de cacau com três queijos", foto: null, chamada: "Sábado é dia de se dar um mimo." },
  };
  const BARATO_PRECO = "R$ 11,90";

  // Cardápio. preco: "R$ 9,90" (texto) ou null → "Consulte". foto: caminho ou null.
  const CARDAPIO = [
    { id: "cafes", nome: "Cafés", itens: [
      { nome: "Espresso", desc: "Curto e encorpado, extraído na hora.", preco: null, foto: "assets/ig-prensa.webp" },
      { nome: "Cappuccino", desc: "Espresso, leite vaporizado e espuma cremosa.", preco: null, foto: "assets/ig-capu.webp", tag: "mais pedido" },
      { nome: "Latte", desc: "Mais leite, mais macio, com latte art.", preco: null, foto: "assets/ig-latte.webp" },
      { nome: "Café em camadas", desc: "Leite, espresso e espuma no copo de vidro.", preco: null, foto: "assets/ig-mocha.webp" },
      { nome: "Café na prensa francesa", desc: "Pra quem gosta de sentir o grão.", preco: null, foto: null },
    ]},
    { id: "geladas", nome: "Bebidas geladas", itens: [
      { nome: "Café gelado", desc: "Espresso, leite e gelo pra refrescar a tarde.", preco: null, foto: "assets/ig-gelado.webp" },
      { nome: "Bebidas cremosas", desc: "Com chantilly e calda — a cara do coffeemeet time.", preco: null, foto: "assets/ig-time.webp", tag: "coffeemeet time" },
    ]},
    { id: "salgados", nome: "Salgados", itens: [
      { nome: "Tostadas", desc: "Pepperoni e búfala, manteiga e parmesão e outros sabores.", preco: null, foto: "assets/tostada.webp", tag: "barato do dia" },
      { nome: "Croissant", desc: "Folhado e quentinho, perfeito com espresso.", preco: null, foto: "assets/croissant.webp" },
      { nome: "Salgados assados", desc: "Direto da vitrine, sempre quentinhos.", preco: null, foto: "assets/empanada.webp" },
      { nome: "Sanduíches", desc: "Peito de peru com queijo minas, mortadela com queijo prato.", preco: null, foto: null },
      { nome: "Pão de queijo", desc: "Tradicional, com bacon e requeijão ou de cacau com três queijos.", preco: null, foto: null },
    ]},
    { id: "doces", nome: "Doces", itens: [
      { nome: "Pudim", desc: "Clássico e cremoso, pra acompanhar o café.", preco: null, foto: "assets/ig-pudim.webp" },
      { nome: "Doces da vitrine", desc: "Opções recheadas que mudam toda semana.", preco: null, foto: "assets/docinhos.webp" },
      { nome: "Cookies", desc: "Embalados, pra comer aqui ou levar.", preco: null, foto: "assets/cookies.webp" },
    ]},
    { id: "brunch", nome: "Brunch", itens: [
      { nome: "Ovos mexidos com bacon", desc: "Com croissant e um café do lado.", preco: null, foto: "assets/ig-brunch.webp" },
      { nome: "Mesa pra compartilhar", desc: "Salgados, doces e cafés pra dividir com a turma.", preco: null, foto: "assets/mesa.webp" },
    ]},
  ];

  // Coworking — formatos e valores. preco null → "Sob consulta".
  const PLANOS = [
    { nome: "Avulso", desc: "Pra uma tarde de foco ou aquela call importante.", preco: null, unidade: "por hora", itens: ["Mesa pra trabalhar", "Café e salgados a poucos passos"] },
    { nome: "Diária", desc: "O dia inteiro fora de casa, com café por perto.", preco: null, unidade: "por dia", itens: ["Mesa pra trabalhar o dia todo", "Ambiente pra receber cliente"], destaque: true },
    { nome: "Pacote", desc: "Pra quem vem toda semana e quer praticidade.", preco: null, unidade: "por mês", itens: ["Uso recorrente", "Reserva facilitada pelo WhatsApp"] },
    { nome: "Reunião", desc: "Receba clientes ou reúna o time num lugar bonito.", preco: null, unidade: "por período", itens: ["Pra grupos pequenos ou grandes", "Café pro grupo sob encomenda"] },
  ];

  // Benefícios do coworking (mantenha só o que for verdade no espaço)
  const BENEFICIOS = [
    "Café de verdade a cada pausa",
    "Ambiente bonito pra receber cliente",
    "Mesas pra trabalhar sozinho ou em grupo",
    "Espaço para reuniões, aulas e eventos",
    "Fácil acesso no Parque dos Carajás",
  ];

  // Depoimentos REAIS (com autorização). Enquanto vazio, aparecem só os botões de avaliação.
  // Ex.: { texto: "…", nome: "Ana P.", origem: "Google" }
  const DEPOIMENTOS = [];

  /* ========================================================= */
  const num = WA_NUMERO.replace(/\D/g, "");
  const temNumero = num.length >= 12;
  const waHref = (msg) => (temNumero ? `https://wa.me/${num}?text=${encodeURIComponent(msg)}` : WA_LINK_BIO);
  const $ = (id) => document.getElementById(id);
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  const toast = $("toast");
  let tT;
  const avisar = (t) => { toast.textContent = t; toast.classList.add("show"); clearTimeout(tT); tT = setTimeout(() => toast.classList.remove("show"), 3800); };
  const copiar = async (t) => { try { await navigator.clipboard.writeText(t); return true; } catch (e) { return false; } };

  // links de WhatsApp: com número a mensagem vai pronta; sem número, copia e abre o link da bio
  function ligarWa(a) {
    a.href = waHref(a.dataset.wa);
    a.addEventListener("click", async () => {
      a.href = waHref(a.dataset.wa);
      if (!temNumero && (await copiar(a.dataset.wa))) avisar("Mensagem copiada! É só colar na conversa do WhatsApp.");
    });
  }
  const ligarTodos = (root = document) => root.querySelectorAll("[data-wa]:not([data-on])").forEach((a) => { a.dataset.on = 1; ligarWa(a); });

  const diaPA = () => ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(new Intl.DateTimeFormat("en-US", { timeZone: "America/Belem", weekday: "short" }).format(new Date()));
  const NOMES = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];
  const placeholder = (txt) => `<div class="ph" aria-hidden="true"><svg><use href="#logo"/></svg><span>${esc(txt)}</span></div>`;

  // ---------- Barato do Dia ----------
  const hoje = diaPA();
  const b = BARATO[hoje];
  const fig = $("baratoFig");
  if (b) {
    $("baratoK").textContent = `Barato do Dia · ${NOMES[hoje]}`;
    $("baratoItem").textContent = b.nome;
    $("baratoCall").textContent = b.chamada;
    $("baratoCta").dataset.wa = `Olá! Quero o Barato do Dia de hoje: ${b.nome} (${BARATO_PRECO}).`;
  } else {
    $("baratoK").textContent = "Barato do Dia · Domingo";
    $("baratoItem").textContent = `Amanhã: ${BARATO[1].nome}`;
    $("baratoCall").textContent = "O Barato do Dia vale de segunda a sábado. Volta amanhã!";
    fig.querySelector(".barato__stamp").textContent = "amanhã";
  }
  const foto = (b || BARATO[1]).foto;
  if (foto) { $("baratoImg").src = foto; $("baratoImg").alt = (b || BARATO[1]).nome; }
  else fig.innerHTML = placeholder((b || BARATO[1]).nome) + `<span class="barato__stamp">só hoje</span>`;
  $("week").innerHTML = [1, 2, 3, 4, 5, 6].map((d) => `<li class="${d === hoje ? "is-today" : ""}"><b>${NOMES[d].slice(0, 3)}</b><span>${esc(BARATO[d].nome)}</span>${d === hoje ? "<em>hoje</em>" : ""}</li>`).join("");
  $("weekToggle").addEventListener("click", (e) => {
    const w = $("week"); w.hidden = !w.hidden;
    e.currentTarget.setAttribute("aria-expanded", !w.hidden);
    e.currentTarget.textContent = w.hidden ? "Ver a semana" : "Esconder a semana";
  });

  // ---------- Cardápio ----------
  const tabs = $("tabs"), cards = $("cards");
  function render(id) {
    const c = CARDAPIO.find((x) => x.id === id);
    cards.innerHTML = c.itens.map((it, i) => `
      <article class="card" style="animation-delay:${i * 50}ms">
        <div class="card__img">${it.foto ? `<img src="${it.foto}" alt="${esc(it.nome)}" width="420" height="420" loading="lazy" decoding="async">` : placeholder(it.nome)}${it.tag ? `<span class="card__tag">${esc(it.tag)}</span>` : ""}</div>
        <div class="card__body">
          <h3>${esc(it.nome)}</h3>
          <p>${esc(it.desc)}</p>
          <div class="card__foot">
            <span class="card__price ${it.preco ? "" : "card__price--ask"}">${it.preco ? esc(it.preco) : "Consulte"}</span>
            <a class="card__ask" data-wa="Olá! Quero saber sobre: ${esc(it.nome)}." href="#" target="_blank" rel="noopener" aria-label="Pedir ${esc(it.nome)} pelo WhatsApp"><svg><use href="#wa"/></svg> Pedir</a>
          </div>
        </div>
      </article>`).join("");
    tabs.querySelectorAll("button").forEach((x) => x.setAttribute("aria-selected", x.dataset.id === id));
    ligarTodos(cards);
  }
  tabs.innerHTML = CARDAPIO.map((c) => `<button role="tab" data-id="${c.id}" aria-selected="false">${c.nome} <small>${c.itens.length}</small></button>`).join("");
  tabs.addEventListener("click", (e) => { const t = e.target.closest("button"); if (t) render(t.dataset.id); });
  render("cafes");

  // ---------- Coworking ----------
  $("plans").innerHTML = PLANOS.map((p) => `
    <article class="plan reveal ${p.destaque ? "plan--hero" : ""}">
      ${p.destaque ? '<span class="plan__flag">mais procurado</span>' : ""}
      <h3 class="plan__name">${esc(p.nome)}</h3>
      <p class="plan__desc">${esc(p.desc)}</p>
      <p class="plan__price">${p.preco ? `${esc(p.preco)}<small>${esc(p.unidade)}</small>` : `Sob consulta<small>${esc(p.unidade)}</small>`}</p>
      <ul>${p.itens.map((i) => `<li>${esc(i)}</li>`).join("")}</ul>
      <a class="btn ${p.destaque ? "btn--dark" : "btn--line"} btn--block" href="#reservas" data-plano="${esc(p.nome)}">Reservar agora</a>
    </article>`).join("");
  $("perks").innerHTML = `<li class="perks__h">Por que trabalhar aqui</li>` + BENEFICIOS.map((x) => `<li>${esc(x)}</li>`).join("");
  $("hours").innerHTML = HORARIOS.length
    ? `<h3>Horários</h3><ul>${HORARIOS.map((h) => `<li>${esc(h)}</li>`).join("")}</ul>`
    : `<h3>Horários e disponibilidade</h3><p>Confirme pelo WhatsApp antes de vir — a gente separa seu lugar.</p><a class="btn btn--yellow" data-wa="Olá! Qual o horário do coworking e tem disponibilidade?" href="#" target="_blank" rel="noopener"><svg><use href="#wa"/></svg> Consultar horários</a>`;

  // plano escolhido → pré-preenche a pauta
  document.addEventListener("click", (e) => {
    const a = e.target.closest("[data-plano]");
    if (!a) return;
    const tipo = a.dataset.plano === "Reunião" ? "reunião" : "coworking (trabalhar)";
    const r = document.querySelector(`#pauta input[name="tipo"][value="${tipo}"]`);
    if (r) r.checked = true;
    pauta.dataset.plano = a.dataset.plano;
  });

  // ---------- Reservas ----------
  const pauta = $("pauta"), data = $("data");
  const hojeISO = new Intl.DateTimeFormat("en-CA", { timeZone: "America/Belem" }).format(new Date());
  data.min = hojeISO; data.value = hojeISO;
  function msgReserva() {
    const f = new FormData(pauta);
    const d = f.get("data") ? f.get("data").split("-").reverse().join("/") : "a combinar";
    let m = `Olá! Quero reservar na Coffeemeet${f.get("nome") ? `. Sou ${f.get("nome")}` : ""}.\n`;
    m += `• Para: ${f.get("tipo")}${pauta.dataset.plano && f.get("tipo").startsWith("coworking") ? ` (plano ${pauta.dataset.plano})` : ""}\n`;
    m += `• Pessoas: ${f.get("pessoas")}\n• Data: ${d}, período: ${f.get("periodo")}\n`;
    if (f.get("obs")) m += `• Detalhes: ${f.get("obs")}\n`;
    return m + "Podem confirmar disponibilidade e valores?";
  }
  pauta.addEventListener("submit", async (e) => {
    e.preventDefault();
    const m = msgReserva();
    if (!temNumero && (await copiar(m))) avisar("Pauta copiada! Cole na conversa do WhatsApp que vai abrir.");
    window.open(waHref(m), "_blank", "noopener");
  });

  // ---------- Prova social ----------
  $("googleReviews").href = GOOGLE_REVIEWS;
  if (DEPOIMENTOS.length) {
    $("quotes").innerHTML = DEPOIMENTOS.map((d) => `<figure class="quote reveal"><span class="quote__stars" aria-label="5 estrelas">★★★★★</span><blockquote>“${esc(d.texto)}”</blockquote><figcaption><b>${esc(d.nome)}</b>${d.origem ? ` · ${esc(d.origem)}` : ""}</figcaption></figure>`).join("");
  } else $("quotes").remove();

  // ---------- Localização ----------
  const q = encodeURIComponent(MAPA_BUSCA);
  $("routeBtn").href = `https://www.google.com/maps/dir/?api=1&destination=${q}`;
  $("wazeBtn").href = `https://waze.com/ul?q=${q}&navigate=yes`;
  $("copyAddr").addEventListener("click", async () => avisar((await copiar(ENDERECO)) ? "Endereço copiado!" : ENDERECO));
  $("visiteHours").innerHTML = HORARIOS.length ? `<b>Horários:</b> ${HORARIOS.map(esc).join(" · ")}` : "";
  // mapa só carrega perto da seção (página mais leve)
  const mf = $("mapFrame");
  new IntersectionObserver((es, o) => { if (es[0].isIntersecting) { mf.src = `https://maps.google.com/maps?q=${q}&z=16&output=embed`; o.disconnect(); } }, { rootMargin: "400px" }).observe(mf);

  // ---------- Nav ----------
  const nav = document.querySelector(".nav");
  const onScroll = () => {
    nav.classList.toggle("scrolled", window.scrollY > 30);
    document.body.classList.toggle("show-dock", window.scrollY > 500);
  };
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

  ligarTodos();
  $("ano").textContent = new Date().getFullYear();

  // ---------- reveal + vídeos sob demanda ----------
  const io = new IntersectionObserver((es) => es.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } }), { threshold: 0.08 });
  document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
  document.querySelectorAll("video[data-lazy]").forEach((v) => {
    new IntersectionObserver((es, o) => { if (es[0].isIntersecting) { v.preload = "auto"; v.play().catch(() => {}); o.disconnect(); } }, { rootMargin: "200px" }).observe(v);
  });
})();
