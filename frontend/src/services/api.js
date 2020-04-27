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
    console.log(endpoint);
    const resp = await fetch(this.path(endpoint), this.configObjectPost(bodyObject));
    if(!resp.ok) {
      const respObj = await resp.json();
      if(respObj.message) {
        throw new Error(respObj.message);
      } else {
        throw new Error(resp.statusText);
      }
    }
    const json = await resp.json();
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