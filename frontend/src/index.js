const ticketContainer = document.getElementById('ticket-container');

function renderAllTickets(ticketsObject) {
  const tickets = ticketsObject.map(ticketObject => new Ticket(ticketObject));
  let result = ``;
  for(const ticket of tickets) {
    result += ticket.render();
  }
  return result;
}


document.addEventListener("DOMContentLoaded", () => {
  console.log("Loaded!");
  fetch("http://localhost:3000/tickets")
  .then(r => r.json())
  .then(json => {
    console.log(json);
    ticketContainer.innerHTML = renderAllTickets(json);
    M.AutoInit();
  })
  .catch((e) => {console.log(e)})  
});