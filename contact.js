/* ═══════════════════════════════════════════════════════════
   CONTACT PAGE JAVASCRIPT — contact.js
   SIMATS MUN 2026 | Enhanced Edition
═══════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

    /* ─────────────────────────────────────────
       PAGE FADE IN
    ───────────────────────────────────────── */
    document.body.style.opacity   = '0';
    document.body.style.transition = 'opacity 0.55s ease';
    requestAnimationFrame(() => { document.body.style.opacity = '1'; });

    /* ─────────────────────────────────────────
       E1. CUSTOM CURSOR
    ───────────────────────────────────────── */
    const cursorDot  = document.getElementById('cursorDot');
    const cursorRing = document.getElementById('cursorRing');

    if (cursorDot && cursorRing && window.matchMedia('(hover: hover)').matches) {
        let dotX = 0, dotY = 0, ringX = 0, ringY = 0;
        document.addEventListener('mousemove', (e) => { dotX = e.clientX; dotY = e.clientY; });
        const animateCursor = () => {
            cursorDot.style.left = dotX + 'px';
            cursorDot.style.top  = dotY + 'px';
            ringX += (dotX - ringX) * 0.12;
            ringY += (dotY - ringY) * 0.12;
            cursorRing.style.left = ringX + 'px';
            cursorRing.style.top  = ringY + 'px';
            requestAnimationFrame(animateCursor);
        };
        animateCursor();

        const hoverEls = document.querySelectorAll('a, button, .info-tile, .social-platform-card, .hero-action-btn, .qcb-btn, .tile-link-btn');
        hoverEls.forEach(el => {
            el.addEventListener('mouseenter', () => cursorRing.classList.add('hovering'));
            el.addEventListener('mouseleave', () => cursorRing.classList.remove('hovering'));
        });
        document.addEventListener('mouseleave', () => { cursorDot.style.opacity = '0'; cursorRing.style.opacity = '0'; });
        document.addEventListener('mouseenter', () => { cursorDot.style.opacity = '1'; cursorRing.style.opacity = '1'; });
    }

    /* ─────────────────────────────────────────
       E2. NAV PROGRESS BAR
    ───────────────────────────────────────── */
    const navProgress = document.getElementById('navProgress');
    if (navProgress) {
        window.addEventListener('scroll', () => {
            const prog = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight) * 100;
            navProgress.style.width = Math.min(prog, 100) + '%';
        }, { passive: true });
    }

    /* ─────────────────────────────────────────
       E3. GOLD RIBBON MARQUEE
    ───────────────────────────────────────── */
    const ribbon = document.getElementById('goldRibbon');
    if (ribbon) {
        ribbon.style.overflow = 'hidden';
        ribbon.style.whiteSpace = 'nowrap';
        ribbon.style.display = 'block';
        const original = ribbon.innerHTML;
        ribbon.innerHTML = original + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + original;
        let pos = 0;
        const totalWidth = ribbon.scrollWidth / 2;
        const scrollRibbon = () => {
            pos += 0.6;
            if (pos >= totalWidth) pos = 0;
            ribbon.style.transform = `translateX(-${pos}px)`;
            requestAnimationFrame(scrollRibbon);
        };
        requestAnimationFrame(scrollRibbon);
    }

    /* ─────────────────────────────────────────
       E4. HERO PARTICLE SYSTEM
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
       E5. HERO PARALLAX
    ───────────────────────────────────────── */
    const heroBg = document.querySelector('.contact-hero-bg');
    const heroOverlay = document.querySelector('.contact-hero-overlay');
    if (heroBg) {
        window.addEventListener('scroll', () => {
            const s = window.scrollY;
            heroBg.style.transform = `translateY(${s * 0.25}px)`;
            if (heroOverlay) heroOverlay.style.transform = `translateY(${s * 0.15}px)`;
        }, { passive: true });
    }

    /* ─────────────────────────────────────────
       E6. HERO STAT HOVER LIFT
    ───────────────────────────────────────── */
    document.querySelectorAll('.hero-stat').forEach(stat => {
        const num = stat.querySelector('.hero-stat-num');
        if (!num) return;
        stat.addEventListener('mouseenter', () => {
            num.style.transform  = 'scale(1.12)';
            num.style.transition = 'transform 0.3s ease';
        });
        stat.addEventListener('mouseleave', () => { num.style.transform = 'scale(1)'; });
    });

    /* ─────────────────────────────────────────
       E7. ORNATE DIVIDER REVEAL
    ───────────────────────────────────────── */
    const dividers = document.querySelectorAll('.ornate-divider');
    const dividerObs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                dividerObs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.4 });
    dividers.forEach(d => dividerObs.observe(d));

    /* ─────────────────────────────────────────
       E8. SCROLL REVEAL — universal
    ───────────────────────────────────────── */
    const style = document.createElement('style');
    style.textContent = `.sr-hidden { opacity: 0; transform: translateY(28px); transition: opacity 0.7s ease, transform 0.7s ease; } .sr-visible { opacity: 1 !important; transform: translateY(0) !important; }`;
    document.head.appendChild(style);

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.dataset.revealDelay || 0;
                setTimeout(() => entry.target.classList.add('sr-visible'), Number(delay));
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.section-header, .section-intro-note, .social-intro, .venue-details, .venue-map-placeholder, .closing-content').forEach(el => {
        el.classList.add('sr-hidden');
        revealObserver.observe(el);
    });

    /* ─────────────────────────────────────────
       E9. STAGGERED GRID ENTRY
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
       E10. QUICK CONTACT BANNER — slide-up
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
       E11. RESPONSE STRIP — fade in
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
       E12. VENUE DETAILS — stagger children
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
                    children.forEach(el => { el.style.opacity = '1'; el.style.transform = 'translateX(0)'; });
                    venueObs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12 });
        venueObs.observe(venueDetails);
    }

    /* ─────────────────────────────────────────
       E13. MAP FRAME — scale in
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
       E14. INFO TILE — 3D tilt on mousemove
    ───────────────────────────────────────── */
    document.querySelectorAll('.info-tile').forEach(tile => {
        tile.addEventListener('mousemove', (e) => {
            const rect = tile.getBoundingClientRect();
            const dx = (e.clientX - rect.left - rect.width  / 2) / (rect.width  / 2);
            const dy = (e.clientY - rect.top  - rect.height / 2) / (rect.height / 2);
            tile.style.transform = `perspective(700px) rotateX(${-dy * 5}deg) rotateY(${dx * 5}deg) translateY(-9px)`;
            const x = ((e.clientX - rect.left) / rect.width)  * 100;
            const y = ((e.clientY - rect.top)  / rect.height) * 100;
            tile.style.setProperty('--mx', `${x}%`);
            tile.style.setProperty('--my', `${y}%`);
        });
        tile.addEventListener('mouseleave', () => { tile.style.transform = ''; });
    });

    /* ─────────────────────────────────────────
       E15. SOCIAL CARD — mouse-follow glow
    ───────────────────────────────────────── */
    document.querySelectorAll('.social-platform-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width)  * 100;
            const y = ((e.clientY - rect.top)  / rect.height) * 100;
            card.style.setProperty('--mx', `${x}%`);
            card.style.setProperty('--my', `${y}%`);
        });
    });

    /* ─────────────────────────────────────────
       E16. CLOSING SPARKS
    ───────────────────────────────────────── */
    const sparksContainer = document.getElementById('closingSparks');
    if (sparksContainer) {
        for (let i = 0; i < 22; i++) {
            const s = document.createElement('div');
            s.className = 'closing-spark';
            const drift = (Math.random() - 0.5) * 80;
            s.style.cssText = `
                left: ${5 + Math.random() * 90}%;
                bottom: ${Math.random() * 40}%;
                --dur: ${5 + Math.random() * 8}s;
                --delay: ${Math.random() * 6}s;
                --drift: ${drift}px;
                width: ${1 + Math.random() * 3}px;
                height: ${1 + Math.random() * 3}px;
            `;
            sparksContainer.appendChild(s);
        }
    }

    /* ─────────────────────────────────────────
       E17. CLOSING CONTENT — stagger children
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
                    cItems.forEach(el => { el.style.opacity = '1'; el.style.transform = 'translateY(0)'; });
                    closingObs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });
        closingObs.observe(closingContent);
    }

    /* ─────────────────────────────────────────
       E18. BACK TO TOP
    ───────────────────────────────────────── */
    const backBtn = document.getElementById('backToTop');
    if (backBtn) {
        backBtn.style.opacity      = '0';
        backBtn.style.transition   = 'opacity 0.3s ease, background 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease';
        backBtn.style.pointerEvents = 'none';
        window.addEventListener('scroll', () => {
            const show = window.scrollY > 450;
            backBtn.style.opacity      = show ? '1' : '0';
            backBtn.style.pointerEvents = show ? 'auto' : 'none';
        }, { passive: true });
        backBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    }

    /* ─────────────────────────────────────────
       E19. MOBILE NAV TOGGLE
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
       E20. VENUE CREST hover spin
    ───────────────────────────────────────── */
    const venueCrest = document.querySelector('.venue-crest');
    if (venueCrest) {
        venueCrest.style.transition = 'transform 0.4s ease, box-shadow 0.4s ease';
        venueCrest.addEventListener('mouseenter', () => {
            venueCrest.style.transform = 'scale(1.07) rotate(-6deg)';
            venueCrest.style.boxShadow = '0 12px 36px rgba(0,0,0,0.4), 0 0 0 2px rgba(212,175,55,0.4)';
        });
        venueCrest.addEventListener('mouseleave', () => {
            venueCrest.style.transform = '';
            venueCrest.style.boxShadow = '';
        });
    }

    /* ─────────────────────────────────────────
       E21. MAP FRAME — subtle tilt on hover
    ───────────────────────────────────────── */
    const mapFrameEl = document.querySelector('.map-frame');
    if (mapFrameEl) {
        mapFrameEl.addEventListener('mousemove', (e) => {
            const rect = mapFrameEl.getBoundingClientRect();
            const dx = (e.clientX - rect.left - rect.width  / 2) / (rect.width  / 2);
            const dy = (e.clientY - rect.top  - rect.height / 2) / (rect.height / 2);
            mapFrameEl.style.transform = `perspective(800px) rotateX(${-dy * 4}deg) rotateY(${dx * 4}deg)`;
        });
        mapFrameEl.addEventListener('mouseleave', () => { mapFrameEl.style.transform = ''; });
    }

    console.log('SIMATS MUN 2026 — Contact page initialised ✔ Enhanced Edition');
});