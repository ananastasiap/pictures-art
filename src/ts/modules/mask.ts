export const mask = (selector: string) => {

  const inputs = document.querySelectorAll<HTMLInputElement>(selector);

  const setCursorPosition = (position: number, element: any) => {
    element.focus();

    if (element.setSelectionRange) {
      element.setSelectionRange(position, position)
    } else if (element.createTextRange) {
      const range = element.createTextRange();

      range.collapse(true);
      range.moveEnd('character', position);
      range.moveStart('character', position);
      range.select();
    }
  };

  interface MaskContext {
    value: string;
  }

  function createMask(this: MaskContext, event: Event) {
    const matrix: string = '+7 (___) ___ __ __';
    let iterator: number = 0;
    const def: string = matrix.replace(/\D/g, '');
    let value: string = this.value.replace(/\D/g, '');

    if (def.length >= value.length) {
      value = def;
    }

    this.value = matrix.replace(/./g, function(matrixSymbol) {
      return /[_\d]/.test(matrixSymbol) && iterator < value.length ? value.charAt(iterator++) : iterator >= value.length ? '' : matrixSymbol;
    });

    if (event.type === 'blur') {
      if (this.value.length == 2) {
        this.value = '';
      }
    } else {
      setCursorPosition(this.value.length, this);
    }

    inputs.forEach((input: HTMLInputElement) => {
      input.addEventListener('keydown', (event: KeyboardEvent) => {
        const target = event.target as HTMLInputElement; // через target: HTMLInputElement | null появляется ошибка, не могу понять, как лучше переписать
        if (target.selectionStart !== null && target.selectionStart < 2 && event.key !== 'Backspace' && event.key !== 'Delete') {
          event.preventDefault();
        }
      });
    });
  };

  inputs.forEach((input: HTMLInputElement) => {
    input.addEventListener('input', createMask);
    input.addEventListener('focus', createMask);
    input.addEventListener('blur', createMask);
  });
};