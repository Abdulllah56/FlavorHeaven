document.addEventListener('DOMContentLoaded', function() {
    // Initialize menu page
    initMenuPage();

    // Modal Add to Cart functionality
    const modalAddToCartBtn = document.getElementById('modal-add-to-cart');
    if (modalAddToCartBtn) {
        modalAddToCartBtn.addEventListener('click', function(e) {
            e.preventDefault();
            // Gather item details from modal
            const title = document.getElementById('modal-title').textContent;
            const price = parseFloat(document.getElementById('modal-price').textContent.replace('$', ''));
            const image = document.getElementById('modal-main-image').src;
            const description = document.getElementById('modal-description').textContent;
            const quantity = parseInt(document.getElementById('item-quantity').value) || 1;

            // Compose item object
            const item = {
                id: `${title}-${price}-${image}`,
                name: title,
                price: price,
                image: image,
                description: description,
                quantity: quantity
            };

            // Add to cart (will increment if already exists)
            addToCart(item);
            // Trigger cart update in main.js
            window.dispatchEvent(new Event('storage'));
        });
    }
});

/**
 * Initialize the menu page
 */
function initMenuPage() {
    // Load menu items
    loadMenuItems();
    
    // Setup category filters
    setupCategoryFilters();
    
    // Setup dietary filters
    setupDietaryFilters();
    
    // Setup sorting
    setupSorting();
    
    // Setup search functionality
    setupSearch();
    
    // Setup mobile menu
    setupMobileMenu();
    
    // Initialize cart count
    updateCartCount();
}

/**
 * Setup mobile menu functionality
 */
function setupMobileMenu() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileMenuClose = document.querySelector('.mobile-menu-close');
    
    if (mobileMenuToggle && mobileMenu && mobileMenuClose) {
        mobileMenuToggle.addEventListener('click', () => {
            mobileMenu.classList.remove('-translate-x-full');
            mobileMenu.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
        });
        
        mobileMenuClose.addEventListener('click', () => {
            mobileMenu.classList.add('-translate-x-full');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = ''; // Re-enable scrolling
        });
        
        // Close menu when clicking on a mobile menu item
        const mobileMenuItems = document.querySelectorAll('.mobile-menu-items a');
        mobileMenuItems.forEach(item => {
            item.addEventListener('click', function() {
                mobileMenu.classList.add('-translate-x-full');
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }
}

/**
 * Load menu items from the server or create sample items
 */
function loadMenuItems() {
    const menuItemsContainer = document.getElementById('menu-items');
    if (!menuItemsContainer) return;
    
    // Clear loading message
    menuItemsContainer.innerHTML = '';
    
    // Try to fetch menu items from the server
    fetch('/api/menu')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(menuItems => {
            if (menuItems && menuItems.length > 0) {
                // Render menu items from the server
                renderMenuItems(menuItems);
            } else {
                // If no items returned, create sample items
                createSampleMenuItems();
            }
        })
        .catch(error => {
            console.error('Error fetching menu items:', error);
            // Create sample menu items if fetch fails
            createSampleMenuItems();
        });
}

/**
 * Create sample menu items for demonstration
 */
function createSampleMenuItems() {
    const sampleItems = [
        // Starters
        {
            id: 'starter-1',
            name: 'Vegetable Samosa',
            description: 'Crispy pastry filled with spiced potatoes and peas, served with mint chutney',
            price: 6.99,
            category: 'starters',
            image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
            dietaryTags: ['vegetarian'],
            featured: true
        },
        {
            id: 'starter-2',
            name: 'Spring Rolls',
            description: 'Crispy Vietnamese spring rolls with vegetables and glass noodles',
            price: 7.99,
            category: 'starters',
            image: 'https://images.unsplash.com/photo-1544601284-28e67fe4c36c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80',
            dietaryTags: ['vegetarian', 'vegan'],
            featured: false
        },
        {
            id: 'starter-3',
            name: 'Buffalo Wings',
            description: 'Crispy chicken wings tossed in spicy buffalo sauce, served with blue cheese dip',
            price: 9.99,
            category: 'starters',
            image: 'https://images.unsplash.com/photo-1587495153193-82958a80b661?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
            dietaryTags: ['spicy'],
            featured: false
        },
        {
            id: 'starter-4',
            name: 'Garlic Bread',
            description: 'Freshly baked bread with garlic butter and herbs, topped with melted cheese',
            price: 5.99,
            category: 'starters',
            image: 'https://images.unsplash.com/photo-1573140401552-3fab0b24427f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
            dietaryTags: ['vegetarian'],
            featured: false
        },
        // Main Dishes - Pakistani
        {
            id: 'main-1',
            name: 'Butter Chicken',
            description: 'Tender chicken in rich tomato-based curry sauce with butter and cream',
            price: 18.99,
            category: 'main-dishes',
            image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
            dietaryTags: [],
            featured: true
        },
        {
            id: 'main-2',
            name: 'Biryani',
            description: 'Aromatic rice dish with tender meat, saffron, and exotic spices',
            price: 16.99,
            category: 'main-dishes',
            image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
            dietaryTags: ['spicy'],
            featured: true
        },
        {
            id: 'main-3',
            name: 'Zinger Burger',
            description: 'Crispy chicken patty with special sauce, lettuce, and tomato in a toasted bun',
            price: 12.99,
            category: 'main-dishes',
            image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
            dietaryTags: ['spicy'],
            featured: false
        },
        {
            id: 'main-4',
            name: 'Vegetable Curry',
            description: 'Mixed seasonal vegetables cooked in aromatic curry sauce with Indian spices',
            price: 14.99,
            category: 'main-dishes',
            image: 'https://images.unsplash.com/photo-1631292784640-2b24be416462?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80',
            dietaryTags: ['vegetarian', 'vegan', 'gluten-free'],
            featured: false
        },
        {
            id: 'main-5',
            name: 'Grilled Salmon',
            description: 'Fresh Atlantic salmon fillet grilled to perfection, served with seasonal vegetables',
            price: 22.99,
            category: 'main-dishes',
            image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
            dietaryTags: ['gluten-free'],
            featured: true
        },
        // Fast Food
        {
            id: 'fast-1',
            name: 'Seekh Kebab Roll',
            description: 'Grilled spiced meat wrapped in paratha with mint chutney',
            price: 9.99,
            category: 'fast-food',
            image: 'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
            dietaryTags: ['spicy'],
            featured: true
        },
        {
            id: 'fast-2',
            name: 'Crispy Fried Chicken',
            description: 'Juicy chicken pieces coated in our secret spices and deep-fried to perfection',
            price: 10.99,
            category: 'fast-food',
            image: 'https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
            dietaryTags: [],
            featured: false
        },
        {
            id: 'fast-3',
            name: 'Classic Pizza',
            description: 'Hand-tossed pizza with tomato sauce, mozzarella cheese, and fresh toppings',
            price: 13.99,
            category: 'fast-food',
            image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
            dietaryTags: ['vegetarian'],
            featured: false
        },
        {
            id: 'fast-4',
            name: 'Loaded Nachos',
            description: 'Crispy tortilla chips topped with melted cheese, guacamole, salsa, and sour cream',
            price: 8.99,
            category: 'fast-food',
            image: 'https://images.unsplash.com/photo-1582169296194-e4d644c48063?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
            dietaryTags: ['vegetarian', 'gluten-free'],
            featured: false
        },
        // Desserts
        {
            id: 'dessert-1',
            name: 'Gulab Jamun',
            description: 'Sweet milk dough balls soaked in rose-scented syrup',
            price: 5.99,
            category: 'desserts',
            image: 'https://images.unsplash.com/photo-1589119908995-c6837fa14848?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
            dietaryTags: ['vegetarian'],
            featured: false
        },
        {
            id: 'dessert-2',
            name: 'Chocolate Lava Cake',
            description: 'Warm chocolate cake with a molten center, served with vanilla ice cream',
            price: 7.99,
            category: 'desserts',
            image: 'https://images.unsplash.com/photo-1624353365286-2e5e90d797a1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
            dietaryTags: ['vegetarian'],
            featured: true
        },
        {
            id: 'dessert-3',
            name: 'Baklava',
            description: 'Layers of phyllo pastry, filled with chopped nuts and sweetened with honey',
            price: 6.99,
            category: 'desserts',
            image: 'https://images.unsplash.com/photo-1519676867240-f03562e64548?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
            dietaryTags: ['vegetarian'],
            featured: false
        },
        {
            id: 'dessert-4',
            name: 'Fresh Fruit Tart',
            description: 'Buttery pastry shell filled with custard and topped with fresh seasonal fruits',
            price: 8.99,
            category: 'desserts',
            image: 'https://images.unsplash.com/photo-1488477304112-4944851de03d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1587&q=80',
            dietaryTags: ['vegetarian'],
            featured: false
        },
    ];
    
    // Render the sample menu items
    renderMenuItems(sampleItems);
}

/**
 * Render menu items to the page
 * @param {Array} menuItems - Array of menu items to render
 */
function renderMenuItems(menuItems) {
    const menuItemsContainer = document.getElementById('menu-items');
    if (!menuItemsContainer) return;
    
    // Clear container
    menuItemsContainer.innerHTML = '';
    
    // Create HTML for each menu item
    menuItems.forEach(item => {
        const menuItemElement = document.createElement('div');
        menuItemElement.className = 'menu-item bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300';
        
        // Set data attributes
        menuItemElement.setAttribute('data-id', item.id);
        menuItemElement.setAttribute('data-category', item.category);
        menuItemElement.setAttribute('data-dietary-tags', JSON.stringify(item.dietaryTags || []));
        
        // Create dietary tags HTML
        let dietaryTagsHtml = '';
        if (item.dietaryTags && item.dietaryTags.length > 0) {
            dietaryTagsHtml = '<div class="mt-2 flex flex-wrap gap-1">';
            item.dietaryTags.forEach(tag => {
                let tagClass = '';
                let tagIcon = '';
                
                switch(tag) {
                    case 'vegetarian':
                        tagClass = 'bg-green-100 text-green-800';
                        tagIcon = '<i class="fas fa-leaf mr-1"></i>';
                        break;
                    case 'vegan':
                        tagClass = 'bg-green-200 text-green-800';
                        tagIcon = '<i class="fas fa-seedling mr-1"></i>';
                        break;
                    case 'gluten-free':
                        tagClass = 'bg-yellow-100 text-yellow-800';
                        tagIcon = '<i class="fas fa-wheat-awn-circle-exclamation mr-1"></i>';
                        break;
                    case 'spicy':
                        tagClass = 'bg-red-100 text-red-800';
                        tagIcon = '<i class="fas fa-pepper-hot mr-1"></i>';
                        break;
                    default:
                        tagClass = 'bg-gray-100 text-gray-800';
                        break;
                }
                
                dietaryTagsHtml += `<span class="inline-block px-2 py-1 text-xs rounded ${tagClass} mr-1">${tagIcon}${tag}</span>`;
            });
            dietaryTagsHtml += '</div>';
        } else {
            dietaryTagsHtml = '<div class="mt-2 flex flex-wrap gap-1">&nbsp;</div>';
        }
        
        // Create featured badge if applicable
        let featuredBadge = '';
        if (item.featured) {
            featuredBadge = '<div class="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">Featured</div>';
        }
        
        menuItemElement.innerHTML = `
            <div class="relative h-56 overflow-hidden">
                <img src="${item.image}" alt="${item.name}" class="w-full h-full object-cover transition-transform duration-500" loading="lazy" decoding="async">
                ${featuredBadge}
                <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end justify-center">
                    <div class="p-4 text-white w-full text-center">
                        <span class="font-bold bg-red-500 hover:bg-red-600 px-4 py-2 rounded-full inline-block transition-all duration-300 transform">View Details</span>
                    </div>
                </div>
            </div>
            <div class="p-4 flex flex-col flex-grow">
                <h3 class="text-xl font-bold text-gray-800 mb-2">${item.name}</h3>
                <p class="text-gray-600 mb-4 description">${item.description}</p>
                ${dietaryTagsHtml}
                <div class="flex justify-between items-center mt-auto pt-4 border-t border-gray-200">
                    <span class="text-xl font-bold text-gray-800 price">$${item.price.toFixed(2)}</span>
                    <button class="add-to-cart bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition transform">
                        <i class="fas fa-cart-plus mr-1"></i> Add
                    </button>
                </div>
            </div>
        `;
        
        menuItemsContainer.appendChild(menuItemElement);
        
        // Add animation
        animateMenuItemIn(menuItemElement);
    });
    
    // Setup menu items after rendering
    setupMenuItems();
    
    // Reinitialize filters after rendering
    setupCategoryFilters();
    setupDietaryFilters();
}

/**
 * Setup category filters
 */
function setupCategoryFilters() {
    const categoryButtons = document.querySelectorAll('.category-btn');
    const menuItems = document.querySelectorAll('.menu-item');
    
    if (categoryButtons.length === 0 || menuItems.length === 0) return;
    
    // Add click event to category buttons
    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            categoryButtons.forEach(btn => {
                btn.classList.remove('active', 'bg-red-500', 'text-white');
                btn.classList.add('bg-gray-200', 'text-gray-800');
            });
            
            // Add active class to clicked button
            this.classList.remove('bg-gray-200', 'text-gray-800');
            this.classList.add('active', 'bg-red-500', 'text-white');
            
            const category = this.dataset.category;
            
            // Show all items if "all" category is selected
            if (category === 'all') {
                menuItems.forEach(item => {
                    item.style.display = '';
                    animateMenuItemIn(item);
                });
                return;
            }
            
            // Filter items by category
            menuItems.forEach(item => {
                const itemCategory = item.getAttribute('data-category');
                if (itemCategory === category) {
                    item.style.display = '';
                    animateMenuItemIn(item);
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
    
    // Set "All" as active by default
    const allCategoryButton = document.querySelector('.category-btn[data-category="all"]');
    if (allCategoryButton) {
        allCategoryButton.classList.add('active', 'bg-red-500', 'text-white');
        allCategoryButton.classList.remove('bg-gray-200', 'text-gray-800');
    }
}

/**
 * Setup dietary filters
 */
function setupDietaryFilters() {
    const dietaryFilters = document.querySelectorAll('.dietary-filter');
    const menuItems = document.querySelectorAll('.menu-item');
    
    dietaryFilters.forEach(filter => {
        filter.addEventListener('change', function() {
            const selectedFilters = Array.from(dietaryFilters)
                .filter(f => f.checked)
                .map(f => f.value);
            
            // Get the active category
            const activeCategory = document.querySelector('.category-btn.active').dataset.category;
            
            menuItems.forEach(item => {
                const itemTags = JSON.parse(item.getAttribute('data-dietary-tags') || '[]');
                const matchesFilters = selectedFilters.length === 0 || 
                    selectedFilters.every(filter => itemTags.includes(filter));
                
                // Check if item matches both category and dietary filters
                const itemCategory = item.getAttribute('data-category');
                const matchesCategory = activeCategory === 'all' || itemCategory === activeCategory;
                
                if (matchesFilters && matchesCategory) {
                    item.style.display = '';
                    animateMenuItemIn(item);
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}

/**
 * Setup sorting
 */
function setupSorting() {
    const sortSelect = document.querySelector('.sort-select');
    if (!sortSelect) return;
    
    sortSelect.addEventListener('change', function() {
        const menuItemsContainer = document.getElementById('menu-items');
        const menuItems = Array.from(menuItemsContainer.children);
        
        menuItems.sort((a, b) => {
            const nameA = a.querySelector('h3').textContent;
            const nameB = b.querySelector('h3').textContent;
            const priceA = parseFloat(a.querySelector('.price').textContent.replace('$', ''));
            const priceB = parseFloat(b.querySelector('.price').textContent.replace('$', ''));
            
            switch(this.value) {
                case 'name-asc':
                    return nameA.localeCompare(nameB);
                case 'name-desc':
                    return nameB.localeCompare(nameA);
                case 'price-asc':
                    return priceA - priceB;
                case 'price-desc':
                    return priceB - priceA;
                default:
                    return 0;
            }
        });
        
        // Clear container
        menuItemsContainer.innerHTML = '';
        
        // Re-append sorted items
        menuItems.forEach(item => {
            menuItemsContainer.appendChild(item);
            animateMenuItemIn(item);
        });
    });
}

/**
 * Setup search functionality
 */
function setupSearch() {
    const searchInput = document.getElementById('menu-search');
    const noResultsMessage = document.getElementById('no-results-message');
    const resetFiltersBtn = document.getElementById('reset-filters');
    
    if (!searchInput) return;
    
    searchInput.addEventListener('input', debounce(function() {
        const searchTerm = this.value.toLowerCase().trim();
        const menuItems = document.querySelectorAll('.menu-item');
        let hasResults = false;
        
        menuItems.forEach(item => {
            const title = item.querySelector('h3').textContent.toLowerCase();
            const description = item.querySelector('.description').textContent.toLowerCase();
            const isMatch = title.includes(searchTerm) || description.includes(searchTerm);
            
            if (isMatch) {
                item.style.display = '';
                hasResults = true;
            } else {
                item.style.display = 'none';
            }
        });
        
        // Show or hide the "no results" message
        if (hasResults) {
            if (noResultsMessage) noResultsMessage.classList.add('hidden');
        } else {
            if (noResultsMessage) noResultsMessage.classList.remove('hidden');
        }
    }, 300));
    
    // Reset filters button
    if (resetFiltersBtn) {
        resetFiltersBtn.addEventListener('click', function() {
            // Clear search input
            if (searchInput) searchInput.value = '';
            
            // Reset category buttons
            const allCategoryBtn = document.querySelector('.category-btn[data-category="all"]');
            if (allCategoryBtn) {
                allCategoryBtn.click();
            }
            
            // Uncheck dietary filters
            const dietaryFilters = document.querySelectorAll('.dietary-filter');
            dietaryFilters.forEach(filter => {
                filter.checked = false;
            });
            
            // Reset sorting
            const sortSelect = document.querySelector('.sort-select');
            if (sortSelect) {
                sortSelect.value = 'name-asc';
                sortSelect.dispatchEvent(new Event('change'));
            }
            
            // Show all menu items
            const menuItems = document.querySelectorAll('.menu-item');
            menuItems.forEach(item => {
                item.style.display = '';
            });
            
            // Hide the "no results" message
            if (noResultsMessage) noResultsMessage.classList.add('hidden');
        });
    }
}

/**
 * Debounce function to limit the rate at which a function can fire
 * @param {Function} func - The function to debounce
 * @param {number} delay - The delay in milliseconds
 * @return {Function} - The debounced function
 */
function debounce(func, delay) {
    let debounceTimer;
    return function() {
        const context = this;
        const args = arguments;
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => func.apply(context, args), delay);
    };
}

/**
 * Setup menu items
 */
function setupMenuItems() {
    const menuItems = document.querySelectorAll('.menu-item');
    const itemModal = document.getElementById('item-modal');
    
    if (menuItems.length === 0) return;
    
    // Add unique IDs to menu items if they don't have them
    menuItems.forEach((item, index) => {
        if (!item.dataset.id) {
            item.dataset.id = `menu-item-${index + 1}`;
        }
        
        // Add click event to "Add to Cart" button
        const addToCartButton = item.querySelector('.add-to-cart');
        if (addToCartButton) {
            addToCartButton.addEventListener('click', function(e) {
                e.preventDefault();
                
                const itemId = item.dataset.id;
                const itemName = item.querySelector('h3').textContent;
                const itemPrice = parseFloat(item.querySelector('.price').textContent.replace('$', ''));
                const itemImage = item.querySelector('img')?.src || '';
                const itemDescription = item.querySelector('.description')?.textContent || '';
                
                // Add to cart
                addToCart({
                    id: itemId,
                    name: itemName,
                    price: itemPrice,
                    image: itemImage,
                    description: itemDescription,
                    quantity: 1
                });
                // Trigger cart update in main.js
                window.dispatchEvent(new Event('storage'));
            });
        }
        
        // Add click event to the item image and View Details button to open modal
        const itemImageContainer = item.querySelector('.relative');
        const viewDetailsButton = item.querySelector('.relative .absolute span');
        
        if (itemImageContainer && itemModal) {
            itemImageContainer.style.cursor = 'pointer';
            
            // Function to open modal with item details
            const openItemModal = function(e) {
                // Prevent triggering if clicking on Add to Cart button
                if (e.target.closest('.add-to-cart')) return;
                
                const itemName = item.querySelector('h3').textContent;
                const itemPrice = item.querySelector('.price').textContent;
                const itemImage = item.querySelector('img').src;
                const itemDescription = item.querySelector('.description').textContent;
                
                // Populate modal with item details
                document.getElementById('modal-title').textContent = itemName;
                document.getElementById('modal-price').textContent = itemPrice;
                document.getElementById('modal-main-image').src = itemImage;
                document.getElementById('modal-description').textContent = itemDescription;
                
                // Show modal
                itemModal.classList.remove('hidden');
                document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
            };
            
            // Add click event to image container
            itemImageContainer.addEventListener('click', openItemModal);
            
            // Add click event to View Details button if it exists
            if (viewDetailsButton) {
                viewDetailsButton.addEventListener('click', function(e) {
                    e.stopPropagation(); // Prevent triggering the container's click event
                    openItemModal(e);
                });
            }
        }
    });
    
    // Setup modal close button
    const closeModalButton = document.getElementById('close-modal');
    if (closeModalButton && itemModal) {
        closeModalButton.addEventListener('click', function() {
            itemModal.classList.add('hidden');
            document.body.style.overflow = ''; // Re-enable scrolling
        });
        
        // Close modal when clicking outside the content
        itemModal.addEventListener('click', function(e) {
            if (e.target === itemModal) {
                itemModal.classList.add('hidden');
                document.body.style.overflow = '';
            }
        });
    }
}

/**
 * Add an item to the cart
 * @param {Object} item - The menu item to add to cart
 */
function addToCart(item) {
    if (!item || !item.name || !item.price) {
        console.error('Invalid item data:', item);
        showNotification('Error: Invalid item data', 'error');
        return;
    }

    // Get existing cart data
    let cart = [];
    try {
        const cartData = localStorage.getItem('cart');
        cart = cartData ? JSON.parse(cartData) : [];
        
    // Validate cart data structure
    if (!Array.isArray(cart)) {
        console.error('Invalid cart data structure');
        cart = [];
    }
} catch (error) {
    console.error('Error reading cart data:', error);
    cart = [];
}

// Sanitize the item data
let sanitizedItem = {
    id: item.id || `item-${Date.now()}-${Math.random().toString(36).substring(2, 11)}`,
    name: item.name.trim(),
    description: (item.description || '').trim(),
    price: parseFloat(item.price) || 0,
    image: item.image || '/images/menu/placeholder.jpg',
    quantity: parseInt(item.quantity) || 1,
    category: (item.category || '').trim(),
    dietaryTags: Array.isArray(item.dietaryTags) ? item.dietaryTags : []
};

    // Check if item already exists in cart
    const existingItemIndex = cart.findIndex(cartItem => cartItem.id === sanitizedItem.id);
    
    if (existingItemIndex !== -1) {
        // Update quantity if item exists
        cart[existingItemIndex].quantity += sanitizedItem.quantity;
    } else {
        // Add new item to cart
        cart.push(sanitizedItem);
    }
    
    // Save updated cart to localStorage
    try {
        localStorage.setItem('cart', JSON.stringify(cart));
        
        // Dispatch storage event for cross-page communication
        window.dispatchEvent(new Event('storage'));
    } catch (error) {
        console.error('Error saving cart data:', error);
        showNotification('Error saving to cart', 'error');
        return;
    }
    
    // Update cart count with animation
    updateCartCount();
    
    // Show success notification
    showNotification(`${sanitizedItem.name} added to cart!`, 'success');
}

/**
 * Show a notification message
 * @param {string} message - Message to display
 * @param {string} type - Type of notification ('success' or 'error')
 */
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `fixed top-20 right-5 p-4 rounded-lg shadow-lg z-50 ${
        type === 'success' ? 'bg-green-500' : 'bg-red-500'
    } text-white transform transition-all duration-300`;
    notification.textContent = message;

    document.body.appendChild(notification);
    
    // Trigger animation
    setTimeout(() => {
        notification.style.transform = 'translateX(120%)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 2000);
}

/**
 * Update the cart count in the header
 */
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const count = cart.reduce((total, item) => total + (parseInt(item.quantity) || 0), 0);
    const cartCount = document.querySelectorAll('.cart-count');
    
    cartCount.forEach(counter => {
        if (counter) {
            counter.textContent = count.toString();
            counter.style.display = count > 0 ? 'flex' : 'none';
            // Add animation class
            counter.classList.remove('active');
            void counter.offsetWidth; // Trigger reflow
            counter.classList.add('active');
        }
    });

    // Also update cart icon if it exists
    const cartIcon = document.querySelector('.cart-icon');
    if (cartIcon) {
        cartIcon.classList.toggle('has-items', count > 0);
    }
}

/**
 * Animate a menu item in
 * @param {HTMLElement} item - The menu item element
 */
function animateMenuItemIn(item) {
    item.style.opacity = '0';
    item.style.transform = 'translateY(20px)';
    
    // Trigger animation after a small delay based on position
    const index = Array.from(item.parentNode.children).indexOf(item);
    const delay = 50 + (index * 50); // Staggered delay
    
    setTimeout(() => {
        item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        item.style.opacity = '1';
        item.style.transform = 'translateY(0)';
    }, delay);
}

// Removed duplicate addToCart function as it's already defined above