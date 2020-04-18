class API {

  static path(endpoint) {
    return `http://localhost:3000/${endpoint}`;
  }

  static async fetchGet(endpoint) {
    fetch(API.path(endpoint))
    .then(r => r.json())
  }

  static async fetchPost(endpoint, bodyObject) {
    fetch(API.
      path(endpoint), Api.configObjectPost(bodyObject))
    .then(r => r.json())
  }

  static configObjectPost(bodyObject) {
    return {
      method: "POST",
      headers: {
        "Content-Header": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(bodyObject)
    }
  }
}