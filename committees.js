/* ═══════════════════════════════════════════════════
   SIMATS MUN 2026 — committee.js
   Scroll animations · Particles · Nav · Committee FX
   ═══════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

    /* ── 1. PAGE FADE IN ── */
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
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
            navToggle?.querySelectorAll('span').forEach(s => {
                s.style.transform = '';
                s.style.opacity   = '';
            });
        });
    });

    /* ── 3. HERO PARTICLES ── */
    const particleContainer = document.getElementById('heroParticles');
    if (particleContainer) {
        for (let i = 0; i < 32; i++) {
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

    /* ── 4. INTERSECTION OBSERVER — [data-animate] ── */
    const animateEls = document.querySelectorAll('[data-animate]');
    const baseObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                baseObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    animateEls.forEach(el => baseObserver.observe(el));

    /* ── 5. COMMITTEE BLOCK SLIDE-IN ── */
    const committeeBlocks = document.querySelectorAll('.committee-block');

    const blockObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const isReversed = entry.target.classList.contains('committee-block-reverse');
                const left  = entry.target.querySelector('.committee-left');
                const right = entry.target.querySelector('.committee-right');

                if (left) {
                    setTimeout(() => {
                        left.style.opacity   = '1';
                        left.style.transform = 'translateX(0)';
                    }, 100);
                }
                if (right) {
                    setTimeout(() => {
                        right.style.opacity   = '1';
                        right.style.transform = 'translateX(0)';
                    }, 250);
                }
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
            left.style.transform = isReversed ? 'translateX(40px)' : 'translateX(-40px)';
            left.style.transition = 'opacity 0.65s ease, transform 0.65s ease';
        }
        if (right) {
            right.style.opacity   = '0';
            right.style.transform = isReversed ? 'translateX(-40px)' : 'translateX(40px)';
            right.style.transition = 'opacity 0.65s ease 0.15s, transform 0.65s ease 0.15s';
        }

        blockObserver.observe(block);
    });

    /* ── 6. STRUCTURE CARDS STAGGER ── */
    const structureCards = document.querySelectorAll('.structure-card');

    const scObserver = new IntersectionObserver((entries) => {
        if (entries.some(e => e.isIntersecting)) {
            structureCards.forEach((card, i) => {
                setTimeout(() => {
                    card.style.opacity   = '1';
                    card.style.transform = 'translateY(0)';
                }, i * 100);
            });
            entries.forEach(e => scObserver.unobserve(e.target));
        }
    }, { threshold: 0.1 });

    structureCards.forEach(card => {
        card.style.opacity   = '0';
        card.style.transform = 'translateY(25px)';
        card.style.transition = 'opacity 0.55s ease, transform 0.55s ease, box-shadow 0.4s ease, border-color 0.4s ease';
        scObserver.observe(card);
    });

    /* ── 7. ROP ITEMS STAGGER ── */
    const ropItems = document.querySelectorAll('.rop-item');

    const ropObserver = new IntersectionObserver((entries) => {
        if (entries.some(e => e.isIntersecting)) {
            ropItems.forEach((item, i) => {
                setTimeout(() => {
                    item.style.opacity   = '1';
                    item.style.transform = 'translateY(0)';
                }, i * 70);
            });
            entries.forEach(e => ropObserver.unobserve(e.target));
        }
    }, { threshold: 0.1 });

    ropItems.forEach(item => {
        item.style.opacity   = '0';
        item.style.transform = 'translateY(18px)';
        item.style.transition = 'opacity 0.45s ease, transform 0.45s ease';
        ropObserver.observe(item);
    });

    /* ── 8. DIFFICULTY CARDS STAGGER ── */
    const diffCards = document.querySelectorAll('.diff-card');

    const diffObserver = new IntersectionObserver((entries) => {
        if (entries.some(e => e.isIntersecting)) {
            diffCards.forEach((card, i) => {
                setTimeout(() => {
                    card.style.opacity   = '1';
                    card.style.transform = 'translateY(0) scale(1)';
                }, i * 150);
            });
            entries.forEach(e => diffObserver.unobserve(e.target));
        }
    }, { threshold: 0.15 });

    diffCards.forEach(card => {
        card.style.opacity   = '0';
        card.style.transform = 'translateY(30px) scale(0.97)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        diffObserver.observe(card);
    });

    /* ── 9. STATS STRIP NUMBER COUNT-UP ── */
    const statNums = document.querySelectorAll('.stat-num');

    const countObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el  = entry.target;
                const raw = el.textContent.trim();
                const num = parseFloat(raw.replace(/[^0-9.]/g, ''));
                const suffix = raw.replace(/[0-9.]/g, '');

                if (!isNaN(num) && num > 0) {
                    const duration = 1200;
                    const steps    = 40;
                    const increment = num / steps;
                    let current = 0;
                    const interval = setInterval(() => {
                        current += increment;
                        if (current >= num) {
                            current = num;
                            clearInterval(interval);
                        }
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

    /* ── 10. COMMITTEE EMBLEM SPIN on HOVER ── */
    document.querySelectorAll('.committee-emblem').forEach(emblem => {
        let isHovered = false;
        emblem.addEventListener('mouseenter', () => {
            if (isHovered) return;
            isHovered = true;
            emblem.style.transition = 'transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
        });
        emblem.addEventListener('mouseleave', () => {
            isHovered = false;
        });
    });

    /* ── 11. QUICK NAV PILLS — ACTIVE HIGHLIGHTING ── */
    const sections  = document.querySelectorAll('section[id], header[id]');
    const quickPills = document.querySelectorAll('.quick-pill');
    const navLinks   = document.querySelectorAll('.nav-menu a:not(.register-nav-btn)');

    const highlightActive = () => {
        let current = '';
        sections.forEach(sec => {
            if (window.scrollY >= sec.offsetTop - 200) current = sec.id;
        });

        quickPills.forEach(pill => {
            const href = pill.getAttribute('href').replace('#','');
            if (href === current) {
                pill.style.background     = 'var(--gold)';
                pill.style.color          = 'var(--burgundy)';
                pill.style.borderColor    = 'var(--gold)';
                pill.style.boxShadow      = '0 4px 14px rgba(212,175,55,0.5)';
            } else {
                pill.style.background  = '';
                pill.style.color       = '';
                pill.style.borderColor = '';
                pill.style.boxShadow   = '';
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('nav-active');
            if (link.getAttribute('href').includes(current)) link.classList.add('nav-active');
        });
    };

    window.addEventListener('scroll', highlightActive, { passive: true });

    /* ── 12. SMOOTH SCROLL for anchor links ── */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const targetId = anchor.getAttribute('href');
            if (targetId === '#') return;
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                const offset = 80;
                const top = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });

    /* ── 13. COMMITTEE TAGS WAVE ── */
    document.querySelectorAll('.committee-tags').forEach(tagGroup => {
        const tags = tagGroup.querySelectorAll('.ctag');
        tags.forEach((tag, i) => {
            tag.style.animationDelay = `${i * 0.1}s`;
        });
    });

    /* ── 14. CRISIS SECTION PULSE EFFECT ── */
    const crisisSection = document.getElementById('crisis');
    if (crisisSection) {
        const crisisObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    crisisSection.classList.add('crisis-active');
                } else {
                    crisisSection.classList.remove('crisis-active');
                }
            });
        }, { threshold: 0.3 });
        crisisObserver.observe(crisisSection);
    }

    /* ── 15. CLOSING REVEAL ── */
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
        closingContent.style.transform = 'translateY(35px)';
        closingContent.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        closingObs.observe(closingContent);
    }

    /* ── 16. AGENDA TEXT TYPEWRITER FEEL on hover ── */
    document.querySelectorAll('.agenda-block').forEach(block => {
        block.addEventListener('mouseenter', () => {
            block.style.transform = 'translateX(6px)';
            block.style.transition = 'transform 0.3s ease';
        });
        block.addEventListener('mouseleave', () => {
            block.style.transform = '';
        });
    });

    console.log('SIMATS MUN 2026 — Committees page initialised ✔');
});