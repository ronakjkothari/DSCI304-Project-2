document.addEventListener('DOMContentLoaded', () => {
    const orb = document.querySelector('.orb-overlay');
    if (orb) {
        document.addEventListener('mousemove', (e) => {
            const x = e.clientX;
            const y = e.clientY;
            orb.style.transform = `translate(${x}px, ${y}px)`;
        });
    }

    const reveals = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    });
    reveals.forEach(reveal => revealObserver.observe(reveal));

    const stackItems = document.querySelectorAll('.stack-item');
    const header = document.querySelector('header');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;

        // Smart Navbar Logic
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
            header.classList.add('nav-hidden');
        } else {
            header.classList.remove('nav-hidden');
        }

        if (currentScrollY > 50) {
            header.classList.add('nav-scrolled');
        } else {
            header.classList.remove('nav-scrolled');
        }

        lastScrollY = currentScrollY;

        // Visual Stack Progress
        stackItems.forEach((item) => {
            const visual = item.querySelector('.stack-visual');
            const rect = item.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                const progress = (window.innerHeight - rect.top) / (window.innerHeight * 2);
                const scale = 1 - (progress * 0.05);
                const opacity = 1 - (progress * 0.5);
                if (visual) {
                    visual.style.transform = `scale(${scale})`;
                    visual.style.opacity = `${opacity}`;
                }
            }
        });
    }, { passive: true });

    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                const targetPosition = targetElement.offsetTop;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});
