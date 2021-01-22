class Storage {
  constructor(selector) {
    window.Compsoul = window.Compsoul || window.jQuery;
    this.settings = {

      classActive: "compsoul-active",
      classInactive: "compsoul-inactive",
      classOverflow: "compsoul-overflow",
      selector: selector,

      overflow: false,
      load: false,
      once: false,
      delay: false,
      delayReset: false,
      delayResetEvent: "mouseenter",
      delayResumeEvent: "mouseleave",
      delayResetElement: selector,
      agreement: true,
      agreementEvent: "click",
      agreementElement: selector + " .agreement",
      showEvent: false,
      showElement: false,
      close: true,
      closeEvent: "click",
      closeElement: selector + " .close",
      closeAuto: false,
      closePauseEvent: "mouseenter",
      closeResumeEvent: "mouseleave",
      closePauseElement: selector,
      closeAnimation: false,
      closeDelay: 400,
      settings: false,
      default: false,
      name: "compsoul",
      value: "compsoul",

      responsive: {}
    }

    this.logo = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 584.7 180">' +
      '<path d="M559.4,17.1c0-0.4-0.1-0.9-0.1-1.3c-0.6-2.6-2.9-4.6-5.7-4.6c-0.7,0-1.4,0.1-2,0.4c-0.3,0.2-0.7,0.3-1.1,0.5c-17.9,8.6-66.9,31.3-101.4,40.7c-75.3,20.6-88.8,21.6-89.3,21.7c-1.8,0.6-3.3,1.8-4.3,3.4c-0.6,1.1-0.9,2.3-0.9,3.6c0,1.9,0.7,3.6,1.9,4.9c0.1,0.1,0.2,0.2,0.3,0.4c0.3,0.3,0.5,0.7,0.8,1c0.1,0.2,0.3,0.4,0.4,0.5c2.1,2.6,3.9,5.3,5.6,8.3c0,0.1,0.1,0.2,0.1,0.2c0.6,1.1,1.1,2.1,1.6,3.2c0.2,0.4,0.4,0.9,0.6,1.3c2,4.3,3.4,8.8,4.4,13.6c0.6,3.3,1,6.8,1.1,10.3c0,0.4,0,0.7,0,1.1c0,0.4,0,0.8,0,1.2c0,0.4,0,0.7,0,1.1c-0.2,4.7-0.9,9.3-2.1,13.6c-1.3,4.7-3.1,9.2-5.4,13.3l0,0c0,0,0,0.1-0.1,0.1c0,0.1-0.1,0.1-0.1,0.2c-0.3,0.5-0.6,1-0.9,1.5c-0.1,0.1-0.2,0.3-0.3,0.4c-1.8,3.1-6.4,8.8-8.9,11.7c-0.1,0.1-0.2,0.2-0.2,0.3l0.5-0.3c0,0,11.2-7.6,26.6-12.6c16.2-5,36.4-1,51.9-1.2c19.9-0.3,37.4-2.9,47.9-9.4c5.8-3.6,9.5-8.1,10.2-13.1c0.1-0.4,0.1-0.9,0.1-1.4c0,0,0-0.1,0-0.1c-0.3-1.2-1.3-2-2.5-2.2l-0.6,0c0,0-10.9,1.3-15.1,1.3c-4.2,0-12-0.9-12-0.9c24.6-3.6,45.8-10.2,58.5-21.1c7.7-6.6,12.3-14.3,12.7-22.2c0-0.3,0-0.7,0-1c0-0.2,0-0.4-0.1-0.6c-0.4-1.9-2.1-3.3-4.1-3.4l-1.1,0.1c0,0-13.1,3.6-21.2,4.6c-8.1,0.9-19.4,0.8-19.4,0.8c28.2-10.7,51.8-24.3,64-41.2C556.8,36.5,560.2,26.5,559.4,17.1z"/>' +
      '<path d="M335,110c-0.1-0.2-0.2-0.5-0.4-0.7c0,0,0,0,0-0.1c-1.2-2.2-2.7-4.2-4.4-5.9c-6.9-7.3-18.5-10.8-28.9-9.2c-2.9,0.4-3.7,2.2-6.4,3.7c-2.4,1.4-5,2.3-7.6,2.9c-9.8,2.2-20-0.8-27.1-7.9c-0.2-0.2-0.4-0.4-0.5-0.5c-1.7-1.7-3.1-3.7-4.3-5.9c-1.2-2.2-2.1-4.6-2.7-6.9c-0.4-1.5-0.7-3-0.8-4.5v-1.3v-1.8v-2.3c0.1-1.3,0.3-2.5,0.6-3.7c1.2-5.3,3.9-10.2,7.8-14.1c1.9-1.9,4-3.6,6.5-4.9c11.6-6.4,25.7-4,34.6,4.9l20.6-20.6c-17.9-17.9-46.1-22.6-69.3-9.8c-10.4,5.8-18.4,14.3-23.5,24.1c-1.6,3.1-3,6.4-4,9.7c-0.9,2.9-1.6,5.9-2,8.9c-0.1,0.4-0.1,0.8-0.2,1.2c0,0-0.1,0.4-0.1,0.5c-0.9,3.1-2.5,7.1-7.1,7c-0.2,0-1.8-0.3-2.4-0.4c-4-0.8-9.2-2-16.1-3.6c-13.4-3.2-33.2-8.2-61.9-16C101,43.2,52,20.5,34.2,11.9c-0.4-0.2-0.7-0.3-1.1-0.5c-0.6-0.2-1.3-0.4-2-0.4c-2.8,0-5.1,2-5.7,4.6c-0.1,0.4-0.1,0.9-0.1,1.3c-0.9,9.4,2.6,19.4,9.4,28.9c7.5,10.5,19.5,19.7,34.1,27.7c1.4,0.8,2.9,1.6,4.4,2.3c3.5,1.8,7.2,3.5,10.9,5.2c4.7,2.1,9.5,4.1,14.5,6c0,0-11.3,0.2-19.4-0.8c-8.1-0.9-21.2-4.6-21.2-4.6l-1.1-0.1c-1.6,0-2.9,0.9-3.7,2.2c-0.2,0.4-0.4,0.8-0.5,1.2c0,0.2,0,0.4-0.1,0.6c0,0.3,0,0.7,0,1c0.4,8,5,15.6,12.7,22.2c12.7,10.9,34,17.5,58.5,21.1c0,0-7.8,0.9-12,0.9s-15.1-1.3-15.1-1.3l-0.6,0c-1.2,0.1-2.2,1-2.5,2.2c0,0,0,0.1,0,0.1c0,0.5,0,0.9,0.1,1.4c0.6,4.3,3.4,8.2,7.8,11.5c0.7,0.5,1.5,1.1,2.3,1.6c10.5,6.5,28,9.1,47.9,9.4c8.2,0.1,41.7-2,48.5-2c74.7,0,71.5,9.5,71.5,13.6c0,0.9-0.2,1.8-0.5,2.6l5.5-7.9l2.7-3.9l9.3-13.4c9,8.4,22.7,10.5,34.1,4.3c2.8-1.6,5.3-3.5,7.4-5.8c3.6-4,6.1-8.8,7.1-14C338.9,122.8,338.2,116.1,335,110z"/>' +
    '</svg>',

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

      reset() {
        this.$node.removeClass(this.settings.classActive).removeClass(this.settings.classInactive);
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

    this.storage = this.factory(this.$(this.settings.selector));
    this.style = this.factory(this.$(document.createElement("style")).append(document.createTextNode("." + this.settings.classOverflow + " { overflow: hidden; margin-right: " + compsoul.bar.width + "px }")));
  }

  bin() {
    (this.settings.delay) ? setTimeout(() => this.show(), this.settings.delay) : this.show();
  }

  show() {
    if(this.logo.length !== 2704) return;
    if(!localStorage.getItem(this.settings.name) && this.settings.overflow) this.overflow();
    if(!localStorage.getItem(this.settings.name)) this.storage.active();
    if(this.settings.once) localStorage.setItem(this.settings.name, this.settings.value);
    if(this.settings.closeAuto) this.closeAuto(this.settings.closeAuto);
  }

  agreement() {
    localStorage.setItem(this.settings.name, this.settings.value);
    this.close();
  }

  variants(item) {
    if(Array.isArray(this.settings.value)) {
      this.reset();
      if(this.settings.value.includes(item)) {
        localStorage.setItem(this.settings.name, item);
        this.$(this.settings.selector).addClass(item);
        this.$("[data-class='" + item + "']").addClass(this.settings.classActive);
      }
    }
  }

  reset() {
    if(Array.isArray(this.settings.value)) {
      for (const value of this.settings.value) {
        this.$(this.settings.selector).removeClass(value);
        this.$("[data-class='" + value + "']").removeClass(this.settings.classActive);
      }
    }
  }

  overflow() {
    this.head.$node.append(this.style.element);
    this.html.$node.addClass(this.settings.classOverflow);
  }

  close() {
    if(this.html) this.html.$node.removeClass(this.settings.classOverflow);
    if(this.style) this.style.$node.remove();
    this.storage.inactive();
    setTimeout(() => this.storage.reset(), this.settings.closeDelay);
  }

  closeAuto(time) {
    this.closeSetTime = Date.now();
    this.closeActualTime = time;
    clearTimeout(this.closeSetTimeout);
    this.closeSetTimeout = setTimeout(() => {
      this.close();
    }, time);
  }

  delegation() {
    document.addEventListener("readystatechange", (event) => {
      if(event.target.readyState === "complete" && this.settings.load) this.bin();
    });

    this.body.$node.on("click", (event) => {
      if(this.settings.settings && Array.isArray(this.settings.value)) {
        if(this.settings.value.includes(event.target.dataset.class)) this.variants(event.target.dataset.class);
      }
    });

    this.eventResponsive = compsoul.debounce(() => {
      this.responsive();
    }, 200);

    window.addEventListener("resize", this.eventResponsive);
  }

  event() {
    if(this.settings.closeAuto && this.settings.closePauseEvent && this.settings.closePauseElement) {
      this.closePauseEvent = () => {
        clearTimeout(this.closeSetTimeout);
        this.closePauseTime = this.closeActualTime - (Date.now() - this.closeSetTime);
      }
      this.$(this.settings.closePauseElement).on(this.settings.closePauseEvent, this.closePauseEvent);

      this.closeResumeEvent = () => {
        this.closeAuto(this.closePauseTime);
      }
      this.$(this.settings.closePauseElement).on(this.settings.closeResumeEvent, this.closeResumeEvent);
    }

    if(this.settings.delay && this.settings.delayReset && this.settings.delayResetEvent && this.settings.delayResetElement) {
      this.delayResetEvent = () => {
        clearTimeout(this.delaySetTimeout);
      }
      this.$(this.settings.delayResetElement).on(this.settings.delayResetEvent, this.delayResetEvent);

      this.delayResumeEvent = () => {
        this.delaySetTimeout = setTimeout(() => this.show(), this.settings.delay);
      }
      this.$(this.settings.delayResetElement).on(this.settings.delayResumeEvent, this.delayResumeEvent);
    }

    if(this.settings.showEvent && this.settings.showElement) {
      this.showEvent = () => {
        this.bin();
      }
      this.$(this.settings.showElement).on(this.settings.showEvent, this.showEvent);
    }

    if(this.settings.agreement && this.settings.agreementElement && this.settings.agreementEvent) {
      this.agreementEvent = () => {
        this.agreement();
      }
      this.$(this.settings.agreementElement).on(this.settings.agreementEvent, this.agreementEvent);
    }

    if(this.settings.close && this.settings.closeEvent && this.settings.closeElement) {
      this.closeEvent = () => {
        this.close();
      }
      this.$(this.settings.closeElement).on(this.settings.closeEvent, this.closeEvent);
    }

    if(this.settings.closeAnimation) {
      this.closeAnimation = () => {
        this.close();
      }
      this.$(this.settings.closeAnimation).on("animationend", this.closeAnimation);
    }
  }

  remove() {
    if(this.closePauseEvent) this.$(this.settings.closePauseElement).off(this.settings.closePauseEvent, this.closePauseEvent);
    if(this.closeResumeEvent) this.$(this.settings.closePauseElement).off(this.settings.closeResumeEvent, this.closeResumeEvent);
    if(this.delayResetEvent) this.$(this.settings.delayResetElement).off(this.settings.delayResetEvent, this.delayResetEvent);
    if(this.delayResumeEvent) this.$(this.settings.delayResetElement).off(this.settings.delayResumeEvent, this.delayResumeEvent);
    if(this.showEvent) this.$(this.settings.showElement).off(this.settings.showEvent, this.showEvent);
    if(this.agreementEvent) this.$(this.settings.agreementElement).off(this.settings.agreementEvent, this.agreementEvent);
    if(this.closeEvent) this.$(this.settings.closeElement).off(this.settings.closeEvent, this.closeEvent);
    if(this.closeAnimation) this.$(this.settings.closeAnimation).off("animationend", this.closeAnimation);
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
    this.reset();
    if(settings) this.options(settings);
    this.remove();
    this.event();
    this.root();
    this.boot();
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

  boot(query) {
    this.$storage = new Compsoul(query || this.settings.selector);
    this.len = this.$storage.length;
    if(!this.settings.load && !this.settings.showEvent && !this.settings.showElement && !this.settings.delayReset && !this.settings.settings) this.bin();
    if(this.settings.settings && Array.isArray(this.settings.value)) (this.settings.value.includes(localStorage.getItem(this.settings.name))) ? this.variants(localStorage.getItem(this.settings.name)) : (this.settings.default) ? this.variants(this.settings.default) : false;
  }

  options(settings) {
    if(!this.default) this.default = Object.assign({}, Object.assign(this.settings, settings));
    Object.assign(this.settings, settings);
    return this;
  }

  init() {
    this.compsoul();
    this.responsive();
    this.root();
    this.boot();
    this.delegation();
    this.event();
    return this;
  }
}
