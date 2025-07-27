// Navigation and UI Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize components
    initNavigation();
    initMobileMenu();
    initCart();
    initNewsletterPopup();
    loadFeaturedItems();
    initCarousel();
    init3DAnimations();
    initFormValidation();
    
    // Add enhanced parallax scrolling effect
    window.addEventListener('scroll', function() {
        const parallaxElements = document.querySelectorAll('.parallax');
        parallaxElements.forEach(element => {
            const scrollPosition = window.pageYOffset;
            const speed = element.getAttribute('data-speed') || 0.5;
            element.style.transform = `translateY(${scrollPosition * speed}px)`;
        });
    });

    // Add scroll event listener for navbar with enhanced effects
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('nav');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
            navbar.classList.remove('transparent');
        } else {
            navbar.classList.remove('scrolled');
            if (window.innerWidth > 768) {
                navbar.classList.add('transparent');
            }
        }
    });

    // Highlight the active nav link based on current page
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('nav a').forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });

    // Add reveal class to sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.add('reveal');
    });

    // Add reveal class to menu items with staggered delay
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach((item, index) => {
        item.classList.add('reveal');
        item.style.transitionDelay = `${index * 0.1}s`;
    });

    // Add reveal class to gallery items with staggered delay
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach((item, index) => {
        item.classList.add('reveal');
        item.style.transitionDelay = `${index * 0.05}s`;
    });

    // Initial check for elements in viewport
    revealOnScroll();
    
    // Apply floating animation to selected elements
    document.querySelectorAll('.float-element').forEach(element => {
        element.classList.add('float-animation');
    });
    
    // Apply 3D rotation to elements
    document.querySelectorAll('.rotate-element').forEach(element => {
        element.classList.add('rotate-3d');
    });
});

// Initialize 3D animations and transitions
function init3DAnimations() {
    // Apply 3D hover effects to cards
    const cards = document.querySelectorAll('.bg-white.rounded-lg');
    cards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left; // x position within the element
            const y = e.clientY - rect.top;  // y position within the element
            
            // Calculate rotation based on mouse position
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateY = ((x - centerX) / centerX) * 5; // Max 5 degree rotation
            const rotateX = ((centerY - y) / centerY) * 5;
            
            // Apply the transform
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
            this.style.transition = 'none'; // Remove transition during mouse move for smooth tracking
            
            // Add highlight effect
            this.style.boxShadow = `0 10px 30px rgba(0, 0, 0, 0.15), 
                                   ${rotateY * -0.5}px ${rotateX * -0.5}px 20px rgba(255, 255, 255, 0.1) inset, 
                                   ${rotateY * 0.5}px ${rotateX * 0.5}px 20px rgba(0, 0, 0, 0.1) inset`;
        });
        
        card.addEventListener('mouseleave', function() {
            // Reset transform and restore transition
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
            this.style.transition = 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94), box-shadow 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            this.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
        });
    });
    
    // Add parallax depth effect to scrolling
    document.addEventListener('scroll', function() {
        const scrollY = window.scrollY;
        
        // Parallax scroll on hero section
        const heroSection = document.querySelector('header');
        if (heroSection) {
            const heroContent = heroSection.querySelector('.text-center');
            if (heroContent) {
                heroContent.style.transform = `translateY(${scrollY * 0.3}px)`;
            }
        }
        
        // Parallax scroll for gallery and other elements
        document.querySelectorAll('.parallax-item').forEach(item => {
            const speedFactor = item.getAttribute('data-speed') || 0.1;
            const yPos = -(scrollY * speedFactor);
            item.style.transform = `translateY(${yPos}px)`;
        });
    });
}

// Enhanced Navigation functionality
function initNavigation() {
    const nav = document.querySelector('nav');
    const links = document.querySelectorAll('.nav-link');
    let lastScroll = 0;
    let scrollTimer;
    
    // Always apply a style class, even at the top - don't leave it unstyled
    if (window.scrollY <= 50) {
        nav.classList.add('transparent');
    } else {
        nav.classList.add('scrolled');
    }
    
    // Handle scroll behavior with debouncing
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        clearTimeout(scrollTimer);
        
        if (!nav.classList.contains('nav-scrolling')) {
            nav.classList.add('nav-scrolling');
        }
        
        // Add/remove nav-scrolled class
        if (currentScroll > 50) {
            nav.classList.add('scrolled');
            nav.classList.remove('transparent');
        } else {
            nav.classList.remove('scrolled');
            nav.classList.add('transparent');
        }
        
        // Hide/show nav on scroll direction, but only when we're further down the page
        if (currentScroll > lastScroll && currentScroll > 300) {
            nav.classList.add('nav-hidden');
        } else {
            nav.classList.remove('nav-hidden');
        }
        
        lastScroll = currentScroll;
        
        // Remove transition class after scroll ends
        scrollTimer = setTimeout(() => {
            nav.classList.remove('nav-scrolling');
        }, 150);
    });

    // Add smooth animation to links
    links.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.classList.add('pulse-animation');
        });
        link.addEventListener('mouseleave', function() {
            this.classList.remove('pulse-animation');
        });
    });
}

// Enhanced Mobile Menu functionality
function initMobileMenu() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileMenuClose = document.querySelector('.mobile-menu-close');
    const mobileMenuItems = document.querySelectorAll('.mobile-menu-items a');
    const body = document.body;

    if (!mobileMenuToggle || !mobileMenu) return;

    const toggleMenu = (show) => {
        if (show) {
            mobileMenu.style.transform = 'translateX(0)';
            body.style.overflow = 'hidden';
            
            // Animate menu items with staggered delay
            mobileMenuItems.forEach((item, index) => {
                setTimeout(() => {
                    item.style.transform = 'translateX(0)';
                    item.style.opacity = '1';
                }, 100 + index * 100);
            });
        } else {
            mobileMenu.style.transform = 'translateX(-100%)';
            body.style.overflow = '';
            
            // Reset menu items
            mobileMenuItems.forEach(item => {
                item.style.transform = 'translateX(-2rem)';
                item.style.opacity = '0';
            });
        }
    };

    mobileMenuToggle.addEventListener('click', () => toggleMenu(true));
    
    if (mobileMenuClose) {
        mobileMenuClose.addEventListener('click', () => toggleMenu(false));
    }

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        const isMenuOpen = mobileMenu.style.transform === 'translateX(0)';
        if (isMenuOpen &&
            !mobileMenu.contains(e.target) && 
            !mobileMenuToggle.contains(e.target)) {
            toggleMenu(false);
        }
    });

    // Handle escape key
    document.addEventListener('keydown', (e) => {
        const isMenuOpen = mobileMenu.style.transform === 'translateX(0)';
        if (e.key === 'Escape' && isMenuOpen) {
            toggleMenu(false);
        }
    });
    
    // Close menu when a menu item is clicked
    mobileMenuItems.forEach(item => {
        item.style.transform = 'translateX(-2rem)';
        item.style.opacity = '0';
        item.style.transition = 'transform 0.3s ease-out, opacity 0.3s ease-out';
        
        item.addEventListener('click', () => {
            toggleMenu(false);
        });
    });
}

// Enhanced Cart functionality
function initCart() {
    const cartIcon = document.querySelector('.cart-icon');
    const cartCount = document.querySelector('.cart-count');
    const cartDropdown = document.querySelector('.cart-dropdown');
    
    if (!cartIcon || !cartCount || !cartDropdown) return;

    // Update cart count with animation
    const updateCartCount = (count) => {
        cartCount.textContent = count;
        cartCount.style.display = count > 0 ? 'flex' : 'none';
        
        // Add animation effect
        cartCount.classList.remove('pulse-animation');
        void cartCount.offsetWidth; // Trigger reflow
        cartCount.classList.add('pulse-animation');
    };

    // Initial cart count update
    updateCartCount();

    // Handle cart hover with delay and animation
    let timeout;
    cartIcon.addEventListener('mouseenter', () => {
        clearTimeout(timeout);
        cartDropdown.style.display = 'block';
        setTimeout(() => {
            cartDropdown.classList.add('show');
        }, 50);
    });

    cartIcon.addEventListener('mouseleave', () => {
        timeout = setTimeout(() => {
            cartDropdown.classList.remove('show');
            setTimeout(() => {
                if (!cartDropdown.classList.contains('show')) {
                    cartDropdown.style.display = 'none';
                }
            }, 300);
        }, 300);
    });

    // Prevent closing when hovering dropdown
    cartDropdown.addEventListener('mouseenter', () => {
        clearTimeout(timeout);
    });

    cartDropdown.addEventListener('mouseleave', () => {
        timeout = setTimeout(() => {
            cartDropdown.classList.remove('show');
            setTimeout(() => {
                if (!cartDropdown.classList.contains('show')) {
                    cartDropdown.style.display = 'none';
                }
            }, 300);
        }, 300);
    });

    // Load cart items from localStorage
    const loadCartItems = () => {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        updateCartCount(cart.length);
        
        // Update cart dropdown content
        const cartItems = cartDropdown.querySelector('.cart-items');
        if (cartItems) {
            if (cart.length === 0) {
                cartItems.innerHTML = '<p class="text-gray-600">Your cart is empty</p>';
            } else {
                cartItems.innerHTML = cart.map(item => `
                    <div class="cart-item flex items-center gap-4 mb-4 fade-in">
                        <img src="${item.image || 'https://via.placeholder.com/150'}" alt="${item.name}" class="w-16 h-16 object-cover rounded">
                        <div class="flex-1">
                            <h4 class="font-bold">${item.name}</h4>
                            <p class="text-gray-600">$${item.price.toFixed(2)}</p>
                        </div>
                        <button class="text-red-500 hover:text-red-600 transform hover:scale-110 transition-transform" onclick="removeFromCart('${item.id}')">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                `).join('');
                
                // Add checkout button
                cartItems.innerHTML += `
                    <a href="checkout.html" class="bg-red-500 text-white w-full py-2 px-4 rounded text-center block hover:bg-red-600 transform hover:scale-105 transition-all">
                        Checkout
                    </a>
                `;
            }
        }
    };
    
    // Call loadCartItems initially and set up to refresh when storage changes
    loadCartItems();
    window.addEventListener('storage', loadCartItems);
    
    // Add to cart function - make it globally available
    window.addToCart = function(name, price, image) {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const id = Date.now().toString();
        
        cart.push({
            id,
            name,
            price: parseFloat(price),
            image: image || 'https://via.placeholder.com/150',
            quantity: 1
        });
        
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount(cart.length);
        loadCartItems();
        
        // Show visual feedback
        const notification = document.createElement('div');
        notification.className = 'fixed top-20 right-5 bg-green-500 text-white p-3 rounded-lg shadow-lg z-50 fade-in';
        notification.innerHTML = `<p>Added ${name} to cart!</p>`;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('fade-out');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 500);
        }, 2000);
    }
}

function removeFromCart(itemId) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const updatedCart = cart.filter(item => item.id !== itemId);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    
    // Update UI - trigger storage event manually to update cart display
    window.dispatchEvent(new Event('storage'));
}

// Enhanced carousel functionality
function initCarousel() {
    const carousel = document.querySelector('.carousel');
    if (!carousel) return;
    
    const carouselInner = carousel.querySelector('.carousel-inner');
    const slides = carousel.querySelectorAll('.carousel-item');
    const slideCount = slides.length;
    let currentSlide = 0;
    let autoPlayTimer;
    
    // Create dots if they don't exist
    if (!carousel.querySelector('.carousel-controls')) {
        const controls = document.createElement('div');
        controls.className = 'carousel-controls';
        
        for (let i = 0; i < slideCount; i++) {
            const dot = document.createElement('div');
            dot.className = 'carousel-dot';
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(i));
            controls.appendChild(dot);
        }
        
        carousel.appendChild(controls);
    }
    
    // Create prev/next buttons
    if (!carousel.querySelector('.carousel-arrows')) {
        const arrowsContainer = document.createElement('div');
        arrowsContainer.className = 'carousel-arrows absolute inset-x-0 top-1/2 flex justify-between items-center px-4 transform -translate-y-1/2';
        
        const prevButton = document.createElement('button');
        prevButton.className = 'bg-white bg-opacity-50 hover:bg-opacity-75 p-2 rounded-full shadow-md text-gray-800 hover:text-gray-900 transition-all transform hover:scale-110';
        prevButton.innerHTML = '<i class="fas fa-chevron-left"></i>';
        prevButton.addEventListener('click', prevSlide);
        
        const nextButton = document.createElement('button');
        nextButton.className = 'bg-white bg-opacity-50 hover:bg-opacity-75 p-2 rounded-full shadow-md text-gray-800 hover:text-gray-900 transition-all transform hover:scale-110';
        nextButton.innerHTML = '<i class="fas fa-chevron-right"></i>';
        nextButton.addEventListener('click', nextSlide);
        
        arrowsContainer.appendChild(prevButton);
        arrowsContainer.appendChild(nextButton);
        carousel.appendChild(arrowsContainer);
    }
    
    function goToSlide(index) {
        currentSlide = index;
        
        // Update carousel position with smooth transition
        carouselInner.style.transform = `translateX(-${currentSlide * 100}%)`;
        
        // Update dots
        const dots = carousel.querySelectorAll('.carousel-dot');
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentSlide);
        });
        
        // Reset autoplay timer
        if (autoPlayTimer) {
            clearTimeout(autoPlayTimer);
            startAutoPlay();
        }
    }
    
    function nextSlide() {
        goToSlide((currentSlide + 1) % slideCount);
    }
    
    function prevSlide() {
        goToSlide((currentSlide - 1 + slideCount) % slideCount);
    }
    
    function startAutoPlay() {
        autoPlayTimer = setTimeout(() => {
            nextSlide();
            startAutoPlay();
        }, 5000); // Change slide every 5 seconds
    }
    
    function stopAutoPlay() {
        clearTimeout(autoPlayTimer);
    }
    
    // Initialize autoplay
    startAutoPlay();
    
    // Pause autoplay on hover
    carousel.addEventListener('mouseenter', stopAutoPlay);
    carousel.addEventListener('mouseleave', startAutoPlay);
    
    // Handle touch events for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    carousel.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    carousel.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        if (touchEndX < touchStartX - swipeThreshold) {
            nextSlide(); // Swipe left -> next slide
        } else if (touchEndX > touchStartX + swipeThreshold) {
            prevSlide(); // Swipe right -> previous slide
        }
    }
}

// Enhanced Newsletter Popup functionality
function initNewsletterPopup() {
    const popup = document.querySelector('.newsletter-popup');
    const overlay = document.querySelector('.popup-overlay');
    const closeBtn = document.querySelector('.close-popup');
    
    if (!popup || !overlay || !closeBtn) return;
    
    const showPopup = () => {
        overlay.style.display = 'block';
        popup.style.display = 'block';
        
        setTimeout(() => {
            overlay.classList.add('show');
            popup.classList.add('show');
            popup.classList.add('pulse-animation');
        }, 50);
    };
    
    const hidePopup = () => {
        popup.classList.remove('show');
        overlay.classList.remove('show');
        
        setTimeout(() => {
            popup.style.display = 'none';
            overlay.style.display = 'none';
        }, 300);
    };
    
    // Show popup after 5 seconds
    if (!localStorage.getItem('popupShown')) {
        setTimeout(showPopup, 5000);
    }
    
    // Close popup on close button click
    closeBtn.addEventListener('click', () => {
        hidePopup();
        localStorage.setItem('popupShown', 'true');
    });
    
    // Close popup on overlay click
    overlay.addEventListener('click', hidePopup);
    
    // Handle form submission
    const form = popup.querySelector('form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const emailInput = form.querySelector('input[type="email"]');
            if (emailInput && emailInput.value) {
                // Simulate submission success
                form.innerHTML = `
                    <div class="text-green-500 mb-4">
                        <i class="fas fa-check-circle text-3xl"></i>
                        <p class="font-bold mt-2">Thank you for subscribing!</p>
                        <p>Your discount code: WELCOME10</p>
                    </div>
                `;
                
                localStorage.setItem('popupShown', 'true');
                
                setTimeout(hidePopup, 3000);
            }
        });
    }
}

// Form validation for the newsletter form
function initFormValidation() {
    // Get all forms on the page
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            let hasError = false;
            
            // Check all required inputs
            const requiredInputs = form.querySelectorAll('[required]');
            requiredInputs.forEach(input => {
                const errorMsg = input.nextElementSibling;
                
                if (!input.value.trim()) {
                    e.preventDefault();
                    input.classList.add('border-red-500');
                    hasError = true;
                    
                    // Add error message if it doesn't exist
                    if (!errorMsg || !errorMsg.classList.contains('text-red-500')) {
                        const msg = document.createElement('p');
                        msg.className = 'text-red-500 text-sm mt-1';
                        msg.textContent = 'This field is required';
                        input.parentNode.insertBefore(msg, input.nextSibling);
                    }
                } else {
                    input.classList.remove('border-red-500');
                    // Remove error message if it exists
                    if (errorMsg && errorMsg.classList.contains('text-red-500')) {
                        errorMsg.remove();
                    }
                    
                    // Validate email format if input is email
                    if (input.type === 'email' && !validateEmail(input.value)) {
                        e.preventDefault();
                        input.classList.add('border-red-500');
                        hasError = true;
                        
                        if (!errorMsg || !errorMsg.classList.contains('text-red-500')) {
                            const msg = document.createElement('p');
                            msg.className = 'text-red-500 text-sm mt-1';
                            msg.textContent = 'Please enter a valid email address';
                            input.parentNode.insertBefore(msg, input.nextSibling);
                        }
                    }
                }
            });
            
            // Show success message if no errors
            if (!hasError && form.classList.contains('newsletter-form')) {
                e.preventDefault();
                const successMsg = document.createElement('div');
                successMsg.className = 'text-green-500 text-center py-2 fade-in';
                successMsg.innerHTML = '<p>Thank you for subscribing!</p>';
                
                form.innerHTML = '';
                form.appendChild(successMsg);
            }
        });
    });
    
    // Email validation function
    function validateEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
}

// Enhanced functionality to load featured menu items
function loadFeaturedItems() {
    const featuredItems = [
        {
            name: 'Zinger Burger',
            description: 'Crispy chicken patty with fresh lettuce and mayo.',
            price: 5.99,
            image: 'https://images.unsplash.com/photo-1604908177525-1b6b3d5b5f3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
        },
        {
            name: 'Biryani',
            description: 'Aromatic rice with tender chicken and spices.',
            price: 7.99,
            image: 'https://images.unsplash.com/photo-1600628421384-2c4f4c2b8b2e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
        },
        {
            name: 'Chocolate Cake',
            description: 'Rich and moist chocolate cake with frosting.',
            price: 4.99,
            image: 'https://images.unsplash.com/photo-1604917877937-0d7c9f9d6b6b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
        },
        {
            name: 'Pizza',
            description: 'Cheesy pizza with fresh toppings and herbs.',
            price: 8.99,
            image: 'https://images.unsplash.com/photo-1601924579440-1a7a7f5c5c3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
        },
        {
            name: 'Pasta',
            description: 'Creamy Alfredo pasta with chicken and herbs.',
            price: 6.99,
            image: 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
        },
        {
            name: 'Ice Cream',
            description: 'Delicious vanilla ice cream with toppings.',
            price: 3.99,
            image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1527&q=80'
        }
    ];
    
    // Get trending dishes container
    const trendingContainer = document.querySelector('#trending-dishes .grid');
    
    if (trendingContainer) {
        // Clear container first if needed
        // trendingContainer.innerHTML = '';
        
        // Update card images to fix the duplicated image issues
        const cards = trendingContainer.querySelectorAll('.bg-white');
        if (cards.length === featuredItems.length) {
            cards.forEach((card, index) => {
                const img = card.querySelector('img');
                if (img && featuredItems[index]) {
                    img.src = featuredItems[index].image;
                    
                    // Update add to cart button to use our enhanced function
                    const button = card.querySelector('button');
                    if (button) {
                        button.setAttribute('onclick', `addToCart('${featuredItems[index].name}', ${featuredItems[index].price}, '${featuredItems[index].image}')`);
                    }
                }
            });
        }
    }
}

// Enhanced scroll reveal functionality
function revealOnScroll() {
    const elements = document.querySelectorAll('.reveal');
    const windowHeight = window.innerHeight;
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('active');
        } else {
            element.classList.remove('active');
        }
    });
}

// Call revealOnScroll on load and scroll
window.addEventListener('load', revealOnScroll);
window.addEventListener('scroll', revealOnScroll);