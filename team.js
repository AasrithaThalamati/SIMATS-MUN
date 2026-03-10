/* ═══════════════════════════════════════════════════
   SIMATS MUN 2026 — team.js
   Scroll animations · Particle hero · Nav toggle
   Card stagger · Image fallback handling
   ═══════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

    /* ── 1. PAGE FADE IN ── */
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    requestAnimationFrame(() => { document.body.style.opacity = '1'; });

    /* ── 2. NAVBAR MOBILE TOGGLE ── */
    const navToggle = document.getElementById('nav-toggle');
    const navMenu   = document.getElementById('nav-menu');
    const navOverlay = document.getElementById('nav-overlay');

    navToggle?.addEventListener('click', () => {
        if (navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            if (navOverlay) navOverlay.classList.remove('active');
            document.body.style.overflow = '';
        } else {
            navMenu.classList.add('active');
            navToggle.classList.add('active');
            if (navOverlay) navOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    });

    navMenu?.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            if (navOverlay) navOverlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Close on overlay click
    if (navOverlay) {
        navOverlay.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            navOverlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            if (navOverlay) navOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    /* ── 3. HERO PARTICLES ── */
    const particleContainer = document.getElementById('heroParticles');
    if (particleContainer) {
        for (let i = 0; i < 30; i++) {
            const p = document.createElement('div');
            p.className = 'hero-particle';
            p.style.cssText = `
                left:    ${Math.random() * 100}%;
                top:     ${30 + Math.random() * 70}%;
                --dur:   ${6 + Math.random() * 10}s;
                --delay: ${Math.random() * 8}s;
                width:   ${2 + Math.random() * 3}px;
                height:  ${2 + Math.random() * 3}px;
            `;
            particleContainer.appendChild(p);
        }
    }

    /* ── 4. IMAGE FALLBACK — show placeholder initials when img fails ── */
    document.querySelectorAll('.member-img').forEach(img => {
        img.addEventListener('error', () => {
            img.closest('.member-img-frame')?.classList.add('img-fallback');
        });
        // trigger check for already-broken images
        if (img.complete && img.naturalWidth === 0) {
            img.closest('.member-img-frame')?.classList.add('img-fallback');
        }
    });

    /* ── 5. INTERSECTION OBSERVER — section [data-animate] ── */
    const animateEls = document.querySelectorAll('[data-animate]');
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                sectionObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    animateEls.forEach(el => sectionObserver.observe(el));

    /* ── 6. STAGGERED CARD ENTRANCE — per grid ── */
    const grids = document.querySelectorAll('.team-grid');

    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const cards = entry.target.querySelectorAll('.member-card');
                cards.forEach((card, i) => {
                    setTimeout(() => {
                        card.style.opacity   = '1';
                        card.style.transform = 'translateY(0) scale(1)';
                    }, i * 90);
                });
                cardObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.08 });

    grids.forEach(grid => {
        const cards = grid.querySelectorAll('.member-card');
        cards.forEach(card => {
            card.style.opacity    = '0';
            card.style.transform  = 'translateY(30px) scale(0.97)';
            card.style.transition = 'opacity 0.55s ease, transform 0.55s ease, border-color 0.45s cubic-bezier(0.4,0,0.2,1), box-shadow 0.45s ease';
        });
        cardObserver.observe(grid);
    });

    /* ── 7. MOUSE PARALLAX SHINE on cards ── */
    document.querySelectorAll('.member-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width  - 0.5) * 12;
            const y = ((e.clientY - rect.top)  / rect.height - 0.5) * 12;
            card.style.setProperty('--rx', `${y}deg`);
            card.style.setProperty('--ry', `${x}deg`);
        });
        card.addEventListener('mouseleave', () => {
            card.style.setProperty('--rx', '0deg');
            card.style.setProperty('--ry', '0deg');
        });
    });

    /* ── 8. ACTIVE NAV ON SCROLL ── */
    const sections  = document.querySelectorAll('section[id]');
    const navLinks  = document.querySelectorAll('.nav-menu a:not(.register-nav-btn)');

    const highlightNav = () => {
        let current = '';
        sections.forEach(sec => {
            if (window.scrollY >= sec.offsetTop - 130) current = sec.id;
        });
        navLinks.forEach(link => {
            link.classList.remove('nav-active');
            if (link.getAttribute('href').includes(current)) link.classList.add('nav-active');
        });
    };

    window.addEventListener('scroll', highlightNav, { passive: true });

    /* ── 9. SMOOTH SCROLL for anchor links ── */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    /* ── 10. INTRO ORNAMENT GLOW PULSE ── */
    const ornaments = document.querySelectorAll('.intro-ornament-top, .intro-ornament-bottom');
    ornaments.forEach((el, i) => {
        el.style.animation = `gemPulse ${3 + i * 0.5}s ease-in-out infinite`;
    });

    /* ── 11. SECTION LABEL FADE STAGGER ── */
    document.querySelectorAll('.section-label').forEach((label, i) => {
        label.style.opacity   = '0';
        label.style.transition = `opacity 0.6s ease ${i * 0.1}s`;

        const labelObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    labelObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        labelObserver.observe(label);
    });

    /* ── 12. MEMBER LINK TOOLTIPS ── */
    document.querySelectorAll('.member-link').forEach(link => {
        const label = link.getAttribute('aria-label') || '';
        if (!label) return;

        link.setAttribute('title', label);

        link.addEventListener('mouseenter', () => {
            const tip = document.createElement('div');
            tip.className = 'link-tooltip';
            tip.textContent = label;
            tip.style.cssText = `
                position:absolute;
                bottom:calc(100% + 6px);
                left:50%;
                transform:translateX(-50%);
                background:rgba(26,5,8,0.92);
                color:#D4AF37;
                font-family:'Cormorant Garamond',serif;
                font-size:0.75rem;
                padding:4px 10px;
                border-radius:6px;
                border:1px solid rgba(212,175,55,0.4);
                white-space:nowrap;
                pointer-events:none;
                z-index:10;
                opacity:0;
                transition:opacity 0.2s ease;
            `;
            link.style.position = 'relative';
            link.appendChild(tip);
            requestAnimationFrame(() => { tip.style.opacity = '1'; });
        });

        link.addEventListener('mouseleave', () => {
            link.querySelectorAll('.link-tooltip').forEach(t => t.remove());
        });
    });

    /* ── 13. CLOSING SECTION REVEAL ── */
    const closingContent = document.querySelector('.closing-content');
    if (closingContent) {
        const closingObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity   = '1';
                    entry.target.style.transform = 'translateY(0)';
                    closingObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        closingContent.style.opacity   = '0';
        closingContent.style.transform = 'translateY(35px)';
        closingContent.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        closingObserver.observe(closingContent);
    }

    console.log('SIMATS MUN 2026 — Team page initialised ✔');
});