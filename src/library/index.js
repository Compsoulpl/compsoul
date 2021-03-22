export default class Library {
  #node;

  constructor(selector) {
    this.#node = document.querySelectorAll(selector);
  }

  get #node {
    return this.#node;
  }
}

Library.mount = function(extensions) {
  for (const extension in extensions) {
    Library[extensions[extension].name] = extensions[extension];
    Library.prototype[extensions[extension].name] = extensions[extension];
  }

  return Library;
}
