document.addEventListener('DOMContentLoaded', function () {
    // set year
    const y = document.getElementById('year'); if (y) y.textContent = new Date().getFullYear();
    const yf = document.getElementById('year-footer'); if (yf) yf.textContent = new Date().getFullYear();

    // smooth scroll for nav anchors
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            const target = document.querySelector(href);
            if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
        });
    });

    // mobile menu toggle
    const menuToggle = document.getElementById("menuToggle");
    const navWrap = document.querySelector(".nav-wrap");

    menuToggle.addEventListener("click", () => {
        navWrap.classList.toggle("open");

        const isOpen = navWrap.classList.contains("open");
        menuToggle.setAttribute("aria-expanded", isOpen);
    });

    document.querySelectorAll(".nav-link").forEach(link => {
        link.addEventListener("click", () => {
            navWrap.classList.remove("open");
            menuToggle.setAttribute("aria-expanded", "false");
        });
    });

    // gallery lightbox
    const lightbox = document.getElementById('lightbox');
    const lbImage = document.querySelector('.lb-image');
    const lbClose = document.querySelector('.lb-close');

    const closeLightbox = () => {
        if (!lightbox) return;

        if (document.activeElement && lightbox.contains(document.activeElement)) {
            document.activeElement.blur();
        }

        lightbox.classList.remove('active');
        if (lbClose) {
            lbClose.setAttribute('tabindex', '-1');
        }
    };

    const openLightbox = (img) => {
        if (!lightbox || !lbImage || !lbClose) return;

        lbImage.src = img.src;
        lbImage.alt = img.alt || '';
        lightbox.classList.add('active');
        lbClose.setAttribute('tabindex', '0');
        lbClose.focus();
    };

    document.querySelectorAll('.gallery-grid img').forEach(img => {
        if (img.dataset.src) img.src = img.dataset.src;
        img.addEventListener('click', () => openLightbox(img));
    });

    if (lbClose) lbClose.addEventListener('click', closeLightbox);
    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) closeLightbox();
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && lightbox.classList.contains('active')) closeLightbox();
        });
    }
});

// Open today badge: show "Open Today" if Mon-Sat
(function setOpenBadge() {
    const badge = document.getElementById('openBadge');
    if (!badge) return;
    const now = new Date();
    const day = now.getDay(); // 0 Sun, 6 Sat
    if (day >= 1 && day <= 6) { badge.textContent = 'Open Today'; badge.style.background = '#16a34a'; }
    else { badge.textContent = 'Closed Today'; badge.style.background = '#ef4444'; }
})();

