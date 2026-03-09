/* ═══════════════════════════════════════════════════
   SIMATS MUN 2026 — committees.js  (Refined Edition)
   Scroll animations · Particles · Nav · Committee FX
   ═══════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

    /* ── 1. PAGE FADE IN ── */
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.45s ease';
    requestAnimationFrame(() => { document.body.style.opacity = '1'; });

    /* ── 2. NAVBAR MOBILE TOGGLE ── */
    const navToggle = document.getElementById('navToggle');
    const navMenu   = document.getElementById('navMenu');

    navToggle?.addEventListener('click', () => {
        navMenu.classList.toggle('active');
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

    navMenu?.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle?.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
        });
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
                    const steps     = 36;
                    const duration  = 1100;
                    const increment = num / steps;
                    let current     = 0;
                    const interval  = setInterval(() => {
                        current += increment;
                        if (current >= num) { current = num; clearInterval(interval); }
                        el.textContent = Number.isInteger(num)
                            ? Math.round(current) + suffix
                            : current.toFixed(1) + suffix;
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
            const href = pill.getAttribute('href').replace('#', '');
            if (href === current) {
                pill.classList.add('active');
            } else {
                pill.classList.remove('active');
            }
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
        block.addEventListener('mouseenter', () => {
            block.style.transition = 'transform 0.3s ease';
        });
        block.addEventListener('mouseleave', () => {
            block.style.transform = '';
        });
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

    console.log('SIMATS MUN 2026 — Committees page initialised ✔');
});