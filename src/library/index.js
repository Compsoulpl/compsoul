export default class Compsoul {
  constructor(selector) {
    this.node = document.querySelectorAll(selector);
  }
}

Compsoul.mount = function(extensions) {
  for (const extension in extensions) {
    Compsoul.prototype[extensions[extension].name] = extensions[extension];
  }

  return Compsoul;
}
