const locality = document.querySelector('.form__item-input--locality');

locality.addEventListener('input', () => {
  if (locality.value.length > 10) {
    locality.parentNode.classList.add('form__item--error');
  } else {
    locality.parentNode.classList.remove('form__item--error');
  }
});
