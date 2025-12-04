document.addEventListener('DOMContentLoaded', function () {
    // Elements
    const entranceOverlay = document.getElementById('entrance-overlay');
    const enterBtn = document.getElementById('enter-btn');
    const appContainer = document.querySelector('.app-container');
    const bgMusic = document.getElementById('background-music');
    const musicToggle = document.getElementById('music-toggle');

    const slides = document.querySelectorAll('.slide-container');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const pauseBtn = document.getElementById('pause-btn');

    // State
    let currentSlide = 0;
    let slideInterval;
    let isPlaying = false; // Start paused until entered
    const intervalTime = 4000; // Slower for better viewing

    // Entrance Logic
    enterBtn.addEventListener('click', () => {
        // Hide overlay
        entranceOverlay.classList.add('hidden');

        // Show app
        setTimeout(() => {
            appContainer.classList.add('visible');

            // Start music
            bgMusic.play().then(() => {
                isPlaying = true;
                startSlideShow();
            }).catch(error => {
                console.log("Audio play failed:", error);
                // Still start slideshow even if audio fails
                isPlaying = true;
                startSlideShow();
            });
        }, 500);
    });

    // Slideshow Functions
    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.remove('active');
            if (i === index) {
                slide.classList.add('active');
            }
        });
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }

    function startSlideShow() {
        if (!slideInterval && isPlaying) {
            slideInterval = setInterval(nextSlide, intervalTime);
            updatePauseIcon(true);
        }
    }

    function stopSlideShow() {
        clearInterval(slideInterval);
        slideInterval = null;
        updatePauseIcon(false);
    }

    function toggleSlideShow() {
        if (slideInterval) {
            stopSlideShow();
            isPlaying = false;
        } else {
            isPlaying = true;
            startSlideShow();
        }
    }

    function updatePauseIcon(playing) {
        // SVG for Pause
        const pauseIcon = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>';
        // SVG for Play
        const playIcon = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>';

        pauseBtn.innerHTML = playing ? pauseIcon : playIcon;
    }

    // Event Listeners
    nextBtn.addEventListener('click', () => {
        stopSlideShow();
        nextSlide();
        if (isPlaying) startSlideShow();
    });

    prevBtn.addEventListener('click', () => {
        stopSlideShow();
        prevSlide();
        if (isPlaying) startSlideShow();
    });

    pauseBtn.addEventListener('click', toggleSlideShow);

    // Keyboard Navigation
    document.addEventListener('keydown', (e) => {
        if (entranceOverlay.classList.contains('hidden')) {
            if (e.key === 'ArrowRight') {
                stopSlideShow();
                nextSlide();
                if (isPlaying) startSlideShow();
            } else if (e.key === 'ArrowLeft') {
                stopSlideShow();
                prevSlide();
                if (isPlaying) startSlideShow();
            } else if (e.key === ' ') {
                e.preventDefault();
                toggleSlideShow();
            }
        } else if (e.key === 'Enter') {
            enterBtn.click();
        }
    });

    // Music Toggle
    musicToggle.addEventListener('click', () => {
        if (bgMusic.paused) {
            bgMusic.play();
            musicToggle.innerHTML = '<span class="icon">🎵</span>'; // Active icon
            musicToggle.style.opacity = '1';
        } else {
            bgMusic.pause();
            musicToggle.innerHTML = '<span class="icon">🔇</span>'; // Muted icon
            musicToggle.style.opacity = '0.7';
        }
    });

    // Initialize
    showSlide(currentSlide);
});
