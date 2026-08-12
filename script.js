document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    const navLinks = document.querySelectorAll('.nav-link');

    // Sidebar Toggle
    if (menuToggle && sidebar) {
        menuToggle.addEventListener('click', () => {
            sidebar.classList.toggle('active');

            const icon = menuToggle.querySelector('i');
            if (sidebar.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Close sidebar on link click (mobile)
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 900) { // Mobile breakpoint
                sidebar.classList.remove('active');

                const icon = menuToggle.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });
    });

    // Active Link Scroll Observer
    const sections = document.querySelectorAll('section');
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            // Adjustment for offset
            if (scrollY >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    // Handle Social Button Clicks (Bypasses status bar preview)
    const socialBtns = document.querySelectorAll('.social-btn');
    socialBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const url = btn.getAttribute('data-url');
            if (url) {
                if (url.startsWith('tel:')) {
                    window.location.href = url;
                } else {
                    window.open(url, '_blank', 'noopener,noreferrer');
                }
            }
        });
    });
    // Generic Modal Handler Function
    function setupModal(triggerId, modalId, closeId) {
        const trigger = document.getElementById(triggerId);
        const modal = document.getElementById(modalId);

        if (trigger && modal) {
            const closeBtn = closeId ? document.getElementById(closeId) : modal.querySelector('.close-modal');

            trigger.addEventListener('click', () => {
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            });

            const closeModal = () => {
                modal.classList.remove('active');
                document.body.style.overflow = 'auto';
                // Reset any maximized images when modal closes
                modal.querySelectorAll('.cert-image').forEach(img => {
                    img.classList.remove('maximized');
                });
            };

            if (closeBtn) closeBtn.addEventListener('click', closeModal);
            modal.addEventListener('click', (e) => {
                if (e.target === modal) closeModal();
            });

            // Handle Click-to-Maximize
            modal.querySelectorAll('.cert-image').forEach(img => {
                img.addEventListener('click', (e) => {
                    e.stopPropagation(); // Prevent modal from closing if clicking image
                    img.classList.toggle('maximized');
                });
            });
        }
    }

    // Initialize Modals
    setupModal('cloud-mastery-card', 'cert-modal');
    setupModal('data-analytics-card', 'data-cert-modal', 'close-data-modal');
    setupModal('ai-cert-card', 'ai-cert-modal', 'close-ai-modal');
    setupModal('programming-cert-card', 'programming-cert-modal', 'close-programming-modal');
    setupModal('forage-cert-card', 'forage-cert-modal', 'close-forage-modal');
    setupModal('ml-workshop-card', 'ml-cert-modal', 'close-ml-modal');
    setupModal('underwater-robotics-card', 'underwater-robotics-modal', 'close-underwater-modal');
    setupModal('android-workshop-card', 'android-cert-modal', 'close-android-modal');
    setupModal('embedded-workshop-card', 'embedded-cert-modal', 'close-embedded-modal');

    // Education Details Reveal
    const toggleBtns = document.querySelectorAll('.details-toggle-btn');
    toggleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const container = btn.closest('.summary-item');
            const content = container.querySelector('.summary-details-collapsible');
            const isExpanded = btn.getAttribute('aria-expanded') === 'true';

            btn.setAttribute('aria-expanded', !isExpanded);
            content.classList.toggle('active');

            const btnText = btn.querySelector('span');
            if (content.classList.contains('active')) {
                btnText.textContent = 'Hide Academic Details';
            } else {
                btnText.textContent = 'View Academic Details';
            }
        });
    });


    // Dynamic Year in Sidebar Footer
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = '2026';
    }
});




