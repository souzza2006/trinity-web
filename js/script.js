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

const projectDialog = document.querySelector('.projeto-dialog');
const projectImage = projectDialog?.querySelector('.projeto-dialog-imagem');
const projectSiteLink = projectDialog?.querySelector('.projeto-dialog-link');
const closeProjectDialog = projectDialog?.querySelector('.projeto-dialog-fechar');
const projectPreviews = document.querySelectorAll('.projeto-preview');

if (projectDialog && projectImage && projectSiteLink && closeProjectDialog) {
    projectPreviews.forEach(preview => {
        preview.addEventListener('click', event => {
            if (typeof projectDialog.showModal !== 'function') {
                return;
            }

            const previewImage = preview.querySelector('img');
            const cardSiteLink = preview.closest('.projeto')?.querySelector('.projeto-link');
            if (!previewImage || !cardSiteLink) {
                return;
            }

            projectImage.src = previewImage.src;
            projectImage.alt = previewImage.alt;
            projectSiteLink.href = cardSiteLink.href;
            projectDialog.showModal();
        });
    });

    closeProjectDialog.addEventListener('click', () => projectDialog.close());

    projectDialog.addEventListener('click', event => {
        if (event.target === projectDialog) {
            projectDialog.close();
        }
    });

    projectDialog.addEventListener('close', () => {
        projectImage.removeAttribute('src');
        projectImage.alt = '';
        projectSiteLink.href = '#';
    });
}

const revealElements = document.querySelectorAll(
    'main section[id] > p:first-child, main section[id] > h1, main section[id] > .projetos-grid, main section[id] > .precos-intro, .projeto, .card-preco, .processo-pagamento-layout, .lideranca-item, .duvida-item, .duvidas-contato'
);
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (prefersReducedMotion) {
    revealElements.forEach(element => element.classList.add('scroll-reveal', 'is-visible'));
} else {
    const revealObserver = new IntersectionObserver((entries, currentObserver) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                currentObserver.unobserve(entry.target);
            }
        });
    }, {
        rootMargin: '0px 0px -8% 0px',
        threshold: 0.12
    });

    revealElements.forEach((element, index) => {
        element.classList.add('scroll-reveal');
        element.style.setProperty('--reveal-delay', `${(index % 3) * 80}ms`);
        revealObserver.observe(element);
    });
}

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