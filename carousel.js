
class Carousel {
  constructor(selector) {
    window.Comp = window.Comp || window.jQuery;
    this.selector = selector;
    this.carousel = new Comp(this.selector);
    this.settings = {
      first: 0,
      active: false,
      parent: false,
      prev: "#carousel .carousel-prev",
      next: "#carousel .carousel-next",

      loop: false,

      activeClassName: "active"
    }

    this.lang = {
      error: [
        "Wartość właściwości ",
        "nie jest ciągiem znaków",
        "nie jest obiektem",
        "nie jest wartością logiczną",
        "nie jest wartością liczbową ",
        ", przekazana wartość to: ",
        "Do klasy ",
        "został przekazany argument niebędący obiektem, przekazany argument to: ",
        " lub ",
        "jest nieprawidłowa"
      ]
    }

    this.carousel.test = this.carousel.test || function(condition, error, element) {
      if (condition) throw error;
      return element;
    }

    this.carousel.foreach = this.carousel.foreach || this.carousel.each;
    this.carousel.ajax = this.carousel.ajax || Comp.ajax;

  }

  root() {
    this.carousel.test(typeof this.settings.first !== "number", new TypeError(this.lang.error[0] + "first " + this.lang.error[4] + this.lang.error[5] + this.settings.first));
    this.carousel.test(typeof this.settings.active !== "boolean", new TypeError(this.lang.error[0] + "active " + this.lang.error[3] + this.lang.error[5] + this.settings.active));
    this.carousel.test(typeof this.settings.parent !== "string" && typeof this.settings.parent !== "boolean", new TypeError(this.lang.error[0] + "parent " + this.lang.error[1] + this.lang.error[8] + this.lang.error[3] + this.lang.error[5] + this.settings.parent));
    this.carousel.test(typeof this.settings.prev !== "string" && typeof this.settings.prev !== "boolean", new TypeError(this.lang.error[0] + "prev " + this.lang.error[1] + this.lang.error[8] + this.lang.error[3] + this.lang.error[5] + this.settings.prev));
    this.carousel.test(typeof this.settings.next !== "string" && typeof this.settings.next !== "boolean", new TypeError(this.lang.error[0] + "next " + this.lang.error[1] + this.lang.error[8] + this.lang.error[3] + this.lang.error[5] + this.settings.next));
    this.carousel.test(typeof this.settings.loop !== "string" && typeof this.settings.loop !== "boolean", new TypeError(this.lang.error[0] + "loop " + this.lang.error[1] + this.lang.error[8] + this.lang.error[3] + this.lang.error[5] + this.settings.loop));

    this.carousel.test(typeof this.settings.activeClassName !== "string", new TypeError(this.lang.error[0] + "active " + this.lang.error[2] + this.lang.error[5] + this.settings.activeClassName));

    this.index = (this.settings.first < 0) ? 0 : (this.settings.first >= this.carousel.length ? this.carousel.length - 1 : this.settings.first);
    this.parent = (this.settings.parent) ? this.settings.parent : this.carousel[this.index].parentElement;
    this.prev = (this.settings.prev) ? this.settings.prev : false;
    this.next = (this.settings.next) ? this.settings.next : false;
  }

  classes(settings) {
    class Library {
      constructor(object) {
        this.object = object;
        this.settings = settings;
      }

      active() {
        this.object.addClass(this.settings.activeClassName);
        return this;
      }

      inactive() {
        this.object.removeClass(this.settings.activeClassName);
        return this;
      }

      change(Library) {
        let len = this.object.length;
        while(len--) {
          this[len] = new Library(new Comp(this.object[len]));
        }
        return this;
      }
    }

    this.items = new Library(this.carousel).change(Library);

    if(this.prev) this.prev = new Library(new Comp(this.prev));
    if(this.next) this.next = new Library(new Comp(this.next));
  }

  set(index) {
    if(!this.settings.loop && (index < 0) || index > this.carousel.length - 1) return false;
    if(!this.settings.loop) this.nonrotative(index);
  }

  nonrotative(index) {
    if(this.prev) (index <= 0) ? this.prev.inactive() : this.prev.active();
    if(this.next) ((index >= this.carousel.length - 1) || (!this.settings.active && this.limit(index).bound)) ? this.next.inactive() : this.next.active();

    this.transform((this.limit(index).bound) ? (this.limit(index).bound) : this.width(index));
    this.index = (!this.settings.active && this.limit(index).bound) ? this.length() : index;
    if(this.settings.active) this.items.inactive()[this.index].active();
  }

  limit(index) {
    let parentWidth = this.parent.offsetWidth,
        carouselWidth = this.width(this.carousel.length),
        translate = this.width(index);

    return {
      breakpoint: (carouselWidth - parentWidth < translate) || (index <= 0),
      bound: (carouselWidth - parentWidth <= translate) ? carouselWidth - parentWidth : false
    }
  }

  length() {
    for (let index = 0; index < this.carousel.length; index++) {
      if(this.limit(index).bound) return index;
    }
  }

  width(index) {
    let width = 0;
    new Comp(this.selector + ":not(:nth-child(n+" + (index + 1) + "))").foreach(function() {
      width += this.getBoundingClientRect().width;
    });
    return width;
  }

  transform(value) {
    this.parent.style.transform = "translate3d(-" + value + "px, 0, 0)";
  }

  event() {
    if(this.prev) {
      this.prev.object.on("click", () => {
        this.set(this.index - 1);
      });
    }

    if(this.next) {
      this.next.object.on("click", () => {
        this.set(this.index + 1);
      });
    }
  }

  build() {
    this.set(this.settings.first);
  }

  options(options) {
    Object.assign(this.settings, this.carousel.test(typeof options !== "object", new TypeError(this.lang.error[6] + "Carousel " + this.lang.error[7] + options), options));
    return this;
  }

  init() {
    if(this.carousel.length === 0) return false;
    this.root();
    this.classes(this.settings);
    this.build();
    this.event();
  };
}
