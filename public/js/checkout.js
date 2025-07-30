
// Checkout functionality
document.addEventListener('DOMContentLoaded', function() {
    initCheckout();
    loadCartItems();
    initCheckoutSteps();
    initPaymentMethods();
    initOrderTypeToggle();
    initRecommendedItems();
});

// Current checkout step
let currentStep = 1;
let orderData = {};

// Initialize checkout
function initCheckout() {
    updateCartCount();
    updateOrderSummary();
    
    // Check if cart is empty
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart.length === 0) {
        showEmptyCartMessage();
    } else {
        hideEmptyCartMessage();
    }
}

// Initialize checkout steps
function initCheckoutSteps() {
    // Step navigation buttons
    document.getElementById('continue-to-delivery')?.addEventListener('click', () => {
        if (validateStep1()) {
            goToStep(2);
        }
    });
    
    document.getElementById('back-to-order')?.addEventListener('click', () => {
        goToStep(1);
    });
    
    document.getElementById('continue-to-payment')?.addEventListener('click', () => {
        if (validateStep2()) {
            goToStep(3);
        }
    });
    
    document.getElementById('back-to-delivery')?.addEventListener('click', () => {
        goToStep(2);
    });
    
    document.getElementById('place-order')?.addEventListener('click', () => {
        if (validateStep3()) {
            processOrder();
        }
    });
}

// Go to specific step
function goToStep(step) {
    // Hide all steps
    for (let i = 1; i <= 4; i++) {
        const stepElement = document.getElementById(`step-${i}`);
        if (stepElement) {
            stepElement.classList.add('hidden');
        }
    }
    
    // Show current step
    const currentStepElement = document.getElementById(`step-${step}`);
    if (currentStepElement) {
        currentStepElement.classList.remove('hidden');
    }
    
    // Update step indicators
    updateStepIndicators(step);
    currentStep = step;
    
    // Update order summary based on step
    updateOrderSummary();
}

// Update step indicators
function updateStepIndicators(activeStep) {
    const steps = document.querySelectorAll('.checkout-step');
    const stepLines = document.querySelectorAll('.checkout-step-line');
    
    steps.forEach((step, index) => {
        const stepNumber = index + 1;
        const stepNumberEl = step.querySelector('.step-number');
        const stepNameEl = step.querySelector('.step-name');
        
        if (stepNumber <= activeStep) {
            step.classList.add('active');
            stepNumberEl.classList.remove('bg-gray-300', 'text-gray-600');
            stepNumberEl.classList.add('bg-red-500', 'text-white');
            stepNameEl.classList.add('text-red-500', 'font-bold');
        } else {
            step.classList.remove('active');
            stepNumberEl.classList.remove('bg-red-500', 'text-white');
            stepNumberEl.classList.add('bg-gray-300', 'text-gray-600');
            stepNameEl.classList.remove('text-red-500', 'font-bold');
        }
        
        if (stepNumber < activeStep) {
            step.classList.add('completed');
            stepNumberEl.classList.remove('bg-red-500');
            stepNumberEl.classList.add('bg-green-500');
            stepNameEl.classList.remove('text-red-500');
            stepNameEl.classList.add('text-green-500');
        } else {
            step.classList.remove('completed');
        }
    });
    
    stepLines.forEach((line, index) => {
        if (index < activeStep - 1) {
            line.classList.remove('bg-gray-300');
            line.classList.add('bg-red-500');
        } else {
            line.classList.remove('bg-red-500');
            line.classList.add('bg-gray-300');
        }
    });
}

// Load cart items
function loadCartItems() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsContainer = document.getElementById('cart-items');
    
    if (!cartItemsContainer) return;
    
    if (cart.length === 0) {
        showEmptyCartMessage();
        return;
    }
    
    hideEmptyCartMessage();
    
    cartItemsContainer.innerHTML = cart.map(item => `
        <div class="cart-item flex items-center gap-4 p-4 border border-gray-200 rounded-lg mb-4">
            <img src="${item.image || 'https://via.placeholder.com/150'}" alt="${item.name}" class="w-16 h-16 object-cover rounded">
            <div class="flex-1">
                <h4 class="font-bold text-gray-800">${item.name}</h4>
                <p class="text-gray-600 text-sm">${item.description || ''}</p>
                <div class="flex items-center gap-4 mt-2">
                    <div class="flex items-center gap-2">
                        <button onclick="updateQuantity('${item.id}', ${(item.quantity || 1) - 1})" class="bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded text-sm">-</button>
                        <span class="mx-2">${item.quantity || 1}</span>
                        <button onclick="updateQuantity('${item.id}', ${(item.quantity || 1) + 1})" class="bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded text-sm">+</button>
                    </div>
                    <span class="font-bold text-red-500">$${(parseFloat(item.price) * (item.quantity || 1)).toFixed(2)}</span>
                </div>
            </div>
            <button onclick="removeFromCart('${item.id}')" class="text-red-500 hover:text-red-600 p-2">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `).join('');
}

// Update quantity
function updateQuantity(itemId, newQuantity) {
    if (newQuantity <= 0) {
        removeFromCart(itemId);
        return;
    }
    
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const itemIndex = cart.findIndex(item => item.id === itemId);
    
    if (itemIndex > -1) {
        cart[itemIndex].quantity = newQuantity;
        localStorage.setItem('cart', JSON.stringify(cart));
        loadCartItems();
        updateOrderSummary();
        updateCartCount();
    }
}

// Remove item from cart
function removeFromCart(itemId) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const updatedCart = cart.filter(item => item.id !== itemId);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    
    loadCartItems();
    updateOrderSummary();
    updateCartCount();
    
    if (updatedCart.length === 0) {
        showEmptyCartMessage();
    }
}

// Show empty cart message
function showEmptyCartMessage() {
    const cartItemsContainer = document.getElementById('cart-items');
    const continueButton = document.getElementById('continue-to-delivery');
    
    if (cartItemsContainer) {
        cartItemsContainer.innerHTML = `
            <div class="empty-cart-message text-center p-8">
                <i class="fas fa-shopping-cart text-6xl text-gray-300 mb-4"></i>
                <h3 class="text-xl font-bold mb-2 text-gray-700">Your cart is empty</h3>
                <p class="text-gray-600 mb-4">Looks like you haven't added any items to your cart yet.</p>
                <a href="menu.html" class="inline-block bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 transition duration-300">Browse Menu</a>
            </div>
        `;
    }
    
    if (continueButton) {
        continueButton.disabled = true;
        continueButton.classList.add('opacity-50', 'cursor-not-allowed');
    }
}

// Hide empty cart message
function hideEmptyCartMessage() {
    const continueButton = document.getElementById('continue-to-delivery');
    
    if (continueButton) {
        continueButton.disabled = false;
        continueButton.classList.remove('opacity-50', 'cursor-not-allowed');
    }
}

// Update cart count
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const count = cart.reduce((total, item) => total + (item.quantity || 1), 0);
    
    const cartCounts = document.querySelectorAll('.cart-count');
    cartCounts.forEach(counter => {
        counter.textContent = count;
        if (count > 0) {
            counter.classList.remove('scale-0');
            counter.classList.add('scale-100');
        } else {
            counter.classList.remove('scale-100');
            counter.classList.add('scale-0');
        }
    });
}

// Update order summary
function updateOrderSummary() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const summaryItemsContainer = document.getElementById('summary-items');
    
    if (!summaryItemsContainer) return;
    
    // Calculate totals
    const subtotal = cart.reduce((total, item) => total + (parseFloat(item.price) * (item.quantity || 1)), 0);
    const tax = subtotal * 0.08; // 8% tax
    const deliveryFee = currentStep > 1 && getOrderType() === 'delivery' ? 3.99 : 0;
    const total = subtotal + tax + deliveryFee;
    
    // Update summary items
    summaryItemsContainer.innerHTML = cart.map(item => `
        <div class="flex justify-between items-center mb-2 text-sm">
            <span>${item.name} x${item.quantity || 1}</span>
            <span>$${(parseFloat(item.price) * (item.quantity || 1)).toFixed(2)}</span>
        </div>
    `).join('');
    
    // Update totals
    document.getElementById('summary-subtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('summary-tax').textContent = `$${tax.toFixed(2)}`;
    document.getElementById('summary-delivery').textContent = `$${deliveryFee.toFixed(2)}`;
    document.getElementById('summary-total').textContent = `$${total.toFixed(2)}`;
    
    // Show/hide delivery row
    const deliveryRow = document.querySelector('.delivery-row');
    if (deliveryRow) {
        if (deliveryFee > 0) {
            deliveryRow.classList.remove('hidden');
        } else {
            deliveryRow.classList.add('hidden');
        }
    }
}

// Initialize payment methods
function initPaymentMethods() {
    const paymentMethods = document.querySelectorAll('input[name="payment-method"]');
    paymentMethods.forEach(method => {
        method.addEventListener('change', function() {
            showPaymentForm(this.value);
        });
    });
}

// Show payment form
function showPaymentForm(method) {
    // Hide all forms
    document.getElementById('credit-card-form')?.classList.add('hidden');
    document.getElementById('paypal-form')?.classList.add('hidden');
    document.getElementById('cash-form')?.classList.add('hidden');
    
    // Show selected form
    const formId = method === 'credit-card' ? 'credit-card-form' : 
                   method === 'paypal' ? 'paypal-form' : 'cash-form';
    document.getElementById(formId)?.classList.remove('hidden');
}

// Initialize order type toggle
function initOrderTypeToggle() {
    const orderTypeInputs = document.querySelectorAll('input[name="order-type"]');
    orderTypeInputs.forEach(input => {
        input.addEventListener('change', function() {
            toggleOrderType(this.value);
        });
    });
}

// Toggle order type
function toggleOrderType(type) {
    const deliveryForm = document.getElementById('delivery-form');
    const pickupForm = document.getElementById('pickup-form');
    const deliveryImage = document.getElementById('delivery-image');
    const pickupImage = document.getElementById('pickup-image');
    
    if (type === 'delivery') {
        deliveryForm?.classList.remove('hidden');
        pickupForm?.classList.add('hidden');
        deliveryImage?.classList.remove('hidden');
        pickupImage?.classList.add('hidden');
    } else {
        deliveryForm?.classList.add('hidden');
        pickupForm?.classList.remove('hidden');
        deliveryImage?.classList.add('hidden');
        pickupImage?.classList.remove('hidden');
    }
    
    updateOrderSummary();
}

// Get order type
function getOrderType() {
    const orderTypeInput = document.querySelector('input[name="order-type"]:checked');
    return orderTypeInput ? orderTypeInput.value : 'delivery';
}

// Initialize recommended items
function initRecommendedItems() {
    const recommendedButtons = document.querySelectorAll('.recommended-add-to-cart');
    recommendedButtons.forEach(button => {
        button.addEventListener('click', function() {
            const itemData = {
                id: this.dataset.id,
                name: this.dataset.name,
                price: parseFloat(this.dataset.price),
                image: this.dataset.image,
                description: this.dataset.description,
                quantity: 1
            };
            
            addToCart(itemData);
            showNotification(`${itemData.name} added to cart!`);
            loadCartItems();
            updateOrderSummary();
        });
    });
}

// Add to cart function
function addToCart(itemData) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItemIndex = cart.findIndex(item => item.id === itemData.id);
    
    if (existingItemIndex > -1) {
        cart[existingItemIndex].quantity = (cart[existingItemIndex].quantity || 1) + (itemData.quantity || 1);
    } else {
        cart.push(itemData);
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}

// Show notification
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 transform translate-x-full opacity-0 transition-all duration-300';
    notification.innerHTML = `
        <div class="flex items-center">
            <i class="fas fa-check-circle mr-2"></i>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.classList.remove('translate-x-full', 'opacity-0');
    }, 100);
    
    // Hide notification
    setTimeout(() => {
        notification.classList.add('translate-x-full', 'opacity-0');
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Validation functions
function validateStep1() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart.length === 0) {
        showNotification('Please add items to your cart before proceeding.');
        return false;
    }
    return true;
}

function validateStep2() {
    const orderType = getOrderType();
    const requiredFields = orderType === 'delivery' 
        ? ['name', 'phone', 'email', 'address', 'city', 'zip']
        : ['pickup-name', 'pickup-phone', 'pickup-email', 'pickup-time'];
    
    for (const field of requiredFields) {
        const input = document.getElementById(field);
        if (!input || !input.value.trim()) {
            showNotification(`Please fill in all required fields.`);
            input?.focus();
            return false;
        }
    }
    
    // Store order data
    orderData.orderType = orderType;
    if (orderType === 'delivery') {
        orderData.customer = {
            name: document.getElementById('name').value,
            phone: document.getElementById('phone').value,
            email: document.getElementById('email').value,
            address: document.getElementById('address').value,
            city: document.getElementById('city').value,
            zip: document.getElementById('zip').value
        };
    } else {
        orderData.customer = {
            name: document.getElementById('pickup-name').value,
            phone: document.getElementById('pickup-phone').value,
            email: document.getElementById('pickup-email').value,
            pickupTime: document.getElementById('pickup-time').value
        };
    }
    
    orderData.specialInstructions = document.getElementById('special-instructions')?.value || '';
    
    return true;
}

function validateStep3() {
    const paymentMethod = document.querySelector('input[name="payment-method"]:checked')?.value;
    
    if (!paymentMethod) {
        showNotification('Please select a payment method.');
        return false;
    }
    
    if (paymentMethod === 'credit-card') {
        const requiredFields = ['card-number', 'card-name', 'expiry-date', 'cvv'];
        for (const field of requiredFields) {
            const input = document.getElementById(field);
            if (!input || !input.value.trim()) {
                showNotification('Please fill in all credit card details.');
                input?.focus();
                return false;
            }
        }
    }
    
    orderData.paymentMethod = paymentMethod;
    return true;
}

// Process order
function processOrder() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const orderNumber = 'FH-' + Date.now();
    
    // Calculate totals
    const subtotal = cart.reduce((total, item) => total + (parseFloat(item.price) * (item.quantity || 1)), 0);
    const tax = subtotal * 0.08;
    const deliveryFee = orderData.orderType === 'delivery' ? 3.99 : 0;
    const total = subtotal + tax + deliveryFee;
    
    // Store order
    const order = {
        orderNumber,
        items: cart,
        customer: orderData.customer,
        orderType: orderData.orderType,
        paymentMethod: orderData.paymentMethod,
        specialInstructions: orderData.specialInstructions,
        subtotal,
        tax,
        deliveryFee,
        total,
        timestamp: new Date().toISOString()
    };
    
    // Save order to localStorage (in real app, send to server)
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    orders.push(order);
    localStorage.setItem('orders', JSON.stringify(orders));
    
    // Show confirmation
    showOrderConfirmation(order);
    
    // Clear cart
    localStorage.removeItem('cart');
    updateCartCount();
    
    // Go to confirmation step
    goToStep(4);
}

// Show order confirmation
function showOrderConfirmation(order) {
    document.getElementById('order-number').textContent = order.orderNumber;
    document.getElementById('confirmation-email').textContent = order.customer.email;
    
    const confirmationDetails = document.getElementById('confirmation-details');
    if (confirmationDetails) {
        confirmationDetails.innerHTML = `
            <div class="space-y-2">
                <div class="flex justify-between">
                    <span>Order Type:</span>
                    <span class="font-medium">${order.orderType === 'delivery' ? 'Delivery' : 'Pickup'}</span>
                </div>
                <div class="flex justify-between">
                    <span>Payment Method:</span>
                    <span class="font-medium">${order.paymentMethod === 'credit-card' ? 'Credit Card' : order.paymentMethod === 'paypal' ? 'PayPal' : 'Cash on Delivery'}</span>
                </div>
                <div class="flex justify-between">
                    <span>Total Amount:</span>
                    <span class="font-bold text-lg">$${order.total.toFixed(2)}</span>
                </div>
                ${order.orderType === 'delivery' ? `
                    <div class="pt-2 border-t">
                        <p class="text-sm text-gray-600">Estimated delivery time: 30-45 minutes</p>
                    </div>
                ` : `
                    <div class="pt-2 border-t">
                        <p class="text-sm text-gray-600">Ready for pickup: ${order.customer.pickupTime}</p>
                    </div>
                `}
            </div>
        `;
    }
}

// Make functions globally available
window.updateQuantity = updateQuantity;
window.removeFromCart = removeFromCart;
window.addToCart = addToCart;
