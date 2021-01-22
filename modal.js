class Modal {
  constructor(selector) {
    window.Compsoul = window.Compsoul || window.jQuery;
    this.version = 2;
    this.settings = {
      classActive: "modal-active",
      classRunning: "modal-running",
      classReady: "modal-ready",
      classClose: "modal-close",
      classClosing: "modal-closing",
      classError: "modal-error",
      classOverflow: "modal-overflow",
      classUnset: "modal-unset",
      classAnimation: "modal-animation",
      classChange: "modal-change",

      selector: selector,

      id: false,
      class: false,

      elementContainer: ".compsoul-modal-container",
      elementMain: ".compsoul-modal-main",
      elementContent: ".compsoul-modal-content",
      elementTimer: ".compsoul-modal-timer",
      elementClose: ".compsoul-modal-close",
      elementPrev: ".compsoul-modal-prev",
      elementNext: ".compsoul-modal-next",

      build: true,
      popup: true,
      each: false,

      parent: false,

      ajax: false,
      ajaxTarget: selector,

      dom: false,

      clone: false,

      ready: false,

      open: false,
      openEvent: "click",
      openDelegation: true,
      openPrevent: true,

      storage: false,
      storageAgreement: false,
      storageEvent: "click",

      slider: false,
      sliderLoop: false,
      sliderEvent: "click",
      sliderDelay: 400,

      hash: true,
      hashLocation: false,

      overflow: true,

      close: true,
      closeElement: false,
      closeElementEvent: "click",
      closeSelf: true,
      closeEvent: "click",
      closeDelegation: true,
      closeDelay: 400,
      closeAuto: false,
      closeAutoEvent: "animationend",

      responsive: {}
    };

    this.library = class Library {
      constructor($node, modal) {
        this.$node = $node;
        this.element = this.$node[0];
        this.modal = modal;
        this.settings = modal.settings;
      }

      $(selector) {
        return new Compsoul(selector);
      }

      active() {
        this.$node.addClass(this.settings.classActive);
        return this;
      }

      inactive() {
        this.$node.removeClass(this.settings.classActive);
        return this;
      }

      set() {
        this.$node.removeClass(this.settings.classUnset);
        return this;
      }

      unset() {
        this.$node.addClass(this.settings.classUnset);
        return this;
      }

      change() {
        this.$node.addClass(this.settings.classChange);
        return this;
      }

      changed() {
        this.$node.removeClass(this.settings.classChange);
        return this;
      }

      restart() {
        void this.element.offsetWidth;
        return this;
      }

      animation() {
        this.unset();
        this.restart();
        this.set();
        return this;
      }

      ready() {
        this.$node.removeClass(this.settings.classError).addClass(this.settings.classReady);
        return this;
      }

      unready() {
        this.$node.removeClass(this.settings.classReady);
        return this;
      }

      error() {
        this.$node.removeClass(this.settings.classReady).addClass(this.settings.classError);
        return this;
      }

      faultless() {
        this.$node.removeClass(this.settings.classError);
        return this;
      }

      close() {
        this.$node.removeClass(this.settings.classActive).addClass(this.settings.classClose);
        return this;
      }

      closed() {
        this.$node.removeClass(this.settings.classActive).removeClass(this.settings.classClose).removeClass(this.settings.classError).removeClass(this.settings.classReady);
        return this;
      }

      clear() {
        this.$node.html("");
        return this;
      }

      overflow() {
        if(this.settings.overflow) this.modal.overflow();
        return this;
      }

      visible() {
        this.$node.removeClass(this.settings.classOverflow);
        return this;
      }

      remove() {
        this.$node.remove();
        return this;
      }

      index(element) {
        let index = 0, i = 0;
        this.$node.each(function() {
          if(this === element) index = i;
          i++;
        });
        return index;
      }

      condition(condition, callback) {
        if(condition) callback.apply(this);
        return this;
      }

      delegation(target, query) {
        let exists;
        this.$(query).each(function() {
          if(target === this) exists = true;
        });
        return exists;
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

    this.parent = this.factory(this.$(this.settings.parent || this.body.element));
    this.modal = this.factory(this.$(this.settings.selector || this.body.element));
    this.open = this.factory(this.$(this.settings.open || this.body.element));
    this.closeElement = this.factory(this.$(this.settings.closeElement || this.body.element));

    this.sliderArray = (Array.isArray(this.settings.slider));
    this.slider = (this.settings.slider && this.sliderArray) ? this.settings.slider : (this.settings.slider) ? this.factory(this.$(this.settings.slider)) : false;
    if(this.slider) this.slider.length = (this.sliderArray) ? this.slider.length : this.slider.$node.length;

    this.style = this.factory(this.$(document.createElement("style")).append(document.createTextNode("." + this.settings.classOverflow + " { overflow: hidden; margin-right: " + compsoul.bar.width + "px }")));
  }

  build() {
    this.container = this.factory(this.$(document.createElement("aside")).addClass(this.settings.elementContainer.substring(1))).condition(this.settings.id, function() {this.$node.attr("id", this.settings.id)}).condition(this.settings.class, function() {this.$node.addClass(this.settings.class)});
    this.main = this.factory(this.$(document.createElement("div")).addClass(this.settings.elementMain.substring(1)));
    this.content = this.factory(this.$(document.createElement("div")).addClass(this.settings.elementContent.substring(1)));
    this.close = this.factory(this.$(document.createElement("button")).addClass(this.settings.elementClose.substring(1)));
    this.timer = this.factory(this.$(document.createElement("div")).addClass(this.settings.elementTimer.substring(1)));
    this.next = this.factory(this.$(document.createElement("button")).addClass(this.settings.elementNext.substring(1)));
    this.prev = this.factory(this.$(document.createElement("button")).addClass(this.settings.elementPrev.substring(1)));
    this.built = true;
  }

  append() {
    this.container.condition(this.settings.close, function() { this.$node.append(this.modal.close.element)}).condition(this.settings.close && this.settings.closeAuto, function() { this.$node.append(this.modal.timer.element) }).condition(this.slider && this.slider.length, function() { this.$node.append(this.modal.prev.element).append(this.modal.next.element) }).$node.append(this.main.$node.append(this.content.element)[0]);
    this.parent.$node.append(this.container.element);
  }

  assign() {
    this.container = this.factory(this.$((this.settings.each) ? this.settings.each : ((this.settings.id) ? "#" + this.settings.id : (this.settings.class) ? "." + this.settings.class : "") + this.settings.elementContainer));
    this.main = this.factory(this.$((this.container.element) ? this.container.element.querySelector(this.settings.elementMain) : this.body.element.querySelector(this.settings.elementMain)));
    this.content = this.factory(this.$((this.container.element) ? this.container.element.querySelector(this.settings.elementContent) : this.body.element.querySelector(this.settings.elementContent)));
    this.close = this.factory(this.$((this.container.element) ? this.container.element.querySelector(this.settings.elementClose) : this.body.element.querySelector(this.settings.elementClose)));
    this.timer = this.factory(this.$((this.container.element) ? this.container.element.querySelector(this.settings.elementTimer) : this.body.element.querySelector(this.settings.elementTimer)));
    this.next = this.factory(this.$((this.container.element) ? this.container.element.querySelector(this.settings.elementNext) : this.body.element.querySelector(this.settings.elementNext)));
    this.prev = this.factory(this.$((this.container.element) ? this.container.element.querySelector(this.settings.elementPrev) : this.body.element.querySelector(this.settings.elementPrev)));
  }

  create() {
    if(this.settings.build) this.build();
    if(!this.settings.build) this.assign();
  }

  escape(event) {
    this.ready = false;
    this.escaping = true;
    compsoul.location(this.hashDefault);
    if(this.settings.popup) compsoul.modal.escape = true;
    this.container.close();
    if(event) this.html.visible();
    this.escapeTimeOut = setTimeout(() => {
      if(!event && this.settings.overflow) this.html.visible();
      this.style.$node.remove();
      this.container.closed();
      if(this.settings.popup) this.container.remove();
      if(this.timer.element) this.timer.animation();
      if(this.delete) this.destroy();
      if(!this.built) this.responsive(true);
      if(this.settings.popup) compsoul.modal.escape = false;
      this.escaping = false;
    }, this.settings.closeDelay || 0);
  }

  event() {
    this.openEvent = (event) => {
      if(((this.body.delegation(event.target, this.settings.open) && this.settings.openDelegation) || !this.settings.openDelegation) && !compsoul.modal.escape && !this.ready && (this.settings.popup || (!this.settings.popup && !this.escaping))) {
        if(this.settings.openPrevent) event.preventDefault();
        if(!this.slider) this.bin(event.target);
        this.show(event.target);
      }
    };
    this.body.condition(this.settings.open && this.settings.openEvent && this.settings.openDelegation, () => {
      this.body.$node.on(this.settings.openEvent, this.openEvent);
    });

    this.open.condition(this.settings.open && this.settings.openEvent && !this.settings.openDelegation, () => {
      this.open.$node.on(this.settings.openEvent, this.openEvent);
    });

    this.closeAuto = () => {
      this.escape();
    };
    this.timer.condition(this.settings.closeAuto, () => {
      this.timer.$node.on(this.settings.closeAutoEvent, this.closeAuto);
    });

    this.closeEvent = (event) => {
      if(this.container.delegation(event.target, this.settings.elementClose) && this.ready) this.escape();
    };
    this.container.condition(this.settings.close && this.settings.closeEvent, () => {
      this.container.$node.on(this.settings.closeEvent, this.closeEvent);
    });
    this.body.condition(this.settings.close && this.settings.closeEvent && this.settings.closeDelegation, () => {
      this.body.$node.on(this.settings.closeEvent, this.closeEvent);
    });

    this.closeElementEvent = (event) => {
      if(((this.container.delegation(event.target, this.settings.closeElement) && this.settings.closeDelegation) || !this.settings.closeDelegation) && this.ready) this.escape();
    };
    this.body.condition(this.settings.closeElement && this.settings.closeElementEvent && this.settings.closeDelegation, () => {
      this.body.$node.on(this.settings.closeElementEvent, this.closeElementEvent);
    });
    this.closeElement.condition(this.settings.closeElement && this.settings.closeElementEvent && !this.settings.closeDelegation, () => {
      this.closeElement.$node.on(this.settings.closeElementEvent, this.closeElementEvent);
    });

    this.closeSelfEvent = (event) => {
      if(event.target === this.container.element && this.ready) this.escape();
    };
    this.container.condition(this.settings.close && this.settings.closeSelf, () => {
      this.container.$node.on(this.settings.closeEvent, this.closeSelfEvent);
    });

    this.prevEvent = (event) => {
      if(this.container.delegation(event.target, this.settings.elementPrev)) this.set((Number.isInteger(this.index)) ? this.index - 1 : 0);
    };
    this.container.condition(this.settings.slider && this.settings.sliderEvent, () => {
      this.container.$node.on(this.settings.sliderEvent, this.prevEvent);
    });

    this.nextEvent = (event) => {
      if(this.container.delegation(event.target, this.settings.elementNext)) this.set((Number.isInteger(this.index)) ? this.index + 1 : 0);
    };
    this.container.condition(this.settings.slider && this.settings.sliderEvent, () => {
      this.container.$node.on(this.settings.sliderEvent, this.nextEvent);
    });

    this.storageEvent = (event) => {
      if(this.body.delegation(event.target, this.settings.storageAgreement)) localStorage.setItem(this.settings.storage, this.settings.storage);
    };
    this.body.condition(this.settings.storage && this.settings.storageEvent && this.settings.storageAgreement, () => {
      this.body.$node.on(this.settings.storageEvent, this.storageEvent);
    });

    this.touchstart = (event) => {
      this.modalTouchStart = event.touches[0].screenX;
    };
    this.container.$node.on("touchstart", this.touchstart);

    this.touchend = (event) => {
      if((this.modalTouchStart - event.changedTouches[0].screenX < -40) && this.settings.slider) this.set((Number.isInteger(this.index)) ? this.index - 1 : 0);
      if((this.modalTouchStart - event.changedTouches[0].screenX > 40) && this.settings.slider) this.set((Number.isInteger(this.index)) ? this.index + 1 : 0);
    };
    this.container.$node.on("touchend", this.touchend);

    this.resize = compsoul.debounce(() => {
      this.responsive(true);
    }, 200);
    window.addEventListener("resize", this.resize);

    this.readystatechange = (event) => {
      if(event.target.readyState === "complete" && this.settings.ready && !this.started) this.show();
    }
    document.addEventListener("readystatechange", this.readystatechange);

    this.custom = new CustomEvent("modal", {
      "detail": {"modal": this.container.element}
    });
    this.customEvent = (event) => {
      if(event.detail.modal !== this.container.element && this.ready && this.settings.popup) this.escape(event);
    }
    document.addEventListener("modal", this.customEvent);
  }

  removeEvent() {
    this.timer.$node.off(this.settings.closeAutoEvent, this.closeAuto);
    this.container.$node.off(this.settings.closeEvent, this.closeEvent);
    this.container.$node.off(this.settings.closeEvent, this.closeSelfEvent);
    this.container.$node.off(this.settings.sliderEvent, this.prevEvent);
    this.container.$node.off(this.settings.sliderEvent, this.nextEvent);
    this.container.$node.off("touchstart", this.touchstart);
    this.container.$node.off("touchend", this.touchend);
    this.body.$node.off(this.settings.storageEvent, this.storageEvent);
    this.body.$node.off(this.settings.openEvent, this.openEvent);
    this.body.$node.off(this.settings.closeEvent, this.closeEvent);
    this.body.$node.off(this.settings.closeElementEvent, this.closeElementEvent);
    this.open.$node.off(this.settings.openEvent, this.openEvent);
    this.closeElement.$node.off(this.settings.closeElementEvent, this.closeElementEvent);

    window.removeEventListener("resize", this.resize);
    document.removeEventListener("readystatechange", this.readystatechange);
    document.removeEventListener("modal", this.customEvent);
  }

  bin(element) {
    this.load(element);
  }

  show(element) {
    if(this.ready || !this.container.element) return;
    this.started = true;
    if(this.settings.popup) document.dispatchEvent(this.custom);
    if(this.settings.build) this.append();

    this.hashDefault = window.location.hash;
    if(!this.slider) this.hash(element && element.dataset.hash);

    if(this.slider) {
      if(element) this.modal.condition(this.sliderArray, () => { this.index = (element.dataset.url || element.dataset.element || element.dataset.hash) ? this.indexOf(this.slider, element) : 0 }).condition(this.slider && !this.sliderArray, () => { this.index = this.slider.index(element) });
      if(!element) this.index = 0;
      this.set(this.index);
    }

    this.container.overflow().animation().active();
    this.nav(this.index);
    this.ready = true;
  }

  load(element) {
    if(((!element && this.settings.ajax) || element) && !(this.settings.clone && document.querySelector(this.settings.clone))) this.ajax(element);
    if(this.settings.clone && document.querySelector(this.settings.clone)) {
      this.container.ready();
      this.content.clear().$node.append(document.querySelector(this.settings.clone).cloneNode(true));
    }
  }

  indexOf(array, element) {
    let index = 0;
    array.forEach((item, iteration) => {
      if(item[0] === element.dataset.url && item[1] === element.dataset.element && element.dataset.hash) index = iteration;
    });
    return index;
  }

  hash(url) {
    return compsoul.location((url) ? url : this.settings.hashLocation);
  }

  overflow() {
    this.head.$node.append(this.style.element);
    this.html.$node.addClass(this.settings.classOverflow);
  }

  url(element) {
    return (element) ? (element.dataset.url) ? element.dataset.url : this.settings.ajax : this.settings.ajax;
  }

  ajax(element) {
    this.content.clear();
    if(!this.url(element)) {
      this.container.error();
      return;
    }
    this.modal.$node.ajax({
      type: "GET",
      url: this.url(element),
      success: (response) => {
        let inner = new DOMParser().parseFromString(response, "text/html").querySelector((element && element.dataset.element) || this.settings.ajaxTarget || "body");
        if(inner) {
          this.content.$node.html(this.$(inner).html());
          this.container.ready();
        }
        if(!inner) {
          this.container.error();
        }
      },
      error: () => {
        this.container.error();
      }
    });
  }

  set(index) {
    if(!this.settings.sliderLoop && (index >= this.slider.length || index < 0)) return;
    if(this.settings.close && this.settings.closeAuto) this.timer.animation();
    if(this.main.element) this.main.animation();
    this.container.change().unready().faultless().animation();
    this.setNav(index);
    this.setHash(index);
    setTimeout(() => {
      this.nav(this.index);
      this.ajax((this.sliderArray) ? this.factory(this.$(this.createItem(this.slider[this.index][0], this.slider[this.index][1], this.slider[this.index][2]))).element : this.slider.$node[this.index]);
      if(this.main.element) this.main.animation();
      this.container.changed();
    }, this.settings.sliderDelay);
  }

  createItem(url, element, hash) {
    let item = document.createElement("div");
    if(url) item.setAttribute("data-url", url);
    if(element) item.setAttribute("data-element", element);
    if(hash) item.setAttribute("data-hash", hash);

    return item;
  }

  setHash(index) {
    if(this.slider && this.slider.element && !this.sliderArray && this.slider.$node[index].dataset.hash) { this.hash(this.slider.$node[index].dataset.hash) }
    else if(this.slider && this.sliderArray && this.slider[index][2]) { this.hash(this.slider[index][2]) }
    else { compsoul.location(this.settings.hashLocation || false) };
  }

  setNav(index) {
    if(this.settings.sliderLoop) this.index = (index > this.slider.length) ? 0 : (index < 0) ? this.slider.length - 1 : index;
    if(!this.settings.sliderLoop) this.index = (index >= this.slider.length) ? this.slider.length - 1 : (index < 0) ? 0 : index;
  }

  nav(index) {
    (!this.settings.sliderLoop && index === this.slider.length - 1) ? this.next.inactive() : this.next.active();
    (!this.settings.sliderLoop && index === 0) ? this.prev.inactive() : this.prev.active();
  }

  responsive(update) {
    let range;
    for (let key in this.settings.responsive) {
      if (window.innerWidth <= parseInt(key)) {
        this.options(this.default);
        this.update(this.settings.responsive[key], update);
        range = true;
        return;
      }
    }
    if(!range) this.update(this.default, update);
  }

  update(settings, update) {
    this.options(settings);
    if(!this.ready && update) this.destroy();
    if(((!this.ready || (this.ready && !this.delete)) && update && this.built) || (!this.built && !this.ready && update)) new Modal(this.settings.selector).options(this.default).init(true);
    if(this.ready && update) this.delete = true;
  }

  destroy() {
    this.removeEvent();
    if(this.settings.popup) {
      delete this.container;
      delete this.html;
      delete this.body;
      delete this.head;
    }
  }

  boot(update) {
    if(update) return;
    this.load();
    if(this.settings.dom && document.querySelector(this.settings.dom)) this.show();
    if(this.settings.storage && localStorage.getItem(this.settings.storage) !== this.settings.storage) this.show();
    if(this.settings.hash) this.bootHash();
  }

  bootHash() {
    if(this.settings.hashLocation && this.settings.hashLocation === window.location.hash.substr(1)) {
      this.show();
    } else if (((this.settings.open) ? this.settings.open : (this.slider && !this.sliderArray) ? this.slider.element : false) && document.querySelector(((this.settings.open) ? this.settings.open : this.settings.slider) + "[data-hash]")) {
      let that = this, ready = false;
      this.$(((this.settings.open) ? this.settings.open : this.settings.slider) + "[data-hash]").each(function() {
        if((this.dataset.hash === window.location.hash.substr(1)) && !ready) {
          ready = true;
          if(!that.slider) that.bin(this);
          that.show(this);
        }
      });
    } else if (this.slider && this.sliderArray) {
      this.slider.forEach((element, index) => {
        if(element && element[2] && element[2] === window.location.hash.substr(1)) {
          this.show(this.createItem(element[0], element[1], element[2]));
          return;
        }
      });
    }
  }

  compsoul() {
    window.compsoul = window.compsoul || {};
    compsoul.modal = compsoul.modal || {};
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

  init(update) {
    this.responsive();
    this.compsoul();
    this.root();
    this.create();
    this.event();
    this.boot(update);
    return this;
  }
}
