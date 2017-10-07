// Изменить поведение чисел таким образом, чтобы указанные конструкции были эквивалетны при условии,
// что римские цифры могут быть любыми.
// 0..V => [0, 1, 2, 3, 4]
// 0..VII => [0, 1, 2, 3, 4, 5, 6]
// 0..X => [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
// Подсказка - необходимо использовать Proxy - объекты

/**
* Функция конвертирует число из римской системы счисления в арабскую
* @param {String} str число в римской системе счисления
* @return {Number} число в арабской системе счисления
*/
const romanToArabic = str => {
  const table = {
    M: 1000,
    CM: 900,
    D: 500,
    CD: 400,
    C: 100,
    XC: 90,
    L: 50,
    XL: 40,
    X: 10,
    IX: 9,
    V: 5,
    IV: 4,
    I: 1
  };

  return str
    .match(/CM|CD|XC|XL|IX|IV|\w/g)
    .reduce((acc, curr) => acc + table[curr], 0);
};

const numberPrototype = Object.getPrototypeOf(Number.prototype);
const romanedNumber = new Proxy(numberPrototype, {
  get: (target, name) =>
    (name in target ? target[name] : [...Array(romanToArabic(name)).keys()])
});

Object.setPrototypeOf(Number.prototype, romanedNumber);
