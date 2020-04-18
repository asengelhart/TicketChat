class BaseDOM {
  static initializeDOM() {
    document.body.innerHTML = BaseDOM.renderNavBar() + BaseDOM.renderTicketContainer();
  }

  static toggleHide(element) {
    const hiddenClass = /\bhide/;
    if(element.className.match(hiddenClass)) {
      element.className = element.className.replace(hiddenClass, "");
    } else {
      element.className += " hide";
    }
  }

  static ticketContainer() {
    return document.getElementById('ticket-container');
  }

  static renderTicketContainer() {
    return `
    <div class="container" id="ticket-container"></div>
    `
  }
  static navBar() {
    return document.getElementById('nav-bar')
  }
  
  static renderNavBar() {
    return `
    <nav id="nav-bar">
      <div class="nav-wrapper teal">
        <a href="#" class="brand-logo">TicketChat</a>
      </div> 
    </nav>
    `
  }

}