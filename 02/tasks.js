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
const anagram = (first, second) => {
  const dict = new Array(65536);

  dict.fill(0);

  for (let i = 0; i < first.length; i++) {
    dict[first[i].charCodeAt(0)]++;
  }

  for (let i = 0; i < second.length; i++) {
    dict[second[i].charCodeAt(0)]--;
  }

  return dict.every(x => !x);
};

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
 * @param {Array<number>} first исходные массивы
 * @param {Array<number>} second
 * @return {Array<number>} массив уникальных значений, отсортированный по возрастанию
 */
const getIntersection = (first, second) =>
  getUnique(first).reduce((acc, curr) => {
    const firstFiltered = first.filter(x => x === curr);
    const secondFiltered = second.filter(x => x === curr);

    return firstFiltered.length < secondFiltered.length ? [...acc, ...firstFiltered] : [...acc, ...secondFiltered];
  }, []);

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
const isIsomorphic = (left, right) =>
  left.length === right.length && left.split('').reduce((acc, curr, index) => acc + (curr !== right[index] ? 1 : 0), 0) <= 1;

module.exports = {
  timer,
  customBind,
  sum,
  anagram,
  getUnique,
  getIntersection,
  isIsomorphic
};
