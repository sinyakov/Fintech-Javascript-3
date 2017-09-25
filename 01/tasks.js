/**
 * найдите минимум и максимум в любой строке
 * @param  {string} string входная строка(числа отделены от других частей строки пробелами или знаками препинания)
 * @return {{min: number, max: number}} объект с минимумом и максимумом
 * '1 и 6.45, -2, но 8, а затем 15, то есть 2.7 и -1028' => { min: -1028, max: 15 }
 */

const getMinMax = string =>
  string
    .match(/-?\d+(\.\d+|)/g)
    .map(str => Number(str))
    .reduce(
      (acc, curr) => ({
        min: curr < acc.min ? curr : acc.min,
        max: curr > acc.max ? curr : acc.max
      }),
      { min: Infinity, max: -Infinity }
    );

/* ============================================= */

/**
 * Напишите рекурсивную функцию вычисления чисел Фибоначчи
 * @param {number} x номер числа
 * @return {number} число под номером х
 */

const fibonacciSimple = x => {
  if (x < 0) {
    return x % 2 ? fibonacciSimple(-x) : -fibonacciSimple(-x);
  }
  if (x === 0 || x === 1) {
    return x;
  }
  return fibonacciSimple(x - 1) + fibonacciSimple(x - 2);
};

/* ============================================= */

/**
 * Напишите функцию для вычисления числа Фибоначчи с мемоизацией:
 * при повторных вызовах функция не вычисляет значения, а достает из кеша.
 * @param {number} x номер числа
 * @return {number} число под номером х
 */
const fibonacciWithCache = x => {
  const fib = new Map();

  const calculate = n => {
    if (fib.has(n)) {
      return fib.get(n);
    }

    let fibN;

    if (n < 0) {
      fibN = n % 2 ? calculate(-n) : -calculate(-n);
    } else if (n === 0 || n === 1) {
      fibN = n;
    } else {
      fibN = calculate(n - 1) + calculate(n - 2);
    }
    fib.set(n, fibN);
    return fibN;
  };

  return calculate(x);
};

/* ============================================= */

/**
 * Напишите функцию printNumbers, выводящую числа в столбцах
 * так, чтобы было заполнено максимальное число столбцов при
 * минимальном числе строк.
 * Разделитель межу числами в строке - один пробел,
 * на каждое число при печати - отводится 2 символа
 * Пример работы: printNumbers(11, 3)
 *  0  4  8
 *  1  5  9
 *  2  6 10
 *  3  7 11
 * @param  {number} maxNumber  максимальное число (до 99)
 * @param  {number} maxCols количество столбцов
 * @return {string}
 */
const printNumbers = (maxNumber, maxCols) => {
  let cols = maxCols;

  while ((maxNumber + 1) % cols) {
    cols -= 1;
  }

  const rows = (maxNumber + 1) / cols;
  const table = [];

  for (let i = 0; i < rows; i++) {
    const line = [];

    for (let j = 0; j < cols; j++) {
      line.push(i + j * rows);
    }

    table.push(line.map(x => x.toString().padStart(2)).join(' '));
  }
  return table.join('\n');
};
/* ============================================= */

/**
 * Реализуйте RLE-сжатие: AAAB -> A3B, BCCDDDEEEE -> BC2D3E4
 * @param  {string} value
 * @return {string}
 */
const rle = value => value.replace(/(.)\1{0,}/g, subseq => `${subseq[0]}${subseq.length === 1 ? '' : subseq.length}`);

module.exports = {
  getMinMax,
  rle,
  printNumbers,
  fibonacciSimple,
  fibonacciWithCache
};
