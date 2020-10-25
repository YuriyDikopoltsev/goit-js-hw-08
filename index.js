import galleryItems from './gallery-items.js';

const refs = {
  list: document.querySelector('.js-gallery'),
  modal: document.querySelector('.js-lightbox'),
  closeModalBtn: document.querySelector('button[data-action="close-lightbox"]'),
  modalImg: document.querySelector('.lightbox__image'),
  overlay: document.querySelector('div.lightbox__overlay'),
};

refs.list.innerHTML = galleryItems
  .map(
    ({ preview, original, description }) => `<li class="gallery__item">
<a
  class="gallery__link"
  href="${original}"
>
  <img
    class="gallery__image"
    src="${preview}"
    data-source="${original}"
    alt="${description}"
  />
</a>
</li>`,
  )
  .join('');

refs.list.addEventListener('click', openModalImg);

refs.closeModalBtn.addEventListener('click', closeModal);

refs.overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', keyboardPress);

function openModalImg(e) {
  e.preventDefault();
  if (e.currentTarget !== e.target) {
    refs.modal.classList.add('is-open');
    galleryItems.map(img => {
      if (img.preview === e.target.src) {
        refs.modalImg.src = img.original;
        refs.modalImg.alt = img.description;
      }
    });
  }
}

function closeModal() {
  refs.modal.classList.remove('is-open');
  refs.modalImg.src = '';
  refs.modalImg.alt = '';
}

function keyboardPress(event) {
  const urlsArr = galleryItems.map(el => el.original);
  const altsArr = galleryItems.map(el => el.description);

  if (event.code === 'Escape') {
    closeModal();
  }

  if (event.code === 'ArrowRight') {
    for (let i = 0; i < urlsArr.length; i += 1) {
      if (refs.modalImg.src === urlsArr[urlsArr.length - 1]) {
        refs.modalImg.src = `${urlsArr[0]}`;
        refs.modalImg.alt = `${altsArr[0]}`;
        return;
      }

      if (refs.modalImg.src === urlsArr[i]) {
        refs.modalImg.src = `${urlsArr[i + 1]}`;
        refs.modalImg.alt = `${altsArr[i + 1]}`;
        return;
      }
    }
  }
  if (event.code === 'ArrowLeft') {
    for (let i = 0; i < urlsArr.length; i += 1) {
      if (refs.modalImg.src === urlsArr[0]) {
        refs.modalImg.src = `${urlsArr[urlsArr.length - 1]}`;
        refs.modalImg.alt = `${altsArr[altsArr.length - 1]}`;
        return;
      }

      if (refs.modalImg.src === urlsArr[i]) {
        refs.modalImg.src = `${urlsArr[i - 1]}`;
        refs.modalImg.alt = `${altsArr[i - 1]}`;
        return;
      }
    }
  }
}
