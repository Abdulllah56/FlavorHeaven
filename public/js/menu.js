// Menu Data
const menuData = {
    'starters': [
        {
            id: 'bruschetta-1',
            name: 'Bruschetta',
            description: 'Grilled bread topped with fresh tomatoes, basil, and mozzarella',
            price: 8.99,
            image: 'https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
            category: 'starters',
            dietary: ['vegetarian'],
            spicy: false,
            popular: true
        },
        {
            id: 'calamari-1',
            name: 'Fried Calamari',
            description: 'Crispy fried squid rings served with marinara sauce',
            price: 12.99,
            image: 'https://diethood.com/wp-content/uploads/2021/08/air-fryer-calamari-8.jpg',
            category: 'starters',
            dietary: [],
            spicy: false,
            popular: false
        },
        {
            id: 'wings-1',
            name: 'Buffalo Wings',
            description: 'Spicy chicken wings with blue cheese dip',
            price: 11.99,
            image: 'https://easychickenrecipes.com/wp-content/uploads/2023/08/featured-buffalo-wings-recipe.jpg',
            category: 'starters',
            dietary: ['spicy'],
            spicy: true,
            popular: true
        }
    ],
    'main-dishes': [
        {
            id: 'salmon-1',
            name: 'Grilled Salmon',
            description: 'Fresh Atlantic salmon with lemon butter sauce and seasonal vegetables',
            price: 24.99,
            image: 'https://www.thecookierookie.com/wp-content/uploads/2023/05/featured-grilled-salmon-recipe.jpg',
            category: 'main-dishes',
            dietary: ['gluten-free'],
            spicy: false,
            popular: true
        },
        {
            id: 'steak-1',
            name: 'Wagyu Steak',
            description: 'Premium Wagyu beef steak with red wine reduction and truffle mashed potatoes',
            price: 39.99,
            image: 'https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80',
            category: 'main-dishes',
            dietary: ['gluten-free'],
            spicy: false,
            popular: true
        },
        {
            id: 'biryani-1',
            name: 'Chicken Biryani',
            description: 'Aromatic basmati rice with tender chicken, exotic spices, and saffron',
            price: 18.99,
            image: 'https://www.cubesnjuliennes.com/wp-content/uploads/2020/07/Chicken-Biryani-Recipe.jpg',
            category: 'main-dishes',
            dietary: ['spicy'],
            spicy: true,
            popular: true
        },
        {
            id: 'pasta-1',
            name: 'Truffle Pasta',
            description: 'Homemade fettuccine with black truffle cream sauce and wild mushrooms',
            price: 22.99,
            image: 'https://dinnerthendessert.com/wp-content/uploads/2023/07/Truffle-Pasta-17.jpg',
            category: 'main-dishes',
            dietary: ['vegetarian'],
            spicy: false,
            popular: false
        },
        {
            id: 'nihari-1',
            name: 'Beef Nihari',
            description: 'Traditional Pakistani slow-cooked beef stew with aromatic spices, garnished with fresh ginger and cilantro',
            price: 19.99,
            image: 'https://i.ytimg.com/vi/vitJTfvnSI8/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLBVVanGHNzUzhHI9F8bd67O9I8FKw',
            category: 'main-dishes',
            dietary: ['spicy'],
            spicy: true,
            popular: false
        },
        {
            id: 'karahi-1',
            name: 'Chicken Karahi',
            description: 'Spicy Pakistani chicken curry cooked in a wok with tomatoes, green chilies, and freshly ground spices',
            price: 17.99,
            image: 'https://kfoods.com/images1/newrecipeicon/red-chicken-karahi_12370.jpg',
            category: 'main-dishes',
            dietary: ['spicy'],
            spicy: true,
            popular: true
        },
        {
            id: 'haleem-1',
            name: 'Haleem',
            description: 'Slow-cooked Pakistani stew with wheat, lentils, and tender shredded meat, topped with fried onions and lemon',
            price: 16.99,
            image: 'https://headbangerskitchen.com/wp-content/uploads/2024/07/HALEEM-Horizontal1.jpg',
            category: 'main-dishes',
            dietary: ['spicy'],
            spicy: true,
            popular: false
        }
    ],
    'fast-food': [
        {
            id: 'burger-1',
            name: 'Zinger Burger',
            description: 'Crispy chicken patty with fresh lettuce, tomatoes, and spicy mayo sauce',
            price: 12.99,
            image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
            category: 'fast-food',
            dietary: ['spicy'],
            spicy: true,
            popular: true
        },
        {
            id: 'pizza-1',
            name: 'Margherita Pizza',
            description: 'Classic Italian pizza with fresh mozzarella, tomatoes, and basil',
            price: 16.99,
            image: 'https://allforpizza.com/wp-content/uploads/2022/07/1460A7EC-CF3B-40E8-B05F-A21E12E85EC6.jpeg',
            category: 'fast-food',
            dietary: ['vegetarian'],
            spicy: false,
            popular: true
        },
        {
            id: 'pasta-alfredo-1',
            name: 'Chicken Alfredo',
            description: 'Creamy Alfredo fettuccine pasta with grilled chicken and herbs',
            price: 15.99,
            image: 'https://eatinginaninstant.com/wp-content/uploads/2022/08/IP-Chicken-Alfredo-8-1200.jpg',
            category: 'fast-food',
            dietary: [],
            spicy: false,
            popular: false
        }
    ],
    'desserts': [
        {
            id: 'chocolate-cake-1',
            name: 'Chocolate Cake',
            description: 'Rich and moist chocolate cake with creamy chocolate frosting and berries',
            price: 7.99,
            image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1489&q=80',
            category: 'desserts',
            dietary: ['vegetarian'],
            spicy: false,
            popular: true
        },
        {
            id: 'ice-cream-1',
            name: 'Ice Cream Sundae',
            description: 'Premium vanilla ice cream with chocolate sauce, nuts, and cherry',
            price: 6.99,
            image: 'https://www.keep-calm-and-eat-ice-cream.com/wp-content/uploads/2022/08/Ice-cream-sundae-hero-11.jpg',
            category: 'desserts',
            dietary: ['vegetarian'],
            spicy: false,
            popular: false
        },
        {
            id: 'tiramisu-1',
            name: 'Tiramisu',
            description: 'Classic Italian coffee-flavored dessert with mascarpone cheese',
            price: 8.99,
            image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1540&q=80',
            category: 'desserts',
            dietary: ['vegetarian'],
            spicy: false,
            popular: true
        }
    ]
};

// Current filters
let currentFilters = {
    category: 'all',
    dietary: [],
    priceRange: 'all',
    search: '',
    sort: 'name-asc'
};

// Initialize menu functionality
document.addEventListener('DOMContentLoaded', function() {
    initMenuFilters();
    initMenuSearch();
    loadMenuItems();
    initItemModal();
});

// Initialize menu filters
function initMenuFilters() {
    // Category buttons
    const categoryBtns = document.querySelectorAll('.category-btn');
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Update active state
            categoryBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            // Update filter
            currentFilters.category = this.dataset.category;
            applyAllFilters();
        });
    });

    // Dietary filters
    const dietaryFilters = document.querySelectorAll('.dietary-filter');
    dietaryFilters.forEach(filter => {
        filter.addEventListener('change', function() {
            if (this.checked) {
                currentFilters.dietary.push(this.value);
            } else {
                currentFilters.dietary = currentFilters.dietary.filter(d => d !== this.value);
            }
            applyAllFilters();
        });
    });

    // Price range filters
    const priceFilters = document.querySelectorAll('.price-filter');
    priceFilters.forEach(filter => {
        filter.addEventListener('change', function() {
            currentFilters.priceRange = this.value;
            applyAllFilters();
        });
    });

    // Sort filter
    const sortSelect = document.querySelector('.sort-select');
    if (sortSelect) {
        sortSelect.addEventListener('change', function() {
            currentFilters.sort = this.value;
            applyAllFilters();
        });
    }

    // Reset filters
    document.getElementById('reset-filters').addEventListener('click', function() {
        // Reset category
        currentFilters.category = 'all';
        document.querySelector('.category-btn[data-category="all"]').classList.add('active');
        categoryBtns.forEach(btn => {
            if (btn.dataset.category !== 'all') {
                btn.classList.remove('active');
            }
        });

        // Reset dietary
        currentFilters.dietary = [];
        dietaryFilters.forEach(filter => filter.checked = false);

        // Reset price range
        currentFilters.priceRange = 'all';
        document.querySelector('.price-filter[value="all"]').checked = true;

        // Reset sort
        currentFilters.sort = 'name-asc';
        if (sortSelect) sortSelect.value = 'name-asc';

        // Reset search
        currentFilters.search = '';
        const searchInput = document.getElementById('menu-search');
        if (searchInput) searchInput.value = '';

        applyAllFilters();
    });
}

// Initialize search functionality
function initMenuSearch() {
    const searchInput = document.getElementById('menu-search');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            currentFilters.search = this.value.toLowerCase();
            applyAllFilters();
        });
    }
}

// Apply all filters
function applyAllFilters() {
    let filteredItems = getAllMenuItems();

    // Apply category filter
    if (currentFilters.category !== 'all') {
        filteredItems = filteredItems.filter(item => item.category === currentFilters.category);
    }

    // Apply dietary filters
    if (currentFilters.dietary.length > 0) {
        filteredItems = filteredItems.filter(item => {
            return currentFilters.dietary.some(diet => {
                if (diet === 'spicy') return item.spicy;
                return item.dietary.includes(diet);
            });
        });
    }

    // Apply price range filter
    if (currentFilters.priceRange !== 'all') {
        filteredItems = filteredItems.filter(item => {
            switch (currentFilters.priceRange) {
                case 'budget': return item.price < 15;
                case 'premium': return item.price >= 15 && item.price <= 25;
                case 'luxury': return item.price > 25;
                default: return true;
            }
        });
    }

    // Apply search filter
    if (currentFilters.search) {
        filteredItems = filteredItems.filter(item => 
            item.name.toLowerCase().includes(currentFilters.search) ||
            item.description.toLowerCase().includes(currentFilters.search)
        );
    }

    // Apply sorting
    filteredItems.sort((a, b) => {
        switch (currentFilters.sort) {
            case 'name-asc': return a.name.localeCompare(b.name);
            case 'name-desc': return b.name.localeCompare(a.name);
            case 'price-asc': return a.price - b.price;
            case 'price-desc': return b.price - a.price;
            case 'popular': return b.popular - a.popular;
            default: return 0;
        }
    });

    renderMenuItems(filteredItems);
}

// Get all menu items
function getAllMenuItems() {
    return Object.values(menuData).flat();
}

// Load and render menu items
function loadMenuItems() {
    const container = document.getElementById('menu-items');
    if (!container) return;

    // Show loading
    container.innerHTML = `
        <div class="col-span-full flex justify-center items-center py-12">
            <div class="text-center">
                <div class="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500 mb-4"></div>
                <p class="text-gray-600">Loading menu items...</p>
            </div>
        </div>
    `;

    // Simulate loading delay
    setTimeout(() => {
        applyAllFilters();
    }, 500);
}

// Render menu items
function renderMenuItems(items) {
    const container = document.getElementById('menu-items');
    const noResultsMessage = document.getElementById('no-results-message');

    if (!container) return;

    if (items.length === 0) {
        container.innerHTML = '';
        if (noResultsMessage) {
            noResultsMessage.classList.remove('hidden');
        }
        return;
    }

    if (noResultsMessage) {
        noResultsMessage.classList.add('hidden');
    }

    container.innerHTML = items.map(item => createMenuItemHTML(item)).join('');

    // Add event listeners to add-to-cart buttons
    container.querySelectorAll('.add-to-cart-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const itemData = {
                id: this.dataset.id,
                name: this.dataset.name,
                price: parseFloat(this.dataset.price),
                image: this.dataset.image,
                description: this.dataset.description
            };

            if (typeof addToCart === 'function') {
                addToCart(itemData);
                showNotification(`${itemData.name} added to cart!`);
            }
        });
    });

    // Add event listeners to item cards for modal
    container.querySelectorAll('.menu-item-card').forEach(card => {
        card.addEventListener('click', function() {
            const itemId = this.dataset.id;
            const item = getAllMenuItems().find(i => i.id === itemId);
            if (item) {
                showItemModal(item);
            }
        });
    });
}

// Create menu item HTML
function createMenuItemHTML(item) {
    const dietaryTags = item.dietary.map(diet => {
        const tagClasses = {
            'vegetarian': 'bg-green-100 text-green-800',
            'vegan': 'bg-green-200 text-green-900',
            'gluten-free': 'bg-yellow-100 text-yellow-800',
            'spicy': 'bg-red-100 text-red-800'
        };
        return `<span class="dietary-tag ${tagClasses[diet] || 'bg-gray-100 text-gray-800'}">${diet}</span>`;
    }).join('');

    if (item.spicy && !item.dietary.includes('spicy')) {
        dietaryTags += `<span class="dietary-tag bg-red-100 text-red-800">spicy</span>`;
    }

    return `
        <div class="menu-item-card bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:scale-105 cursor-pointer" data-id="${item.id}">
            <div class="relative overflow-hidden h-48">
                <img src="${item.image}" alt="${item.name}" class="w-full h-full object-cover transition duration-300 hover:scale-110" loading="lazy" onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop&crop=center';" style="display: block;">
                ${item.popular ? '<div class="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">Popular</div>' : ''}
                <div class="absolute  hover:bg-opacity-10 transition-all duration-300"></div>
            </div>
            <div class="p-4">
                <div class="flex justify-between items-start mb-2">
                    <h3 class="text-lg font-bold text-gray-800 line-clamp-1">${item.name}</h3>
                    <span class="text-lg font-bold text-red-500 ml-2">$${item.price.toFixed(2)}</span>
                </div>
                <p class="text-gray-600 text-sm mb-3 line-clamp-2">${item.description}</p>
                ${dietaryTags ? `<div class="mb-3">${dietaryTags}</div>` : ''}
                <button 
                    class="add-to-cart-btn w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition duration-300 flex items-center justify-center"
                    data-id="${item.id}"
                    data-name="${item.name}"
                    data-price="${item.price}"
                    data-image="${item.image}"
                    data-description="${item.description}"
                    onclick="event.stopPropagation()"
                >
                    <i class="fas fa-cart-plus mr-2"></i>Add to Cart
                </button>
            </div>
        </div>
    `;
}

// Initialize item modal
function initItemModal() {
    const modal = document.getElementById('item-modal');
    const closeBtn = document.getElementById('close-modal');
    const quantityInput = document.getElementById('item-quantity');
    const decreaseBtn = document.getElementById('decrease-quantity');
    const increaseBtn = document.getElementById('increase-quantity');
    const addToCartBtn = document.getElementById('modal-add-to-cart');

    if (!modal) return;

    // Close modal
    if (closeBtn) {
        closeBtn.addEventListener('click', hideItemModal);
    }

    // Close modal on overlay click
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            hideItemModal();
        }
    });

    // Quantity controls
    if (decreaseBtn && quantityInput) {
        decreaseBtn.addEventListener('click', function() {
            const currentValue = parseInt(quantityInput.value);
            if (currentValue > 1) {
                quantityInput.value = currentValue - 1;
            }
        });
    }

    if (increaseBtn && quantityInput) {
        increaseBtn.addEventListener('click', function() {
            const currentValue = parseInt(quantityInput.value);
            quantityInput.value = currentValue + 1;
        });
    }

    // Add to cart from modal
    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', function() {
            const itemData = JSON.parse(this.dataset.item || '{}');
            const quantity = parseInt(quantityInput.value) || 1;

            // Set the quantity in the item data and add once
            itemData.quantity = quantity;
            
            if (typeof addToCart === 'function') {
                addToCart(itemData);
            }

            showNotification(`${quantity}x ${itemData.name} added to cart!`);
            hideItemModal();
        });
    }
}

// Show item modal
function showItemModal(item) {
    const modal = document.getElementById('item-modal');
    if (!modal) return;

    // Populate modal content
    document.getElementById('modal-title').textContent = item.name;
    document.getElementById('modal-description').textContent = item.description;
    document.getElementById('modal-price').textContent = `$${item.price.toFixed(2)}`;
    document.getElementById('modal-main-image').src = item.image;
    document.getElementById('modal-main-image').alt = item.name;

    // Reset quantity
    document.getElementById('item-quantity').value = 1;

    // Store item data for add to cart
    document.getElementById('modal-add-to-cart').dataset.item = JSON.stringify({
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image,
        description: item.description
    });

    // Show dietary tags
    const tagsContainer = document.getElementById('modal-dietary-tags');
    if (tagsContainer) {
        const dietaryTags = item.dietary.map(diet => {
            const tagClasses = {
                'vegetarian': 'bg-green-100 text-green-800',
                'vegan': 'bg-green-200 text-green-900',
                'gluten-free': 'bg-yellow-100 text-yellow-800',
                'spicy': 'bg-red-100 text-red-800'
            };
            return `<span class="dietary-tag ${tagClasses[diet] || 'bg-gray-100 text-gray-800'}">${diet}</span>`;
        }).join('');

        if (item.spicy && !item.dietary.includes('spicy')) {
            tagsContainer.innerHTML = dietaryTags + `<span class="dietary-tag bg-red-100 text-red-800">spicy</span>`;
        } else {
            tagsContainer.innerHTML = dietaryTags;
        }
    }

    // Show modal
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

// Hide item modal
function hideItemModal() {
    const modal = document.getElementById('item-modal');
    if (modal) {
        modal.classList.add('hidden');
        document.body.style.overflow = '';
    }
}

// Show notification
function showNotification(message) {
    const toast = document.getElementById('notification-toast');
    const messageEl = document.getElementById('notification-message');

    if (toast && messageEl) {
        messageEl.textContent = message;
        toast.classList.remove('translate-y-full', 'opacity-0');
        toast.classList.add('translate-y-0', 'opacity-100');

        setTimeout(() => {
            toast.classList.remove('translate-y-0', 'opacity-100');
            toast.classList.add('translate-y-full', 'opacity-0');
        }, 3000);
    }
}

// Make functions globally available
window.applyAllFilters = applyAllFilters;
window.showItemModal = showItemModal;
window.hideItemModal = hideItemModal;

document.addEventListener('DOMContentLoaded', function() {
    // Initialize menu page
    initMenuPage();
});

/**
 * Initialize the menu page
 */
function initMenuPage() {
    // Load menu items
    //loadMenuItems();

    // Setup category filters
    //setupCategoryFilters();

    // Setup dietary filters
    //setupDietaryFilters();

    // Setup sorting
    //setupSorting();

    // Setup search functionality
    //setupSearch();

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


//  * Load menu items from the server or create sample items
//  */
// // function loadMenuItems() {
// //     const menuItemsContainer = document.getElementById('menu-items');
// //     if (!menuItemsContainer) return;

// //     // Clear loading message
// //     menuItemsContainer.innerHTML = '';

// //     // Try to fetch menu items from the server
// //     fetch('/api/menu')
// //         .then(response => {
// //             if (!response.ok) {
// //                 throw new Error('Network response was not ok');
// //             }
// //             return response.json();
// //         })
// //         .then(menuItems => {
// //             if (menuItems && menuItems.length > 0) {
// //                 // Render menu items from the server
// //                 renderMenuItems(menuItems);
// //             } else {
// //                 // If no items returned, create sample items
// //                 createSampleMenuItems();
// //             }
// //         })
// //         .catch(error => {
// //             console.error('Error fetching menu items:', error);
// //             // Create sample menu items if fetch fails
// //             createSampleMenuItems();
// //         });
// // }

// /**
//  * Create sample menu items for demonstration
//  */
// // function createSampleMenuItems() {
// //     // Menu items data
// //     const menuItems = [
// //         // Starters
// //         {
// //             id: 1,
// //             name: "Caesar Salad",
// //             description: "Crisp romaine lettuce with parmesan cheese and croutons",
// //             price: 12.99,
// //             category: "starters",
// //             image: "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400&h=300&fit=crop&crop=center",
// //             dietary: ["vegetarian"]
// //         },
// //         {
// //             id: 2,
// //             name: "Buffalo Wings",
// //             description: "Crispy chicken wings tossed in spicy buffalo sauce",
// //             price: 14.99,
// //             category: "starters",
// //             image: "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?w=400&h=300&fit=crop&crop=center",
// //             dietary: ["spicy"]
// //         },
// //         {
// //             id: 3,
// //             name: "Garlic Bread",
// //             description: "Toasted bread with garlic butter and herbs",
// //             price: 8.99,
// //             category: "starters",
// //             image: "https://images.unsplash.com/photo-1573140247632-f8fd74997d5c?w=400&h=300&fit=crop&crop=center",
// //             dietary: ["vegetarian"]
// //         },
// //         {
// //             id: 4,
// //             name: "Mozzarella Sticks",
// //             description: "Golden fried mozzarella with marinara sauce",
// //             price: 10.99,
// //             category: "starters",
// //             image: "https://images.unsplash.com/photo-1541745537411-b8046dc6d66c?w=400&h=300&fit=crop&crop=center",
// //             dietary: ["vegetarian"]
// //         },
// //         {
// //             id: 5,
// //             name: "Greek Salad",
// //             description: "Fresh vegetables with feta cheese and olives",
// //             price: 13.99,
// //             category: "starters",
// //             image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=300&fit=crop&crop=center",
// //             dietary: ["vegetarian", "gluten-free"]
// //         },
// //         {
// //             id: 6,
// //             name: "Stuffed Mushrooms",
// //             description: "Portobello mushrooms stuffed with cheese and herbs",
// //             price: 11.99,
// //             category: "starters",
// //             image: "https://images.unsplash.com/photo-1506084868230-bb9d95c24759?w=400&h=300&fit=crop&crop=center",
// //             dietary: ["vegetarian"]
// //         },

// //         // Main Dishes
// //         {
// //             id: 7,
// //             name: "Grilled Salmon",
// //             description: "Fresh Atlantic salmon grilled to perfection with herbs and lemon",
// //             price: 24.99,
// //             category: "main-dishes",
// //             image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&h=300&fit=crop&crop=center",
// //             dietary: ["gluten-free"],
// //             popular: true
// //         },
// //         {
// //             id: 8,
// //             name: "Ribeye Steak",
// //             description: "Prime ribeye steak cooked to your preference",
// //             price: 32.99,
// //             category: "main-dishes",
// //             image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop&crop=center",
// //             dietary: ["gluten-free"]
// //         },
// //         {
// //             id: 9,
// //             name: "Chicken Parmesan",
// //             description: "Breaded chicken breast with marinara and mozzarella",
// //             price: 19.99,
// //             category: "main-dishes",
// //             image: "https://images.unsplash.com/photo-1632778149955-e80f8ceca2e8?w=400&h=300&fit=crop&crop=center",
// //             dietary: []
// //         },
// //         {
// //             id: 10,
// //             name: "Vegetarian Pasta",
// //             description: "Fresh pasta with seasonal vegetables and herbs",
// //             price: 16.99,
// //             category: "main-dishes",
// //             image: "https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=400&h=300&fit=crop&crop=center",
// //             dietary: ["vegetarian"]
// //         },
// //         {
// //             id: 11,
// //             name: "BBQ Ribs",
// //             description: "Slow-cooked ribs with our signature BBQ sauce",
// //             price: 26.99,
// //             category: "main-dishes",
// //             image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=300&fit=crop&crop=center",
// //             dietary: ["spicy"]
// //         },
// //         {
// //             id: 12,
// //             name: "Fish Tacos",
// //             description: "Grilled fish with fresh salsa in corn tortillas",
// //             price: 18.99,
// //             category: "main-dishes",
// //             image: "https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=400&h=300&fit=crop&crop=center",
// //             dietary: ["gluten-free"]
// //         },

// //         // Fast Food
// //         {
// //             id: 13,
// //             name: "Classic Burger",
// //             description: "Beef patty with lettuce, tomato, and special sauce",
// //             price: 13.99,
// //             category: "fast-food",
// //             image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop&crop=center",
// //             dietary: []
// //         },
// //         {
// //             id: 14,
// //             name: "Chicken Sandwich",
// //             description: "Crispy chicken breast with pickles and mayo",
// //             price: 12.99,
// //             category: "fast-food",
// //             image: "https://images.unsplash.com/photo-1606755962773-d324e2d63c40?w=400&h=300&fit=crop&crop=center",
// //             dietary: []
// //         },
// //         {
// //             id: 15,
// //             name: "Loaded Fries",
// //             description: "French fries topped with cheese, bacon, and sour cream",
// //             price: 9.99,
// //             category: "fast-food",
// //             image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&h=300&fit=crop&crop=center",
// //             dietary: []
// //         },
// //         {
// //             id: 16,
// //             name: "Veggie Burger",
// //             description: "Plant-based patty with avocado and sprouts",
// //             price: 14.99,
// //             category: "fast-food",
// //             image: "https://images.unsplash.com/photo-1520072959219-c595dc870360?w=400&h=300&fit=crop&crop=center",
// //             dietary: ["vegetarian", "vegan"]
// //         },
// //         {
// //             id: 17,
// //             name: "Hot Dog",
// //             description: "All-beef hot dog with your choice of toppings",
// //             price: 8.99,
// //             category: "fast-food",
// //             image: "https://images.unsplash.com/photo-1612392062798-2dbda12c2d3d?w=400&h=300&fit=crop&crop=center",
// //             dietary: []
// //         },
// //         {
// //             id: 18,
// //             name: "Onion Rings",
// //             description: "Beer-battered onion rings served golden brown",
// //             price: 7.99,
// //             category: "fast-food",
// //             image: "https://images.unsplash.com/photo-1639024471283-03518883512d?w=400&h=300&fit=crop&crop=center",
// //             dietary: ["vegetarian"]
// //         },

// //         // Desserts
// //         {
// //             id: 19,
// //             name: "Chocolate Cake",
// //             description: "Decadent chocolate cake with rich frosting",
// //             price: 8.99,
// //             category: "desserts",
// //             image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop&crop=center",
// //             dietary: ["vegetarian"]
// //         },
// //         {
// //             id: 20,
// //             name: "Cheesecake",
// //             description: "New York style cheesecake with berry compote",
// //             price: 9.99,
// //             category: "desserts",
// //             image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=400&h=300&fit=crop&crop=center",
// //             dietary: ["vegetarian"]
// //         },
// //         {
// //             id: 21,
// //             name: "Ice Cream Sundae",
// //             description: "Vanilla ice cream with chocolate sauce and whipped cream",
// //             price: 6.99,
// //             category: "desserts",
// //             image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&h=300&fit=crop&crop=center",
// //             dietary: ["vegetarian", "gluten-free"]
// //         },
// //         {
// //             id: 22,
// //             name: "Apple Pie",
// //             description: "Homemade apple pie with cinnamon and vanilla ice cream",
// //             price: 7.99,
// //             category: "desserts",
// //             image: "https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=400&h=300&fit=crop&crop=center",
// //             dietary: ["vegetarian"]
// //         },
// //         {
// //             id: 23,
// //             name: "Tiramisu",
// //             description: "Classic Italian dessert with coffee and mascarpone",
// //             price: 10.99,
// //             category: "desserts",
// //             image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&h=300&fit=crop&crop=center",
// //             dietary: ["vegetarian"]
// //         },
// //         {
// //             id: 24,
// //             name: "Fruit Tart",
// //             description: "Fresh seasonal fruits on vanilla custard",
// //             price: 8.99,
// //             category: "desserts",
// //             image: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=400&h=300&fit=crop&crop=center",
// //             dietary: ["vegetarian", "gluten-free"]
// //         }
// //     ];

// //     // Render the sample menu items
// //     renderMenuItems(menuItems);
// // }

/**
 * Render menu items to the page
 * @param {Array} menuItems - Array of menu items to render
 */
// function renderMenuItems(menuItems) {
//     const menuItemsContainer = document.getElementById('menu-items');
//     if (!menuItemsContainer) return;

//     // Clear container
//     menuItemsContainer.innerHTML = '';

//     // Create HTML for each menu item
//     menuItems.forEach(item => {
//         const menuItemElement = document.createElement('div');
//         menuItemElement.className = 'menu-item bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300';

//         // Set data attributes
//         menuItemElement.setAttribute('data-id', item.id);
//         menuItemElement.setAttribute('data-category', item.category);
//         menuItemElement.setAttribute('data-dietary-tags', JSON.stringify(item.dietary || []));

//         // Create dietary tags HTML
//         let dietaryTagsHtml = '';
//         if (item.dietary && item.dietary.length > 0) {
//             dietaryTagsHtml = '<div class="mt-2 flex flex-wrap gap-1">';
//             item.dietary.forEach(tag => {
//                 let tagClass = '';
//                 let tagIcon = '';

//                 switch(tag) {
//                     case 'vegetarian':
//                         tagClass = 'bg-green-100 text-green-800';
//                         tagIcon = '<i class="fas fa-leaf mr-1"></i>';
//                         break;
//                     case 'vegan':
//                         tagClass = 'bg-green-200 text-green-800';
//                         tagIcon = '<i class="fas fa-seedling mr-1"></i>';
//                         break;
//                     case 'gluten-free':
//                         tagClass = 'bg-yellow-100 text-yellow-800';
//                         tagIcon = '<i class="fas fa-wheat-awn-circle-exclamation mr-1"></i>';
//                         break;
//                     case 'spicy':
//                         tagClass = 'bg-red-100 text-red-800';
//                         tagIcon = '<i class="fas fa-pepper-hot mr-1"></i>';
//                         break;
//                     default:
//                         tagClass = 'bg-gray-100 text-gray-800';
//                         break;
//                 }

//                 dietaryTagsHtml += `<span class="inline-block px-2 py-1 text-xs rounded ${tagClass} mr-1">${tagIcon}${tag}</span>`;
//             });
//             dietaryTagsHtml += '</div>';
//         } else {
//             dietaryTagsHtml = '<div class="mt-2 flex flex-wrap gap-1">&nbsp;</div>';
//         }

//         // Create featured badge if applicable
//         let featuredBadge = '';
//         if (item.popular) {
//             featuredBadge = '<div class="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">Featured</div>';
//         }

//         menuItemElement.innerHTML = `
//             <div class="relative h-56 overflow-hidden">
//                 <img src="${item.image}" alt="${item.name}" class="w-full h-full object-cover transition-transform duration-500" loading="lazy" decoding="async">
//                 ${featuredBadge}
//                 <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end justify-center">
//                     <div class="p-4 text-white w-full text-center">
//                         <span class="font-bold bg-red-500 hover:bg-red-600 px-4 py-2 rounded-full inline-block transition-all duration-300 transform">View Details</span>
//                     </div>
//                 </div>
//             </div>
//             <div class="p-4 flex flex-col flex-grow">
//                 <h3 class="text-xl font-bold text-gray-800 mb-2">${item.name}</h3>
//                 <p class="text-gray-600 mb-4 description">${item.description}</p>
//                 ${dietaryTagsHtml}
//                 <div class="flex justify-between items-center mt-auto pt-4 border-t border-gray-200">
//                     <span class="text-xl font-bold text-gray-800 price">$${item.price.toFixed(2)}</span>
//                     <button class="add-to-cart bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition transform">
//                         <i class="fas fa-cart-plus mr-1"></i> Add
//                     </button>
//                 </div>
//             </div>
//         `;

//         menuItemsContainer.appendChild(menuItemElement);

//         // Add animation
//         animateMenuItemIn(menuItemElement);
//     });
// }

/**
 * Setup category filters
 */
// function setupCategoryFilters() {
//     const categoryButtons = document.querySelectorAll('.category-btn');
//     const menuItems = document.querySelectorAll('.menu-item');

//     if (categoryButtons.length === 0 || menuItems.length === 0) return;

//     // Add click event to category buttons
//     categoryButtons.forEach(button => {
//         button.addEventListener('click', function() {
//             // Remove active class from all buttons
//             categoryButtons.forEach(btn => {
//                 btn.classList.remove('active', 'bg-red-500', 'text-white');
//                 btn.classList.add('bg-gray-200', 'text-gray-800');
//             });

//             // Add active class to clicked button
//             this.classList.remove('bg-gray-200', 'text-gray-800');
//             this.classList.add('active', 'bg-red-500', 'text-white');

//             const category = this.dataset.category;

//             // Show all items if "all" category is selected
//             if (category === 'all') {
//                 menuItems.forEach(item => {
//                     item.style.display = '';
//                     animateMenuItemIn(item);
//                 });
//                 return;
//             }

//             // Apply all filters
//             applyAllFilters();
//         });
//     });

//     // Set "All" as active by default
//     const allCategoryButton = document.querySelector('.category-btn[data-category="all"]');
//     if (allCategoryButton) {
//         allCategoryButton.classList.add('active', 'bg-red-500', 'text-white');
//         allCategoryButton.classList.remove('bg-gray-200', 'text-gray-800');
//     }
// }

/**
 * Setup dietary filters
 */
// function setupDietaryFilters() {
//     const dietaryFilters = document.querySelectorAll('.dietary-filter');

//     dietaryFilters.forEach(filter => {
//         filter.addEventListener('change', function() {
//             applyAllFilters();
//         });
//     });
// }

/**
 * Apply all filters together
 */
// function applyAllFilters() {
//     const menuItems = document.querySelectorAll('.menu-item');
//     const selectedDietaryFilters = Array.from(document.querySelectorAll('.dietary-filter:checked')).map(f => f.value);
//     const selectedPriceRange = document.querySelector('input[name="price-range"]:checked')?.value || 'all';
//     const activeCategory = document.querySelector('.category-btn.active')?.dataset.category || 'all';
//     const searchTerm = document.getElementById('menu-search')?.value.toLowerCase().trim() || '';

//     let hasResults = false;

//     menuItems.forEach(item => {
//         const itemTags = JSON.parse(item.getAttribute('data-dietary-tags') || '[]');
//         const itemCategory = item.getAttribute('data-category');
//         const itemPrice = parseFloat(item.querySelector('.price')?.textContent.replace('$', '') || '0');
//         const itemName = item.querySelector('h3')?.textContent.toLowerCase() || '';
//         const itemDescription = item.querySelector('.description')?.textContent.toLowerCase() || '';

//         // Check dietary filters
//         const matchesDietary = selectedDietaryFilters.length === 0 ||
//             selectedDietaryFilters.every(filter => itemTags.includes(filter));

//         // Check price range
//         let matchesPrice = true;
//         if (selectedPriceRange === 'budget') {
//             matchesPrice = itemPrice < 15;
//         } else if (selectedPriceRange === 'premium') {
//             matchesPrice = itemPrice >= 15 && itemPrice <= 25;
//         } else if (selectedPriceRange === 'luxury') {
//             matchesPrice = itemPrice > 25;
//         }

//         // Check category
//         const matchesCategory = activeCategory === 'all' || itemCategory === activeCategory;

//         // Check search
//         const matchesSearch = searchTerm === '' ||
//             itemName.includes(searchTerm) ||
//             itemDescription.includes(searchTerm);

//         if (matchesDietary && matchesPrice && matchesCategory && matchesSearch) {
//             item.style.display = '';
//             animateMenuItemIn(item);
//             hasResults = true;
//         } else {
//             item.style.display = 'none';
//         }
//     });

//     // Show/hide no results message
//     const noResultsMessage = document.getElementById('no-results-message');
//     if (noResultsMessage) {
//         if (hasResults) {
//             noResultsMessage.classList.add('hidden');
//         } else {
//             noResultsMessage.classList.remove('hidden');
//         }
//     }
// }

/**
 * Setup sorting
 */
// function setupSorting() {
//     const sortSelect = document.querySelector('.sort-select');
//     if (!sortSelect) return;

//     sortSelect.addEventListener('change', function() {
//         const menuItemsContainer = document.getElementById('menu-items');
//         const menuItems = Array.from(menuItemsContainer.children);

//         menuItems.sort((a, b) => {
//             const nameA = a.querySelector('h3').textContent;
//             const nameB = b.querySelector('h3').textContent;
//             const priceA = parseFloat(a.querySelector('.price').textContent.replace('$', ''));
//             const priceB = parseFloat(b.querySelector('.price').textContent.replace('$', ''));

//             switch(this.value) {
//                 case 'name-asc':
//                     return nameA.localeCompare(nameB);
//                 case 'name-desc':
//                     return nameB.localeCompare(nameA);
//                 case 'price-asc':
//                     return priceA - priceB;
//                 case 'price-desc':
//                     return priceB - priceA;
//                 default:
//                     return 0;
//             }
//         });

//         // Clear container
//         menuItemsContainer.innerHTML = '';

//         // Re-append sorted items
//         menuItems.forEach(item => {
//             menuItemsContainer.appendChild(item);
//             animateMenuItemIn(item);
//         });
//     });
// }

/**
 * Setup search functionality
 */
// function setupSearch() {
//     const searchInput = document.getElementById('menu-search');
//     const noResultsMessage = document.getElementById('no-results-message');
//     const resetFiltersBtn = document.getElementById('reset-filters');

//     if (!searchInput) return;

//     searchInput.addEventListener('input', debounce(function() {
//         applyAllFilters();
//     }, 300));

//     // Reset filters button
//     if (resetFiltersBtn) {
//         resetFiltersBtn.addEventListener('click', function() {
//             // Clear search input
//             if (searchInput) searchInput.value = '';

//             // Reset category buttons
//             const allCategoryBtn = document.querySelector('.category-btn[data-category="all"]');
//             if (allCategoryBtn) {
//                 allCategoryBtn.click();
//             }

//             // Uncheck dietary filters
//             const dietaryFilters = document.querySelectorAll('.dietary-filter');
//             dietaryFilters.forEach(filter => {
//                 filter.checked = false;
//             });

//             // Reset sorting
//             const sortSelect = document.querySelector('.sort-select');
//             if (sortSelect) {
//                 sortSelect.value = 'name-asc';
//                 sortSelect.dispatchEvent(new Event('change'));
//             }

//             // Show all menu items
//             const menuItems = document.querySelectorAll('.menu-item');
//             menuItems.forEach(item => {
//                 item.style.display = '';
//             });

//             // Hide the "no results" message
//             if (noResultsMessage) noResultsMessage.classList.add('hidden');
//         });
//     }
// }

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
// function setupMenuItems() {
//     const menuItems = document.querySelectorAll('.menu-item');
//     const itemModal = document.getElementById('item-modal');

//     if (menuItems.length === 0) return;

//     // Add unique IDs to menu items if they don't have them
//     menuItems.forEach((item, index) => {
//         if (!item.dataset.id) {
//             item.dataset.id = `menu-item-${index + 1}`;
//         }

//         // Add click event to "Add to Cart" button
//         const addToCartButton = item.querySelector('.add-to-cart');
//         if (addToCartButton) {
//             addToCartButton.addEventListener('click', function(e) {
//                 e.preventDefault();

//                 const itemId = item.dataset.id;
//                 const itemName = item.querySelector('h3').textContent;
//                 const itemPrice = parseFloat(item.querySelector('.price').textContent.replace('$', ''));
//                 const itemImage = item.querySelector('img')?.src || '';
//                 const itemDescription = item.querySelector('.description')?.textContent || '';

//                 // Add to cart using global function
//                 window.addToCart({
//                     id: itemId,
//                     name: itemName,
//                     price: itemPrice,
//                     image: itemImage,
//                     description: itemDescription,
//                     quantity: 1
//                 });
//                 // Trigger cart update in main.js
//                 window.dispatchEvent(new Event('storage'));
//             });
//         }

//         // Add click event to the item image and View Details button to open modal
//         const itemImageContainer = item.querySelector('.relative');
//         const viewDetailsButton = item.querySelector('.relative .absolute span');

//         if (itemImageContainer && itemModal) {
//             itemImageContainer.style.cursor = 'pointer';

//             // Function to open modal with item details
//             const openItemModal = function(e) {
//                 // Prevent triggering if clicking on Add to Cart button
//                 if (e.target.closest('.add-to-cart')) return;

//                 const itemName = item.querySelector('h3').textContent;
//                 const itemPrice = item.querySelector('.price').textContent;
//                 const itemImage = item.querySelector('img').src;
//                 const itemDescription = item.querySelector('.description').textContent;

//                 // Populate modal with item details
//                 document.getElementById('modal-title').textContent = itemName;
//                 document.getElementById('modal-price').textContent = itemPrice;
//                 document.getElementById('modal-main-image').src = itemImage;
//                 document.getElementById('modal-description').textContent = itemDescription;

//                 // Show modal
//                 itemModal.classList.remove('hidden');
//                 document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
//             };

//             // Add click event to image container
//             itemImageContainer.addEventListener('click', openItemModal);

//             // Add click event to View Details button if it exists
//             if (viewDetailsButton) {
//                 viewDetailsButton.addEventListener('click', function(e) {
//                     e.stopPropagation(); // Prevent triggering the container's click event
//                     openItemModal(e);
//                 });
//             }
//         }
//     });

//     // Setup modal close button
//     const closeModalButton = document.getElementById('close-modal');
//     if (closeModalButton && itemModal) {
//         closeModalButton.addEventListener('click', function() {
//             itemModal.classList.add('hidden');
//             document.body.style.overflow = ''; // Re-enable scrolling
//         });

//         // Close modal when clicking outside the content
//         itemModal.addEventListener('click', function(e) {
//             if (e.target === itemModal) {
//                 itemModal.classList.add('hidden');
//                 document.body.style.overflow = '';
//             }
//         });
//     }
// }

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
    dietary: Array.isArray(item.dietary) ? item.dietary : []
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
// function showNotification(message, type = 'success') {
//     const notification = document.createElement('div');
//     notification.className = `fixed top-20 right-5 p-4 rounded-lg shadow-lg z-50 ${
//         type === 'success' ? 'bg-green-500' : 'bg-red-500'
//     } text-white transform transition-all duration-300`;
//     notification.textContent = message;

//     document.body.appendChild(notification);

//     // Trigger animation
//     setTimeout(() => {
//         notification.style.transform = 'translateX(120%)';
//         setTimeout(() => {
//             notification.remove();
//         }, 300);
//     }, 2000);
// }

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
