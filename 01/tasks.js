/**
 * найдите минимум и максимум в любой строке
 * @param  {string} string входная строка(числа отделены от других частей строки пробелами или знаками препинания)
 * @return {{min: number, max: number}} объект с минимумом и максимумом
 * '1 и 6.45, -2, но 8, а затем 15, то есть 2.7 и -1028' => { min: -1028, max: 15 }
 */

const getMinMax = string => {
  const numbers = string.match(/-?\d+(\.\d+)?/g);

  if (!numbers) {
    throw new Error('Строка не содержит чисел');
  }

  return numbers.reduce(
    (acc, curr) => {
      const currNum = parseFloat(curr);

      return {
        min: currNum < acc.min ? currNum : acc.min,
        max: currNum > acc.max ? currNum : acc.max
      };
    },
    { min: Infinity, max: -Infinity }
  );
};

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
  const fib = [0, 1];

  const calculate = n => {
    if (n in fib) {
      return fib[n];
    }

    if (n < 0) {
      fib[n] = n % 2 ? calculate(-n) : -calculate(-n);
      return fib[n];
    }

    fib[n] = calculate(n - 1) + calculate(n - 2);
    return fib[n];
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
 * @param  {number} max  максимальное число (до 99)
 * @param  {number} cols количество столбцов
 * @return {string}
 */
const printNumbers = (max, cols) => {
  const rows = Math.ceil((max + 1) / cols);
  const lastRowLength = max % cols + 1;

  return Array.from({ length: rows }, (_, i) =>
    Array.from({ length: i < rows - 1 ? cols : lastRowLength }, (_, j) =>
      (j < lastRowLength ? j * rows + i : j * (rows - 1) + i + lastRowLength).toString().padStart(2)
    ).join(' ')
  ).join('\n');
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
