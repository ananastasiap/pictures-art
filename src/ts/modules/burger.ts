export const burger = (burgerSelector: string, menuSelector: string) => {
  const menu: HTMLElement | null = document.querySelector(menuSelector);
  const burger: HTMLElement | null = document.querySelector(burgerSelector);
  const BREAKPOINT = 992;

  if (!menu || !burger) {
    return;
  }

  menu.style.display = 'none';

  burger.addEventListener('click', () => {
    menu.style.display = (menu.style.display === 'none' && window.screen.availWidth < BREAKPOINT) ?
                         'block' : 'none';
  });

  window.addEventListener('resize', () => {
    if(window.screen.availHeight > BREAKPOINT) {
      menu.style.display = 'none';
    }
  });
};
