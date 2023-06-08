import { getResource } from "../services/requests";

export const showMoreStyles = (trigger: string, wrapper: string) => {
  const button: HTMLElement | null = document.querySelector(trigger);

  if (!button) {
    return;
  }

  button.addEventListener('click', function() {
    getResource('public/db.json')
      .then(result => createcards(result.styles))
      .catch(error => console.log(error));

    this.remove();
  });

  const createcards = (responses: { src: string; title: string; link: string; }[]) => {
    responses.forEach(({ src, title, link }) => {
      const card: HTMLElement = document.createElement('div');
      card.classList.add('animated', 'fadeInUp', 'col-sm-3', 'col-sm-offset-0', 'col-xs-10', 'col-xs-offset-1');
      card.innerHTML = `
        <div class="styles-block">
          <img src="${src}" alt="Picture">
          <h4>${title}</h4>
          <a href="${link}">Подробнее</a>
        </div>
      `;

      const container: HTMLElement | null = document.querySelector(wrapper);
      if (container !== null) {
        container.appendChild(card);
      }
    });
  };


};


/* more basic way:

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

*/