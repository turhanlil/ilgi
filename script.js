document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.slide-container');
    let currentSlide = 0;
    const slideInterval = 3000; // Her fotoğrafın 3 saniye görünmesi için

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.style.opacity = i === index ? '1' : '0';
        });
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    showSlide(currentSlide); // İlk fotoğrafı göster
    setInterval(nextSlide, slideInterval); // Fotoğraf değişimini başlat
});
