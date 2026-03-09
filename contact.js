/* ═══════════════════════════════════════════════════════════
   CONTACT PAGE JAVASCRIPT — contact.js
   SIMATS MUN 2026 | Enhanced Edition
   Sections: Hero · General Info · Venue · Social · Closing
═══════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

    /* ─────────────────────────────────────────
       1. HERO PARTICLE SYSTEM
    ───────────────────────────────────────── */
    const particleContainer = document.getElementById('particles');
    if (particleContainer) {
        const NUM_PARTICLES = 38;
        for (let i = 0; i < NUM_PARTICLES; i++) {
            const p = document.createElement('div');
            p.className = 'contact-hero-particle';
            const size = Math.random() * 3.5 + 1;
            const isDiamond = Math.random() > 0.65;
            p.style.cssText = `
                left: ${Math.random() * 100}%;
                width: ${size}px;
                height: ${size}px;
                animation-duration: ${Math.random() * 14 + 8}s;
                animation-delay: ${Math.random() * 12}s;
                opacity: 0;
                ${isDiamond ? 'border-radius: 0; transform: rotate(45deg);' : ''}
            `;
            particleContainer.appendChild(p);
        }
    }

    /* ─────────────────────────────────────────
       2. HERO PARALLAX — subtle depth on bg
    ───────────────────────────────────────── */
    const heroBg = document.querySelector('.contact-hero-bg');
    const heroOverlay = document.querySelector('.contact-hero-overlay');
    if (heroBg) {
        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY;
            heroBg.style.transform = `translateY(${scrolled * 0.25}px)`;
            if (heroOverlay) heroOverlay.style.transform = `translateY(${scrolled * 0.15}px)`;
        }, { passive: true });
    }

    /* ─────────────────────────────────────────
       3. HERO STAT HOVER LIFT
    ───────────────────────────────────────── */
    document.querySelectorAll('.hero-stat').forEach(stat => {
        const num = stat.querySelector('.hero-stat-num');
        if (!num) return;
        stat.addEventListener('mouseenter', () => {
            num.style.transform  = 'scale(1.1)';
            num.style.transition = 'transform 0.3s ease';
        });
        stat.addEventListener('mouseleave', () => {
            num.style.transform = 'scale(1)';
        });
    });

    /* ─────────────────────────────────────────
       4. UNIVERSAL SCROLL REVEAL — IntersectionObserver
    ───────────────────────────────────────── */
    const injectRevealCSS = () => {
        const s = document.createElement('style');
        s.textContent = `.sr-hidden { opacity: 0; transform: translateY(28px); transition: opacity 0.7s ease, transform 0.7s ease; } .sr-visible { opacity: 1 !important; transform: translateY(0) !important; }`;
        document.head.appendChild(s);
    };
    injectRevealCSS();

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Respect any existing delay on the element
                const delay = entry.target.dataset.revealDelay || 0;
                setTimeout(() => entry.target.classList.add('sr-visible'), Number(delay));
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    const revealTargets = document.querySelectorAll(
        '.section-header, .section-intro-note, .social-intro, ' +
        '.venue-details, .venue-map-placeholder, .closing-content'
    );

    revealTargets.forEach(el => {
        el.classList.add('sr-hidden');
        revealObserver.observe(el);
    });

    /* ─────────────────────────────────────────
       5. STAGGERED GRID ENTRY (info tiles, social cards, etc.)
    ───────────────────────────────────────── */
    function staggerGrid(gridSelector, staggerMs = 90, yOffset = 22) {
        document.querySelectorAll(gridSelector).forEach(grid => {
            const items = Array.from(grid.children);
            items.forEach((item, i) => {
                item.style.opacity   = '0';
                item.style.transform = `translateY(${yOffset}px) scale(0.98)`;
                item.style.transition = `opacity 0.6s ease ${i * staggerMs}ms, transform 0.6s ease ${i * staggerMs}ms`;
            });

            const obs = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        Array.from(entry.target.children).forEach(item => {
                            item.style.opacity   = '1';
                            item.style.transform = 'translateY(0) scale(1)';
                        });
                        obs.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.08 });

            obs.observe(grid);
        });
    }

    staggerGrid('.general-info-grid', 110);
    staggerGrid('.social-platforms',  140);

    /* ─────────────────────────────────────────
       6. QUICK CONTACT BANNER — slide-up entry
    ───────────────────────────────────────── */
    const qcBanner = document.querySelector('.quick-contact-banner');
    if (qcBanner) {
        qcBanner.style.opacity   = '0';
        qcBanner.style.transform = 'translateY(24px)';
        qcBanner.style.transition = 'opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s';
        const bannerObs = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    qcBanner.style.opacity   = '1';
                    qcBanner.style.transform = 'translateY(0)';
                    bannerObs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });
        bannerObs.observe(qcBanner);
    }

    /* ─────────────────────────────────────────
       7. RESPONSE STRIP — fade in
    ───────────────────────────────────────── */
    const rs = document.querySelector('.response-strip');
    if (rs) {
        rs.style.opacity   = '0';
        rs.style.transform = 'translateY(20px)';
        rs.style.transition = 'opacity 0.7s ease 0.15s, transform 0.7s ease 0.15s';
        const rsObs = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    rs.style.opacity   = '1';
                    rs.style.transform = 'translateY(0)';
                    rsObs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        rsObs.observe(rs);
    }

    /* ─────────────────────────────────────────
       8. VENUE DETAILS — stagger children
    ───────────────────────────────────────── */
    const venueDetails = document.querySelector('.venue-details');
    if (venueDetails) {
        const children = [
            venueDetails.querySelector('.venue-crest'),
            venueDetails.querySelector('.venue-name'),
            venueDetails.querySelector('.venue-address'),
            venueDetails.querySelector('.venue-desc-block'),
            venueDetails.querySelector('.venue-notes'),
            venueDetails.querySelector('.venue-directions-btn'),
        ].filter(Boolean);

        children.forEach((el, i) => {
            el.style.opacity   = '0';
            el.style.transform = 'translateX(-18px)';
            el.style.transition = `opacity 0.6s ease ${i * 100}ms, transform 0.6s ease ${i * 100}ms`;
        });

        const venueObs = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    children.forEach(el => {
                        el.style.opacity   = '1';
                        el.style.transform = 'translateX(0)';
                    });
                    venueObs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12 });
        venueObs.observe(venueDetails);
    }

    /* ─────────────────────────────────────────
       9. MAP FRAME — scale in
    ───────────────────────────────────────── */
    const mapFrame = document.querySelector('.venue-map-placeholder');
    if (mapFrame) {
        mapFrame.style.opacity   = '0';
        mapFrame.style.transform = 'scale(0.95) translateY(20px)';
        mapFrame.style.transition = 'opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s';
        const mapObs = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    mapFrame.style.opacity   = '1';
                    mapFrame.style.transform = 'scale(1) translateY(0)';
                    mapObs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        mapObs.observe(mapFrame);
    }

    /* ─────────────────────────────────────────
       10. INFO TILE — icon rotate on hover
    ───────────────────────────────────────── */
    document.querySelectorAll('.info-tile').forEach(tile => {
        tile.addEventListener('mouseenter', () => {
            const icon = tile.querySelector('.info-tile-icon');
            if (icon) icon.style.transform = 'scale(1.12) rotate(-8deg)';
        });
        tile.addEventListener('mouseleave', () => {
            const icon = tile.querySelector('.info-tile-icon');
            if (icon) icon.style.transform = '';
        });
    });

    /* ─────────────────────────────────────────
       11. CLOSING CONTENT — stagger children
    ───────────────────────────────────────── */
    const closingContent = document.querySelector('.closing-content');
    if (closingContent) {
        const cItems = Array.from(closingContent.children);
        cItems.forEach((el, i) => {
            el.style.opacity   = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = `opacity 0.65s ease ${i * 120}ms, transform 0.65s ease ${i * 120}ms`;
        });

        const closingObs = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    cItems.forEach(el => {
                        el.style.opacity   = '1';
                        el.style.transform = 'translateY(0)';
                    });
                    closingObs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });
        closingObs.observe(closingContent);
    }

    /* ─────────────────────────────────────────
       12. BACK TO TOP
    ───────────────────────────────────────── */
    const backBtn = document.getElementById('backToTop');
    if (backBtn) {
        backBtn.style.opacity     = '0';
        backBtn.style.transition  = 'opacity 0.3s ease';
        backBtn.style.pointerEvents = 'none';

        window.addEventListener('scroll', () => {
            const show = window.scrollY > 450;
            backBtn.style.opacity     = show ? '1' : '0';
            backBtn.style.pointerEvents = show ? 'auto' : 'none';
        }, { passive: true });

        backBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    /* ─────────────────────────────────────────
       13. MOBILE NAV TOGGLE
    ───────────────────────────────────────── */
    const navToggle = document.getElementById('nav-toggle');
    const navMenu   = document.getElementById('nav-menu');
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const spans = navToggle.querySelectorAll('span');
            const isOpen = navMenu.classList.contains('active');
            if (isOpen) {
                spans[0].style.transform = 'translateY(6px) rotate(45deg)';
                spans[1].style.opacity   = '0';
                spans[2].style.transform = 'translateY(-6px) rotate(-45deg)';
            } else {
                spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
            }
        });
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                navToggle.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
            });
        });
    }

    /* ─────────────────────────────────────────
       14. PAGE LOAD FADE-IN
    ───────────────────────────────────────── */
    document.body.style.opacity   = '0';
    document.body.style.transition = 'opacity 0.55s ease';
    requestAnimationFrame(() => {
        document.body.style.opacity = '1';
    });

    /* ─────────────────────────────────────────
       15. MOUSE-MOVE GLOW on cards (mouse follow)
    ───────────────────────────────────────── */
    document.querySelectorAll('.info-tile, .social-platform-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width)  * 100;
            const y = ((e.clientY - rect.top)  / rect.height) * 100;
            card.style.setProperty('--mx', `${x}%`);
            card.style.setProperty('--my', `${y}%`);
        });
    });

    console.log('SIMATS MUN 2026 — Contact page initialised ✔ Enhanced Edition');
});