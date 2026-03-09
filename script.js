// ===============================================
// FADE IN / FADE OUT SECTIONS ON SCROLL
// ===============================================

const fadeSections = document.querySelectorAll('.fade-section');

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            entry.target.classList.remove('fading-out');
        } else {
            const rect = entry.target.getBoundingClientRect();
            if (rect.bottom < 0) {
                entry.target.classList.add('fading-out');
                entry.target.classList.remove('visible');
            } else {
                entry.target.classList.remove('visible');
                entry.target.classList.remove('fading-out');
            }
        }
    });
}, {
    threshold: 0.08,
    rootMargin: '0px 0px -5% 0px'
});

fadeSections.forEach(section => {
    sectionObserver.observe(section);
});

// ===============================================
// SCROLL UP / SCROLL DOWN ARROWS
// ===============================================

const scrollUpBtn = document.getElementById('scrollUp');
const scrollDownBtn = document.getElementById('scrollDown');

window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;

    if (scrollY > 100) {
        scrollUpBtn.classList.add('visible');
    } else {
        scrollUpBtn.classList.remove('visible');
    }

    if (scrollY < maxScroll - 100) {
        scrollDownBtn.classList.add('visible');
    } else {
        scrollDownBtn.classList.remove('visible');
    }
});

scrollUpBtn.addEventListener('click', () => {
    window.scrollBy({ top: -window.innerHeight * 0.85, behavior: 'smooth' });
});

scrollDownBtn.addEventListener('click', () => {
    window.scrollBy({ top: window.innerHeight * 0.85, behavior: 'smooth' });
});

window.dispatchEvent(new Event('scroll'));

// ===============================================
// MOBILE NAVIGATION TOGGLE
// ===============================================

const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });
}

const navLinks = document.querySelectorAll('.nav-menu a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// ===============================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ===============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 70,
                behavior: 'smooth'
            });
        }
    });
});

// ===============================================
// NAVBAR SCROLL EFFECT
// ===============================================

window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.4)';
    } else {
        navbar.style.boxShadow = '0 3px 12px rgba(0,0,0,0.3)';
    }
});

// ===============================================
// ANIMATED ELEMENTS ON SCROLL
// ===============================================

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

const animatedElements = document.querySelectorAll(
    '.pillar-card, .committee-card, .reg-mini-card'
);

animatedElements.forEach((el, index) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = `opacity 0.6s ease ${index * 0.08}s, transform 0.6s ease ${index * 0.08}s`;
    observer.observe(el);
});

// ===============================================
// MATRIX CARDS — SCROLL REVEAL
// ===============================================

const matrixHCards = document.querySelectorAll('.matrix-h-card');

const matrixRevealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, i * 150);
        }
    });
}, { threshold: 0.1 });

matrixHCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(40px)';
    card.style.transition = 'opacity 0.7s ease, transform 0.7s ease, box-shadow 0.4s ease, border-color 0.3s ease, background 0.3s ease';
    matrixRevealObserver.observe(card);
});

matrixHCards.forEach(card => {
    card.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const rotateX = (e.clientY - rect.top - rect.height / 2) / 60;
        const rotateY = (rect.left + rect.width / 2 - e.clientX) / 60;
        this.style.transform = `translateY(-4px) perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) perspective(1200px) rotateX(0deg) rotateY(0deg)';
    });
});

// ===============================================
// COMMITTEE CARDS INTERACTION
// ===============================================

const committeeCards = document.querySelectorAll('.committee-card');
committeeCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.boxShadow = '0 18px 50px rgba(71,11,11,0.18)';
    });
    card.addEventListener('mouseleave', function() {
        this.style.boxShadow = '0 4px 18px rgba(71,11,11,0.07)';
    });
});

// ===============================================
// CONTACT — PANEL REVEAL
// ===============================================

const contactLeftPanel = document.querySelector('.contact-left-panel');
const contactRightPanel = document.querySelector('.contact-right-panel');

[contactLeftPanel, contactRightPanel].forEach((panel, i) => {
    if (!panel) return;
    panel.style.opacity = '0';
    panel.style.transform = i === 0 ? 'translateX(-25px)' : 'translateX(25px)';

    const panelObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
            }
        });
    }, { threshold: 0.15 });

    panelObserver.observe(panel);
});

const contactDetailRows = document.querySelectorAll('.contact-detail-row');
contactDetailRows.forEach((row, index) => {
    row.style.opacity = '0';
    row.style.transform = 'translateX(-15px)';

    const rowObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.transition = 'all 0.5s ease';
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                }, index * 100);
            }
        });
    }, { threshold: 0.3 });

    rowObserver.observe(row);
});

// ===============================================
// FORM SUBMISSION
// ===============================================

const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const submitBtn = this.querySelector('.contact-submit-btn');
        const btnText = submitBtn.querySelector('.btn-text');
        const original = btnText.textContent;

        submitBtn.disabled = true;
        btnText.textContent = 'Sending...';
        submitBtn.style.opacity = '0.7';

        setTimeout(() => {
            btnText.textContent = '✓ Message Sent!';
            submitBtn.style.background = 'linear-gradient(135deg, #1a7a3a, #28a745)';
            submitBtn.style.borderColor = '#28a745';
            submitBtn.style.color = '#fff';
            submitBtn.style.opacity = '1';
            this.reset();

            setTimeout(() => {
                submitBtn.disabled = false;
                btnText.textContent = original;
                submitBtn.style.background = '';
                submitBtn.style.borderColor = '';
                submitBtn.style.color = '';
            }, 3500);
        }, 1800);
    });
}

// ===============================================
// REGISTRATION CARDS — SCROLL REVEAL + 3D TILT
// ===============================================

const regMiniCards = document.querySelectorAll('.reg-mini-card');

const regCardObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, (i % 4) * 90);
        }
    });
}, { threshold: 0.1 });

regMiniCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(25px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease, box-shadow 0.3s ease, border-color 0.3s ease';
    regCardObserver.observe(card);
});

regMiniCards.forEach(card => {
    card.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const rotateX = (e.clientY - rect.top - rect.height / 2) / 45;
        const rotateY = (rect.left + rect.width / 2 - e.clientX) / 45;
        this.style.transform = `translateY(-7px) perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) perspective(600px) rotateX(0deg) rotateY(0deg)';
    });
});

const ctaBanners = document.querySelectorAll('.reg-cta-banner');
const ctaObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.2 });

ctaBanners.forEach(banner => {
    banner.style.opacity = '0';
    banner.style.transform = 'translateY(20px)';
    ctaObserver.observe(banner);
});

// ===============================================
// BACK TO TOP BUTTON
// ===============================================

const backToTopBtn = document.getElementById('scrollToTop');
if (backToTopBtn) {
    backToTopBtn.style.opacity = '0';
    backToTopBtn.style.pointerEvents = 'none';
    backToTopBtn.style.transition = 'opacity 0.3s ease, transform 0.3s ease';

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 500) {
            backToTopBtn.style.opacity = '1';
            backToTopBtn.style.pointerEvents = 'auto';
        } else {
            backToTopBtn.style.opacity = '0';
            backToTopBtn.style.pointerEvents = 'none';
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ===============================================
// FOOTER SECTION FADE IN
// ===============================================

const footerSections = document.querySelectorAll('.footer-section');
const footerObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 120);
        }
    });
}, { threshold: 0.2 });

footerSections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'all 0.6s ease';
    footerObserver.observe(section);
});

// ===============================================
// PARALLAX EFFECT FOR HERO BANNER
// ===============================================

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroBanner = document.querySelector('.hero-banner');
    if (heroBanner && scrolled < window.innerHeight) {
        heroBanner.style.transform = `translateY(${scrolled * 0.4}px)`;
    }
});

window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    setTimeout(() => { document.body.style.opacity = '1'; }, 80);
});

console.log('✨ SIMATS MUN 2026 — Loaded successfully! 🎓🌍');


// ================================================================
//  HERO ENHANCEMENT — GOLD PARTICLE SYSTEM
// ================================================================

(function initHeroParticles() {
    const canvas = document.getElementById('heroParticles');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let W, H, particles = [];
    const COUNT = 55;

    function resize() {
        W = canvas.width  = canvas.offsetWidth;
        H = canvas.height = canvas.offsetHeight;
    }

    function rand(a, b) { return a + Math.random() * (b - a); }

    class Particle {
        constructor() { this.reset(true); }

        reset(init = false) {
            this.x  = rand(0, W);
            this.y  = init ? rand(0, H) : H + 10;
            this.r  = rand(0.6, 2.2);
            this.vy = rand(-0.25, -0.65);
            this.vx = rand(-0.15, 0.15);
            this.life   = 0;
            this.maxLife = rand(200, 420);
            this.shimmer = rand(0, Math.PI * 2);
            this.shimmerSpeed = rand(0.01, 0.03);
            const hue = rand(38, 50);
            const sat = rand(55, 80);
            const lit = rand(60, 85);
            this.baseColor = `hsla(${hue},${sat}%,${lit}%,`;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;
            this.life++;
            this.shimmer += this.shimmerSpeed;
            if (this.life > this.maxLife || this.y < -10) this.reset();
        }

        draw() {
            const progress = this.life / this.maxLife;
            const fade = progress < 0.15
                ? progress / 0.15
                : progress > 0.75
                    ? 1 - (progress - 0.75) / 0.25
                    : 1;
            const pulse = 0.7 + 0.3 * Math.sin(this.shimmer);
            const alpha = fade * pulse * 0.75;
            const radius = this.r * (0.85 + 0.15 * pulse);

            const grd = ctx.createRadialGradient(
                this.x, this.y, 0,
                this.x, this.y, radius * 3.5
            );
            grd.addColorStop(0,   this.baseColor + alpha + ')');
            grd.addColorStop(0.5, this.baseColor + (alpha * 0.4) + ')');
            grd.addColorStop(1,   this.baseColor + '0)');

            ctx.beginPath();
            ctx.arc(this.x, this.y, radius * 3.5, 0, Math.PI * 2);
            ctx.fillStyle = grd;
            ctx.fill();

            ctx.beginPath();
            ctx.arc(this.x, this.y, radius, 0, Math.PI * 2);
            ctx.fillStyle = this.baseColor + alpha + ')';
            ctx.fill();
        }
    }

    function init() {
        resize();
        particles = Array.from({ length: COUNT }, () => new Particle());
    }

    function loop() {
        ctx.clearRect(0, 0, W, H);
        particles.forEach(p => { p.update(); p.draw(); });
        requestAnimationFrame(loop);
    }

    window.addEventListener('resize', () => {
        resize();
        particles.forEach(p => { p.x = rand(0, W); p.y = rand(0, H); });
    });

    window.addEventListener('load', () => { init(); loop(); });
    if (document.readyState === 'complete') { init(); loop(); }
})();


// ================================================================
//  HERO ENHANCEMENT — TITLE LETTER-BY-LETTER SHIMMER
// ================================================================

(function heroTitleShimmer() {
    const eventTitle = document.querySelector('.event-title');
    if (!eventTitle) return;

    const words = eventTitle.querySelectorAll('.event-title-word');
    words.forEach(word => {
        const text = word.textContent;
        word.innerHTML = [...text].map((ch, i) =>
            `<span class="et-char" style="display:inline-block;animation:charGlow 3s ease-in-out ${(i * 0.12).toFixed(2)}s infinite alternate;">${ch}</span>`
        ).join('');
    });

    if (!document.getElementById('charGlowStyle')) {
        const style = document.createElement('style');
        style.id = 'charGlowStyle';
        style.textContent = `
            @keyframes charGlow {
                0%   { text-shadow: none; }
                100% { text-shadow: 0 0 18px rgba(220,185,90,0.6), 0 0 35px rgba(200,168,85,0.25); }
            }
        `;
        document.head.appendChild(style);
    }
})();


// ================================================================
//  HERO ENHANCEMENT — MOUSE PARALLAX ON CREST
// ================================================================

(function heroCrestParallax() {
    const hero = document.querySelector('.hero');
    const crest = document.querySelector('.hero-crest');
    if (!hero || !crest) return;

    hero.addEventListener('mousemove', (e) => {
        const rect = hero.getBoundingClientRect();
        const cx = rect.width  / 2;
        const cy = rect.height / 2;
        const dx = (e.clientX - rect.left - cx) / cx;
        const dy = (e.clientY - rect.top  - cy) / cy;
        const moveX = dx * 18;
        const moveY = dy * 14;
        crest.style.transform = `translate(calc(-50% + ${moveX}px), calc(-50% + ${moveY}px)) scale(1)`;
        crest.style.transition = 'transform 0.6s cubic-bezier(0.22,1,0.36,1)';
    });

    hero.addEventListener('mouseleave', () => {
        crest.style.transform = 'translate(-50%, -50%) scale(1)';
        crest.style.transition = 'transform 1s cubic-bezier(0.22,1,0.36,1)';
    });
})();