import { modals, sliders } from './modules/index.ts';

window.addEventListener('DOMContentLoaded', () => {
  modals();
  sliders({
    slides: '.feedback-slider-item',
    slidesDirection: '',
    prevBtn: '.main-prev-btn',
    nextBtn: '.main-next-btn',
  });
});