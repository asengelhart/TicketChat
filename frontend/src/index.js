document.addEventListener("DOMContentLoaded", () => {
  console.log("Loaded!");
  fetch("http://localhost:3000/index")
  .then(r => r.json())
  .then(json => {document.body.innerHTML = `<p>${json.comment}</p>`})
  .catch(() => {console.log("Something went wrong")})  
});