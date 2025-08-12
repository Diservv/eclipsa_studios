
// Animação de entrada da logo estilo Netflix
window.addEventListener('DOMContentLoaded', () => {
    const logoOverlay = document.createElement('div');
    logoOverlay.className = 'logo-overlay';
    logoOverlay.innerHTML = '<span class="logo-anim">E</span>';
    document.body.appendChild(logoOverlay);
    setTimeout(() => {
        logoOverlay.classList.add('hide');
        setTimeout(() => logoOverlay.remove(), 1200);
    }, 1800);

    // Navbar minimalista: expand-menu para mobile
    const expandBtn = document.querySelector('.expand-menu');
    const navList = document.querySelector('.nav-list');
    function toggleNav() {
        navList.classList.toggle('show');
    }
    if (expandBtn) {
        expandBtn.addEventListener('click', toggleNav);
    }
    function handleResizeNav() {
        if (window.innerWidth <= 700) {
            expandBtn.style.display = 'inline-block';
            navList.style.display = navList.classList.contains('show') ? 'flex' : 'none';
            navList.style.flexDirection = 'column';
            navList.style.gap = '12px';
        } else {
            expandBtn.style.display = 'none';
            navList.style.display = 'flex';
            navList.style.flexDirection = 'row';
            navList.classList.remove('show');
        }
    }
    window.addEventListener('resize', handleResizeNav);
    handleResizeNav();

    // Animação dos cards de personagens
    animateCharacterCards();

    // Carrossel de imagens
    initCarousel();
});

// Navegação suave entre seções
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href.startsWith('#')) {
            e.preventDefault();
            document.querySelector(href).scrollIntoView({ behavior: 'smooth' });
        }
    });
});




// Personagens: seleção por avatar, destaque dinâmico
function animateCharacterCards() {
    document.querySelector('.personagem-cards').style.display = 'none';
    const avatars = document.querySelectorAll('.personagem-avatar');
    const cards = document.querySelectorAll('.personagem-card.grande');
    avatars.forEach((avatar, i) => {
        avatar.addEventListener('click', () => selectCharacter(i));
    });
    if (avatars.length > 0) selectCharacter(0);
}

function selectCharacter(index) {
    const avatars = document.querySelectorAll('.personagem-avatar');
    const cards = document.querySelectorAll('.personagem-card.grande');
    avatars.forEach((avatar, i) => {
        avatar.classList.toggle('selected', i === index);
    });
    const display = document.querySelector('.personagem-destaque');
    if (cards[index] && display) {
        const info = cards[index].querySelector('.personagem-info.aberto');
        display.innerHTML = info.innerHTML;
        display.classList.add('show');
    }
}

// Equipe: seleção por avatar, destaque dinâmico
window.addEventListener('DOMContentLoaded', () => {
    // ...existing code...
    animateEquipeCards();
});

function animateEquipeCards() {
    const avatars = document.querySelectorAll('.equipe-avatar');
    const nomes = ["Autor", "Diretor", "Produtora"];
    const descricoes = [
        "Responsável pela criação e roteiro da série.",
        "Direção criativa e supervisão geral.",
        "Produção executiva e coordenação de equipe."
    ];
    avatars.forEach((avatar, i) => {
        avatar.addEventListener('click', () => selectEquipe(i, nomes, descricoes));
    });
    if (avatars.length > 0) selectEquipe(0, nomes, descricoes);
}

function selectEquipe(index, nomes, descricoes) {
    const avatars = document.querySelectorAll('.equipe-avatar');
    avatars.forEach((avatar, i) => {
        avatar.classList.toggle('selected', i === index);
    });
    const display = document.querySelector('.equipe-descricao');
    if (display) {
        display.innerHTML = `<h3>${nomes[index]}</h3><p>${descricoes[index]}</p>`;
    }
}

// Inicialização do carrossel permanece igual

function initCarousel() {
    const slides = document.querySelectorAll('.carousel-slide');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    let current = 0;
    let intervalId;
    function showSlide(idx) {
        slides.forEach((slide, i) => {
            const text = slide.querySelector('.carousel-text.lateral');
            if (i === idx) {
                slide.classList.add('active');
                if (text) {
                    text.style.opacity = '0';
                    text.style.transform = 'translateY(40px)';
                    setTimeout(() => {
                        text.style.opacity = '1';
                        text.style.transform = 'translateY(0)';
                    }, 100);
                }
            } else {
                slide.classList.remove('active');
                if (text) {
                    text.style.opacity = '0';
                    text.style.transform = 'translateY(40px)';
                }
            }
        });
    }
    function nextSlide() {
        current = (current + 1) % slides.length;
        showSlide(current);
    }
    prevBtn.addEventListener('click', () => {
        current = (current - 1 + slides.length) % slides.length;
        showSlide(current);
        resetInterval();
    });
    nextBtn.addEventListener('click', () => {
        nextSlide();
        resetInterval();
    });
    function resetInterval() {
        clearInterval(intervalId);
        intervalId = setInterval(nextSlide, 6000);
    }
    showSlide(current);
    intervalId = setInterval(nextSlide, 6000);
}


// cookie consent

function setCookie(name, value, days) {
  const d = new Date();
  d.setTime(d.getTime() + days*24*60*60*1000);
  document.cookie = `${name}=${encodeURIComponent(value)};max-age=${days*24*60*60};path=/`;
}

function getCookie(name) {
  const c = document.cookie.split('; ').find(row => row.startsWith(name + '='));
  return c ? decodeURIComponent(c.split('=')[1]) : null;
}

function showGreeting() {
  const user = getCookie('username');
  if (user) {
    let el = document.getElementById('greeting');
    if (!el) {
      el = document.createElement('div');
      el.id = 'greeting';
      el.style = 'margin:20px;font-family:Arial,sans-serif;font-size:18px;';
      document.body.prepend(el);
    }
    el.textContent = `Bem-vindo(a), ${user}!`;
  }
}

function showCookieBanner() {
    if (!getCookie('cookiesAceitos')) {
        const banner = document.createElement('div');
        banner.id = 'cookie-banner';
        banner.innerHTML = `
            <span>Este site usa cookies para melhorar sua experiência.</span>
            <button id="accept-btn" style="background: #3fa7ff; border: none; padding: 8px 18px; border-radius: 8px; color: #181c2b; cursor: pointer; font-weight: 600;">Aceitar</button>
        `;
        document.body.appendChild(banner);
        document.getElementById('accept-btn').onclick = () => {
            setCookie('cookiesAceitos', 'true', 365);
            localStorage.setItem('lastVisit', new Date().toISOString());
            banner.remove();
        };
    }
}

window.onload = () => {
    localStorage.setItem('pageLoadTime', new Date().toISOString());
    showCookieBanner();
};
