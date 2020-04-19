document.addEventListener("DOMContentLoaded", async() => {
  BaseDOM.initializeDOM();
  try {
    await Ticket.renderAllTickets();
    M.AutoInit();
  } catch(e) {
    alert(e.message);
    console.log(e);
  }
});