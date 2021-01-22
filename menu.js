class Menu {
  constructor(selector) {
    window.Compsoul = window.Compsoul || window.jQuery;
    this.settings = {

      classActive: "compsoul-active",
      classInactive: "compsoul-inactive",
      classOverflow: "compsoul-overflow",
      classContainer: "menu-container",
      classContainerClose: "menu-container-close",
      classContent: "menu-content",
      classContentClose: "menu-content-close",

      overflow: true,
      delay: 200,

      selector: selector,
      button: ".menu-mobile",
      responsive: {}
    }

    this.library = class Library {
      constructor($node, settings) {
        this.$node = $node;
        this.element = this.$node[0];
        this.settings = settings;
      }

      $(selector) {
        return new Compsoul(selector);
      }

      active() {
        this.$node.removeClass(this.settings.classInactive).addClass(this.settings.classActive);
        return this;
      }

      inactive() {
        this.$node.removeClass(this.settings.classActive).addClass(this.settings.classInactive);
        return this;
      }
    }
  }

  $(selector) {
    return new Compsoul(selector);
  }

  factory($element) {
    return new this.library($element, this.settings);
  }

  root() {
    this.html = this.factory(this.$("html"));
    this.head = this.factory(this.$("head"));
    this.body = this.factory(this.$("body"));

    this.container = this.factory(this.$(document.createElement("div")).addClass(this.settings.classContainer));
    this.containerClose = this.factory(this.$(document.createElement("button")).addClass(this.settings.classContainerClose));
    this.content = this.factory(this.$(document.createElement("div")).addClass(this.settings.classContent));
    this.contentClose = this.factory(this.$(document.createElement("button")).addClass(this.settings.classContentClose));
    this.menu = this.factory(this.$(this.settings.selector));
    this.style = this.factory(this.$(document.createElement("style")).append(document.createTextNode("." + this.settings.classOverflow + " { overflow: hidden; margin-right: " + compsoul.bar.width + "px }")));
  }

  build() {
    this.body.$node.append(
      this.container.$node
      .remove()
      .append(this.containerClose.$node
        .append(document.createElement("span"))
      [0])
      .append(this.content.$node
        .append(this.contentClose.$node
          .append(document.createElement("span"))
        [0])
        .append(this.menu.element.cloneNode(true))
      [0])
    [0]);

    this.$(this.content.element.querySelectorAll("li")).each(function() {
      if(this.querySelectorAll("ul").length) {
        this.insertBefore(new Compsoul(document.createElement("input")).attr("type", "checkbox")[0], this.querySelectorAll("ul")[0]);
      }
    });
  }

  bin() {
    document.dispatchEvent(this.custom);
    if(!this.menu.element) return;
    if(this.settings.overflow) this.overflow();
    this.root();
    this.build();
    this.container.active();
  }

  overflow() {
    this.head.$node.append(this.style.element);
    this.html.$node.addClass(this.settings.classOverflow);
  }

  close() {
    this.container.inactive();
    (this.settings.delay) ? setTimeout(() => this.remove(), this.settings.delay) : this.remove();
  }

  remove() {
    if(this.html) this.html.$node.removeClass(this.settings.classOverflow);
    if(this.style) this.style.$node.remove();
    if(this.container) this.container.$node.remove();
  }

  delegation() {
    this.body.$node.on("click", (event) => {
      if(event.target === this.$(this.settings.button)[0]) this.bin();
      if(event.target.classList.contains(this.settings.classContainerClose) || event.target.classList.contains(this.settings.classContentClose)) this.close();
    });

    this.eventResponsive = compsoul.debounce(() => {
      this.responsive();
    }, 200);

    window.addEventListener("resize", this.eventResponsive);
  }

  customEvent() {
    this.custom = new CustomEvent("compsoul-menu");
    document.addEventListener("compsoul-menu", (event) => {
      this.container.$node.remove();
    });
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

  update(settings) {
    if(settings) this.options(settings);

  }

  compsoul() {
    window.compsoul = window.compsoul || {};
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

    compsoul.throttle = compsoul.throttle || ((callback, delay) => {
      let throttle;
      return (...args) => {
        if (!throttle) {
          callback(...args);
          throttle = setTimeout(() => throttle = false, delay)
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
    if(!this.default) this.default = Object.assign({}, Object.assign(this.settings, settings));
    Object.assign(this.settings, settings);
    return this;
  }

  init() {
    this.compsoul();
    this.customEvent();
    this.responsive();
    this.root();
    this.delegation();
    return this;
  }
}
