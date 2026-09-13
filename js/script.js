const links = document.querySelectorAll('nav a');
const sections = document.querySelectorAll('main section[id]');
const loader = document.querySelector('.loader');

window.addEventListener('load', () => {
    setTimeout(() => {
        if (!loader) {
            return;
        }

        setTimeout(() => {
            document.body.classList.add('site-loaded');

            setTimeout(() => {
                loader.remove();
            }, 1300);
        }, 250);
    }, 200);
});

function setActiveLink(id) {
    links.forEach(link => {
        const isActive = link.getAttribute('href') === `#${id}`;
        link.classList.toggle('active', isActive);
    });
}

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            setActiveLink(entry.target.id);
        }
    });
}, {
    rootMargin: '-35% 0px -45% 0px',
    threshold: 0.1
});

sections.forEach(section => observer.observe(section));

links.forEach(link => {
    link.addEventListener('click', event => {
        event.preventDefault();

        const id = link.getAttribute('href').replace('#', '');
        const section = document.getElementById(id);

        section?.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
        });

        setActiveLink(id);
    });
});

const scrollIndicator = document.querySelector('.scrol');
const hero = document.querySelector('.hero');

function updateScrollProgress() {
    const fadeDistance = hero.offsetHeight * 0.65;
    const progress = Math.min(window.scrollY / fadeDistance, 1);

    document.documentElement.style.setProperty('--scroll-progress', progress);
    scrollIndicator.classList.toggle('hidden', progress >= 1);
}

updateScrollProgress();
window.addEventListener('scroll', updateScrollProgress, { passive: true });