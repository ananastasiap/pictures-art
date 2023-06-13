export const calc = ({
  size,
  material,
  options,
  promocode,
  result
} : {
  size: string,
  material: string,
  options: string,
  promocode: string,
  result: string
}) => {
  const sizeBlock: HTMLInputElement | null = document.querySelector(size);
  const materialBlock: HTMLInputElement | null = document.querySelector(material);
  const optionsBlock: HTMLInputElement | null = document.querySelector(options);
  const promocodeBlock: HTMLInputElement | null = document.querySelector(promocode);
  const resultBlock: HTMLInputElement | null = document.querySelector(result);

  if (!sizeBlock || !materialBlock || !optionsBlock || !promocodeBlock || !resultBlock) {
    return;
  }

  let finalSum: number = 0;

  const calcFunc = () => {
    finalSum = Math.round((+sizeBlock.value) * (+materialBlock.value) + (+optionsBlock.value));

    if (sizeBlock.value == '' || materialBlock.value == '') {
      resultBlock.textContent = 'Пожалуйста, выберите размер и материал картины';
    } else if (promocodeBlock.value === 'IWANTPOPART') {
      resultBlock.textContent = Math.round(finalSum * 0.7).toString();
    } else {
      resultBlock.textContent = finalSum.toString();
    }
  };

  sizeBlock.addEventListener('change', calcFunc);
  materialBlock.addEventListener('change', calcFunc);
  optionsBlock.addEventListener('change', calcFunc);
  promocodeBlock.addEventListener('input', calcFunc);
};