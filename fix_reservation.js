// Quick fix for reservation form conflict
// This script will be added to contact.html to fix the reservation form issue

document.addEventListener('DOMContentLoaded', function() {
    // Remove any existing event listeners on the reservation form
    const reservationForm = document.getElementById('reservation-form');
    if (reservationForm) {
        // Clone the form to remove all event listeners
        const newForm = reservationForm.cloneNode(true);
        reservationForm.parentNode.replaceChild(newForm, reservationForm);
        
        // Add the correct event listener
        newForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const formData = new FormData(newForm);
            const data = Object.fromEntries(formData.entries());
            
            // Show loading state
            const submitButton = newForm.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            submitButton.textContent = 'Processing...';
            submitButton.disabled = true;
            
            try {
                // Use the correct server URL
                const serverUrl = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' 
                    ? 'http://localhost:3001' 
                    : window.location.origin;
                
                const response = await fetch(`${serverUrl}/api/reservations`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                    credentials: 'include'
                });
                
                if (response.ok) {
                    const result = await response.json();
                    console.log('Reservation successful:', result);
                    
                    // Hide the form and show success message
                    newForm.style.display = 'none';
                    const confirmationDiv = document.getElementById('reservation-confirmation');
                    if (confirmationDiv) {
                        confirmationDiv.classList.remove('hidden');
                        confirmationDiv.scrollIntoView({ behavior: 'smooth' });
                    }
                } else {
                    const errorData = await response.json().catch(() => ({ message: 'Unknown error occurred' }));
                    console.error('Reservation failed:', errorData);
                    
                    // Show error message
                    const errorDiv = document.getElementById('reservation-error');
                    if (errorDiv) {
                        errorDiv.classList.remove('hidden');
                        errorDiv.scrollIntoView({ behavior: 'smooth' });
                    }
                }
            } catch (error) {
                console.error('Error submitting reservation:', error);
                
                // Show error message
                const errorDiv = document.getElementById('reservation-error');
                if (errorDiv) {
                    errorDiv.classList.remove('hidden');
                    errorDiv.scrollIntoView({ behavior: 'smooth' });
                }
            } finally {
                // Reset button state
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            }
        });
    }
});