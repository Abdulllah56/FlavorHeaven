document.addEventListener('DOMContentLoaded', function() {
    // Initialize the checkout page
    initCheckout();
});

function initCheckout() {
    console.log('Initializing checkout page...');
    loadCartItems();
    updateCartCount();
    setupEventListeners();
}

function loadCartItems() {
    const cartItemsContainer = document.getElementById('cart-items');
    if (!cartItemsContainer) {
        console.error('Cart items container not found');
        return;
    }

    const cartData = localStorage.getItem('cart');
    let cart = [];

    try {
        cart = JSON.parse(cartData);
    } catch (error) {
        console.error('Error parsing cart data:', error);
    }

    if (!cart || cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="text-center py-8">
                <p class="text-gray-500 mb-4">Your cart is empty</p>
                <a href="menu.html" class="text-red-500 hover:text-red-600">Return to Menu</a>
            </div>
        `;
        updateOrderSummary(0); // Ensure order summary is cleared when cart is empty
        return;
    }

    let cartHTML = '';
    let subtotal = 0; // Changed variable name to 'subtotal' for clarity

    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal; // Accumulate subtotal

        cartHTML += `
            <div class="cart-item bg-white rounded-lg shadow p-4 mb-4">
                <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-4">
                        <img src="${item.image || 'placeholder.jpg'}" alt="${item.name}" class="w-24 h-24 object-cover rounded">
                        <div>
                            <h3 class="text-lg font-semibold">${item.name}</h3>
                            <p class="text-gray-600">${item.description}</p>
                            <div class="flex items-center mt-2">
                                <button onclick="updateQuantity(${index}, -1)" class="text-gray-500 hover:text-gray-700">
                                    <i class="fas fa-minus"></i>
                                </button>
                                <span class="mx-3">${item.quantity}</span>
                                <button onclick="updateQuantity(${index}, 1)" class="text-gray-500 hover:text-gray-700">
                                    <i class="fas fa-plus"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="text-right">
                        <p class="text-lg font-bold">$${itemTotal.toFixed(2)}</p>
                        <button onclick="removeItem(${index})" class="text-red-500 hover:text-red-600 mt-2">
                            <i class="fas fa-trash"></i> Remove
                        </button>
                    </div>
                </div>
            </div>
        `;
    });

    cartItemsContainer.innerHTML = cartHTML;

    // Update order summary with the calculated subtotal
    updateOrderSummary(subtotal);
}

function updateOrderSummary(subtotal) {
    const taxRate = 0.08; // 8% tax
    const deliveryFee = 3.00; // Fixed delivery fee
    const tax = subtotal * taxRate;
    const total = subtotal + tax + deliveryFee;

    // Update order summary section
    const summaryItems = document.getElementById('summary-items');
    const summarySubtotal = document.getElementById('summary-subtotal');
    const summaryTax = document.getElementById('summary-tax');
    const summaryDelivery = document.getElementById('summary-delivery');
    const summaryTotal = document.getElementById('summary-total');

    // Update the summary items from cart
    if (summaryItems) {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        let itemsHTML = '';
        cart.forEach(item => {
            itemsHTML += `
                <div class="flex justify-between mb-2">
                    <span class="text-gray-600">${item.name} × ${item.quantity}</span>
                    <span>$${(item.price * item.quantity).toFixed(2)}</span>
                </div>
            `;
        });
        summaryItems.innerHTML = itemsHTML;
    }

    // Update all summary values
    if (summarySubtotal) summarySubtotal.textContent = `$${subtotal.toFixed(2)}`;
    if (summaryTax) summaryTax.textContent = `$${tax.toFixed(2)}`;
    if (summaryDelivery) summaryDelivery.textContent = `$${deliveryFee.toFixed(2)}`;
    if (summaryTotal) summaryTotal.textContent = `$${total.toFixed(2)}`;
}

function updateQuantity(index, change) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    if (cart[index]) {
        cart[index].quantity += change;
        
        if (cart[index].quantity < 1) {
            cart.splice(index, 1);
        }
        
        localStorage.setItem('cart', JSON.stringify(cart));
        loadCartItems();
        updateCartCount();
    }
}

function removeItem(index) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCartItems();
    updateCartCount();
}

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        cartCount.textContent = count;
    }
}

function setupEventListeners() {
    const checkoutButton = document.getElementById('checkout-button');
    const continueToDeliveryBtn = document.getElementById('continue-to-delivery');
    const backToOrderBtn = document.getElementById('back-to-order');
    const continueToPaymentBtn = document.getElementById('continue-to-payment');
    const backToDeliveryBtn = document.getElementById('back-to-delivery');
    const placeOrderBtn = document.getElementById('place-order');

    if (continueToDeliveryBtn) {
        continueToDeliveryBtn.addEventListener('click', function() {
            showCheckoutStep(2);
        });
    }

    if (backToOrderBtn) {
        backToOrderBtn.addEventListener('click', function() {
            showCheckoutStep(1);
        });
    }

    if (continueToPaymentBtn) {
        continueToPaymentBtn.addEventListener('click', function() {
            showCheckoutStep(3);
        });
    }

    if (backToDeliveryBtn) {
        backToDeliveryBtn.addEventListener('click', function() {
            showCheckoutStep(2);
        });
    }

    if (placeOrderBtn) {
        placeOrderBtn.addEventListener('click', function() {
            showCheckoutStep(4);
        });
    }

    // Add event listeners for recommended products
    const recommendedAddButtons = document.querySelectorAll('.recommended-add-to-cart');
    recommendedAddButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productData = {
                id: button.dataset.id,
                name: button.dataset.name,
                price: parseFloat(button.dataset.price),
                image: button.dataset.image,
                description: button.dataset.description,
                quantity: 1
            };
            addRecommendedToCart(productData);
        });
    });
}

function showCheckoutStep(stepNumber) {
    // Hide all steps
    document.querySelectorAll('.checkout-step-content').forEach(step => {
        step.classList.add('hidden');
    });

    // Show the selected step
    const selectedStep = document.getElementById(`step-${stepNumber}`);
    if (selectedStep) {
        selectedStep.classList.remove('hidden');
    }

    // Update the step indicators
    updateStepIndicators(stepNumber);
}

function updateStepIndicators(currentStep) {
    const steps = document.querySelectorAll('.checkout-step');
    steps.forEach((step, index) => {
        const stepNumber = index + 1;
        const numberElement = step.querySelector('.step-number');
        if (stepNumber < currentStep) {
            numberElement.classList.remove('bg-gray-300', 'text-gray-600');
            numberElement.classList.add('bg-green-500', 'text-white');
        } else if (stepNumber === currentStep) {
            numberElement.classList.remove('bg-gray-300', 'text-gray-600');
            numberElement.classList.add('bg-red-500', 'text-white');
        } else {
            numberElement.classList.remove('bg-green-500', 'bg-red-500', 'text-white');
            numberElement.classList.add('bg-gray-300', 'text-gray-600');
        }
    });
}

function addRecommendedToCart(product) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Check if item already exists in cart
    const existingItemIndex = cart.findIndex(item => item.id === product.id);
    
    if (existingItemIndex > -1) {
        cart[existingItemIndex].quantity += 1;
    } else {
        cart.push(product);
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCartItems();
    updateCartCount();
    
    // Show confirmation message
    showAddToCartConfirmation(product.name);
}

function showAddToCartConfirmation(productName) {
    const confirmationDiv = document.createElement('div');
    confirmationDiv.className = 'fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50';
    confirmationDiv.textContent = `${productName} added to cart`;
    
    document.body.appendChild(confirmationDiv);
    
    // Remove the confirmation message after 2 seconds
    setTimeout(() => {
        confirmationDiv.remove();
    }, 2000);
}

function placeOrder() {
    // Add order placement logic here
    localStorage.removeItem('cart');
    window.location.href = 'confirmation.html';
}