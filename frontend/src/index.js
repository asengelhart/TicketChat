document.addEventListener("DOMContentLoaded", async() => {
  BaseDOM.initializeDOM();
  try {
    User.checkLogin();
    M.AutoInit();
  } catch(e) {
    alert(e.message);
    console.log(e);
  }
});