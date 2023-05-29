export const showMoreStyles = (trigger: string, shownStyles: string) => {
  const cards = document.querySelectorAll<HTMLElement>(shownStyles);
  const button: HTMLElement | null = document.querySelector(trigger);

  if (!button) {
    return;
  }

  cards.forEach((card: HTMLElement) => {
    card.classList.add('animated', 'fadeInUp');
  });

  button.addEventListener('click', () => {
    cards.forEach((card: HTMLElement) => {
      card.classList.remove('hidden-lg', 'hidden-md', 'hidden-sm', 'hidden-xs');
      card.classList.add('col-sm-3', 'col-sm-offset-0', 'col-xs-10', 'col-xs-offset-1');
    });

    button.remove();
  });
};