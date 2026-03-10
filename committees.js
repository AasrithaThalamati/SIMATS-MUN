/* ═══════════════════════════════════════════════════
   SIMATS MUN 2026 — committees.js  (Enhanced Edition)
   Scroll animations · Particles · Nav · Committee FX
   ═══════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

    /* ── 1. PAGE FADE IN ── */
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.45s ease';
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
        for (let i = 0; i < 28; i++) {
            const p = document.createElement('div');
            p.className = 'hero-particle';
            p.style.cssText = `
                left:    ${Math.random() * 100}%;
                top:     ${30 + Math.random() * 70}%;
                --dur:   ${6 + Math.random() * 9}s;
                --delay: ${Math.random() * 7}s;
                width:   ${2 + Math.random() * 2.5}px;
                height:  ${2 + Math.random() * 2.5}px;
            `;
            particleContainer.appendChild(p);
        }
    }

    /* ── 4. [data-animate] INTERSECTION OBSERVER ── */
    const baseObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                baseObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('[data-animate]').forEach(el => baseObserver.observe(el));

    /* ── 5. COMMITTEE BLOCK SLIDE-IN ── */
    const committeeBlocks = document.querySelectorAll('.committee-block');

    const blockObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const left  = entry.target.querySelector('.committee-left');
                const right = entry.target.querySelector('.committee-right');
                if (left)  setTimeout(() => { left.style.opacity  = '1'; left.style.transform  = 'translateX(0)'; }, 80);
                if (right) setTimeout(() => { right.style.opacity = '1'; right.style.transform = 'translateX(0)'; }, 220);
                blockObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    committeeBlocks.forEach(block => {
        const isReversed = block.classList.contains('committee-block-reverse');
        const left  = block.querySelector('.committee-left');
        const right = block.querySelector('.committee-right');
        if (left) {
            left.style.opacity   = '0';
            left.style.transform = isReversed ? 'translateX(35px)' : 'translateX(-35px)';
            left.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        }
        if (right) {
            right.style.opacity   = '0';
            right.style.transform = isReversed ? 'translateX(-35px)' : 'translateX(35px)';
            right.style.transition = 'opacity 0.6s ease 0.14s, transform 0.6s ease 0.14s';
        }
        blockObserver.observe(block);
    });

    /* ── 6. STRUCTURE CARDS STAGGER ── */
    const structureCards = document.querySelectorAll('.structure-card');
    let structureTriggered = false;

    const scObserver = new IntersectionObserver((entries) => {
        if (!structureTriggered && entries.some(e => e.isIntersecting)) {
            structureTriggered = true;
            structureCards.forEach((card, i) => {
                setTimeout(() => {
                    card.style.opacity   = '1';
                    card.style.transform = 'translateY(0)';
                }, i * 90);
            });
        }
    }, { threshold: 0.1 });

    structureCards.forEach(card => {
        card.style.opacity   = '0';
        card.style.transform = 'translateY(22px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease, box-shadow 0.35s ease, border-color 0.35s ease';
        scObserver.observe(card);
    });

    /* ── 7. ROP ITEMS STAGGER ── */
    const ropItems = document.querySelectorAll('.rop-item');
    let ropTriggered = false;

    const ropObserver = new IntersectionObserver((entries) => {
        if (!ropTriggered && entries.some(e => e.isIntersecting)) {
            ropTriggered = true;
            ropItems.forEach((item, i) => {
                setTimeout(() => {
                    item.style.opacity   = '1';
                    item.style.transform = 'translateY(0)';
                }, i * 60);
            });
        }
    }, { threshold: 0.1 });

    ropItems.forEach(item => {
        item.style.opacity   = '0';
        item.style.transform = 'translateY(16px)';
        item.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
        ropObserver.observe(item);
    });

    /* ── 8. STATS COUNT-UP ── */
    const statNums = document.querySelectorAll('.stat-num');

    const countObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el     = entry.target;
                const raw    = el.textContent.trim();
                const num    = parseFloat(raw.replace(/[^0-9.]/g, ''));
                const suffix = raw.replace(/[0-9.]/g, '');
                if (!isNaN(num) && num > 0) {
                    const steps    = 36;
                    const duration = 1100;
                    const inc      = num / steps;
                    let current    = 0;
                    const iv = setInterval(() => {
                        current += inc;
                        if (current >= num) { current = num; clearInterval(iv); }
                        el.textContent = Number.isInteger(num) ? Math.round(current) + suffix : current.toFixed(1) + suffix;
                    }, duration / steps);
                }
                countObserver.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    statNums.forEach(el => countObserver.observe(el));

    /* ── 9. QUICK PILLS ACTIVE HIGHLIGHTING ── */
    const sections   = document.querySelectorAll('section[id]');
    const quickPills = document.querySelectorAll('.quick-pill');
    const navLinks   = document.querySelectorAll('.nav-menu a:not(.register-nav-btn)');

    const highlightActive = () => {
        let current = '';
        sections.forEach(sec => {
            if (window.scrollY >= sec.offsetTop - 200) current = sec.id;
        });
        quickPills.forEach(pill => {
            pill.classList.toggle('active', pill.getAttribute('href').replace('#', '') === current);
        });
        navLinks.forEach(link => {
            link.classList.remove('nav-active');
            if (link.getAttribute('href').includes(current)) link.classList.add('nav-active');
        });
    };

    window.addEventListener('scroll', highlightActive, { passive: true });

    /* ── 10. SMOOTH SCROLL ── */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const targetId = anchor.getAttribute('href');
            if (targetId === '#') return;
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                const top = target.getBoundingClientRect().top + window.scrollY - 75;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });

    /* ── 11. AGENDA BLOCK HOVER ── */
    document.querySelectorAll('.agenda-block').forEach(block => {
        block.addEventListener('mouseleave', () => { block.style.transform = ''; });
    });

    /* ── 12. CLOSING REVEAL ── */
    const closingContent = document.querySelector('.closing-content');
    if (closingContent) {
        const closingObs = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity   = '1';
                    entry.target.style.transform = 'translateY(0)';
                    closingObs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        closingContent.style.opacity   = '0';
        closingContent.style.transform = 'translateY(28px)';
        closingContent.style.transition = 'opacity 0.75s ease, transform 0.75s ease';
        closingObs.observe(closingContent);
    }

    /* ══════════════════════════════════════
       ENHANCEMENT SCRIPTS
    ══════════════════════════════════════ */

    /* ── E1. CUSTOM CURSOR ── */
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

        const hoverEls = document.querySelectorAll('a, button, .quick-pill, .structure-card, .rop-item, .ctag, .committee-emblem, .register-btn');
        hoverEls.forEach(el => {
            el.addEventListener('mouseenter', () => cursorRing.classList.add('hovering'));
            el.addEventListener('mouseleave', () => cursorRing.classList.remove('hovering'));
        });

        document.addEventListener('mouseleave', () => { cursorDot.style.opacity = '0'; cursorRing.style.opacity = '0'; });
        document.addEventListener('mouseenter', () => { cursorDot.style.opacity = '1'; cursorRing.style.opacity = '1'; });
    }

    /* ── E2. SCROLL PROGRESS BAR ── */
    const navProgress = document.getElementById('navProgress');
    if (navProgress) {
        window.addEventListener('scroll', () => {
            const prog = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight) * 100;
            navProgress.style.width = prog + '%';
        }, { passive: true });
    }

    /* ── E3. GOLD RIBBON MARQUEE ── */
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

    /* ── E4. BACK TO TOP ── */
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
        window.addEventListener('scroll', () => {
            backToTop.classList.toggle('visible', window.scrollY > 400);
        }, { passive: true });
        backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    }

    /* ── E5. CLOSING SPARKS ── */
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

    /* ── E6. ORNATE DIVIDER REVEAL ── */
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

    /* ── E7. PARALLAX HERO BG ── */
    const heroBg = document.querySelector('.hero-bg');
    if (heroBg) {
        window.addEventListener('scroll', () => {
            heroBg.style.transform = `translateY(${window.scrollY * 0.25}px)`;
        }, { passive: true });
    }

    /* ── E8. 3D TILT on structure cards ── */
    document.querySelectorAll('.structure-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const dx = (e.clientX - rect.left - rect.width  / 2) / (rect.width  / 2);
            const dy = (e.clientY - rect.top  - rect.height / 2) / (rect.height / 2);
            card.style.transform = `perspective(700px) rotateX(${-dy * 5}deg) rotateY(${dx * 5}deg) translateY(-5px)`;
        });
        card.addEventListener('mouseleave', () => { card.style.transform = ''; });
    });

    /* ── E9. EMBLEM HOVER GLOW ── */
    document.querySelectorAll('.committee-emblem-wrap').forEach(wrap => {
        wrap.addEventListener('mouseenter', () => {
            const img = wrap.querySelector('.committee-emblem');
            if (img) img.style.filter = 'drop-shadow(0 0 22px rgba(212,175,55,0.65))';
        });
        wrap.addEventListener('mouseleave', () => {
            const img = wrap.querySelector('.committee-emblem');
            if (img) img.style.filter = 'drop-shadow(0 6px 18px rgba(0,0,0,0.4))';
        });
    });

    /* ── E10. TAG HOVER RIPPLE ── */
    document.querySelectorAll('.ctag').forEach(tag => {
        tag.addEventListener('click', (e) => {
            const ripple = document.createElement('span');
            ripple.style.cssText = `
                position:absolute; border-radius:50%;
                width:60px; height:60px;
                background:rgba(212,175,55,0.3);
                transform:translate(-50%,-50%) scale(0);
                animation:rippleOut 0.5s ease forwards;
                left:${e.offsetX}px; top:${e.offsetY}px;
                pointer-events:none;
            `;
            tag.style.position = 'relative';
            tag.style.overflow = 'hidden';
            tag.appendChild(ripple);
            setTimeout(() => ripple.remove(), 500);
        });
    });

    // Inject ripple keyframes
    const style = document.createElement('style');
    style.textContent = `@keyframes rippleOut { to { transform: translate(-50%,-50%) scale(3); opacity: 0; } }`;
    document.head.appendChild(style);

    console.log('SIMATS MUN 2026 — Committees page initialised ✔');
});