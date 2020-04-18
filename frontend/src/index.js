document.addEventListener("DOMContentLoaded", () => {
  console.log("Loaded!");
  BaseDOM.initializeDOM();
  Ticket.renderAllTickets();
  M.AutoInit();
});