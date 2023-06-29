export const scrolling = (upSelector: string) => {
  const upElement: HTMLElement | null = document.querySelector(upSelector);
  const anchors = document.querySelectorAll<HTMLElement>('[href^="#"]');
  const speedOfScroll: number = 0.3;
  const pxFromTop: number = 1650;

  if (!upElement) {
    return;
  }

  window.addEventListener('scroll', () => {
    if (document.documentElement.scrollTop > pxFromTop) {
      upElement.classList.add('animated', 'fadeIn');
      upElement.classList.remove('fadeOut');
    } else {
      upElement.classList.add('fadeOut');
      upElement.classList.remove('fadeIn');
    }
  });

  anchors.forEach(anchor => {
    anchor.addEventListener('click', function(event: MouseEvent) {
      event.preventDefault();

      let widthTop: number = document.documentElement.scrollTop;
      let hash: string = (this as HTMLAnchorElement).hash;
      let targetElement = document.querySelector(hash);

      if (!targetElement) {
        return;
      }

      let toBlock: number = targetElement.getBoundingClientRect().top;
      let start: number | null = null;

      const step = (time: number) => {
        if (start === null) {
          start = time;
        }

        let progress: number = time - start;
        let amountOfPxToScroll: number = (toBlock < 0 ? Math.max(widthTop - progress / speedOfScroll, widthTop + toBlock) :
                               Math.min(widthTop + progress / speedOfScroll, widthTop + toBlock));

            document.documentElement.scrollTo(0, amountOfPxToScroll);

            if (amountOfPxToScroll !== widthTop + toBlock) {
              requestAnimationFrame(step);
            } else {
              location.hash = hash;
            }
      };

      requestAnimationFrame(step);
    });
  });
};