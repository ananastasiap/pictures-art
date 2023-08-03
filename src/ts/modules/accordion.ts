export const accordion = (triggerSelector: string) => {
  const buttons = document.querySelectorAll<HTMLElement>(triggerSelector);

  buttons.forEach(button => {
    button.addEventListener('click', function() {
      this.classList.toggle('active-style');
      if (this.nextElementSibling) {
        this.nextElementSibling.classList.toggle('active-content');
      }

      // не знаю, как без as можно было бы привести к типу в этой ситуации
      if (this.classList.contains('active-style') && this.nextElementSibling) {
        (this.nextElementSibling as HTMLElement).style.maxHeight = this.nextElementSibling.scrollHeight + 80 + 'px';
      } else if (this.nextElementSibling) {
        (this.nextElementSibling as HTMLElement).style.maxHeight = '0px';
      }

      buttons.forEach(otherButton => {
        if (otherButton !== this && otherButton.classList.contains('active-style')) {
          otherButton.classList.remove('active-style');
          if (otherButton.nextElementSibling) {
            otherButton.nextElementSibling.classList.remove('active-content');
            (otherButton.nextElementSibling as HTMLElement).style.maxHeight = '0px';
          }
        }
      });
    });
  });
};