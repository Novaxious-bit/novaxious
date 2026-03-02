// Hero Slider Logic
function initHeroSlider() {
    const slides = document.querySelectorAll('.slide');
    if (slides.length === 0) return;

    let currentSlide = 0;
    setInterval(() => {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }, 2000);
}

document.addEventListener('DOMContentLoaded', () => {
    initHeroSlider();
    // Custom Cursor
    const cursor = document.getElementById('custom-cursor');
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    const links = document.querySelectorAll('a, button, .service-card, .faq-header');
    links.forEach(link => {
        link.addEventListener('mouseenter', () => {
            if (link.classList.contains('service-card') || link.tagName === 'BUTTON') {
                document.body.classList.add('cursor-expand');
            } else {
                document.body.classList.add('cursor-hover');
            }
        });
        link.addEventListener('mouseleave', () => {
            document.body.classList.remove('cursor-hover');
            document.body.classList.remove('cursor-expand');
        });
    });

    const textElements = document.querySelectorAll('h1, h2, h3, .blog-intro');
    textElements.forEach(el => {
        el.addEventListener('mouseenter', () => document.body.classList.add('cursor-text'));
        el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-text'));
    });

    // Reveal on Scroll Animation
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // For blog detail content, we might want to keep observing if they re-enter?
                // But usually once is fine for performance.
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal-on-scroll, .reveal-up, .blog-content h2, .blog-content h3, .blog-content p, .blog-content img').forEach(el => {
        observer.observe(el);
    });


    // Header Blur on Scroll
    const header = document.querySelector('header');
    const floatingCta = document.getElementById('floating-cta');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.background = 'rgba(8, 9, 12, 0.9)';
            floatingCta.classList.add('show');
        } else {
            header.style.background = 'rgba(15, 17, 21, 0.8)';
            floatingCta.classList.remove('show');
        }
    });

    // FAQ Accordion Logic
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const header = item.querySelector('.faq-header');
        header.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            // Close all other items
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
                otherItem.querySelector('.faq-content').style.maxHeight = null;
            });

            if (!isActive) {
                item.classList.add('active');
                const content = item.querySelector('.faq-content');
                content.style.maxHeight = content.scrollHeight + "px";
            }
        });
    });

    // Before/After Slider Logic
    const sliders = document.querySelectorAll('.comparison-slider');
    sliders.forEach(slider => {
        const handle = slider.querySelector('.slider-handle');
        const imageAfter = slider.querySelector('.image-after');
        let isResizing = false;

        const setSliderPos = (x) => {
            const rect = slider.getBoundingClientRect();
            let pos = ((x - rect.left) / rect.width) * 100;
            pos = Math.max(0, Math.min(100, pos));
            handle.style.left = `${pos}%`;
            imageAfter.style.clipPath = `inset(0 0 0 ${pos}%)`;
        };

        handle.addEventListener('mousedown', () => isResizing = true);
        window.addEventListener('mouseup', () => isResizing = false);
        window.addEventListener('mousemove', (e) => {
            if (!isResizing) return;
            setSliderPos(e.clientX);
        });

        // Touch support
        handle.addEventListener('touchstart', () => isResizing = true);
        window.addEventListener('touchend', () => isResizing = false);
        window.addEventListener('touchmove', (e) => {
            if (!isResizing) return;
            setSliderPos(e.touches[0].clientX);
        });
    });

    // Timeline Progress Logic
    const timelineSection = document.querySelector('.timeline-section');
    if (timelineSection) {
        const progressLine = document.getElementById('process-progress');
        const steps = document.querySelectorAll('.step');

        const timelineObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    progressLine.style.width = '100%';
                    steps.forEach((step, index) => {
                        setTimeout(() => {
                            step.classList.add('is-visible');
                        }, 300 + (index * 200));
                    });
                    timelineObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        timelineObserver.observe(timelineSection);
    }
});
