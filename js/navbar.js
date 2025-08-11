document.addEventListener("DOMContentLoaded", function() {
    const navbarContainer = document.getElementById('navbar-container');
    if (navbarContainer) {
        fetch('navbar.html')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.text();
            })
            .then(data => {
                navbarContainer.innerHTML = data;

                // Now that the navbar is loaded, initialize the mobile menu script
                const mobileMenuButton = document.getElementById('mobile-menu-button');
                const mobileMenu = document.getElementById('mobile-menu');

                if (mobileMenuButton && mobileMenu) {
                    mobileMenuButton.addEventListener('click', () => {
                        mobileMenu.classList.toggle('hidden');
                        // Hamburger icon animation
                        const bars = mobileMenuButton.children;
                        if (bars.length === 3) {
                            bars[0].classList.toggle('rotate-45');
                            bars[0].classList.toggle('translate-y-[5px]');
                            bars[1].classList.toggle('opacity-0');
                            bars[2].classList.toggle('-rotate-45');
                            bars[2].classList.toggle('-translate-y-[5px]');
                        }
                    });
                }
            })
            .catch(error => console.error('Error loading navbar:', error));
    }
});
