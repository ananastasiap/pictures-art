export const checkTextInputs = (selector: string) => {
  const textInputs = document.querySelectorAll<HTMLInputElement>(selector);

  textInputs.forEach((textInput: HTMLInputElement) => {
    textInput.addEventListener('keypress', function(event: KeyboardEvent) {
      if (event.key.match(/[^а-яё 0-9]/ig)) {
        event.preventDefault();
      }
    })
  })
};