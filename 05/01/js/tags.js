const ENTER_KEY_CODE = 13;
const BACKSPACE_KEY_CODE = 8;

const field = document.querySelector('.field');
const input = document.querySelector('.field__input');

const generateNewTag = tagValue => {
  const newTag = document.createElement('div');

  newTag.classList.add('tag');

  const newTagText = document.createElement('span');

  newTagText.classList.add('tag__text');
  newTagText.textContent = tagValue;
  newTag.appendChild(newTagText);

  const newTagBtn = document.createElement('button');

  newTagBtn.classList.add('tag__remove');
  newTagBtn.textContent = 'remove';
  newTag.appendChild(newTagBtn);

  return newTag;
};

input.addEventListener('keydown', evt => {
  if (evt.keyCode === BACKSPACE_KEY_CODE && input.value.length === 0) {
    const tags = document.querySelectorAll('.tag');

    if (tags.length > 0) {
      const lastTag = tags[tags.length - 1];

      field.removeChild(lastTag);
    }

    return;
  }

  if (evt.keyCode !== ENTER_KEY_CODE || input.value.trim().length === 0) {
    return;
  }

  field.insertBefore(generateNewTag(input.value), input);
  input.value = '';
});

field.addEventListener('click', evt => {
  evt.preventDefault();
  if (evt.target.tagName !== 'BUTTON') {
    return;
  }
  field.removeChild(evt.target.parentNode);
});
