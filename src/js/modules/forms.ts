import { postData } from "../services/requests";

export const forms = () => {
  const forms = document.querySelectorAll<HTMLFormElement>('form');
  const inputs = document.querySelectorAll<HTMLInputElement>('input');
  const uploadPics = document.querySelectorAll<HTMLInputElement>('[name="upload"]');

  const message = {
    loading: 'Загрузка...',
    success: 'Спасибо! Скоро мы с вами свяжемся',
    failure: 'Что-то пошло не так...',
    spinner: '/spinner.gif',
    ok: '/ok.png',
    fail: '/fail.png',
  };

  const path = {
    designer: 'https://simple-server-cumz.onrender.com/api/data',
    question: 'https://simple-server-cumz.onrender.com/api/data',
  }

  const clearInputs = () => {
    inputs.forEach((input: HTMLInputElement) => {
      input.value = '';
    });
    uploadPics.forEach((uploadPic: HTMLInputElement) => {
      if (!uploadPic.previousElementSibling) {
        return;
      }
      uploadPic.previousElementSibling.textContent = 'Файл не выбран';
    });
  };

  uploadPics.forEach((uploadPic: HTMLInputElement) => {
    uploadPic.addEventListener('input', () => {
        let dots: string;
        const divideNameOfFile = uploadPic.files![0].name.split('.');

        divideNameOfFile[0].length > 6 ? dots = '...' : dots = '.';
        const name: string = divideNameOfFile[0].substring(0, 6) + dots + divideNameOfFile[1];
        if (!uploadPic.previousElementSibling) {
          return;
        }
        uploadPic.previousElementSibling.textContent = name;
    });
});

  forms.forEach((form: HTMLFormElement) => {
    form.addEventListener('submit', (event: SubmitEvent) => {
      event.preventDefault();

      const statusMessage: HTMLElement | null = document.createElement('div');
      if (!statusMessage) {
        return;
      }
      statusMessage.classList.add('status');
      form.parentNode?.append(statusMessage);

      // для исчезновения формы
      form.classList.add('animated', 'fadeOutUp');
      setTimeout(() => {
        form.style.display = 'none';
      }, 400);

      // сообщение об отправке формы
      const statusImg: HTMLElement | null = document.createElement('img');
      statusImg.setAttribute('src', message.spinner);
      statusImg.classList.add('animated', 'fadeInUp');
      statusMessage.append(statusImg);

      const textMessage = document.createElement('div');
      textMessage.textContent = message.loading;
      statusMessage.append(textMessage);

      // json
      const formData = new FormData(form);
      const jsonObject: { [key: string]: string | File } = {};
      formData.forEach((value, key) => jsonObject[key] = value);

      if (form.classList.contains('calc_form')) {
        const size: HTMLSelectElement | null = document.querySelector("#size");
        const material: HTMLSelectElement | null = document.querySelector('#material');
        const options: HTMLSelectElement | null = document.querySelector('#options');
        const promocode: HTMLInputElement | null = document.querySelector('.promocode');
        const totalPrice: HTMLElement | null = document.querySelector('.calc-price');

        if (size?.value) {
          jsonObject['size'] = size.options[size.selectedIndex].text;
        } else {
          jsonObject['size'] = '';
        }

        if (material?.value) {
          jsonObject['material'] = material.options[material.selectedIndex].text;
        } else {
          jsonObject['material'] = '';
        }

        if (options?.value) {
          jsonObject['options'] = options.options[options.selectedIndex].text;
        } else {
          jsonObject['options'] = '';
        }

        jsonObject['promocode'] = promocode?.value || '';

        if (size?.value && material?.value) {
          jsonObject['total_price'] = totalPrice?.textContent || '';
        } else {
          jsonObject['total_price'] = '';
        }
      }

      const jsonData = JSON.stringify(jsonObject);

      const api: string = form.closest('.popup-design') || form.classList.contains('calc_form') ? path.designer : path.question;

      postData(api, jsonData)
            .then(() => {
              statusImg.setAttribute('src', message.ok);
              textMessage.textContent = message.success;
            })
            .catch(() => {
              statusImg.setAttribute('src', message.fail);
              textMessage.textContent = message.failure;
            })
            .finally(() => {
              clearInputs();
              setTimeout(() => {
                statusMessage.remove();
                form.style.display = 'block';
                form.classList.remove('fadeOutUp');
                form.classList.add('fadeInUp');
              }, 5000);
            });
    });
  });
};