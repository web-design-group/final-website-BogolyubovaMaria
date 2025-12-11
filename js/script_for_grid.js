// ====== СКРИПТ ДЛЯ ПЕРЕКЛЮЧЕНИЯ ВКЛАДОК (ТАБОВ) ======
document.addEventListener('DOMContentLoaded', function() {
    const tabs = document.querySelectorAll('.tab');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Убираем активный класс у всех табов и контента
            tabs.forEach(t => t.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Добавляем активный класс текущему табу и соответствующему контенту
            this.classList.add('active');
            document.getElementById(`${tabId}-content`).classList.add('active');
        });
    });
});





// ====== СКРИПТ ДЛЯ СЛАЙДЕРА С ФОТОГРАФИЯМИ ======
document.addEventListener('DOMContentLoaded', function() {
    const sliderContainer = document.querySelector('.slider-container');
    const prevButton = document.querySelector('.slider-button.prev');
    const nextButton = document.querySelector('.slider-button.next');
    
    // Массив с 6 фотографиями
    const images = [
        { src: 'img/grid/фото_валаам2.jpg', alt: 'Фото тура 1' },
        { src: 'img/grid/валаам_фото_туристов2.jpg', alt: 'Фото тура 2' },
        { src: 'img/grid/валаам_фото_туристов.jpg', alt: 'Фото тура 3' },
        { src: 'img/grid/валаам фото туристов.jpg', alt: 'Валаам фото туристов' },
        { src: 'img/grid/валаам фото туристов2.jpg', alt: 'Валаам фото туристов2' },
        { src: 'img/grid/валаам фото туристов3.jpg', alt: 'Валаам фото туристов3' }
    ];
    
    let currentIndex = 0;
    const slidesToShow = 3;
    
    // Инициализация слайдера
    function initSlider() {
        // Удаляем старые слайды
        const existingSlides = document.querySelectorAll('.slide-card');
        existingSlides.forEach(slide => slide.remove());
        
        // Создаем слайды только для видимых позиций
        for (let i = 0; i < slidesToShow; i++) {
            createSlide(images[i], i);
        }
        
        updateButtons();
    }
    
    // Создание одного слайда
    function createSlide(imageData, position) {
        const slideCard = document.createElement('div');
        slideCard.className = 'slide-card';
        slideCard.dataset.position = position;
        
        const img = document.createElement('img');
        img.src = imageData.src;
        img.alt = imageData.alt;
        img.className = 'slide-image';
        
        slideCard.appendChild(img);
        sliderContainer.appendChild(slideCard);
    }
    
    // Обновление слайдов при переключении
    function updateSlides() {
        const slides = document.querySelectorAll('.slide-card');
        
        // Обновляем каждый видимый слайд
        slides.forEach((slide, index) => {
            const imageIndex = currentIndex + index;
            if (imageIndex < images.length) {
                const img = slide.querySelector('.slide-image');
                img.src = images[imageIndex].src;
                img.alt = images[imageIndex].alt;
                slide.dataset.position = imageIndex;
            }
        });
        
        updateButtons();
    }
    
    // Обновление состояния кнопок
    function updateButtons() {
        prevButton.disabled = currentIndex === 0;
        nextButton.disabled = currentIndex >= images.length - slidesToShow;
        
        prevButton.style.opacity = prevButton.disabled ? '0.5' : '1';
        nextButton.style.opacity = nextButton.disabled ? '0.5' : '1';
    }
    
    // Перелистывание вперед
    function nextSlide() {
        if (currentIndex < images.length - slidesToShow) {
            currentIndex++;
            updateSlides();
        }
    }
    
    // Перелистывание назад
    function prevSlide() {
        if (currentIndex > 0) {
            currentIndex--;
            updateSlides();
        }
    }
    
    // Обработчики событий
    nextButton.addEventListener('click', nextSlide);
    prevButton.addEventListener('click', prevSlide);
    
    // Обработка клавиатуры
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') prevSlide();
        if (e.key === 'ArrowRight') nextSlide();
    });
    
    // Инициализация
    initSlider();
});