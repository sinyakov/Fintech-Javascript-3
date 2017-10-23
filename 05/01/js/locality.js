const locality = document.querySelector('.form__item-input--locality');

locality.addEventListener('input', () => {
  const isValid = !!locality.value.match(/^[а-яёА-ЯЁ0-9\-— ]*$/);
  // В задании нужно проверять, что в названии нет латинских букв.
  // Но, мне кажется, название в принципе может содержать только кириллические буквы, цифры и дефисы и тире.

  if (!isValid) {
    locality.parentNode.classList.add('form__item--error');
  } else {
    locality.parentNode.classList.remove('form__item--error');
  }
});
