export default class Utils {
  now() {
    return Date.now()
  }

  parseHTML(htmlString) {
    let template = document.implementation.createHTMLDocument();
    template.body.innerHTML = htmlString;

    return template.body.children;
  }

  ajax(settings) {
    let request = new XMLHttpRequest(),
        type = settings.type,
        url = settings.url,
        data = settings.data,
        success = (settings.success) ? settings.success : () => {},
        error = (settings.error) ? settings.error : () => {};

    if (type === "GET") {
      if(!url) throw new TypeError("url error");

      request.open(type, url, true);
      request.onload = () => {
        if (request.status >= 200 && request.status < 400) {
          success(request.responseText);
        } else {
          console.warn("request error");
          error();
        }
      };

      request.onerror = () => {
        error();
      };

      request.send();
    } else if (type === "POST") {
      if(!url) throw new TypeError("url error");
      if(!data) throw new TypeError("data error");

      request.open(type, url, true);
      request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
      request.send(data);
    }

    return this;
  }

}
