class Scroll {
  constructor(selector) {
    window.Compsoul = window.Compsoul || window.jQuery;
    this.version = 1;
    this.settings = {

      selector: selector,
      enabled: true,
      throttle: 20,

      callback: () => {},

      responsive: {}
    };

    this.library = class Library {
      constructor($node, app) {
        this.$node = $node;
        this.element = this.$node[0];
        this.app = app;
        this.settings = app.settings;
      }

      $(selector) {
        return new Compsoul(selector);
      }
    }
  }

  $(selector) {
    return new Compsoul(selector);
  }

  factory($element) {
    return new this.library($element, this);
  }

  root() {
    this.html = this.factory(this.$("html"));
    this.head = this.factory(this.$("head"));
    this.body = this.factory(this.$("body"));

    this.app = this.factory(this.$(this.settings.selector));
    this.top = window.pageYOffset || document.documentElement.scrollTop;
  }

  event() {
    this.scrolling = compsoul.throttle((event) => {
      this.each(event);
    }, this.settings.throttle);

    window.addEventListener("scroll", this.scrolling);
  }

  scroll() {
    let scroll = {};

    scroll.top = window.pageYOffset || document.documentElement.scrollTop;
    scroll.bottom = scroll.top + window.innerHeight;
    scroll.middle = scroll.top + (window.innerHeight / 2);
    scroll.left = window.pageXOffset || document.documentElement.scrollLeft;
    scroll.right = scroll.left + window.innerWidth;
    scroll.direction = (this.top <= scroll.top) ? 1 : 0;
    scroll.width = window.innerWidth;
    scroll.height = window.innerHeight;

    this.top = window.pageYOffset || document.documentElement.scrollTop;

    return scroll;
  }

  position(element, scroll) {
    let rect = element.getBoundingClientRect(),
        position = {};

    position.top = rect.top + scroll.top;
    position.left = rect.left + (window.pageXOffset || document.documentElement.scrollLeft);
    position.bottom = position.top + element.offsetHeight;
    position.right = position.left + element.offsetWidth;
    position.height = element.offsetHeight;
    position.width = element.offsetWidth;

    return position;
  }

  each() {
    let app = (this.updated) ? this.factory(this.$(this.settings.selector)) : this.app;
        length = app.$node.length,
        scroll = this.scroll();
    while(length--) {
      this.element(app.$node[length], this.position(app.$node[length], scroll), scroll);
    }
  }

  element(element, position, scroll) {
    let view = {};
      view.visible = ((position.bottom >= scroll.top && position.top <= scroll.bottom) || (scroll.bottom >= position.top && scroll.top <= position.bottom)) ? true : false;
      view.position = position;
      view.scroll = scroll;
      view.distance = {
        top: (scroll.height != 0) ? (position.top - scroll.bottom) / -scroll.height : 0,
        bottom: (scroll.height != 0) ? (position.bottom - scroll.bottom) / -scroll.height : 0,
        box: ((position.bottom - position.top) + scroll.height != 0) ? (scroll.bottom - position.top) / ((position.bottom - position.top) + scroll.height) : 0
      };

      view.distance.top = (view.distance.top <= 1 && view.distance.top >= 0) ? view.distance.top : (view.distance.top >= 1) ? 1 : 0;
      view.distance.bottom = (view.distance.bottom <= 1 && view.distance.bottom >= 0) ? view.distance.bottom : (view.distance.bottom >= 1) ? 1 : 0;
      view.distance.box = (view.distance.box <= 1 && view.distance.box >= 0) ? view.distance.box : (view.distance.box >= 1) ? 1 : 0;

      this.settings.callback.call(this, view, element);
  }

  off() {

  }

  responsive() {
    let range;
    for (let key in this.settings.responsive) {
      if (window.innerWidth <= parseInt(key)) {
        this.options(this.default);
        this.update(this.settings.responsive[key]);
        range = true;
        return;
      }
    }
    if(!range) this.update(this.default);
  }

  rwd() {
    this.resize = compsoul.debounce(() => {
      this.responsive();
    }, 200);

    window.addEventListener("resize", this.resize);
  }

  update(settings) {
    if(settings) this.options(settings);
    this.off();
    this.boot();
  }

  boot() {
    this.root();
    if(this.settings.enabled) this.event();
    this.each();
  }

  compsoul() {
    window.compsoul = window.compsoul || {};
    compsoul.app = compsoul.app || {};
    compsoul.bar = compsoul.bar || {};
    compsoul.bar.getWidth = compsoul.bar.getWidth || function() {
      let width,
          outer = document.createElement("div"),
          inner = document.createElement("div");

      outer.appendChild(inner);
      outer.style.overflowY = "scroll";
      document.body.appendChild(outer);
      width = outer.offsetWidth - inner.offsetWidth;
      document.body.removeChild(outer);
      return width;
    }

    compsoul.bar.width = compsoul.bar.width || compsoul.bar.getWidth();

    compsoul.location = compsoul.location || function(hash) {
      if(hash) {
        window.location.hash = hash;
      } else {
        history.replaceState('', document.title, window.location.pathname);
      }
    }

    compsoul.throttle = compsoul.throttle || ((callback, delay) => {
      let throttle;
      return (...args) => {
        if (!throttle) {
          callback(...args);
          throttle = setTimeout(() => throttle = false, delay);
        }
      };
    })

    compsoul.debounce = compsoul.debounce || ((callback, delay) => {
      let timeout;
      return (...args) => {
        const that = this;
        clearTimeout(timeout);
        timeout = setTimeout(() => callback.apply(that, args), delay);
      };
    })
  }

  options(settings) {
    if(!this.default && settings) this.default = Object.assign({}, Object.assign(this.settings, settings));
    if(settings) Object.assign(this.settings, settings);
    return this;
  }

  init() {
    this.compsoul();
    this.rwd();
    this.responsive();
    return this;
  }
}
