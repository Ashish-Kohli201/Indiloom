// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navbarMenu = document.getElementById('navbarMenu');

    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', () => {
            navbarMenu.classList.toggle('active');
        });

        // Close mobile menu when a link is clicked
        navbarMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navbarMenu.classList.remove('active');
            });
        });
    }

    // Smooth scroll for navbar links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });
});

// Helper functions for CTAs
function scrollToContact() {
    window.location.href = 'contact.html';
}

function scrollToSuppliers() {
    window.location.href = 'for-suppliers.html';
}

function scrollToBuyers() {
    window.location.href = 'for-buyers.html';
}

function goHome() {
    window.location.href = 'index.html';
}
