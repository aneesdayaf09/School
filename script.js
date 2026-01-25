// Mobile Navigation Toggle
const mobileToggle = document.querySelector('.mobile-toggle');
const navLinks = document.querySelector('.nav-links');

mobileToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');

    // Animate Icon
    const icon = mobileToggle.querySelector('i');
    if (navLinks.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Close menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const icon = mobileToggle.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    });
});

// Sticky Header
const header = document.querySelector('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    } else {
        header.style.boxShadow = 'none';
        header.style.borderBottom = '1px solid rgba(0,0,0,0.05)';
    }
});

// Stats Animation
const stats = document.querySelectorAll('.stat-item h3');
let hasAnimated = false;

function animateStats() {
    stats.forEach(stat => {
        const target = +stat.getAttribute('data-count');
        let count = 0;
        const increment = target / 50; // Speed of counter

        const updateCount = () => {
            if (count < target) {
                count += increment;
                stat.innerText = Math.ceil(count) + (stat.getAttribute('data-count') === "100" ? "%" : "+");
                setTimeout(updateCount, 40);
            } else {
                stat.innerText = target + (stat.getAttribute('data-count') === "100" ? "%" : "+");
            }
        };
        updateCount();
    });
}

// Intersection Observer for Scroll Animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !hasAnimated) {
            if (entry.target.classList.contains('stats')) {
                animateStats();
                hasAnimated = true;
            }
        }

        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.5 });

document.querySelector('.stats').style.opacity = '1'; // Ensure visible for observer
observer.observe(document.querySelector('.stats'));

// Add simple fade-in scrolling for other sections
const scrollElements = document.querySelectorAll('.program-card, .about-content, .feature-box');

const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

// Add CSS for fade-in in JS to keep CSS file clean if preferred, 
// but easier to manage if we just toggle a class.
// We'll add the style dynamically here for simplicity of the "Single file" requests
const style = document.createElement('style');
style.innerHTML = `
    .program-card, .about-content, .feature-box {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.8s ease-out;
    }
    .visible {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(style);

scrollElements.forEach(el => scrollObserver.observe(el));
