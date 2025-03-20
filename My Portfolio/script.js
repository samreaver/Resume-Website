document.addEventListener('DOMContentLoaded', function () {
    // Smooth scrolling for navigation links
    document.querySelectorAll('.links a[href^="#"]').forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetElement = document.querySelector(this.getAttribute('href'));
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // Reveal elements on scroll with Intersection Observer
    const revealElements = document.querySelectorAll('.about, .education, .project-card');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    revealElements.forEach(element => {
        element.classList.add('reveal-element');
        observer.observe(element);
    });

    // Animate skill bars with CSS transitions
    const skillItems = document.querySelectorAll('.skills li');
    setTimeout(() => {
        skillItems.forEach((item, index) => {
            item.classList.add('skill-animate');
        });
    }, 500);

    // Typing effect with blinking cursor
    const nameElement = document.querySelector('.header h1');
    const nameText = nameElement.textContent;
    nameElement.innerHTML = '<span class="cursor"></span>';

    function typeEffect(element, text, i = 0) {
        if (i < text.length) {
            setTimeout(() => {
                element.innerHTML = text.slice(0, i + 1) + '<span class="cursor">|</span>';
                typeEffect(element, text, i + 1);
            }, 80);
        } else {
            document.querySelector('.cursor').remove();
        }
    }

    setTimeout(() => {
        typeEffect(nameElement, nameText);
    }, 500);

    // Project card hover effects
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.classList.add('card-hover');
        });
        card.addEventListener('mouseleave', function () {
            this.classList.remove('card-hover');
        });
    });

    // Counter animation using requestAnimationFrame
    function animateCounter(element, target, duration = 1000) {
        let start = 0;
        const startTime = performance.now();

        function updateCounter(currentTime) {
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / duration, 1);
            element.textContent = Math.floor(progress * target) + '%';

            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            }
        }
        requestAnimationFrame(updateCounter);
    }

    // Percentage counter in education section
    document.querySelectorAll('.education p').forEach(element => {
        const match = element.textContent.match(/(\d+)%/);
        if (match) {
            const percentValue = parseInt(match[1]);
            element.innerHTML = element.innerHTML.replace(match[0], `<span class="percent-counter">0%</span>`);
            const counter = element.querySelector('.percent-counter');

            const observer = new IntersectionObserver(entries => {
                if (entries[0].isIntersecting) {
                    animateCounter(counter, percentValue);
                    observer.unobserve(counter);
                }
            }, { threshold: 0.8 });

            observer.observe(counter);
        }
    });
});
