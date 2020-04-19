class User {
  constructor(id, username, email, is_admin) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.is_admin = is_admin;
  }

  static currentUser = {};
  
  static loginFormTemplate() {
    return`
    <div id="login-modal" class="modal">
      <div class="modal-content">
        <form id="login-form">
          <input type="text" name="email" placeholder="Email" class="validate">
          <input type="password" name="password" placeholder="Password" class="validate">
          <button class="btn" type="submit">Login</button>
        </form>
      </div>
    </div>
    `
  }

  static loginForm() { return document.getElementById("login-modal"); }

  static async checkLogin() {
    const userObj = await API.fetchGet("current_user");
    if(userObj.logged_in) {
      User.currentUser = userObj.user;
      await Ticket.renderAllTickets();
      M.AutoInit();
    } else {
      BaseDOM.ticketContainer().innerHTML = "";
      User.renderLoginForm();
    }
  }

  static renderLoginForm() {
    const loginForm = BaseDOM.htmlToElement(User.loginFormTemplate());
    document.body.appendChild(loginForm);
    loginForm.addEventListener("submit", this.login);
    M.Modal.init(loginForm).open();
  }

  static async login(e) {
    e.preventDefault();

    const form = e.target;
    const getVal = (name) => form.elements.namedItem(name).value;

    const postObject = {
      user: {
        email: getVal("email"),
        password: getVal("password")
      }
    }

    const loginObject = await API.fetchPost("login", postObject);
    if(loginObject.logged_in) {
      User.currentUser = loginObject;
      User.checkLogin();
    } else {
      alert("Login failed, please try again.");
      User.renderLoginForm();
    }
  }

  static async logout(e) {
    e.preventDefault();
    await API.fetchGet("logout");
    User.checkLogin();
  }
}