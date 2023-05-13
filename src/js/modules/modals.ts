export const modals = () => {
  const bindModal = ({
    triggerSelector,
    modalSelector,
    closeSelector,
    closeClickOverlay = true,
  }: {
    triggerSelector: string;
    modalSelector: string;
    closeSelector: string;
    closeClickOverlay?: boolean;
  }) => {
    const triggers = document.querySelectorAll(triggerSelector);
    const windows = document.querySelectorAll<HTMLElement>('[data-modal]');
    const scroll = calcScroll();
    const modal: HTMLElement | null = document.querySelector(modalSelector)
    const close: HTMLElement | null = document.querySelector(closeSelector)
    if (!modal || !close) {
      return
    }

    triggers.forEach(trigger => {
      trigger.addEventListener('click', (event) => {
        if (event.target) {
          event.preventDefault();
        }

        closeAllModals();

        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        document.body.style.marginRight = `${scroll}px`;
        close.focus();
      });
    });

    close.addEventListener('click', () => {
      closeAllModals();
      closeModal();
    });

    modal.addEventListener('click', (event) => {
      if (event.target === modal && closeClickOverlay) {
        closeAllModals();
        closeModal();
      }
    });

    document.addEventListener('keydown', (event) => {
      if (event.key.toLowerCase() === 'escape') {
        closeAllModals();
        closeModal();
      }
    });

    const closeModal = () => {
      modal.style.display = 'none';
      document.body.style.overflow = '';
      document.body.style.marginRight = `0p`;
    };

    const closeAllModals = () => {
      windows.forEach(window => {
        window.style.display = 'none';
      });
    }
  };

  const showModalByTime = (selector: string, time: number) => {
    setTimeout(function() {
      let display;

      document.querySelectorAll('[data-modal]').forEach(eachModal => {
        if (getComputedStyle(eachModal).display !== 'none') {
          display = 'block';
        }
      });

      if (!display) {
        const modalByTime = document.querySelector(selector) as HTMLElement;
        modalByTime.style.display = 'block';
        document.body.style.overflow = 'hidden';
      }
    }, time);
  };

  const calcScroll = (): number => {
    const div = document.createElement('div');

    div.style.width = '50px';
    div.style.height = '50px';
    div.style.overflowY = 'scroll';
    div.style.visibility = 'hidden';

    document.body.append(div);

    const scrollWidth = div.offsetWidth - div.clientWidth;
    div.remove();

    return scrollWidth;
  };

  bindModal({
    triggerSelector: '.button-design',
    modalSelector: '.popup-design',
    closeSelector: '.popup-design .popup-close'
  });
  bindModal({
    triggerSelector: '.button-consultation',
    modalSelector: '.popup-consultation',
    closeSelector: '.popup-consultation .popup-close'
  });
  showModalByTime('.popup-consultation', 60000);
};