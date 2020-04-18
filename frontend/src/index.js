document.addEventListener("DOMContentLoaded", () => {
  console.log("Loaded!");
  BaseDOM.initializeDOM();
  Tickets.renderAllTickets();
  M.AutoInit();
});