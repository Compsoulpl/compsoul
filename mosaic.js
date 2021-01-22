class Mosaic {
  constructor(selector) {
    window.Compsoul = window.Compsoul || window.jQuery;
    this.version = 1;
    this.settings = {
      classTop: "mosaic-top",
      classRight: "mosaic-right",
      classBottom: "mosaic-bottom",
      classLeft: "mosaic-left",
      classUnset: "mosaic-unset",
      classMouseover: "mosaic-mouseover",
      classMouseoverTop: "mosaic-mouseover-top",
      classMouseoverRight: "mosaic-mouseover-right",
      classMouseoverBottom: "mosaic-mouseover-bottom",
      classMouseoverLeft: "mosaic-mouseover-left",
      classMouseout: "mosaic-mouseout",
      classTransitionEnd: "mosaic-transitionend",

      selector: selector,
      delegation: true,

      enabled: true,

      eventIn: "mouseover",
      eventOut: "mouseout",

      responsive: {
        1300: {
          enabled: false
        }
      }
    };

    this.library = class Library {
      constructor($node, mosaic) {
        this.$node = $node;
        this.element = this.$node[0];
        this.mosaic = mosaic;
        this.settings = mosaic.settings;
      }

      $(selector) {
        return new Compsoul(selector);
      }

      top() {
        this.$node.addClass(this.settings.classTop);
        return this;
      }

      right() {
        this.$node.addClass(this.settings.classRight);
        return this;
      }

      bottom() {
        this.$node.addClass(this.settings.classBottom);
        return this;
      }

      left() {
        this.$node.addClass(this.settings.classLeft);
        return this;
      }

      mouseout() {
        this.$node.addClass(this.settings.classMouseout).removeClass(this.settings.classMouseover);
        return this;
      }

      mouseover() {
        this.$node.addClass(this.settings.classMouseover).removeClass(this.settings.classMouseout);
        return this;
      }

      mouseoverTop() {
        this.$node.addClass(this.settings.classMouseoverTop);
        return this;
      }

      mouseoverRight() {
        this.$node.addClass(this.settings.classMouseoverRight);
        return this;
      }

      mouseoverBottom() {
        this.$node.addClass(this.settings.classMouseoverBottom);
        return this;
      }

      mouseoverLeft() {
        this.$node.addClass(this.settings.classMouseoverLeft);
        return this;
      }

      reset() {
        this.$node.removeClass(this.settings.classTop).removeClass(this.settings.classRight).removeClass(this.settings.classBottom).removeClass(this.settings.classLeft).removeClass(this.settings.classTransitionEnd).removeClass(this.settings.classMouseoverTop).removeClass(this.settings.classMouseoverRight).removeClass(this.settings.classMouseoverBottom).removeClass(this.settings.classMouseoverLeft);
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

      in(event, grid) {
        if(event.pageX > grid.left && event.pageX > grid.right) this.right();
        if(event.pageX < grid.left && event.pageX < grid.right) this.left();
        if(event.pageY < grid.top && event.pageY < grid.bottom) this.top();
        if(event.pageY > grid.top && event.pageY > grid.bottom) this.bottom();
        return this;
      }

      inMouseover(event, grid) {
        if(event.pageX > grid.left && event.pageX > grid.right) this.mouseoverRight();
        if(event.pageX < grid.left && event.pageX < grid.right) this.mouseoverLeft();
        if(event.pageY < grid.top && event.pageY < grid.bottom) this.mouseoverTop();
        if(event.pageY > grid.top && event.pageY > grid.bottom) this.mouseoverBottom();
        return this;
      }

      out(event, grid) {
        if(event.pageX > grid.left && event.pageX > grid.right) this.right();
        if(event.pageX < grid.left && event.pageX < grid.right) this.left();
        if(event.pageY < grid.top && event.pageY < grid.bottom) this.top();
        if(event.pageY > grid.top && event.pageY > grid.bottom) this.bottom();
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

    this.mosaic = this.factory(this.$(this.settings.selector));
  }

  grid(element) {
    let rect = element.getBoundingClientRect(),
        left = window.pageXOffset || document.documentElement.scrollLeft,
        top = window.pageYOffset || document.documentElement.scrollTop,
        offsetTop = rect.top + top,
        offsetLeft = rect.left + left;

    return {
      top: offsetTop + (element.offsetHeight/4),
      right: offsetLeft + element.offsetWidth - (element.offsetWidth/4),
      bottom: offsetTop + element.offsetHeight - (element.offsetHeight/4),
      left: offsetLeft + (element.offsetWidth/4)
    }
  }

  event() {
    this.in = (event) => {
      if(this.body.delegation(event.target, this.settings.selector)) {
        let grid = this.grid(event.target),
            target = this.factory(this.$(event.target)),
            reset = ((!target.$node.hasClass(this.settings.classTop) && !target.$node.hasClass(this.settings.classRight) && !target.$node.hasClass(this.settings.classBottom) && !target.$node.hasClass(this.settings.classLeft)) || target.$node.hasClass(this.settings.classTransitionEnd)) ? true : false;

        target.reset();
        target.condition(this.transitionend, () => {
          target.$node.on("transitionend", this.transitionend);
        });
        target.mouseover();
        if(reset) {
          target.inMouseover(event, grid).animation();
        }
        target.in(event, grid);
      }
    }

    this.body.condition(this.settings.selector && this.settings.eventIn && this.settings.delegation, () => {
      this.body.$node.on(this.settings.eventIn, this.in);
    });

    this.mosaic.condition(this.settings.selector && this.settings.eventIn && !this.settings.delegation, () => {
      this.mosaic.$node.on(this.settings.eventIn, this.in);
    });

    this.out = (event) => {
      if(this.body.delegation(event.target, this.settings.selector)) {
        let grid = this.grid(event.target),
            target = this.factory(this.$(event.target));

        target.reset().mouseout().out(event, grid);
      }
    }

    this.body.condition(this.settings.selector && this.settings.eventOut && this.settings.delegation, () => {
      this.body.$node.on(this.settings.eventOut, this.out);
    });

    this.mosaic.condition(this.settings.selector && this.settings.eventOut && !this.settings.delegation, () => {
      this.mosaic.$node.on(this.settings.eventOut, this.out);
    });

    this.transitionend = (event) => {
      this.factory(this.$(event.target)).$node.addClass(this.settings.classTransitionEnd);
    };
  }

  off() {
    if(this.body) this.body.$node.off(this.settings.eventIn, this.in);
    if(this.mosaic) this.mosaic.$node.off(this.settings.eventIn, this.in);
    if(this.body) this.body.$node.off(this.settings.eventOut, this.out);
    if(this.mosaic) this.mosaic.$node.off(this.settings.eventOut, this.out);
    if(this.transitionend) this.$(this.settings.selector).off("transitionend", this.transitionend);
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
    this.resize = compsoul.debounce(() => {//Tworzenie metody przypisywanej do zdarzenia odpowiedzialnego za wykonanie szeregu funkcji podczas zmiany rozmiaru okna
      this.responsive();//Metoda zawierająca szereg funkcji wykonywanych w momencie zmiany rozmiaru okna
    }, 200);//Funkcja odpowiedzialna za ograniczenie wykonywania się działań w niej zawartych, funkcja będzie wykonywała się co 200ms

    window.addEventListener("resize", this.resize);//Deklaracja zdarzenia uruchamianego podczas zmiany szerokości okna
  }

  update(settings) {
    if(settings) this.options(settings);
    this.off();
    this.boot();
  }

  boot() {
    this.root();
    if(this.settings.enabled) this.event();
  }

  compsoul() {
    window.compsoul = window.compsoul || {};
    compsoul.mosaic = compsoul.mosaic || {};
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
