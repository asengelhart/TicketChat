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
        <form id="login-form" style="border-bottom-style: solid;">
          <input type="text" name="email" placeholder="Email" class="validate">
          <input type="password" name="password" placeholder="Password" class="validate">
          <button class="btn" type="submit">Login</button>
        </form>
        <form id="new-user-form">
          <p>New user? Sign in here!</p>
          <input type="text" name="user_username" placeholder="User Name" class="validate">
          <input type="text" name="user_email" placeholder="User Email" class="validate">
          <input type="password" name="user_password" placeholder="Password" class="validate">
          <button class="btn" type="submit">Sign Up</button>
        </form>
      </div>
    </div>
    `
  }

  static loginAndNewUserForms() { return document.getElementById("login-modal"); }

  static loginForm() { return document.getElementById("login-form"); }

  static newUserForm() { return document.getElementById("new-user-form"); }

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
    const loginForms = BaseDOM.htmlToElement(User.loginFormTemplate());
    document.body.appendChild(loginForms);
    this.loginForm().addEventListener("submit", this.login);
    this.newUserForm().addEventListener("submit", this.newUser);
    M.Modal.init(this.loginAndNewUserForms()).open();
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

    try {
      const loginObject = await API.fetchPost("login", postObject);
      User.currentUser = loginObject;
    } catch {
      alert("Login failed, please try again.");
    } finally {
      User.checkLogin();
    }
  }

  static async newUser(e) {
    e.preventDefault();

    const form = e.target;
    const getVal = (name) => form.elements.namedItem(name).value;
    const postObject = {
      user: {
        username: getVal("user_username"),
        email: getVal("user_email"),
        password: getVal("user_password")
      }
    }
    debugger;
    try {
      const newUserObject = await API.fetchPost("users", postObject);
      if(newUserObject.logged_in) {
        User.currentUser = newUserObject;
      } else {
        alert("Login failed, please try again");
      }
    } catch(error) {
      alert(error);
    } finally {
      User.checkLogin();
    }
  }

  static async logout(e) {
    e.preventDefault();
    await API.fetchGet("logout");
    User.checkLogin();
  }
}