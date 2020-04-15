class Comment {
  constructor(options) {
    this._id = options.id;
    this._content = options.content;
    this._ticket_id = options.ticket_id;
    this._user = options.user;
  }

  render() { 
    return `
      <div class="row">
        <div class="col s8 blue">
          <p>${this._user.username} writes:</p>
          <p>${this._content}</p>
        </div>
      </div>
    `
  }
}

class Ticket {
  constructor(options) {
    this._id = options.id;
    this._subject = options.subject;
    this._content = options.content;
    this._user = options.user;
    this._urgency = options.urgency;
    this._comments = options.comments.map(commentObject => new Comment(commentObject));
  }

  render() {
    return `
    <ul class="collapsible">
    <li>
      <div class="collapsible-header ticket-header">
        <div class="row ticket-row">${this._subject}</div>
        <div class="row ticket-row">Urgency: ${this._urgency}</div>
      </div>
      <div class="collapsible-body">
        <div class="ticket-content"><p>${this._content}</p></div>
        ${this.renderAllComments()}
      </div>
    </li>
  </ul>
  `
  }

  

  formTemplate() {
    return `
    <div class="row">
      <form id="create_ticket_form" class="col s12">
        <div class="row">
          <div class="input-field col s8">
            <label for="ticket_subject">Subject:</label>
            <input placeholder="What issue are you having?" type="text" name="ticket_subject" id="ticket_subject" class="validate">
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
        <button type="submit" class="btn">Create Ticket</button>
      </form>
    </div>
    `
  }



  renderAllComments() {
    let result = ``
    for(const comment of this._comments) {
      result += `${comment.render()}`
    }
    return result;
  }
}

class User {
  constructor(id, username, email, is_admin) {
    this._id = id;
    this.username = username;
    this.email = email;
    this.is_admin = is_admin;
  }
  //TODO: how to set this up securely?
}