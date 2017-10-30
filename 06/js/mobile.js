const mobile = document.querySelector('.form__item-input--mobile');

const mask = '+7(000) 000-00-00';

mobile.addEventListener('focus', () => {
  if (mobile.value === '') {
    mobile.value = '+7';
  }
});

mobile.addEventListener('blur', () => {
  if (mobile.value === '+7') {
    mobile.value = '';
  }
});

const setCursor = (selectionStart, dataLength) => {
  const start = selectionStart - dataLength;

  if (start === mask.length) {
    return;
  }

  let currentSymbolIndex = start;

  for (let i = 0; i < dataLength; i++) {
    if (!Number.isInteger(parseInt(mobile.value[currentSymbolIndex], 10))) {
      i -= 1;
    }
    currentSymbolIndex += 1;
  }
  mobile.selectionStart = currentSymbolIndex;
  mobile.selectionEnd = currentSymbolIndex;
};

mobile.addEventListener('input', evt => {
  const number = mobile.value.replace(/\D+/g, '').slice(0, 11);
  const selectionStart = mobile.selectionStart;

  const maskArray = mask.split('');
  let currentSymbolIndex = 0;

  for (let i = 0; i < number.length; i++) {
    if (Number.isInteger(parseInt(maskArray[currentSymbolIndex], 10))) {
      maskArray[currentSymbolIndex] = number[i];
    } else {
      i -= 1;
    }
    currentSymbolIndex += 1;
  }

  mobile.value = `+7${maskArray.join('').slice(2, currentSymbolIndex)}`;

  if (!Number.isNaN(parseInt(evt.data, 10))) {
    setCursor(selectionStart, evt.data.length);
  }
});
