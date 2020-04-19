class BaseDOM {
  static initializeDOM() {
    BaseDOM.renderNavBar()
    BaseDOM.renderTicketContainer();
  }

  static toggleHide(element) {
    const hiddenClass = /\bhide/;
    if(element.className.match(hiddenClass)) {
      element.className = element.className.replace(hiddenClass, "");
    } else {
      element.className += " hide";
    }
  }

  // found at https://stackoverflow.com/questions/494143/creating-a-new-dom-element-from-an-html-string-using-built-in-dom-methods-or-pro
  static htmlToElement(html) {
    const template = document.createElement('template');
    html = html.trim();
    template.innerHTML = html;
    return template.content.firstChild;
}

  static ticketContainer() {
    return document.getElementById('ticket-container');
  }

  static ticketContainerTemplate() {
    return `
    <div class="container" id="ticket-container"></div>
    `
  }

  static renderTicketContainer() {
    document.body.appendChild(BaseDOM.htmlToElement(BaseDOM.ticketContainerTemplate()));
  }

  static navBar() {
    return document.getElementById('nav-bar')
  }
  
  static navBarTemplate() {
    return `
    <nav id="nav-bar">
      <div class="nav-wrapper teal">
        <a href="#" class="brand-logo">TicketChat</a>
        <ul class="right>
          <li id="login-link"></li>
        </ul>
      </div> 
    </nav>
    `
  }

  static renderNavBar() {
    document.body.appendChild(BaseDOM.htmlToElement(BaseDOM.navBarTemplate()));
  }

}