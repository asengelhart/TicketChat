class Ticket {
  constructor(options) {
    this.id = options.id;
    this.subject = options.subject;
    this.content = options.content;
    this.user = options.user;
    this.urgency = options.urgency;
    this.comments = options.comments.map(commentObject => new Comment(commentObject));
  }

  render() {
    return `
    <ul id="ticket-${this.id}" class="collapsible">
    <li>
      <div class="collapsible-header ticket-header">
        <div class="row ticket-row">${this.subject}</div>
        <div class="row ticket-row">Urgency: ${this.urgency}</div>
      </div>
      <div class="collapsible-body">
        <div class="ticket-content"><p>${this.content}</p></div>
        <div class="comments-container">
          ${this.renderAllComments()}
          ${Comment.renderForm(this.id)}
        </class>
      </div>
    </li>
  </ul>
  `
  }

  renderAllComments() {
    let result = ``
    if(this.comments) {
      for(const comment of this.comments) {
        result += `${comment.render()}`
      }
    }
    return result;
  }

  static renderForm() {
    //New ticket form should always render above all current tickets
    BaseDOM.ticketContainer().innerHTML = Ticket.formTemplate() + ticketContainer.innerHTML;
    const newForm = document.getElementById("create-ticket-form");
    newForm.addEventListener("submit", Ticket.submitTicket);
    Ticket.renderToggleTicketFormButton();
  }

  static formContainer() {return document.getElementById('create-ticket-container')}

  static formTemplate() {
    return `
    <div id="create_ticket_container" class="row hide">
      <form id= "create_ticket_form" class="col s12">
        <div class="row">
          <div class="input-field col s8">
            <input placeholder="What issue are you having?" type="text" name="ticket_subject" id="ticket_subject" class="validate">
            <label for="ticket_subject">Subject</label>
          </div>
        </div>
        <p>How urgent is your issue?</p>
        <div class="row">
          <div class="col s4">
            <label>
              <input type="radio" name="urgency" id="urgency_0" value="0">
              <span>It's an annoyance.</span>
            </label>
          </div>
          <div class="col s4">
            <label>
              <input type="radio" name="urgency" id="urgency_1" value="1">
              <span>It's hurting my productivity.</span>
            </label>
          </div>
          <div class="col s4">
            <label>
              <input type="radio" name="urgency" id="urgency_2" value="2">
              <span>I can't work because of this.</span>
            </label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <textarea class="materialize-textarea" name="content" id="content" placeholder="Describe your issue here"></textarea>
            <label for="content">Describe your issue:</label>
          </div>
        </div>
        <button type="submit" class="btn">Create Ticket</button>
      </form>
    </div>
    `
  }

  static submitTicket(e) {
    e.preventDefault();

    const form = e.target;
    const getVal = (name) => form.elements.namedItem(name).value;

    const postObject = {
      ticket: {
        subject: getVal('ticket_subject'),
        urgency: getVal('urgency'),
        content: getVal('content')
      }
    }

    Api.fetchPost("tickets", postObject)
    .then(newTicketObject => {
      //render new ticket above other tickets
      const newTicket = new Ticket(newTicketObject);
      BaseDOM.ticketContainer().innerHTML = newTicket.render() + ticketContainer.innerHTML;
    })
    .catch(error => {
      const message = `
      There was a problem submitting your ticket. Please try again later.
      Error: ${error.message}
      `
      alert(message);
    })
  }

  static renderToggleTicketFormButton() {
    BaseDOM.ticketContainer().innerHTML = Ticket.toggleTicketFormButtonTemplate() + BaseDOM.ticketContainer().innerHTML;
    Ticket.toggleTicketFormButton().addEventListener('click', () => { BaseDOM.toggleHide(Ticket.formContainer()) })
  }

  static toggleTicketFormButton() { return document.getElementById('toggle-ticket-form-button') }

  static toggleTicketFormButtonTemplate() {
    return `
    <button id="toggle-ticket-form-button" class="btn">Show New Ticket Form</button>
    `
  }

  static renderAllTickets() {
    API.fetchGet("http://localhost:3000/tickets")
    .then(ticketsObject => {
      debugger
      const tickets = ticketsObject.map(ticketObject => new Ticket(ticketObject));
      let result = ``;
      for(const ticket of tickets) {
        result += ticket.render();
      }
      ticketContainer.innerHTML = result;
      Ticket.renderForm();
    })
    //.catch(error => {alert(error.message)})
  }
}