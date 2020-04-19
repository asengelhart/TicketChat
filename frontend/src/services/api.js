class API {

  static path(endpoint) {
    return `http://localhost:3000/${endpoint}`;
  }

  static async fetchGet(endpoint) {
    const resp = await fetch(API.path(endpoint));
    const json = await resp.json();
    return json;
  }

  static async fetchPost(endpoint, bodyObject) {
    const resp = await fetch(API.path(endpoint), API.configObjectPost(bodyObject));
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
      body: JSON.stringify(bodyObject)
    }
  }
}