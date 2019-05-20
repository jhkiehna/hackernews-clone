const api = `https://hacker-news.firebaseio.com/v0`;
const json = ".json?print=pretty";

export function fetchTopPosts() {
  return fetch(`${api}/topstories${json}`)
    .then(res => res.json())
    .then(ids => {
      if (!ids) {
        throw new Error(`There was an error fetching the top posts.`);
      }

      return ids.slice(0, 50);
    })
    .then(ids => Promise.all(ids.map(fetchPost)));
}

export function fetchPost(id) {
  return fetch(`${api}/item/${id}${json}`).then(res => res.json());
}

export function fetchUser(name) {
  return fetch(`${api}/user/${name}${json}`).then(res => res.json());
}
