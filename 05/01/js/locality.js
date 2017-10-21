const locality = document.querySelector('.form__item--locality');

locality.addEventListener('input', () => {
  if (locality.value.length > 10) {
    locality.parentNode.classList.add('form__item-wrapper--error');
  } else {
    locality.parentNode.classList.remove('form__item-wrapper--error');
  }
});
