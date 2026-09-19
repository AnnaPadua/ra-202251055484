"use strict";

(function () {
  const data = window.VITRINE_DATA;
  const money = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });

  function query(name, fallback) {
    return new URLSearchParams(window.location.search).get(name) || fallback;
  }

  function marketById(id) {
    return data.markets.find((market) => market.id === id) || data.markets[0];
  }

  function companyById(id) {
    return data.companies.find((company) => company.id === id) || data.companies[0];
  }

  function marketCompanies(marketId) {
    return data.companies.filter((company) => company.market === marketId);
  }

  function companyProducts(companyId) {
    return data.products.filter((product) => product.company === companyId);
  }

  function readCart() {
    try {
      return JSON.parse(localStorage.getItem("vitrine-cart")) || [];
    } catch (_error) {
      return [];
    }
  }

  function saveCart(cart) {
    localStorage.setItem("vitrine-cart", JSON.stringify(cart));
    document.cookie = `vitrineCartCount=${cart.reduce((sum, item) => sum + item.quantity, 0)}; path=/; max-age=604800; SameSite=Lax`;
    updateCartCount();
  }

  function updateCartCount() {
    const count = readCart().reduce((sum, item) => sum + item.quantity, 0);
    document.querySelectorAll(".cart-count").forEach((element) => { element.textContent = String(count); });
  }

  function showToast(message) {
    const toast = document.getElementById("toast");
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("is-visible");
    window.setTimeout(() => toast.classList.remove("is-visible"), 2200);
  }

  function addToCart(code) {
    const cart = readCart();
    const existing = cart.find((item) => item.code === code);
    if (existing) existing.quantity += 1;
    else cart.push({ code, quantity: 1 });
    saveCart(cart);
    showToast("Produto adicionado ao carrinho.");
  }

  function marketCard(market, index) {
    const statusClass = market.status === "Acontecendo agora" ? "status-live" : "status-soon";
    const marketNumber = data.markets.indexOf(market) + 1;
    return `
      <article class="market-card">
        <div class="market-card-top">
          <span class="card-number">Feira ${String(marketNumber).padStart(2, "0")}</span>
          <span class="status-pill ${statusClass}">${market.status}</span>
        </div>
        <div class="market-card-body">
          <h3>${market.name}</h3>
          <div class="market-meta"><span>▣ ${market.dates} · ${market.hours}</span><span>📍 ${market.city}</span><span>🏢 ${market.participantCount} empresas participantes</span></div>
          <div class="tags">${market.categories.map((category) => `<span class="tag">${category}</span>`).join("")}</div>
          <div class="market-actions"><a class="btn" href="feira.html?id=${market.id}">Ver feira</a><a class="btn btn-secondary" href="mapa.html?id=${market.id}">Mapa</a><a class="btn btn-outline-purple" href="feira.html?id=${market.id}">Página da feira ↗</a></div>
        </div>
      </article>`;
  }

  function companyCard(company) {
    return `
      <article class="card">
        <div class="card-art" style="--card-color:${company.color}" aria-hidden="true">${company.initials}</div>
        <div class="card-body">
          <span class="card-number">${company.stand}</span>
          <h3>${company.name}</h3>
          <p>${company.description}</p>
          <div class="tags"><span class="tag">${company.segment}</span><span class="tag">${company.category}</span>${company.promo ? `<span class="tag tag-lime">${company.promo}</span>` : ""}</div>
          <div class="card-actions"><a class="btn" href="empresa.html?id=${company.id}">Ver produtos</a><a class="btn btn-secondary" href="mapa.html?id=${company.market}&empresa=${company.id}">Localizar</a></div>
        </div>
      </article>`;
  }

  function productCard(product) {
    const initials = product.name.split(" ").slice(0, 2).map((part) => part[0]).join("");
    return `
      <article class="card product-card">
        <div class="card-art" aria-hidden="true">${initials}</div>
        <div class="card-body">
          <span class="card-number">${product.code} · ${product.stock} disponíveis</span>
          <h3>${product.name}</h3>
          <div class="tags"><span class="tag">${product.category}</span>${product.oldPrice ? `<span class="tag tag-lime">Oferta</span>` : ""}</div>
          <p><span class="old-price">${product.oldPrice ? money.format(product.oldPrice) : ""}</span><span class="price">${money.format(product.price)}</span></p>
          <button class="btn add-cart" type="button" data-code="${product.code}">Adicionar ao carrinho</button>
        </div>
      </article>`;
  }

  function initNavigation() {
    const toggle = document.querySelector(".nav-toggle");
    const links = document.querySelector(".nav-links");
    if (!toggle || !links) return;
    toggle.addEventListener("click", () => {
      const open = links.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
    });
  }

  function renderHome() {
    const marketList = document.getElementById("market-list");
    const search = document.getElementById("market-search");
    const categoryButtons = [...document.querySelectorAll(".category-chip")];
    let selectedCategory = "";

    function updateMarkets() {
      const term = search.value.trim().toLocaleLowerCase("pt-BR");
      const filtered = data.markets.filter((market) => {
        const matchesTerm = `${market.name} ${market.city}`.toLocaleLowerCase("pt-BR").includes(term);
        return matchesTerm && (!selectedCategory || market.categories.includes(selectedCategory));
      });
      marketList.innerHTML = filtered.length
        ? filtered.map(marketCard).join("")
        : '<p class="empty-state">Nenhuma feira encontrada. Tente alterar os filtros.</p>';
    }

    search.addEventListener("input", updateMarkets);
    categoryButtons.forEach((button) => button.addEventListener("click", () => {
      selectedCategory = button.dataset.category;
      categoryButtons.forEach((item) => {
        const active = item === button;
        item.classList.toggle("is-active", active);
        item.setAttribute("aria-pressed", String(active));
      });
      updateMarkets();
    }));
    updateMarkets();
  }

  function renderMarket() {
    const market = marketById(query("id", "market-001"));
    const companies = marketCompanies(market.id);
    document.title = `${market.name} | Vitrine Feiras`;
    document.getElementById("event-header").style.setProperty("--event-header-color", market.headerColor);
    document.getElementById("event-organizer").textContent = market.organizer;
    document.getElementById("event-brand-mark").textContent = market.brandMark;
    document.getElementById("event-brand-title").textContent = market.brandTitle;
    document.getElementById("event-brand-subtitle").textContent = market.brandSubtitle;
    document.getElementById("event-brand-link").href = `feira.html?id=${market.id}`;
    document.getElementById("event-brand-link").setAttribute("aria-label", `Página da feira ${market.name}`);
    document.getElementById("market-name").textContent = market.name;
    document.getElementById("market-description").textContent = market.description;
    document.getElementById("market-days").textContent = market.dateDays;
    document.getElementById("market-month-year").textContent = market.dateMonthYear;
    document.getElementById("market-venue").textContent = market.venue;
    document.getElementById("market-region").textContent = market.region;
    document.getElementById("map-link").href = `mapa.html?id=${market.id}`;
    const scheduleDays = document.getElementById("schedule-days");
    const scheduleList = document.getElementById("schedule-list");
    let selectedDay = market.scheduleDays[0].id;
    scheduleDays.innerHTML = market.scheduleDays.map((day, index) => `<button class="schedule-day${index === 0 ? " is-active" : ""}" type="button" data-day="${day.id}" aria-pressed="${index === 0}">${day.label}</button>`).join("");
    function updateSchedule() {
      scheduleList.innerHTML = market.schedule.filter((item) => item.day === selectedDay).map((item) => `
        <article class="schedule-item">
          <time class="schedule-time">${item.time}</time>
          <div class="schedule-content"><h3>${item.title}</h3><p>${item.description}</p></div>
          <span class="schedule-stage">${item.venue}</span>
        </article>`).join("");
    }
    scheduleDays.addEventListener("click", (event) => {
      const button = event.target.closest(".schedule-day");
      if (!button) return;
      selectedDay = Number(button.dataset.day);
      scheduleDays.querySelectorAll(".schedule-day").forEach((item) => {
        const active = item === button;
        item.classList.toggle("is-active", active);
        item.setAttribute("aria-pressed", String(active));
      });
      updateSchedule();
    });
    updateSchedule();
    document.getElementById("sponsor-list").innerHTML = market.supporters.map((supporter) => `<div class="sponsor">${supporter.name}<small>${supporter.tier}</small></div>`).join("");

    const search = document.getElementById("company-search");
    const segment = document.getElementById("company-segment");
    const list = document.getElementById("company-list");
    [...new Set(companies.map((company) => company.segment))].forEach((value) => segment.insertAdjacentHTML("beforeend", `<option>${value}</option>`));
    function update() {
      const term = search.value.trim().toLocaleLowerCase("pt-BR");
      const filtered = companies.filter((company) => (!segment.value || company.segment === segment.value) && `${company.name} ${company.description}`.toLocaleLowerCase("pt-BR").includes(term));
      list.innerHTML = filtered.length ? filtered.map(companyCard).join("") : '<p class="empty-state">Nenhuma empresa encontrada.</p>';
    }
    search.addEventListener("input", update);
    segment.addEventListener("change", update);
    update();
  }

  function renderCompany() {
    const company = companyById(query("id", "company-001"));
    const market = marketById(company.market);
    const allProducts = companyProducts(company.id);
    document.title = `${company.name} | Vitrine Feiras`;
    document.getElementById("company-name").textContent = company.name;
    document.getElementById("company-description").textContent = company.description;
    document.getElementById("company-initials").textContent = company.initials;
    document.getElementById("company-art").style.setProperty("--card-color", company.color);
    document.getElementById("company-market-link").href = `feira.html?id=${market.id}`;
    document.getElementById("company-market-link").textContent = `← ${market.name}`;
    document.getElementById("company-map-link").href = `mapa.html?id=${market.id}&empresa=${company.id}`;
    document.getElementById("company-stand").textContent = `${company.stand} · ${market.name}`;
    document.getElementById("company-segment-value").textContent = `${company.segment} / ${company.category}`;
    document.getElementById("company-hours").textContent = company.hours;
    document.getElementById("company-contact").textContent = company.contact;
    document.getElementById("company-promo").textContent = company.promo || "Ofertas no estande";

    const search = document.getElementById("product-search");
    const category = document.getElementById("product-category");
    const maxPrice = document.getElementById("product-price");
    const discount = document.getElementById("product-discount");
    const list = document.getElementById("product-list");
    const ceiling = Math.ceil(Math.max(...allProducts.map((product) => product.price)) / 10) * 10;
    maxPrice.max = String(ceiling);
    maxPrice.value = String(ceiling);
    document.getElementById("price-value").textContent = money.format(ceiling);
    [...new Set(allProducts.map((product) => product.category))].forEach((value) => category.insertAdjacentHTML("beforeend", `<option>${value}</option>`));
    function update() {
      const term = search.value.trim().toLocaleLowerCase("pt-BR");
      document.getElementById("price-value").textContent = money.format(Number(maxPrice.value));
      const filtered = allProducts.filter((product) => product.name.toLocaleLowerCase("pt-BR").includes(term) && (!category.value || product.category === category.value) && product.price <= Number(maxPrice.value) && (!discount.checked || product.oldPrice));
      list.innerHTML = filtered.length ? filtered.map(productCard).join("") : '<p class="empty-state">Nenhum produto encontrado.</p>';
    }
    [search, maxPrice].forEach((input) => input.addEventListener("input", update));
    [category, discount].forEach((input) => input.addEventListener("change", update));
    list.addEventListener("click", (event) => {
      const button = event.target.closest(".add-cart");
      if (button) addToCart(button.dataset.code);
    });
    update();
  }

  function renderMap() {
    const market = marketById(query("id", "market-001"));
    const selected = query("empresa", "");
    const companies = marketCompanies(market.id);
    const [lon, lat] = market.center;
    const delta = 0.007;
    document.getElementById("map-title").textContent = market.name;
    document.getElementById("map-market-link").href = `feira.html?id=${market.id}`;
    document.getElementById("map-frame").src = `https://www.openstreetmap.org/export/embed.html?bbox=${lon - delta}%2C${lat - delta}%2C${lon + delta}%2C${lat + delta}&layer=mapnik&marker=${lat}%2C${lon}`;
    document.getElementById("map-companies").innerHTML = companies.map((company, index) => `
      <a class="map-company${company.id === selected ? " is-active" : ""}" href="empresa.html?id=${company.id}">
        <span class="marker"><span>${index + 1}</span></span>
        <span><strong>${company.name}</strong><small style="display:block;color:var(--color-muted)">${company.stand} · ${company.category}</small></span>
      </a>`).join("");
  }

  function cartDetails() {
    return readCart().map((row) => ({ ...row, product: data.products.find((product) => product.code === row.code) })).filter((row) => row.product);
  }

  function renderCart() {
    const items = document.getElementById("cart-items");
    const form = document.getElementById("checkout-form");
    const coupon = document.getElementById("coupon");
    let discountRate = 0;

    function update() {
      const details = cartDetails();
      items.innerHTML = details.length ? details.map((item) => {
        const company = companyById(item.product.company);
        return `<article class="cart-row"><div><strong>${item.product.name}</strong><p>${company.name} · ${money.format(item.product.price)} por unidade</p><button class="btn btn-secondary remove-item" type="button" data-code="${item.code}">Remover</button></div><div class="quantity"><button type="button" data-code="${item.code}" data-delta="-1" aria-label="Diminuir quantidade de ${item.product.name}">−</button><strong>${item.quantity}</strong><button type="button" data-code="${item.code}" data-delta="1" aria-label="Aumentar quantidade de ${item.product.name}">+</button></div></article>`;
      }).join("") : '<div class="empty-state"><p>Seu carrinho está vazio.</p><a class="btn" href="index.html#destaques">Explorar empresas</a></div>';
      const subtotal = details.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
      const discountValue = subtotal * discountRate;
      document.getElementById("subtotal").textContent = money.format(subtotal);
      document.getElementById("discount-total").textContent = `− ${money.format(discountValue)}`;
      document.getElementById("grand-total").textContent = money.format(subtotal - discountValue);
      document.getElementById("finish-order").disabled = details.length === 0;
      updateCartCount();
    }

    items.addEventListener("click", (event) => {
      const target = event.target.closest("button[data-code]");
      if (!target) return;
      let cart = readCart();
      if (target.classList.contains("remove-item")) cart = cart.filter((item) => item.code !== target.dataset.code);
      else cart = cart.map((item) => item.code === target.dataset.code ? { ...item, quantity: item.quantity + Number(target.dataset.delta) } : item).filter((item) => item.quantity > 0);
      saveCart(cart);
      update();
    });

    document.getElementById("apply-coupon").addEventListener("click", () => {
      const code = coupon.value.trim().toUpperCase();
      discountRate = code === "FEIRA10" ? 0.1 : 0;
      document.getElementById("coupon-message").textContent = discountRate ? "Cupom FEIRA10 aplicado: 10% de desconto." : "Cupom inválido. Experimente FEIRA10.";
      update();
    });

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      if (!form.reportValidity()) return;
      saveCart([]);
      document.getElementById("order-dialog").showModal();
      update();
    });
    document.getElementById("close-dialog").addEventListener("click", () => document.getElementById("order-dialog").close());
    update();
  }

  function renderAccount() {
    const rewards = document.getElementById("rewards-list");
    rewards.innerHTML = data.rewards.map((reward) => `<article class="card"><div class="card-body"><span class="card-number">${reward.company}</span><h3>${reward.name}</h3><p>${reward.description}</p><div class="tags"><span class="tag tag-lime">${reward.points} pontos</span><span class="tag">${reward.coupon}</span></div><button class="btn btn-secondary reward-button" type="button" data-coupon="${reward.coupon}">Usar recompensa</button></div></article>`).join("");
    rewards.addEventListener("click", (event) => {
      const button = event.target.closest(".reward-button");
      if (button) showToast(`Cupom ${button.dataset.coupon} reservado para o carrinho.`);
    });
    const form = document.getElementById("profile-form");
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      if (!form.reportValidity()) return;
      document.getElementById("profile-message").textContent = "Dados salvos neste protótipo.";
    });
  }

  initNavigation();
  updateCartCount();
  const page = document.body.dataset.page;
  if (page === "home") renderHome();
  if (page === "market") renderMarket();
  if (page === "company") renderCompany();
  if (page === "map") renderMap();
  if (page === "cart") renderCart();
  if (page === "account") renderAccount();
})();
