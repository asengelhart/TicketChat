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

  static renderForm(postId) {
    return `
    <div class="row comment_form_container">
    <form class="col s12 comment_form">
      <input type="hidden" name="post_id" value="${postId}">
      <div class="row">
        <div class="input-field col s12">
          <textarea name="content" id="comment_content" class="materialize-textarea" placeholder="Comment"></textarea>
          <label for="comment_content">Enter your comment here:</label>
        </div>
      </div>
      <button type="submit" class="btn">Submit Comment</button>
    </form>
  </div>
  `
  }
}