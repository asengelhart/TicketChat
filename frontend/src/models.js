class Comment {
  constructor(id, content, ticket_id, user_id) {
    this._id = id;
    this._content = content;
    this._ticket_id = ticket_id;
    this._user_id = user_id;
  }

  get id() {
    return this._id;
  }

  get content() {
    return this._content;
  }

  get ticket_id() {
    return this._ticket_id;
  }

  get user_id() {
    return this._user_id;
  }
}

class Ticket {
  constructor(id, subject, content, user_id, all_comments = null) {
    this._id = id;
    this._subject = subject;
    this._content = content;
    this._user_id = user_id;
    this._all_comments = all_comments;
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