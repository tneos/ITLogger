export const fetchData = (url, method, item) => {
  return fetch(url, {
    method: method,
    body: JSON.stringify(item),
    headers: {
      "Content-Type": "application/json",
    },
  });
};
