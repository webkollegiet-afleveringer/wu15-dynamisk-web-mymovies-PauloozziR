const pageSearch = window.location.search;
const params = new URLSearchParams(pageSearch);
let id = params.get("id");
console.log(id);
let url = params.get("url");
console.log(url);
let name = params.get("title");
console.log(title);