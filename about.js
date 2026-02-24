/* ═══════════════════════════════════════════════════
   SIMATS MUN 2026 — about.js
   Scroll animations · Particle hero · Nav toggle
   ═══════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

    /* ── 1. NAVBAR MOBILE TOGGLE ── */
    const navToggle = document.getElementById('navToggle');
    const navMenu   = document.getElementById('navMenu');

    navToggle?.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        // animate hamburger → X
        const spans = navToggle.querySelectorAll('span');
        if (navMenu.classList.contains('active')) {
            spans[0].style.transform = 'translateY(6px) rotate(45deg)';
            spans[1].style.opacity   = '0';
            spans[2].style.transform = 'translateY(-6px) rotate(-45deg)';
        } else {
            spans[0].style.transform = '';
            spans[1].style.opacity   = '';
            spans[2].style.transform = '';
        }
    });

    // close menu when a link is clicked
    navMenu?.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            const spans = navToggle?.querySelectorAll('span') || [];
            spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
        });
    });

    /* ── 2. HERO PARTICLES ── */
    const particleContainer = document.getElementById('heroParticles');
    if (particleContainer) {
        const count = 28;
        for (let i = 0; i < count; i++) {
            const p = document.createElement('div');
            p.className = 'hero-particle';
            p.style.cssText = `
                left:   ${Math.random() * 100}%;
                top:    ${40 + Math.random() * 60}%;
                --dur:  ${6 + Math.random() * 10}s;
                --delay:${Math.random() * 8}s;
                width:  ${2 + Math.random() * 3}px;
                height: ${2 + Math.random() * 3}px;
                opacity: 0;
            `;
            particleContainer.appendChild(p);
        }
    }

    /* ── 3. INTERSECTION OBSERVER — section animations ── */
    const animateEls = document.querySelectorAll('[data-animate]');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

    animateEls.forEach(el => observer.observe(el));

    /* ── 4. STAGGERED VALUE PILLS ── */
    const pills = document.querySelectorAll('.value-pill');

    const pillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = parseInt(entry.target.dataset.delay || 0);
                setTimeout(() => {
                    entry.target.style.transition = `opacity 0.6s ease ${delay * 0.15}s, transform 0.6s ease ${delay * 0.15}s`;
                    entry.target.classList.add('animated');
                }, delay * 150);
                pillObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    pills.forEach(pill => pillObserver.observe(pill));

    /* ── 5. PROCESS STEP STAGGER ── */
    const steps = document.querySelectorAll('.process-step');

    const stepObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // find step index among siblings
                const idx = Array.from(steps).indexOf(entry.target);
                setTimeout(() => {
                    entry.target.querySelector('.step-content').style.opacity   = '1';
                    entry.target.querySelector('.step-content').style.transform = 'translateX(0)';
                    entry.target.querySelector('.step-number').style.opacity    = '1';
                    entry.target.querySelector('.step-number').style.transform  = 'scale(1)';
                }, idx * 100);
                stepObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    steps.forEach(step => {
        const content = step.querySelector('.step-content');
        const number  = step.querySelector('.step-number');
        if (content) { content.style.opacity = '0'; content.style.transform = 'translateX(-20px)'; content.style.transition = 'opacity 0.55s ease, transform 0.55s ease'; }
        if (number)  { number.style.opacity  = '0'; number.style.transform  = 'scale(0.7)';        number.style.transition  = 'opacity 0.4s ease, transform 0.4s ease'; }
        stepObserver.observe(step);
    });

    /* ── 6. TIMELINE NODE STAGGER ── */
    const tlNodes = document.querySelectorAll('.tl-node');

    const tlObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const idx = Array.from(tlNodes).indexOf(entry.target);
                setTimeout(() => {
                    entry.target.style.opacity   = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, idx * 120);
                tlObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    tlNodes.forEach(node => {
        node.style.opacity   = '0';
        node.style.transform = 'translateY(30px)';
        node.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        tlObserver.observe(node);
    });

    /* ── 7. RULE CARDS STAGGER ── */
    const ruleCards = document.querySelectorAll('.rule-card');

    const ruleObserver = new IntersectionObserver((entries) => {
        if (entries.some(e => e.isIntersecting)) {
            ruleCards.forEach((card, i) => {
                setTimeout(() => {
                    card.style.opacity   = '1';
                    card.style.transform = 'translateY(0)';
                }, i * 100);
            });
            entries.forEach(e => ruleObserver.unobserve(e.target));
        }
    }, { threshold: 0.1 });

    ruleCards.forEach(card => {
        card.style.opacity   = '0';
        card.style.transform = 'translateY(24px)';
        card.style.transition = 'opacity 0.55s ease, transform 0.55s ease';
        ruleObserver.observe(card);
    });

    /* ── 8. ELIGIBILITY CARDS STAGGER ── */
    const eligCards = document.querySelectorAll('.elig-card');

    const eligObserver = new IntersectionObserver((entries) => {
        if (entries.some(e => e.isIntersecting)) {
            eligCards.forEach((card, i) => {
                setTimeout(() => {
                    card.style.opacity   = '1';
                    card.style.transform = 'translateY(0) scale(1)';
                }, i * 150);
            });
            entries.forEach(e => eligObserver.unobserve(e.target));
        }
    }, { threshold: 0.15 });

    eligCards.forEach(card => {
        card.style.opacity   = '0';
        card.style.transform = 'translateY(30px) scale(0.97)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        eligObserver.observe(card);
    });

    /* ── 9. SECRETARIAT ROLES STAGGER ── */
    const secRoles = document.querySelectorAll('.sec-role');

    const secObserver = new IntersectionObserver((entries) => {
        if (entries.some(e => e.isIntersecting)) {
            secRoles.forEach((role, i) => {
                setTimeout(() => {
                    role.style.opacity   = '1';
                    role.style.transform = 'translateY(0)';
                }, i * 100);
            });
            entries.forEach(e => secObserver.unobserve(e.target));
        }
    }, { threshold: 0.1 });

    secRoles.forEach(role => {
        role.style.opacity   = '0';
        role.style.transform = 'translateY(24px)';
        role.style.transition = 'opacity 0.55s ease, transform 0.55s ease';
        secObserver.observe(role);
    });

    /* ── 10. SMOOTH SCROLL for anchor links ── */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    /* ── 11. NAVBAR HIGHLIGHT ON SCROLL ── */
    const sections = document.querySelectorAll('section[id]');
    const navLinks  = document.querySelectorAll('.nav-menu a:not(.register-nav-btn)');

    const highlightNav = () => {
        let current = '';
        sections.forEach(sec => {
            if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
        });
        navLinks.forEach(link => {
            link.classList.remove('nav-active');
            if (link.getAttribute('href').includes(current)) link.classList.add('nav-active');
        });
    };

    window.addEventListener('scroll', highlightNav, { passive: true });

    /* ── 12. GOLD SHIMMER on VM Cards hover ── */
    document.querySelectorAll('.vm-card, .rule-card, .elig-card, .sec-role').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect   = card.getBoundingClientRect();
            const x      = ((e.clientX - rect.left) / rect.width)  * 100;
            const y      = ((e.clientY - rect.top)  / rect.height) * 100;
            card.style.setProperty('--mx', `${x}%`);
            card.style.setProperty('--my', `${y}%`);
        });
    });

    /* ── 13. PAGE LOAD FADE-IN ── */
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    requestAnimationFrame(() => {
        document.body.style.opacity = '1';
    });

    console.log('SIMATS MUN 2026 — About page initialised ✔');
});