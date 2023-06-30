export const dragDrop = () => {
  const imgInputs = document.querySelectorAll<HTMLInputElement>('[name="upload"]');

  const preventDefaults = (event: Event) => {
    event.preventDefault();
    event.stopPropagation();
  };

  ['dragenter', 'dragleave', 'dragover', 'drop'].forEach((eventName: string) => {
    imgInputs.forEach((imgInput: HTMLElement) => {
      imgInput.addEventListener(eventName, preventDefaults, false);
    });
  });

  const highlight = (inputBlock: HTMLElement | null) => {
    if (inputBlock) {
      const fileUpload: HTMLElement | null = inputBlock.closest('.file_upload');
      if (fileUpload) {
        fileUpload.style.boxShadow = "-2px 0px 25px 8px rgba(0, 0, 0, 0.7)";
        fileUpload.style.borderRadius = '30px';
        fileUpload.style.backgroundColor = 'rgba(238, 229, 229, 0.829)';
      }
    }
  };

  const unhighlight = (inputBlock: HTMLElement | null) => {

    if (inputBlock) {
      const fileUpload: HTMLElement | null = inputBlock.closest('.file_upload');
      if (fileUpload) {
        fileUpload.style.boxShadow = 'none';

        if (inputBlock.closest('.calc_form')) {
          fileUpload.style.backgroundColor = '#fff';
        } else if (inputBlock.closest('.col-md-offset-3')) {
          fileUpload.style.backgroundColor = '#f7e7e6';
        } else {
          fileUpload.style.backgroundColor = '#ededed';
        }
      }
    }
  };

  ['dragenter', 'dragover'].forEach((eventName: string) => {
    imgInputs.forEach((imgInput: HTMLElement) => {
      imgInput.addEventListener(eventName, () => highlight(imgInput), false);
    });
  });

  ['dragleave', 'drop'].forEach((eventName: string) => {
    imgInputs.forEach((imgInput: HTMLElement) => {
      imgInput.addEventListener(eventName, () => unhighlight(imgInput), false);
    });
  });

  imgInputs.forEach((imgInput: HTMLInputElement) => {
    imgInput.addEventListener('drop', (event: DragEvent) => {
      if (event.dataTransfer) {
        imgInput.files = event.dataTransfer.files;

        let dots: string;
        const divideNameOfFile = imgInput.files![0].name.split('.');

        divideNameOfFile[0].length > 6 ? dots = '...' : dots = '.';
        const name: string = divideNameOfFile[0].substring(0, 6) + dots + divideNameOfFile[1];
        if (!imgInput.previousElementSibling) {
          return;
        }
        imgInput.previousElementSibling.textContent = name;
      }
    });
  });
};