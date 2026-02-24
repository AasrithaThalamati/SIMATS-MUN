/* ═══════════════════════════════════════════════════════════
   CONTACT PAGE JAVASCRIPT — contact.js
   SIMATS MUN 2026
   Handles: Particles, Form Validation, Char Counter, Scroll FX
═══════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

    /* ─────────────────────────────────────────
       1. HERO PARTICLE SYSTEM
    ───────────────────────────────────────── */
    const particleContainer = document.getElementById('particles');
    if (particleContainer) {
        const NUM_PARTICLES = 28;
        for (let i = 0; i < NUM_PARTICLES; i++) {
            const p = document.createElement('div');
            p.className = 'contact-hero-particle';
            const size = Math.random() * 3 + 1;
            p.style.cssText = `
                left: ${Math.random() * 100}%;
                width: ${size}px;
                height: ${size}px;
                animation-duration: ${Math.random() * 12 + 8}s;
                animation-delay: ${Math.random() * 10}s;
                opacity: ${Math.random() * 0.5 + 0.2};
            `;
            particleContainer.appendChild(p);
        }
    }

    /* ─────────────────────────────────────────
       2. SCROLL REVEAL ANIMATIONS
    ───────────────────────────────────────── */
    const revealTargets = document.querySelectorAll(
        '.info-tile, .sec-card, .inquiry-card, .social-platform-card, ' +
        '.form-sidebar-inner, .form-main, .venue-details, .venue-map-placeholder, ' +
        '.closing-content'
    );

    const revealOptions = { threshold: 0.1, rootMargin: '0px 0px -40px 0px' };
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                entry.target.style.transitionDelay = `${(entry.target.dataset.delay || 0)}ms`;
                entry.target.classList.add('revealed');
                revealObserver.unobserve(entry.target);
            }
        });
    }, revealOptions);

    revealTargets.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(24px)';
        el.style.transition = 'opacity 0.65s ease, transform 0.65s ease';
        el.dataset.delay = (index % 4) * 90;
        revealObserver.observe(el);
    });

    // CSS class to trigger the reveal
    const style = document.createElement('style');
    style.textContent = '.revealed { opacity: 1 !important; transform: translateY(0) !important; }';
    document.head.appendChild(style);

    /* ─────────────────────────────────────────
       3. CHARACTER COUNTER
    ───────────────────────────────────────── */
    const messageArea = document.getElementById('message');
    const charCount = document.getElementById('charCount');
    const MAX_CHARS = 1000;

    if (messageArea && charCount) {
        messageArea.addEventListener('input', () => {
            const len = messageArea.value.length;
            charCount.textContent = len;
            if (len > MAX_CHARS * 0.9) {
                charCount.style.color = '#c0392b';
            } else if (len > MAX_CHARS * 0.75) {
                charCount.style.color = '#e67e22';
            } else {
                charCount.style.color = '';
            }
            // Enforce max
            if (len > MAX_CHARS) {
                messageArea.value = messageArea.value.substring(0, MAX_CHARS);
                charCount.textContent = MAX_CHARS;
            }
        });
    }

    /* ─────────────────────────────────────────
       4. CONTACT FORM VALIDATION & SUBMIT
    ───────────────────────────────────────── */
    const form = document.getElementById('contactFormFull');
    const formBody = document.getElementById('formBody');
    const formSuccess = document.getElementById('formSuccess');

    if (form) {
        // Real-time field validation on blur
        const fields = form.querySelectorAll('input[required], select[required], textarea[required]');
        fields.forEach(field => {
            field.addEventListener('blur', () => validateField(field));
            field.addEventListener('input', () => {
                if (field.classList.contains('error')) validateField(field);
            });
        });

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            let isValid = true;

            fields.forEach(field => {
                if (!validateField(field)) isValid = false;
            });

            // Email format check
            const emailField = document.getElementById('emailFull');
            if (emailField && emailField.value) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(emailField.value.trim())) {
                    showError(emailField, 'err-emailFull');
                    isValid = false;
                }
            }

            if (!isValid) return;

            // Simulate submission
            const btn = document.getElementById('submitBtn');
            if (btn) {
                btn.disabled = true;
                btn.querySelector('.btn-label').textContent = 'Sending…';
                btn.style.opacity = '0.7';
                btn.style.cursor = 'not-allowed';
            }

            setTimeout(() => {
                formBody.style.display = 'none';
                formSuccess.classList.add('visible');
                formSuccess.style.display = 'flex';
                form.reset();
                if (charCount) charCount.textContent = '0';
            }, 1200);
        });
    }

    function validateField(field) {
        const errorId = 'err-' + field.id;
        const errorEl = document.getElementById(errorId);
        const value = field.value.trim();

        if (!value) {
            showError(field, errorId);
            return false;
        } else {
            hideError(field, errorId);
            return true;
        }
    }

    function showError(field, errorId) {
        field.classList.add('error');
        const err = document.getElementById(errorId);
        if (err) err.classList.add('visible');
    }

    function hideError(field, errorId) {
        field.classList.remove('error');
        const err = document.getElementById(errorId);
        if (err) err.classList.remove('visible');
    }

    /* ─────────────────────────────────────────
       5. SECTION HEADER ENTRANCE ANIMATIONS
    ───────────────────────────────────────── */
    const sectionHeaders = document.querySelectorAll('.section-header');

    const headerObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                headerObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    sectionHeaders.forEach(h => {
        h.style.opacity = '0';
        h.style.transform = 'translateY(20px)';
        h.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
        headerObserver.observe(h);
    });

    /* ─────────────────────────────────────────
       6. BACK TO TOP (from shared script if present)
    ───────────────────────────────────────── */
    const backBtn = document.getElementById('backToTop');
    if (backBtn) {
        window.addEventListener('scroll', () => {
            backBtn.style.opacity = window.scrollY > 400 ? '1' : '0';
            backBtn.style.pointerEvents = window.scrollY > 400 ? 'auto' : 'none';
        });
        backBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
        backBtn.style.opacity = '0';
        backBtn.style.transition = 'opacity 0.3s ease';
    }

    /* ─────────────────────────────────────────
       7. MOBILE NAV TOGGLE (mirrors script.js)
    ───────────────────────────────────────── */
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => navMenu.classList.remove('active'));
        });
    }

    /* ─────────────────────────────────────────
       8. INFO TILE & SECTION INTRO ANIMATIONS
    ───────────────────────────────────────── */
    const introNotes = document.querySelectorAll('.section-intro-note, .social-intro');
    const introObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                introObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    introNotes.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(16px)';
        el.style.transition = 'opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s';
        introObserver.observe(el);
    });

    /* ─────────────────────────────────────────
       9. STAGGERED GRID CARD ENTRY
    ───────────────────────────────────────── */
    function staggerGrid(selector, staggerMs = 80) {
        const grids = document.querySelectorAll(selector);
        grids.forEach(grid => {
            const cards = grid.children;
            Array.from(cards).forEach((card, i) => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px) scale(0.98)';
                card.style.transition = `opacity 0.55s ease ${i * staggerMs}ms, transform 0.55s ease ${i * staggerMs}ms`;
            });

            const obs = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        Array.from(entry.target.children).forEach(card => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0) scale(1)';
                        });
                        obs.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.08 });

            obs.observe(grid);
        });
    }

    staggerGrid('.general-info-grid', 100);
    staggerGrid('.secretariat-grid', 90);
    staggerGrid('.inquiry-grid', 90);
    staggerGrid('.social-platforms', 110);

});