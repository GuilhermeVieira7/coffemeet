# Coffeemeet · Cafeteria & Coworking — site

Site da **Coffeemeet** (Av. F, Qd 97, Lt 24 — Parque dos Carajás, Parauapebas/PA).
Estático (HTML + CSS + JS puro), pronto pra Vercel sem build.

Tudo que muda com frequência fica no topo do `script.js` (WhatsApp, link de avaliações do Google, horários, Barato do Dia, cardápio com preços e fotos, planos do coworking, benefícios e depoimentos):
- `WA_NUMERO` — número do WhatsApp (com ele, as mensagens vão prontas; sem ele, os botões usam o link da bio e copiam a mensagem)
- `BARATO` — Barato do Dia de cada dia da semana (o site destaca o de hoje sozinho)
- `CARDAPIO` — categorias e itens do cardápio
