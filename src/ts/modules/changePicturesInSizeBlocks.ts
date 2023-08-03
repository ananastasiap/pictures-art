export const changePicturesInSizeBlocks = (imgSelector: string) => {
  const blocksOfPictures = document.querySelectorAll<HTMLElement>(imgSelector);

  const showPicture = (block: HTMLElement) => {
    const img: HTMLImageElement | null = block.querySelector('img');
    if (img) {
      img.src = img.src.slice(0, -4) + '-1.png';
      block.querySelectorAll('p:not(.sizes-hit)').forEach((p: Element) => {
        (p as HTMLElement).style.display = 'none';
      });
    }
  };

  const hidePicture = (block: HTMLElement) => {
    const img: HTMLImageElement | null = block.querySelector('img');
    if (img) {
      img.src = img.src.slice(0, -6) + '.png';
      block.querySelectorAll('p:not(.sizes-hit)').forEach((p: Element) => {
        (p as HTMLElement).style.display = 'block';
      });
    }
  };

  blocksOfPictures.forEach(blocksOfPicture => {
    blocksOfPicture.addEventListener('mouseover', () => {
      showPicture(blocksOfPicture);
    });
  });

  blocksOfPictures.forEach(blocksOfPicture => {
    blocksOfPicture.addEventListener('mouseout', () => {
      hidePicture(blocksOfPicture);
    });
  });
};
