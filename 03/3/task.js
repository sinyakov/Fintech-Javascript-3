/**
 * Реализовать функцию, поведение которой аналогично поведению Promise.all,
 * которая возвращает в качестве результата rejected промис c первым reject value или resolve с массивом resolveValues,
 * в соответствущих исходному массиву промисов позициях, если не было ни одного промиса с reject.
 * @param {Array<Promise>} promises - массив с исходными промисами
 * @return {Promise}
 */
const promiseAll = promises =>
  new Promise((resolve, reject) => {
    const result = [];
    let count = promises.length;

    const isFinished = () => {
      if (!count) {
        resolve(result);
      }
    };

    promises.forEach((promise, index) => {
      promise
        .then(res => {
          result[index] = res;
          count -= 1;
        }, reject)
        .then(isFinished);
    });
  });

module.exports = promiseAll;
