// Botão para baixar PDF (usa o print do navegador)
(function () {
  const btn = document.getElementById("downloadPdf");
  if (!btn) return;
  btn.addEventListener("click", () => {
    window.print();
  });
})();

// Menu mobile
(function () {
  const toggle = document.querySelector(".nav-toggle");
  const menu = document.getElementById("menu");
  if (!toggle || !menu) return;
  toggle.addEventListener("click", () => {
    const opened = menu.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(opened));
  });
  menu.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => {
      menu.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    })
  );
})();

// Smooth scroll para âncoras internas
(function () {
  const header = document.querySelector(".site-header");
  const offset = header ? header.offsetHeight : 70;
  const menuLinks = document.querySelectorAll('.menu a[href^="#"]');
  // Marcar Introdução como ativo por padrão
  const defaultLink = document.querySelector('.menu a[href="#introducao"]');
  if (defaultLink) {
    menuLinks.forEach((l) => l.classList.remove("active"));
    defaultLink.classList.add("active");
  }
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const id = a.getAttribute("href").slice(1);
      const el = document.getElementById(id);
      if (el) {
        e.preventDefault();
        const top = Math.max(
          0,
          el.getBoundingClientRect().top + window.pageYOffset - offset
        );
        window.scrollTo({ top, behavior: "smooth" });
        // Marcar link ativo ao clicar
        if (menuLinks.length) {
          menuLinks.forEach((l) => l.classList.remove("active"));
          const current = document.querySelector('.menu a[href="#' + id + '"]');
          if (current) current.classList.add("active");
        }
      }
    });
  });
})();

// Reveal ao rolar
(function () {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) entry.target.classList.add("visible");
      }
    },
    { threshold: 0.08 }
  );
  document.querySelectorAll(".section, .card, .placeholder").forEach((el) => {
    el.classList.add("reveal");
    observer.observe(el);
  });
})();

// Ativar link da navbar conforme seção visível
(function () {
  const menuLinks = Array.from(document.querySelectorAll('.menu a[href^="#"]'));
  if (!menuLinks.length) return;
  const targets = menuLinks
    .map((l) => document.getElementById(l.getAttribute("href").slice(1)))
    .filter(Boolean);
  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          menuLinks.forEach((l) =>
            l.classList.toggle("active", l.getAttribute("href") === "#" + id)
          );
        }
      });
    },
    { rootMargin: "-30% 0px -60% 0px", threshold: 0.2 }
  );
  targets.forEach((t) => obs.observe(t));
})();

// Ocultar a barra superior do header ao rolar para baixo (modo compacto)
(function () {
  const header = document.querySelector(".site-header");
  if (!header) return;
  let lastY = window.pageYOffset;
  const update = () => {
    const y = window.pageYOffset;
    header.classList.toggle("compact", y > 0);
  };
  window.addEventListener("scroll", update, { passive: true });
  update();
})();

// Toggle Palavras‑chave (expandir/fechar significado)
(function () {
  document.querySelectorAll(".keyword.pill").forEach((btn) => {
    btn.addEventListener("click", () => {
      const contentId = btn.getAttribute("aria-controls");
      const content = contentId ? document.getElementById(contentId) : null;
      if (!content) return;
      const expanded = btn.getAttribute("aria-expanded") === "true";
      btn.setAttribute("aria-expanded", String(!expanded));
      content.hidden = expanded;
    });
  });
})();

// FAQ Accordion: clicar na pergunta ou chevron abre/fecha a resposta
(function () {
  document.querySelectorAll(".faq-question").forEach((q) => {
    const toggle = () => {
      const id = q.getAttribute("aria-controls");
      const ans = id ? document.getElementById(id) : null;
      if (!ans) return;
      const open = q.getAttribute("aria-expanded") === "true";
      q.setAttribute("aria-expanded", String(!open));
      ans.hidden = open;
    };
    const label = q.querySelector(".label");
    const chev = q.querySelector(".chevron");
    label && label.addEventListener("click", toggle);
    chev && chev.addEventListener("click", toggle);
    q.addEventListener("click", (e) => {
      // Evita duplo toggle se clicou especificamente no label/chevron (já tratados)
      if (e.target.closest(".label") || e.target.closest(".chevron")) return;
      toggle();
    });
  });
})();

// (removido: atualização automática do ano no footer não utilizada)
