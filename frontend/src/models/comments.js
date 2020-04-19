class Comment {
  constructor(options) {
    this.id = options.id;
    this.content = options.content;
    this.ticket_id = options.ticket_id;
    this.user = options.user;
  }

  render(atBottom = true) {
    const thisTicket = Ticket.findTicketId(this.ticket_id).getDOM().querySelector(".comments-container");
    const template = BaseDOM.htmlToElement(this.template());
    if(atBottom) {
      thisTicket.appendChild(template);
    } else {
      thisTicket.insertAdjacentElement('afterbegin', template);
    }
  }

  template() { 
    return `
      <div class="row">
        <div class="col s8 blue">
          <p>${this.user.username} writes:</p>
          <p>${this.content}</p>
        </div>
      </div>
    `
  }

  static renderForm(ticketId) {
    const thisTicket = Ticket.findTicketId(ticketId).getDOM();
    const commentsContainer = thisTicket.querySelector(".comments-container");
    const form = BaseDOM.htmlToElement(Comment.formTemplate(ticketId));
    commentsContainer.appendChild(form);
    form.addEventListener('submit', Comment.createComment);
  }

  static formTemplate(ticketId) {
    return `
    <div class="row comment_form_container">
    <form class="col s12 comment_form" id="create-comment-for-ticket-${ticketId}">
      <input type="hidden" name="ticket_id" value="${ticketId}">
      <div class="row">
        <div class="input-field col s12">
          <textarea name="content" id="comment_content" class="materialize-textarea" placeholder="Comment"></textarea>
          <label for="comment_content" class="active">Enter your comment here:</label>
        </div>
      </div>
      <button type="submit" class="btn">Submit Comment</button>
    </form>
  </div>
  `
  }

  static createComment(e) {
    e.preventDefault();

    const form = e.target;
    const getVal = (name) => form.elements.namedItem(name).value;

    const postObject = {
      comment: {
        ticket_id: getVal("ticket_id"),
        content: getVal("content")
      }
    }

    API.fetchPost("comments", postObject)
    .then(commentObject => {
      const comment = new Comment(commentObject);
      comment.render(false);
    })
  }
}