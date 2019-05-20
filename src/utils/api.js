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
    });
}
