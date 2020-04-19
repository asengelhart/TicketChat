class API {

  static path(endpoint) {
    return `http://localhost:3000/${endpoint}`;
  }

  static async fetchGet(endpoint) {
    const resp = await fetch(this.path(endpoint), this.configObjectGet());
    const json = await resp.json();
    return json;
  }

  static async fetchPost(endpoint, bodyObject) {
    const resp = await fetch(this.path(endpoint), this.configObjectPost(bodyObject));
    const json = await  resp.json();
    return json;
  }

  static configObjectPost(bodyObject) {
    return {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      credentials: "include",
      body: JSON.stringify(bodyObject)
    }
  }

  static configObjectGet() {
    return {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      credentials: "include"
    }
  }
}