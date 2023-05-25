export const mask = (selector: string) => {

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
  };

  const inputs = document.querySelectorAll<HTMLInputElement>(selector);

  inputs.forEach((input: HTMLInputElement) => {
    input.addEventListener('input', createMask);
    input.addEventListener('focus', createMask);
    input.addEventListener('blur', createMask);
  });
};