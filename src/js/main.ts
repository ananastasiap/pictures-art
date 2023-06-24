import { modals, sliders, forms, mask, checkTextInputs, showMoreStyles, calc, filter, changePicturesInSizeBlocks } from './modules/index.ts';

window.addEventListener('DOMContentLoaded', () => {
  modals();
  forms();
  filter();
  mask('[name="phone"]');
  checkTextInputs('[name="name"]');
  checkTextInputs('[name="message"]');
  showMoreStyles('.button-styles', '#styles .row');
  changePicturesInSizeBlocks('.sizes-block');
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
  calc({
    size: '#size',
    material: '#material',
    options: '#options',
    promocode: '.promocode',
    result: '.calc-price',
  });
});