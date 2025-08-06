document.addEventListener('DOMContentLoaded', () => {
    const counters = document.querySelectorAll('.counter');
    const speed = 200; // The lower the speed, the faster the count

    const animateCounter = (counter) => {
        const target = +counter.getAttribute('data-target');
        let current = 0;

        const updateCounter = () => {
            const increment = target / speed;
            if (current < target) {
                current += increment;
                counter.innerText = Math.ceil(current);
                setTimeout(updateCounter, 1);
            } else {
                counter.innerText = target.toLocaleString(); // Format with commas
            }
        };

        updateCounter();
    };

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target); // Stop observing once animated
            }
        });
    }, {
        threshold: 0.5 // Trigger when 50% of the element is visible
    });

    counters.forEach(counter => {
        observer.observe(counter);
    });
});