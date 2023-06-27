export const burger = (burgerSelector: string, menuSelector: string) => {
  const menu: HTMLElement | null = document.querySelector(menuSelector);
  const burger: HTMLElement | null = document.querySelector(burgerSelector);

  if (!menu || !burger) {
    return;
  }

  menu.style.display = 'none';

  burger.addEventListener('click', () => {
    menu.style.display = (menu.style.display === 'none' && window.screen.availWidth < 993) ?
                         'block' : 'none';
  });

  window.addEventListener('resize', () => {
    if(window.screen.availHeight > 992) {
      menu.style.display = 'none';
    }
  });
};
