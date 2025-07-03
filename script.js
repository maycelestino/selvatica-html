document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    const navLinks = document.querySelectorAll('.nav-link');

    menuToggle.addEventListener('click', () => {
        mainNav.classList.toggle('active');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mainNav.classList.contains('active')) {
                mainNav.classList.remove('active');
            }
            navLinks.forEach(item => item.classList.remove('active'));
            link.classList.add('active');
        });
    });

    const sections = document.querySelectorAll('.animate-on-scroll');
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });

    const currentPath = window.location.pathname;
    const currentFileName = currentPath.split('/').pop();

    navLinks.forEach(link => {
        const linkFileName = link.getAttribute('href'); // Obtém o href diretamente, ex: "index.html"

        const normalizedCurrentFileName = (currentFileName === '' || currentFileName === 'index.html') ? 'index.html' : currentFileName;
        const normalizedLinkFileName = (linkFileName === '' || linkFileName === 'index.html') ? 'index.html' : linkFileName;

        if (normalizedCurrentFileName === normalizedLinkFileName) {
            navLinks.forEach(item => item.classList.remove('active'));
            link.classList.add('active');
        }
    });
});