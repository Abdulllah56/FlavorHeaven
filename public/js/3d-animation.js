// Simple 3D-like animations without Three.js dependency

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes logoSpin {
        0% { transform: rotateY(0deg); }
        100% { transform: rotateY(360deg); }
    }
    
    @keyframes float3D {
        0%, 100% { transform: translateY(0px) rotateX(0deg); }
        50% { transform: translateY(-10px) rotateX(5deg); }
    }
    
    @keyframes cardFloat {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-5px); }
    }
`;
document.head.appendChild(style);

// Logo 3D rotation effect
function initLogoAnimation() {
    const logoContainer = document.querySelector('.logo-container');
    if (logoContainer) {
        // Create a simple spinning logo element
        const logo = document.createElement('div');
        logo.innerHTML = '🍽️';
        logo.style.cssText = `
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 2rem;
            transform-style: preserve-3d;
            animation: logoSpin 8s linear infinite;
        `;
        logoContainer.appendChild(logo);
    }
}

// Hero 3D heading effect
function initHero3D() {
    const heading3D = document.getElementById('heading3D');
    if (heading3D) {
        const h1 = heading3D.querySelector('h1');
        if (h1) {
            h1.style.cssText = `
                transform-style: preserve-3d;
                text-shadow: 
                    1px 1px 0 #000,
                    2px 2px 0 #333,
                    3px 3px 0 #666,
                    4px 4px 10px rgba(0,0,0,0.5);
                animation: float3D 6s ease-in-out infinite;
            `;
        }
    }
}

// Card hover effects
function initCardAnimations() {
    const cards = document.querySelectorAll('.menu-item, .card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.animation = 'cardFloat 2s ease-in-out infinite';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.animation = '';
        });
    });
}

// Initialize all animations
document.addEventListener('DOMContentLoaded', () => {
    initLogoAnimation();
    initHero3D();
    initCardAnimations();
});tions
function addAnimationStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes logoSpin {
            0% { transform: rotateY(0deg) rotateX(0deg); }
            25% { transform: rotateY(90deg) rotateX(10deg); }
            50% { transform: rotateY(180deg) rotateX(0deg); }
            75% { transform: rotateY(270deg) rotateX(-10deg); }
            100% { transform: rotateY(360deg) rotateX(0deg); }
        }

        @keyframes float3D {
            0%, 100% { 
                transform: translateY(0px) rotateX(0deg); 
            }
            25% { 
                transform: translateY(-10px) rotateX(5deg); 
            }
            50% { 
                transform: translateY(-20px) rotateX(0deg); 
            }
            75% { 
                transform: translateY(-10px) rotateX(-5deg); 
            }
        }

        .gallery-item:hover {
            transform: perspective(1000px) rotateX(5deg) rotateY(5deg) translateZ(20px) !important;
        }

        .menu-item:hover {
            transform: perspective(1000px) rotateX(3deg) rotateY(3deg) translateZ(15px) !important;
        }
    `;
    document.head.appendChild(style);
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    addAnimationStyles();
    initLogoAnimation();
    initHero3D();
});

// Export functions for compatibility
window.init3DAnimations = function() {
    addAnimationStyles();
    initLogoAnimation();
    initHero3D();
};