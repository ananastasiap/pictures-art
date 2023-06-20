export const filter = () => {
  const portfolioMenu: HTMLElement | null = document.querySelector('.portfolio-menu');
  const buttonsOfTypes = portfolioMenu?.querySelectorAll<HTMLElement>('li')
  const wrapper: HTMLElement | null = document.querySelector('.portfolio-wrapper');
  const markAll = wrapper?.querySelectorAll<HTMLElement>('.all');
  const noPics: HTMLElement | null = document.querySelector('.portfolio-no');

  if (!portfolioMenu || !wrapper || !noPics) {
    return;
  }

  const typeFilter = (markType: NodeListOf<HTMLElement> | null) => {
    markAll?.forEach((mark: HTMLElement) => {
      mark.style.display = 'none';
      mark.classList.remove('animated', 'fadeIn');
    });

    noPics.style.display = 'none';
    noPics.classList.remove('animated', 'fadeIn');

    if (markType && markType.length > 0) {
      markType.forEach(mark => {
        mark.style.display = 'block';
        mark.classList.add('animated', 'fadeIn');
      });
    } else {
      noPics.style.display = 'block';
      noPics.classList.add('animated', 'fadeIn');
    }
  };

  portfolioMenu?.addEventListener('click', (event: Event) => {
    const target = event.target;

    if (target instanceof HTMLElement && target.tagName.toUpperCase() === 'LI') {
      buttonsOfTypes?.forEach((button: HTMLElement) => {
        button.classList.remove('active');
      });

      target.classList.add('active');

      typeFilter(wrapper?.querySelectorAll(`.${target.classList[0]}`));
    }
  });
};