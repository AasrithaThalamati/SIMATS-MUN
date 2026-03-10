/* ═══════════════════════════════════════════════════
   SIMATS MUN 2026 — about.js
   Scroll animations · Particle hero · Nav toggle
   ═══════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

    /* ── 1. NAVBAR MOBILE TOGGLE ── */
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

    // close menu when a link is clicked
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

    /* ══════════════════════════════════════
       ENHANCEMENT SCRIPTS
    ══════════════════════════════════════ */

    /* ── E1. CUSTOM CURSOR ── */
    const cursorDot  = document.getElementById('cursorDot');
    const cursorRing = document.getElementById('cursorRing');

    if (cursorDot && cursorRing && window.matchMedia('(hover: hover)').matches) {
        let dotX = 0, dotY = 0;
        let ringX = 0, ringY = 0;

        document.addEventListener('mousemove', (e) => {
            dotX = e.clientX;
            dotY = e.clientY;
        });

        const animateCursor = () => {
            // dot follows instantly
            cursorDot.style.left = dotX + 'px';
            cursorDot.style.top  = dotY + 'px';

            // ring lags slightly
            ringX += (dotX - ringX) * 0.12;
            ringY += (dotY - ringY) * 0.12;
            cursorRing.style.left = ringX + 'px';
            cursorRing.style.top  = ringY + 'px';

            requestAnimationFrame(animateCursor);
        };
        animateCursor();

        // Hover effect on interactive elements
        const hoverEls = document.querySelectorAll('a, button, .value-pill, .vm-card, .elig-card, .rule-card, .sec-role, .tl-card, .process-step');
        hoverEls.forEach(el => {
            el.addEventListener('mouseenter', () => cursorRing.classList.add('hovering'));
            el.addEventListener('mouseleave', () => cursorRing.classList.remove('hovering'));
        });

        document.addEventListener('mouseleave', () => {
            cursorDot.style.opacity  = '0';
            cursorRing.style.opacity = '0';
        });
        document.addEventListener('mouseenter', () => {
            cursorDot.style.opacity  = '1';
            cursorRing.style.opacity = '1';
        });
    }

    /* ── E2. SCROLL PROGRESS BAR ── */
    const navProgress = document.getElementById('navProgress');
    if (navProgress) {
        const updateProgress = () => {
            const scrollTop    = window.scrollY;
            const docHeight    = document.documentElement.scrollHeight - window.innerHeight;
            const progress     = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
            navProgress.style.width = progress + '%';
        };
        window.addEventListener('scroll', updateProgress, { passive: true });
    }

    /* ── E3. HERO TYPEWRITER ── */
    const typewriterEl = document.getElementById('heroTypewriter');
    if (typewriterEl) {
        const phrases = [
            'Where Diplomacy Meets Leadership',
            'Debate. Negotiate. Resolve.',
            'Forging Tomorrow\'s Global Leaders',
            'Your Voice on the World Stage'
        ];
        let phraseIndex = 0;
        let charIndex   = 0;
        let isDeleting  = false;
        let isPaused    = false;

        const type = () => {
            const current = phrases[phraseIndex];

            if (isDeleting) {
                charIndex--;
                typewriterEl.textContent = current.slice(0, charIndex);
            } else {
                charIndex++;
                typewriterEl.textContent = current.slice(0, charIndex);
            }

            let delay = isDeleting ? 40 : 70;

            if (!isDeleting && charIndex === current.length) {
                delay = 2200;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                delay = 400;
            }

            setTimeout(type, delay);
        };

        setTimeout(type, 1200);
    }

    /* ── E4. ANIMATED STATS COUNTER ── */
    const statNums = document.querySelectorAll('.stat-num');

    const countObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el     = entry.target;
                const target = parseInt(el.dataset.target || 0);
                const dur    = 1600;
                const step   = dur / target;
                let current  = 0;

                const timer = setInterval(() => {
                    current++;
                    el.textContent = current;
                    if (current >= target) clearInterval(timer);
                }, step);

                countObserver.unobserve(el);
            }
        });
    }, { threshold: 0.6 });

    statNums.forEach(el => countObserver.observe(el));

    /* ── E5. CLOSING SECTION SPARKS ── */
    const sparksContainer = document.getElementById('closingSparks');
    if (sparksContainer) {
        const sparkCount = 22;
        for (let i = 0; i < sparkCount; i++) {
            const s = document.createElement('div');
            s.className = 'closing-spark';
            const drift = (Math.random() - 0.5) * 80;
            s.style.cssText = `
                left:    ${5 + Math.random() * 90}%;
                bottom:  ${Math.random() * 40}%;
                --dur:   ${5 + Math.random() * 8}s;
                --delay: ${Math.random() * 6}s;
                --drift: ${drift}px;
                width:   ${1 + Math.random() * 3}px;
                height:  ${1 + Math.random() * 3}px;
            `;
            sparksContainer.appendChild(s);
        }
    }

    /* ── E6. BACK TO TOP BUTTON ── */
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
        const toggleBTT = () => {
            if (window.scrollY > 400) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        };
        window.addEventListener('scroll', toggleBTT, { passive: true });

        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    /* ── E7. RIBBON SCROLL ── */
    // Make ribbon marquee smoother by cloning content
    const ribbon = document.querySelector('.gold-ribbon-top');
    if (ribbon) {
        // Disable CSS animation, use JS marquee instead
        ribbon.style.animation = 'none';
        ribbon.style.overflow  = 'hidden';
        ribbon.style.whiteSpace = 'nowrap';
        ribbon.style.display   = 'block';

        const original = ribbon.innerHTML;
        ribbon.innerHTML = original + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + original;

        let pos = 0;
        const totalWidth = ribbon.scrollWidth / 2;
        const speed = 0.6;

        const scrollRibbon = () => {
            pos += speed;
            if (pos >= totalWidth) pos = 0;
            ribbon.style.transform = `translateX(-${pos}px)`;
            requestAnimationFrame(scrollRibbon);
        };
        requestAnimationFrame(scrollRibbon);
    }

    /* ── E8. PARALLAX SUBTLE on HERO BG ── */
    const heroBg = document.querySelector('.hero-bg');
    if (heroBg) {
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            heroBg.style.transform = `translateY(${scrollY * 0.25}px)`;
        }, { passive: true });
    }

    /* ── E9. ORNATE DIVIDER REVEAL ── */
    const dividers = document.querySelectorAll('.ornate-divider');
    const dividerObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity   = '1';
                entry.target.style.transform = 'scaleX(1)';
                dividerObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    dividers.forEach(d => {
        d.style.opacity   = '0';
        d.style.transform = 'scaleX(0.85)';
        d.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        dividerObserver.observe(d);
    });

    /* ── E10. TILT EFFECT on VM & Elig Cards ── */
    const tiltCards = document.querySelectorAll('.vm-card, .elig-card');
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect   = card.getBoundingClientRect();
            const cx     = rect.left + rect.width  / 2;
            const cy     = rect.top  + rect.height / 2;
            const dx     = (e.clientX - cx) / (rect.width  / 2);
            const dy     = (e.clientY - cy) / (rect.height / 2);
            const rotX   = -dy * 4;
            const rotY   =  dx * 4;
            card.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-5px)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });

    console.log('SIMATS MUN 2026 — About page initialised ✔');
});
