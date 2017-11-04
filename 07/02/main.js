const button = document.querySelector('button');
const list = document.querySelector('ol');

const addItem = () => {
  const item = document.createElement('li');

  item.textContent = `2xClick - ${new Date().getTime()}`;
  list.appendChild(item);
};

const doubleClick = (element, doubleClickHandler, delay = 300) => {
  let timer = 0;
  let clicked = false;

  element.addEventListener('click', () => {
    if (!clicked) {
      clicked = true;
      timer = setTimeout(() => {
        clicked = false;
      }, delay);
    } else {
      clearTimeout(timer);
      clicked = false;
      doubleClickHandler();
    }
  });
};

const timeDistance = 1000;

doubleClick(button, addItem, timeDistance);
