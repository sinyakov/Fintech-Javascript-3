/**
 * Реализовать функцию, поведение которой аналогично поведению Promise.all,
 * которая возвращает в качестве результата rejected промис c первым reject value или resolve с массивом resolveValues,
 * в соответствущих исходному массиву промисов позициях, если не было ни одного промиса с reject.
 * @param {Array<Promise>} promises - массив с исходными промисами
 * @return {Promise}
 */
const promiseAll = promises => {
  const resolveValues = [];

  return promises
    .reduce(
      (acc, curr) =>
        acc.then(() => curr).then(resolve => resolveValues.push(resolve)),
      Promise.resolve()
    )
    .then(() => resolveValues);
};

module.exports = promiseAll;
