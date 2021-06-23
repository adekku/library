'use strict';

const slides = Array.from(document.querySelectorAll('.maintenance-staff .slider__slide'));
const slidesLength = slides.length;
const slider = document.querySelector('.maintenance-staff .slider');
const buttons = document.querySelectorAll('.maintenance-staff .buttons__button');
const dotEl = document.querySelector('.maintenance-staff .dots')

function getNextPrev() {
    let activeSlide = document.querySelector('.maintenance-staff .slider__slide--active');
    let activeIndex = slides.indexOf(activeSlide);

    let next = (activeIndex == slidesLength - 1) ? slides[0] : slides[activeIndex + 1];
    let prev = (activeIndex == 0) ? slides[slidesLength - 1] : slides[activeIndex - 1];

    return [next, prev];
}

function getPosition() {
    let activeSlide = document.querySelector('.maintenance-staff .slider__slide--active');
    let activeIndex = slides.indexOf(activeSlide);
    let [next, prev] = getNextPrev();

    slides.forEach((slide, index) => {
        if (index == activeIndex) {
            slide.style.transform = 'translateX(0)';
        } else if (slide == prev) {
            slide.style.transform = 'translateX(-100%)';
        } else if (slide == next) {
            slide.style.transform = 'translateX(100%)';
        } else {
            slide.style.transform = 'translate(100%)';
        }

        slide.addEventListener('transitionend', () => {
            slide.classList.remove('slider__slide--top');
        });
    });
}

buttons.forEach(button => {
    button.addEventListener('click', () => {
        if (button.classList.contains('buttons__button-next')) getNextSlide()
        else if (button.classList.contains('buttons__button-prev')) getPrevSlide();
    });
});

function getNextSlide() {
    let activeSlide = document.querySelector('.maintenance-staff  .slider__slide--active');

    let [next, prev] = getNextPrev();

    if (activeSlide.classList.contains('slider__slide--top')) {
        return;
    }

    activeSlide.classList.add('slider__slide--top');
    next.classList.add('slider__slide--top');

    activeSlide.classList.remove('slider__slide--active');
    activeSlide.style.transform = 'translate(-100%)';
    next.classList.add('slider__slide--active');
    next.style.transform = 'translate(0)';

    getPosition();
    getActiveDot();
    autoLoop();
}

function getPrevSlide() {
    let activeSlide = document.querySelector('.maintenance-staff  .slider__slide--active');

    let [next, prev] = getNextPrev();

    if (activeSlide.classList.contains('slider__slide--top')) {
        return;
    }

    activeSlide.classList.add('slider__slide--top');
    prev.classList.add('slider__slide--top');

    activeSlide.classList.remove('slider__slide--active');
    activeSlide.style.transform = 'translate(100%)';
    prev.classList.add('slider__slide--active');
    prev.style.transform = 'translate(0)';

    getPosition();
    getActiveDot();
    autoLoop();
}

//dots

slides.forEach( slide => {
    const dot = document.createElement('div');
    dot.classList.add('dots__dot');
    dotEl.appendChild(dot);
});

function getActiveDot() {
    const allDots = document.querySelectorAll('.maintenance-staff .dots__dot');

    let activeSlide = document.querySelector('.maintenance-staff .slider__slide--active');
    let activeIndex = slides.indexOf(activeSlide);

    allDots.forEach( dot => {
        dot.classList.remove('dots__dot--active');
    });

    allDots[activeIndex].classList.add('dots__dot--active');
}

function functionalDot() {
    let allDots = document.querySelectorAll('.maintenance-staff .dots__dot');
    allDots.forEach( (dot, index) => {
        dot.addEventListener('click', () => {
            getDotSlide(index);
        });
    });

}

function getDotSlide(index) {
    slides.forEach(slide => {
        slide.classList.remove('slider__slide--active');
    });

    slides[index].classList.add('slider__slide--active');
    getPosition();
    getActiveDot();
    autoLoop();
}

//autoloop
function autoLoop() {
    timeoutId = setTimeout(() => {
      getNextSlide();
    }, 7000);

}

getActiveDot();
functionalDot();
autoLoop();