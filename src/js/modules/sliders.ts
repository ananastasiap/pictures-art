export const sliders = ({
  slides,
  slidesDirection,
  prevBtn,
  nextBtn
} : {
  slides: string,
  slidesDirection: string,
  prevBtn: string,
  nextBtn: string
}) => {

  let slideIndex: number = 1;
  let paused: number = 0;
  const slidesItems = document.querySelectorAll<HTMLElement>(slides);

  const showSlides = (number: number) => {
    if (number > slidesItems.length) {
      slideIndex = 1;
    }

    if (number < 1) {
      slideIndex = slidesItems.length;
    }

    slidesItems.forEach(slidesItem => {
      slidesItem.classList.add('animated');
      slidesItem.style.display = 'none';
    });

    slidesItems[slideIndex - 1].style.display = 'block'
  };

  showSlides(slideIndex);

  const changeSlides = (number: number) => {
    showSlides(slideIndex += number);
  };

  try {
    const prevButton: HTMLElement | null = document.querySelector(prevBtn);
    const nextButton: HTMLElement | null = document.querySelector(nextBtn);
    if (!prevBtn || !nextBtn) {
      return;
    }

    prevButton?.addEventListener('click', () => {
      changeSlides(-1);
      slidesItems[slideIndex - 1].classList.remove('slideInLeft');
      slidesItems[slideIndex - 1].classList.add('slideInRight');
    });

    nextButton?.addEventListener('click', () => {
      changeSlides(1);
      slidesItems[slideIndex - 1].classList.remove('slideInRight');
      slidesItems[slideIndex - 1].classList.add('slideInLeft');
    });
  } catch(event) {}

  const activateAnimation = () => {
    if (slidesDirection === 'vertical') {
      paused = setInterval(function() {
        changeSlides(1);
        slidesItems[slideIndex - 1].classList.add('slideInDown');
      }, 3000);
    } else {
      paused = setInterval(function() {
        changeSlides(1);
        slidesItems[slideIndex - 1].classList.remove('slideInRight');
        slidesItems[slideIndex - 1].classList.add('slideInLeft');
      }, 3000);
    }
  };

  activateAnimation();

  slidesItems[0].parentNode?.addEventListener('mouseenter', () => {
    clearInterval(paused);
  });
  slidesItems[0].parentNode?.addEventListener('mouseleave', () => {
    activateAnimation();
  });
};