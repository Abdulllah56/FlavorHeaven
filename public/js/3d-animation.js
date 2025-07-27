// Simple animations without 3D effects

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes simpleFloat {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-5px); }
    }

    @keyframes fadeInUp {
        0% { opacity: 0; transform: translateY(20px); }
        100% { opacity: 1; transform: translateY(0); }
    }
`;
document.head.appendChild(style);

// Simple logo hover effect
function initLogoAnimation() {
    // Removed 3D logo animations for menu page
}

// Hero section simple effects
function initHero3D() {
    const heroElements = document.querySelectorAll('.hero-title, .hero-subtitle, .hero-text');
    heroElements.forEach((element, index) => {
        if (element) {
            element.style.animation = `fadeInUp 0.8s ease-out ${index * 0.2}s both`;

            element.addEventListener('mouseenter', () => {
                element.style.transform = 'translateY(-5px)';
                element.style.transition = 'transform 0.3s ease';
            });

            element.addEventListener('mouseleave', () => {
                element.style.transform = 'translateY(0)';
            });
        }
    });
}

// Card hover effects
function initCardAnimations() {
    const cards = document.querySelectorAll('.menu-item, .card, .feature-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-8px)';
            card.style.boxShadow = '0 20px 40px rgba(0,0,0,0.1)';
            card.style.transition = 'all 0.3s ease';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
            card.style.boxShadow = '';
        });
    });
}

// Parallax scroll effect
function initParallaxScroll() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.parallax-bg');

        parallaxElements.forEach(element => {
            const speed = 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// Initialize all animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initLogoAnimation();
    initHero3D();
    initCardAnimations();
    initParallaxScroll();
});

// Initialize animations when page is fully loaded
window.addEventListener('load', () => {
    // Add fade-in animation to main content
    const mainContent = document.querySelector('main, .main-content');
    if (mainContent) {
        mainContent.style.animation = 'fadeInUp 1s ease-out';
    }
});