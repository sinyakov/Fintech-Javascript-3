/**
 * Реализовать функцию, поведение которой аналогично поведению Promise.race,
 * которая возвращает в качестве результата промис c первым resolve value или reject value в массиве исходных промисов
 * @param {Array<Promise>} promises - массив с исходными промисами
 * @return {Promise}
 */

const promiseRace = promises =>
  new Promise((resolve, reject) =>
    promises.forEach(promise => promise.then(resolve).catch(reject))
  );

module.exports = promiseRace;
