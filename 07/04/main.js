const badgesListElement = document.querySelector('.badges-list');
const loaderElement = document.querySelector('.loader');
const infoElement = document.querySelector('.info');
const errorElement = document.querySelector('.error');
const template = document.querySelector('template');
const templateContainer = 'content' in template ? template.content : template;

const state = {
  isLoading: false,
  page: 1,
  errors: []
};

const getBadge = repo => {
  const badge = templateContainer.querySelector('.badge').cloneNode(true);

  badge.id = `badge-${repo.id}`;
  badge.href = repo.html_url;

  const formatter = new Intl.DateTimeFormat('ru');
  const createdAt = formatter.format(new Date(repo.created_at));
  const updatedAt = formatter.format(new Date(repo.updated_at));

  badge.querySelector('.badge__title').textContent = repo.name;
  badge.querySelector('.badge__description').textContent = repo.description;
  badge.querySelector('.badge__date').textContent = `Created: ${createdAt}`;
  badge.querySelector('.badge__lastCommit').textContent = `Up: ${updatedAt}`;

  return badge;
};

const renderBadges = list => list.forEach(repo => badgesListElement.appendChild(getBadge(repo)));

const showError = errorMessage => {
  state.errors.push(errorMessage);
  state.isLoading = false;
  errorElement.textContent = errorMessage;
  errorElement.classList.remove('hidden');
};

const loadData = page => {
  state.isLoading = true;
  loaderElement.classList.remove('hidden');

  fetch(`https://api.github.com/orgs/facebook/repos?page=${page}`)
    .then(resp => resp.json())
    .then(data => {
      state.isLoading = false;
      loaderElement.classList.add('hidden');
      if (data.message) {
        showError(data.message);
      } else if (data.length === 0) {
        window.removeEventListener('scroll', scrollHandler);
        infoElement.classList.remove('hidden');
      } else {
        state.page += 1;
        renderBadges(data);
      }
    })
    .catch(err => showError(err));
};

const GAP = 200;
// let lastCall = Date.now();
const scrollHandler = () => {
  if (!state.isLoading && !state.errors.length && badgesListElement.getBoundingClientRect().bottom - window.innerHeight <= GAP) {
    loadData(state.page);
  }
  // lastCall = Date.now();
};

window.addEventListener('scroll', scrollHandler);
loadData(state.page);
