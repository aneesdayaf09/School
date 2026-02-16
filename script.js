document.addEventListener('DOMContentLoaded', () => {
    // -------------------------------------------------------------------
    // Smooth Scroll & Navigation Logic
    // -------------------------------------------------------------------
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');
    const navbar = document.querySelector('.navbar');

    if (burger) {
        burger.addEventListener('click', () => {
            nav.classList.toggle('nav-active');
            burger.classList.toggle('toggle');
        });
    }

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                if (nav.classList.contains('nav-active')) {
                    nav.classList.remove('nav-active');
                    burger.classList.remove('toggle');
                }
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Navbar Scroll Effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            if (!navbar.classList.contains('scrolled')) {
                navbar.classList.add('scrolled');
            }
        } else {
            if (navbar.classList.contains('scrolled')) {
                navbar.classList.remove('scrolled');
            }
        }
    });

    // -------------------------------------------------------------------
    // Advanced Scroll Reveal Animations (Intersection Observer)
    // -------------------------------------------------------------------
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: Add a staggered transition delay based on index if it's a grid item
                if (entry.target.classList.contains('club-card') || entry.target.classList.contains('leader-card')) {
                    // Styles handled in CSS for stagger, but we trigger the 'visible' class here
                }
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Elements to animate
    const revealElements = document.querySelectorAll('.section-title, .club-card, .leader-card, .gallery-item, .event-card, .about-text p, .reveal-on-scroll');

    revealElements.forEach(el => {
        el.classList.add('reveal-on-scroll'); // Ensure they have the base CSS class
        revealObserver.observe(el);
    });

    // -------------------------------------------------------------------
    // Parallax & magnetic Effects
    // -------------------------------------------------------------------
    const heroSection = document.querySelector('.hero-section, .club-hero');
    const heroOverlay = document.querySelector('.hero-overlay');
    const ctaButton = document.querySelector('.cta-button');

    if (heroSection && heroOverlay) {
        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const scrolled = window.scrollY;
                    if (scrolled < window.innerHeight) {
                        heroOverlay.style.transform = `translateY(${scrolled * 0.5}px) scale(1.05)`;
                    }
                    ticking = false;
                });
                ticking = true;
            }
        });
    }

    // Magnetic Button Effect (Simple)
    if (ctaButton) {
        ctaButton.addEventListener('mousemove', (e) => {
            const rect = ctaButton.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // Calculate distance from center
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const deltaX = (x - centerX) * 0.3; // Intensity
            const deltaY = (y - centerY) * 0.3;

            ctaButton.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
        });

        ctaButton.addEventListener('mouseleave', () => {
            ctaButton.style.transform = 'translate(0, 0)';
        });
    }

    // -------------------------------------------------------------------
    // Mouse Glow Effect for Cards (Dynamic Gradients)
    // -------------------------------------------------------------------
    const cards = document.querySelectorAll('.club-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });
});

// -------------------------------------------------------------------
// Countdown Timer Logic
// -------------------------------------------------------------------
function updateCountdowns() {
    const eventCards = document.querySelectorAll('.event-card[data-event-date]');

    eventCards.forEach(card => {
        const dateString = card.getAttribute('data-event-date');
        const targetDate = new Date(dateString).getTime();
        const now = new Date().getTime();
        const distance = targetDate - now;

        const timerDisplay = card.querySelector('.countdown-timer');
        if (!timerDisplay) return;

        if (distance < 0) {
            timerDisplay.innerHTML = 'Event Started';
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

        timerDisplay.innerHTML = `<span>${days}d</span> <span>${hours}h</span> <span>${minutes}m</span>`;
    });
}

updateCountdowns();
setInterval(updateCountdowns, 60000);
