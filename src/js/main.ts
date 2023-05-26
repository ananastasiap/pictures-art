import { modals, sliders, forms, mask, checkTextInputs } from './modules/index.ts';

window.addEventListener('DOMContentLoaded', () => {
  modals();
  forms();
  mask('[name="phone"]');
  checkTextInputs('[name="name"]');
  checkTextInputs('[name="message"]');
  sliders({
    slides: '.feedback-slider-item',
    slidesDirection: 'horizontal',
    prevBtn: '.main-prev-btn',
    nextBtn: '.main-next-btn',
  });
  sliders({
    slides: '.main-slider-item',
    slidesDirection: 'vertical',
    prevBtn: '.main-prev-btn',
    nextBtn: '.main-next-btn',
  });
});