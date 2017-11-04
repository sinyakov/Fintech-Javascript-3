const input = document.querySelector('input');
const link = document.querySelector('a');

const mask = '+7(000)-000-00-00';
let previousValue = '+7';

const cutSymbols = selectionStart => {
  let lastDigitBeforeCaret = selectionStart;

  while (!Number.isInteger(parseInt(mask[lastDigitBeforeCaret], 10))) {
    lastDigitBeforeCaret -= 1;
  }

  return input.value.substring(0, lastDigitBeforeCaret) + input.value.substring(selectionStart);
};

const maskNumber = (number, maskArray) => {
  let currentSymbolIndex = 0;

  for (let i = 0; i < number.length; i++) {
    if (Number.isInteger(parseInt(maskArray[currentSymbolIndex], 10))) {
      maskArray[currentSymbolIndex] = number[i];
    } else {
      i -= 1;
    }
    currentSymbolIndex += 1;
  }

  return `+7${maskArray.join('').slice(2, currentSymbolIndex)}`;
};

const setCursor = (selectionStart, parsedData) => {
  let firstDigitAfterCaret = selectionStart - parsedData.length;

  for (let i = 0; i < parsedData.length && firstDigitAfterCaret < input.value.length; i++) {
    if (Number.isNaN(+mask[firstDigitAfterCaret])) {
      i -= 1;
    }
    firstDigitAfterCaret += 1;
  }

  input.selectionStart = firstDigitAfterCaret;
  input.selectionEnd = firstDigitAfterCaret;
};

const updateLink = () => {
  if (input.value.length === mask.length) {
    link.href = `tel:+${input.value.replace(/\D+/g, '').slice(0, 11)}`;
    link.textContent = `Позвонить на ${input.value}`;
  }
};

input.addEventListener('input', evt => {
  const selectionStart = input.selectionStart;
  const parsedData = Number(evt.data).toString();

  if (evt.data !== null && Number.isNaN(+parsedData)) {
    input.value = previousValue;
    input.selectionStart = selectionStart - evt.data.length;
    input.selectionEnd = selectionStart - evt.data.length;
    return;
  }

  if (evt.data === null && selectionStart >= 2) {
    input.value = cutSymbols(selectionStart);
  }

  const number = input.value.replace(/\D+/g, '').slice(0, 11);
  const maskArray = mask.split('');

  previousValue = maskNumber(number, maskArray);
  input.value = previousValue;
  setCursor(selectionStart, parsedData);

  updateLink();
});

input.addEventListener('focus', () => {
  if (input.value === '') {
    input.value = '+7';
  }
});

input.addEventListener('blur', () => {
  if (input.value === '+7') {
    input.value = '';
  }
});
