/**
 * Исправьте проблему с таймером: должны выводиться числа от 0 до 9.
 * Доп. задание: предложите несколько вариантов решения.
 */
const timer = (logger = console.log) => {
  for (var i = 0; i < 10; i++) {
    setTimeout((x => () => logger(x))(i), 100);
  }
};

/*= ============================================ */

/**
 * Создайте собственную реализацию функции bind
 * @param {Function} func передаваемая функция
 * @param {any} context контекст
 * @param {Array<any>} args массив аргументов
 * @return {Function} функция с нужным контекстом
 */
const customBind = (func, context, ...args) => (...bindArgs) => func.call(context, ...args, ...bindArgs);

/*= ============================================ */

/**
 * Напишите функцию sum, вычисляющую суммы подобным образом:
 * sum(1)(2)( ) // 3
 * sum(1)(2)(3)( ) // 6
 * sum :: Number -> sum
 * sum :: void -> Number
 * @param {(number|Void)} a
 * @return {(Function|number)}
 */
const sum = a => {
  if (a === undefined) {
    return 0;
  }
  return x => (x === undefined ? a : sum(a + x));
};
/*= ============================================ */

/**
 * Определите, являются ли строчки анаграммами (например, “просветитель” — “терпеливость”).
 * @param {string} first
 * @param {string} second
 * @return {boolean}
 */
const anagram = (first, second) =>
  first.length === second.length
  && first
    .split('')
    .sort()
    .join() ===
    second
      .split('')
      .sort()
      .join();

/*= ============================================ */

/**
 * Сократите массив до набора уникальных значений
 * [1,1, 2, 6, 3, 6, 2] → [1, 2, 3, 6]
 * @param {Array<number>} arr исходный массив
 * @return {Array<number>} массив уникальных значений, отсортированный по возрастанию
 */
const getUnique = arr => [...new Set(arr)].sort((a, b) => a - b);

/**
 * Найдите пересечение двух массивов
 * [1, 3, 5, 7, 9] и [1, 2, 3, 4] → [1, 3]
 * @param {Array<number> first исходные массивы
 * @param {Array<number> second
 * @return {Array<number>} массив уникальных значений, отсортированный по возрастанию
 */
const getIntersection = (first, second) => first.filter(x => second.includes(x)).sort((a, b) => a - b);

/* ============================================= */

/**
 * Две строки называются изоморфными, когда в строке A можно заменить
 * конкретный символ на любой другой для получения строки B. (Расстояние Левенштейна, при возможных мутациях
 * ограничивающихся заменой символа - отличается на 1).
 * Отдельно стоит отметить что строка изоморфна самой себе.
 * Порядок символов должен остаться неизменным. Каждый
 * последовательный символ в строке A сравнивается с
 * каждым последовательным символов в строке B.
 *
 * @param  {string} left
 * @param  {string} right
 * @return {boolean}
 */
const isIsomorphic = (left, right) => {
  if (left.length !== right.length) {
    return false;
  }

  const leftArray = left.split('');

  for (let i = 0; i < left.length; i++) {
    if (leftArray.map(x => (x === left[i] ? right[i] : x)).join('') === right) {
      return true;
    }
  }
  return false;
};

module.exports = {
  timer,
  customBind,
  sum,
  anagram,
  getUnique,
  getIntersection,
  isIsomorphic
};
