const throttle = (time, callback) => {
  let wait = false;

  return (...args) => {
    if (wait) {
      return;
    }

    callback.apply(this, args);
    wait = true;

    setTimeout(() => {
      wait = false;
    }, time);
  };
};

module.exports = { throttle };
