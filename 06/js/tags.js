const ENTER_KEY_CODE = 13;
const BACKSPACE_KEY_CODE = 8;

const field = document.querySelector('.tags');
const input = document.querySelector('.tags__input');

const generateNewTag = tagValue => {
  const newTag = document.createElement('div');

  newTag.classList.add('tags__item');
  newTag.title = tagValue;

  const newTagText = document.createElement('span');

  newTagText.classList.add('tags__text');
  newTagText.textContent = tagValue;
  newTag.appendChild(newTagText);

  const newTagBtn = document.createElement('button');

  newTagBtn.classList.add('tags__remove');
  newTagBtn.textContent = 'remove';
  newTag.appendChild(newTagBtn);

  return newTag;
};

input.addEventListener('keydown', evt => {
  if (evt.keyCode === BACKSPACE_KEY_CODE && input.value.length === 0) {
    const tags = document.querySelectorAll('.tags__item');

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
