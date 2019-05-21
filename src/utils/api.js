const api = `https://hacker-news.firebaseio.com/v0`;
const json = ".json?print=pretty";

function removeDead(posts) {
  return posts.filter(Boolean).filter(({ dead }) => dead !== true);
}

function removeDeleted(posts) {
  return posts.filter(({ deleted }) => deleted !== true);
}

function onlyComments(posts) {
  return posts.filter(({ type }) => type === "comment");
}

function onlyPosts(posts) {
  return posts.filter(({ type }) => type === "story");
}

export function fetchItem(id) {
  return fetch(`${api}/item/${id}${json}`).then(res => res.json());
}

export function fetchTopPosts() {
  return fetch(`${api}/topstories${json}`)
    .then(res => res.json())
    .then(ids => {
      if (!ids) {
        throw new Error(`There was an error fetching the top posts.`);
      }

      return ids.slice(0, 50);
    })
    .then(ids => Promise.all(ids.map(fetchItem)));
}

export function fetchNewPosts() {
  return fetch(`${api}/newstories${json}`)
    .then(res => res.json())
    .then(ids => {
      if (!ids) {
        throw new Error(`There was an error fetching the top posts.`);
      }

      return ids.slice(0, 50);
    })
    .then(ids => Promise.all(ids.map(fetchItem)));
}

export function fetchUser(name) {
  return fetch(`${api}/user/${name}${json}`).then(res => res.json());
}

export function fetchPosts(ids) {
  return Promise.all(ids.map(fetchItem)).then(posts =>
    removeDeleted(onlyPosts(removeDead(posts)))
  );
}

export function fetchComments(ids) {
  return Promise.all(ids.map(fetchItem)).then(comments =>
    removeDeleted(onlyComments(removeDead(comments)))
  );
}
