/* ========================================
   Portfolio — JavaScript
   Scroll animations, navbar, mobile menu
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
    // --- Navbar scroll effect ---
    const navbar = document.getElementById('navbar');
    const handleNavScroll = () => {
        navbar.classList.toggle('scrolled', window.scrollY > 40);
    };
    window.addEventListener('scroll', handleNavScroll, { passive: true });
    handleNavScroll();

    // --- Mobile menu toggle ---
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('open');
        // Animate hamburger to X
        const spans = navToggle.querySelectorAll('span');
        if (navMenu.classList.contains('open')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
        } else {
            spans[0].style.transform = '';
            spans[1].style.opacity = '';
            spans[2].style.transform = '';
        }
    });

    // Close menu when clicking a nav link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('open');
            const spans = navToggle.querySelectorAll('span');
            spans[0].style.transform = '';
            spans[1].style.opacity = '';
            spans[2].style.transform = '';
        });
    });

    // --- Active section highlight ---
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link:not(.nav-link--cta)');

    const highlightNav = () => {
        const scrollY = window.scrollY + 100;
        sections.forEach(section => {
            const top = section.offsetTop - 100;
            const bottom = top + section.offsetHeight;
            const id = section.getAttribute('id');
            const link = document.querySelector(`.nav-link[href="#${id}"]`);
            if (link && !link.classList.contains('nav-link--cta')) {
                link.classList.toggle('active', scrollY >= top && scrollY < bottom);
            }
        });
    };
    window.addEventListener('scroll', highlightNav, { passive: true });

    // --- Intersection Observer — scroll animations ---
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -60px 0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Animate once
            }
        });
    }, observerOptions);

    document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));

    // --- Language bar animation ---
    const langObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const fills = entry.target.querySelectorAll('.language-fill');
                fills.forEach(fill => {
                    const level = fill.getAttribute('data-level');
                    setTimeout(() => {
                        fill.style.width = level + '%';
                    }, 300);
                });
                langObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    const langSection = document.querySelector('.about-languages');
    if (langSection) langObserver.observe(langSection);

    // --- Smooth scroll for all anchor links (fallback) ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // --- Gentle parallax on hero shapes ---
    const shapes = document.querySelectorAll('.shape');
    if (shapes.length) {
        window.addEventListener('mousemove', (e) => {
            const x = (e.clientX / window.innerWidth - 0.5) * 2;
            const y = (e.clientY / window.innerHeight - 0.5) * 2;
            shapes.forEach((shape, i) => {
                const factor = (i + 1) * 8;
                shape.style.transform = `translate(${x * factor}px, ${y * factor}px)`;
            });
        }, { passive: true });
    }
});
