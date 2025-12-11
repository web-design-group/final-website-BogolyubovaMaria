// ====== ПЕРВЫЙ СЛАЙДЕР (основной с фотографиями) ======
document.addEventListener('DOMContentLoaded', function() {
    const track = document.querySelector('.slider-track');
    const slideGroups = document.querySelectorAll('.slide-group');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    let currentSlide = 0;
    const slideCount = slideGroups.length;

    function updateSlider() {
        track.style.transform = `translateX(-${currentSlide * 100}%)`;
    }

    prevBtn.addEventListener('click', () => {
        currentSlide = (currentSlide - 1 + slideCount) % slideCount;
        updateSlider();
    });

    nextBtn.addEventListener('click', () => {
        currentSlide = (currentSlide + 1) % slideCount;
        updateSlider();
    });
});

// ====== ВТОРОЙ СЛАЙДЕР (с гидами) ======
document.addEventListener('DOMContentLoaded', function() {
    const sliderTrack2 = document.querySelector('.slider-track-2');
    const prevButton2 = document.querySelector('.prev-2');
    const nextButton2 = document.querySelector('.next-2');
    const descriptionElement2 = document.querySelector('.slide-description-2');
    
    // Данные для слайдов второго слайдера
    const slidesData2 = [
        {
            image: 'img/гид2.jpg',
            description: 'Иванов Петр Андреевич - специалист с большим стажем работы в области туризма уже более 12 лет! Отважный, ответственный и непоколебимый. Всегда готов помочь в любой ситуации и вопросах!'
        },
        {
            image: 'img/гид1.jpg',
            description: 'Кислова Марина Анатольевна - специалист с большим стажем работы в области туризма уже более 7 лет! Любит дорогу, путешествия, общение с людьми. Всегда готова помочь в любой ситуации и вопросах!'
        },
        {
            image: 'img/гид3.jpg', 
            description: 'Тунина Елена Владимировна - специалист с большим стажем работы в области туризма уже более 3 лет! Любит животных, необычные пути и горячий чай. Всегда готова помочь в любой ситуации и вопросах!'
        },
    ];
    
    let currentSlide2 = 0;
    
    // Создание слайдов для второго слайдера
    function createSlides2() {
        sliderTrack2.innerHTML = '';
        
        slidesData2.forEach((slide, index) => {
            const slideElement = document.createElement('div');
            slideElement.className = `slide-2 ${index === currentSlide2 ? 'active-2' : ''}`;
            
            slideElement.innerHTML = `
                <img src="${slide.image}" alt="Гид" class="slide-image-2">
            `;
            
            // Обработчик клика на слайд
            slideElement.addEventListener('click', () => {
                setActiveSlide2(index);
            });
            
            sliderTrack2.appendChild(slideElement);
        });
        
        updateDescription2();
    }
    
    // Установка активного слайда для второго слайдера
    function setActiveSlide2(index) {
        currentSlide2 = index;
        
        // Обновляем классы активного слайда
        document.querySelectorAll('.slide-2').forEach((slide, i) => {
            slide.classList.toggle('active-2', i === currentSlide2);
        });
        
        updateDescription2();
        centerActiveSlide2();
    }
    
    // Обновление описания для второго слайдера
    function updateDescription2() {
        descriptionElement2.textContent = slidesData2[currentSlide2].description;
    }
    
    // Центрирование активного слайда для второго слайдера
    function centerActiveSlide2() {
        const slides2 = document.querySelectorAll('.slide-2');
        const activeSlide2 = slides2[currentSlide2];
        const trackWidth2 = sliderTrack2.offsetWidth;
        const slideWidth2 = activeSlide2.offsetWidth;
        const offset2 = (trackWidth2 - slideWidth2) / 2 - currentSlide2 * (slideWidth2 + 20);
        
        sliderTrack2.style.transform = `translateX(${offset2}px)`;
    }
    
    // Обработчики кнопок для второго слайдера
    prevButton2.addEventListener('click', () => {
        if (currentSlide2 > 0) {
            setActiveSlide2(currentSlide2 - 1);
        }
    });
    
    nextButton2.addEventListener('click', () => {
        if (currentSlide2 < slidesData2.length - 1) {
            setActiveSlide2(currentSlide2 + 1);
        }
    });
    
    // Инициализация второго слайдера
    createSlides2();
    
    // Адаптация при изменении размера окна
    window.addEventListener('resize', centerActiveSlide2);
});

// ====== АВТОМАТИЧЕСКИЙ РЕСЕТ СЛАЙДЕРОВ ПРИ ИЗМЕНЕНИИ РАЗМЕРА ОКНА ======
let resizeTimer;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
        // Сбрасываем transform для всех слайдеров
        const sliders = document.querySelectorAll('.slider, .slider-2');
        sliders.forEach(slider => {
            if (slider) {
                slider.style.transform = 'translateX(0)';
            }
        });
    }, 250);
});