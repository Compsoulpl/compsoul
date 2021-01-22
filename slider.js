//Przemyśleć rwd
//Jak są dwa imgi to bierze pierwszy
//Kiedy dodasz klasę aby inicjowały się różne slidery, aby nie trzeba było robić foreach na wszystkich sliderach

class Slider {
  constructor(selector) {
    window.Compsoul = window.Compsoul || window.jQuery;//Jeżeli nie istnieje biblioteka Compsoul zastosuj bibliotekę jQuery
    this.version = 3.1;
    this.settings = {//Ustawienia domyślne nadpisywane przez ustawienia podane podczas deklaracji modułu jak i metodę update
      classActive: "compsoul-active",//Klasa odpowiedzialna za aktywacje elementów
      classFirst: "compsoul-first",//Klasa przypisywana do przycisków funkcyjnych
      classNext: "compsoul-next",//Klasa przypisywana do przycisków funkcyjnych
      classPrev: "compsoul-prev",//Klasa przypisywana do przycisków funkcyjnych
      classPrevious: "compsoul-previous",//Klasa przypisywana do przycisków funkcyjnych
      classLoaded: "compsoul-loaded",//Klasa wskazująca na stan ładowania elementu
      classLoading: "compsoul-loading",//Klasa informująca że dany element jest obacnie ładowany i nie ma potrzeby ładować go ponownie
      classError: "compsoul-error",//Klasa wskazująca na wystąpienie błędu w galerii
      classUnset: "compsoul-unset",//Klasa używana do resetu animacji
      classAnimation: "compsoul-animation",//Klasa używana do resetu animacji
      classWait: "compsoul-wait",//Klasa używana podczas animacji, czeka na wykonanie się animacji
      classDirectionUp: "compsoul-direction-up",
      classDirectionDown: "compsoul-direction-down",

      selector: selector,//Pole przechowujące selektor nadany podczas instancji modułu

      next: ".compsoul-slide-next",//Pole odpowiedzialne za wyświetlanie przycisku, następne zdjęcie
      prev: ".compsoul-slide-prev",//Pole odpowiedzialne za wyświetlanie przycisku, poprzednie zdjęcie
      nav: ".compsoul-slide-nav",//Lista przycisków wskazująca na aktywne zdjęcie
      timeline: ".compsoul-slide-timeline",//Wskazuje element odpowiedzialny za czasową zmianę slajdu, szybkość zmiany sterowana jest za pomocą CSS
      parent: false,//Wskazuje element będący rodzicem slidera, używany głównie do ustawienia wysokości
      height: false,//Nadaje wysokość aktywnego slidera, na rodzica slidera

      cover: true,//Informacja o tym czy ma zostać nadane tło po załadowaniu zdjęcia
      sliderCover: "figure",//Wskazuje selektor który ma zostać wyszukany w slidzie, potrzebny do nałożenia tła
      sliderImg: "figure img",//Wskazuje selektor wewnątrz

      animation: true,//Czy slider zawiera animacje
      animationend: "false", //Zmienna wykorzystywana w przypadku kiedy slider nie zawiera animacji, jednocześnie zawierając elementy mające własną animację
      
      load: true,//Pole służy do wczytania kolejnych zdjęć po aktywacji zdjęcia
      preload: true,//Pole służy do uruchomienia procedury ładowania kolejnych zdjęć, jeżeli jest wyłączone, zostaje załadowane kliknięte zdjęcie, jego sąsiedzi oraz wszystkie miniatury. W przypadku kiedy ustawienie loop jest włączone, zostają wczytane zdjęcia poza skalą czyli w przypadku pierwszego ostatnie i analogicznie. Tryb preload zalecany jest dla małych i średnich galerii.
      first: 0,//Pierwszy slide, przyjmuje wartość random - losującą pierwszy slide
      loop: true,//Tryb galerii odpowiedzialny za zapętlanie się listy zdjęć

      responsive: {}//Obiekt przyjmujący rozmiar okna jako index oraz obiekt ustawień wywołany w momencie kiedy okno uzyska pożądany rozmiar
    }

    this.library = class Library {//Biblioteka która umożliwia używanie metod w niej zawartych w obrębie klasy, została stworzona aby uprościć kod i umożliwić korzystanie z dwóch bibliotek na jednym obiekcie. Przykładowo biblioteka.active().$drugaBiblioteka.addClass()
      constructor($node, slider) {//Konstruktor który przyjmuje element będący instancją biblioteki wstrzykiwanej. Ustawienia są powiązane z globalnymi ustawieniami i podlegają aktualizacji poprzez metodę update, bądź ręczną aktualizacje
        this.$node = $node;//Właściwość do której zostaje przypisana instancja przekazana podczas tworzenia instancji
        this.element = this.$node[0];//Pierwszy element przekazanej instancji
        this.slider = slider;//Tworzenia powiązania pomiędzy klasą a zewnętrznym światem
        this.settings = slider.settings;//Tworzenie powiązania pomiędzy ustawieniami globalnymi a ustawieniami klasy
      }

      $(selector) {
        return new Compsoul(selector);//Metoda zwracająca bibliotekę i zmieniająca kontekst używanych metod
      }

      active() {//Metoda odpowiedzialna za aktywacje elementów
        this.$node.addClass(this.settings.classActive);
        return this;
      }

      directionUp() {//Metoda odpowiedzialna za aktywacje elementów
        this.$node.addClass(this.settings.classDirectionUp);
        return this;
      }

      directionDown() {//Metoda odpowiedzialna za aktywacje elementów
        this.$node.addClass(this.settings.classDirectionDown);
        return this;
      }

      error() {
        this.$node.removeClass(this.settings.classLoading).addClass(this.settings.classError);
        return this;
      }

      first() {//Metoda odpowiedzialna za dezaktywacje elementów
        this.$node.addClass(this.settings.classFirst);
        return this;
      }

      inactive() {//Metoda odpowiedzialna za dezaktywacje elementów
        this.$node.removeClass(this.settings.classActive);
        return this;
      }

      unload() {
        this.$node.removeClass(this.settings.classLoaded);
        return this;
      }

      animation() {
        this.$node.removeClass(this.settings.classUnset).addClass(this.settings.classAnimation);
        return this;
      }

      unset() {
        this.$node.removeClass(this.settings.classAnimation).addClass(this.settings.classUnset);
        return this;
      }

      loaded() {
        this.$node.removeClass(this.settings.classLoading).addClass(this.settings.classLoaded);
        return this;
      }

      loading() {
        this.$node.removeClass(this.settings.classLoaded).addClass(this.settings.classLoading);
        return this;
      }

      next() {
        this.$node.addClass(this.settings.classNext);
        return this;
      }

      prev() {
        this.$node.addClass(this.settings.classPrev);
        return this;
      }

      previous() {
        this.$node.addClass(this.settings.classPrevious);
        return this;
      }

      reset() {
        this.$node.removeClass(this.settings.classActive + " " + this.settings.classFirst + " " + this.settings.classNext + " " + this.settings.classPrev + " " + this.settings.classPrevious + " " + this.settings.classWait + " " + this.settings.classDirectionUp + " " + this.settings.classDirectionDown);
        return this;
      }

      restart() {
        void this.element.offsetWidth;
        return this;
      }

      on() {
        this.$node.on("animationend", this.slider.unlock).on("transitionend", this.slider.unlock);
      }

      off() {
        this.$node.off("animationend", this.slider.unlock).off("transitionend", this.slider.unlock);
      }

      condition(condition, callback) {//Metoda wykorzystywana jako if w łańcuchu metod
        if(condition) callback.apply(this);
        return this;
      }

      wait() {
        this.$node.addClass(this.settings.classWait);
        this.slider.lock = true;
        return this;
      }

      done() {
        this.$node.removeClass(this.settings.classWait);
        this.slider.lock = false;
        this.slider.slider.off();
        return this;
      }

      responsive(element) {
        if(!element) return;
        for (let key in element.dataset) {
          if (window.innerWidth <= parseInt(key)) {
            return element.dataset[key];
          }
        }
      }

      change(img, src) {
        return (img) ? (!(img.src && src && (img.src.replace(img.src.replace(src, ""), "") === src || src.replace(src.replace(img.src, ""), "") === img.src))) : false;
      }

      cover(element) {
        let parent = element.querySelector(this.settings.sliderCover),
            child = element.querySelector(this.settings.sliderImg);

        if(parent && child) parent.style.backgroundImage = "url(" + (this.responsive(child) || child.dataset.src) + ")";
        return this;
      }

      background(element, url) {
        let background = (element) ? /(?:\(['"]?)(.*?)(?:['"]?\))/.exec(element.style.backgroundImage) : false;
        return (background && (background[1] = url) ? true : false);
      }

      src(element) {
        let img = element.querySelector(this.settings.sliderImg);
        if(img) img.src = this.responsive(img) || img.dataset.src;
        return this;
      }

      load(callback, type, index, debug) {
        let figure = this.element.querySelector(this.settings.sliderCover),
            img = this.element.querySelector(this.settings.sliderImg),
            src = (img) ? this.responsive(img) || img.dataset.src : false,
            change = this.change(img, src);

        if(change) img.src = src;
        if((this.$node.hasClass(this.settings.classLoaded) || !img || (img.complete && img.src && !change)) && this.background(figure, src)) {//regExr potrzebny w przypadku dodania tych samych zdjęć, bądź w momencie kiedy zdjęcie się juz załadowało przechodzi przez pierwszy if i nie dostaje cover
          if(callback && ((type === "active" && this.slider.active.element === this.element) || (type === "next" && this.slider.next.element === this.element) || (type === "prev" && this.slider.prev.element === this.element) || type === "preload")) callback();
          this.loaded();
          this.slider.point(index, "loaded");
          return;
        }

        if(img) {
          img.compsoulStack = img.compsoulStack || [];
          this.loading();
          this.slider.point(index, "loading");
          if(img.compsoulStack.length === 0) {
            img.src = src;
            img.compsoulStack.push({
              object: this,
              img: img,
              callback: callback,
              type: type,
              src: src,
              index: index,
              debug: debug
            });
            this.onload = this.slider.onload.bind(this, img);
            this.onerror = this.slider.onerror.bind(this, img);

            img.addEventListener("load", this.onload);
            img.addEventListener("error", this.onerror);
          } else {
            img.compsoulStack.push({
              object: this,
              img: img,
              callback: callback,
              type: type,
              src: src,
              index: index,
              debug: debug
            });
          }
        }
      }
    }
  }

  $(selector) {//Metoda tworząca instancje wstrzykniętej biblioteki
    return new Compsoul(selector);
  }

  factory($element) {//Metoda tworząca instancje lokalnej biblioteki
    return new this.library($element, this);
  }

  root() {
    this.html = this.factory(this.$("html"));//Instancja zawierająca element html
    this.head = this.factory(this.$("head"));//Instancja zawierająca element head
    this.body = this.factory(this.$("body"));//Instancja zawierająca element body
  }

  set(index) {
    this.modernize(index);
    this.restart();
    this.navigation();
    this.slider.reset().off();
    if(this.timeline && this.timeline.element) (this.settings.load) ? this.timeline.unset().restart().animation().inactive() : this.timeline.unset().restart().animation().active();

    this.past = (this.index.past !== false) ? this.factory(this.$(this.$slider[this.index.past])).previous().condition(this.settings.animation && this.index.past !== index, function() {this.wait()}) : false;

    this.active = this.factory(this.$(this.$slider[this.index.value])).condition(!this.launch, function() {this.first()}).condition(this.index.direction === 0, function() {this.directionUp()}).condition(this.index.direction === 1, function() {this.directionDown()}).active(); //Jeżeli first istnieje, w modernize deklaracja, to nadaj first
    this.active.condition(this.settings.load, function() {this.load(() => {if(this.slider.timeline) this.slider.timeline.active()}, "active", this.slider.index.value, "set-active")}).condition(this.settings.animation, () => {this.active.on()});

    this.next = this.factory(this.$(this.$slider[this.index.next]));
    this.next.condition(this.settings.load, function() {this.load(() => {if(this.slider.settings.next) this.slider.factory(this.$(this.slider.settings.next)).loaded()}, "next", this.slider.index.next, "set-next")}).next();

    this.prev = this.factory(this.$(this.$slider[this.index.prev]));
    this.prev.condition(this.settings.load, function() {this.load(() => {if(this.slider.settings.prev) this.slider.factory(this.$(this.slider.settings.prev)).loaded()}, "prev", this.slider.index.prev, "set-prev")}).prev();

    this.height();
  };

  modernize(index) {
    this.launch = (!this.index) ? false : true;
    this.index = this.index || {};
    this.index.direction = (this.index.value > index) ? 1 : 0;
    this.index.past = (this.launch) ? this.index.value : false;
    this.index.value = (this.settings.loop) ? (index >= this.len) ? 0 : (index < 0) ? this.len - 1 : index : (index >= this.len) ? this.len - 1 : (index < 0) ? 0 : index;
    this.index.next = (this.index.value + 1 >= this.len) ? 0 : this.index.value + 1;
    this.index.prev = (this.index.value - 1 < 0) ? this.len - 1 : this.index.value - 1;
  }

  load(index) {
    let len = this.len;

    while (len--) {
      //if(!this.settings.load && this.settings.cover) this.factory(this.$slider[len]).cover(this.$slider[len]);
    }
    if(this.settings.preload) this.preload(index, 1);
    if(this.settings.preload) this.preload(index - 1, -1);
  }

  preload(index, direction) {
    if(index >= 0 && index < this.len) {
      this.factory(this.$(this.$slider[index])).load(() => {
        this.preload(index + direction, direction);
      }, "preload", index, "preload");
    }
  }

  onload(img) {
    let array = img.compsoulStack;
    img.compsoulStack = [];
    img.removeEventListener("load", this.onload);
    img.removeEventListener("error", this.onerror);

    array.forEach((item) => {
      if(!this.change(img, item.src)) {
        if(item.callback && ((item.type === "active" && this.slider.active.element === this.element) || (item.type === "next" && this.slider.next.element === this.element) || (item.type === "prev" && this.slider.prev.element === this.element) || item.type === "preload")) item.callback();
        if(this.settings.cover) this.cover(this.element);
        this.loaded();
        this.slider.point(item.index, "loaded");
      }
    });
  }

  onerror(img) {
    let array = img.compsoulStack;
    img.compsoulStack = [];
    img.removeEventListener("load", this.onload);
    img.removeEventListener("error", this.onerror);

    array.forEach((item) => {
      if(!this.change(img, item.src)) {
        if(item.callback && ((item.type === "active" && this.slider.active.element === this.element) || (item.type === "next" && this.slider.next.element === this.element) || (item.type === "prev" && this.slider.prev.element === this.element) || item.type === "preload")) item.callback();
        this.error();
        this.slider.point(item.index, "error");
      }
    });
  }

  restart() {
    if(this.settings.next) this.factory(this.$(this.settings.next)).inactive();
    if(this.settings.prev) this.factory(this.$(this.settings.prev)).inactive();
    if(this.settings.nav) this.factory(this.$(this.settings.nav)).inactive();
  }

  reload() {
    for (let index = 0; index < this.len; index++) {
      let element = this.factory(this.$(this.$slider[index])),
          img = element.element.querySelector("img"),
          src = (img) ? element.responsive(img) || img.dataset.src : false,
          change = element.change(img, src);

      if(img && !(img.complete && img.src && !change)) {
        element.unload();
        if(this.settings.nav) this.factory(this.$(this.$(this.settings.nav)[index])).unload();
      }
    }
    if(this.settings.next) this.factory(this.$(this.settings.next)).unload();
    if(this.settings.prev) this.factory(this.$(this.settings.prev)).unload();
  }

  navigation() {
    if(this.settings.next) this.factory(this.$(this.settings.next)).condition(this.settings.load, function() {this.loading()}).condition(this.settings.loop || (!this.settings.loop && this.index.value !== this.len - 1), function() {this.active()});
    if(this.settings.prev) this.factory(this.$(this.settings.prev)).condition(this.settings.load, function() {this.loading()}).condition(this.settings.loop || (!this.settings.loop && this.index.value !== 0), function() {this.active()});
    this.point(this.index.value, "active");
  }

  point(index, type) {
    if(this.settings.nav) {
      let that = this;
      this.$(this.settings.nav).each(function() {
        if(this.parentNode.children[index]) that.factory(that.$(this.parentNode.children[index])).condition(type === "active", function() {this.active()}).condition(type === "loaded", function() {this.loaded()}).condition(type === "loading", function() {this.loading()}).condition(type === "error", function() {this.error()});
      });
    }
  }

  height() {
    if(this.settings.height) this.parent.element.style.minHeight = this.factory(this.$(this.$slider[this.index.value])).element.offsetHeight + "px";
  }

  event() {
    this.click = (event) => {
      let that = this;
      if(this.settings.next && !this.lock) {
        this.$(this.settings.next).each(function() {
          if(((!that.settings.load && event.target === this) || (that.settings.load && event.target === this && that.$(event.target).hasClass(that.settings.classLoaded))) && that.$(event.target).hasClass(that.settings.classActive)) {
            that.set((that.index.value) ? that.index.value + 1 : that.first + 1);
            return;
          }
        });
      }

      if(this.settings.prev && !this.lock) {
        this.$(this.settings.prev).each(function() {
          if(((!that.settings.load && event.target === this) || (that.settings.load && event.target === this && that.$(event.target).hasClass(that.settings.classLoaded))) && that.$(event.target).hasClass(that.settings.classActive)) {
            that.set((that.index.value) ? that.index.value - 1 : that.first - 1);
            return;
          }
        });
      }

      if(this.settings.nav && !this.lock) {
        this.$(this.settings.nav).each(function() {
          if((!that.settings.load && event.target === this) || (that.settings.load && event.target === this && that.$(event.target).hasClass(that.settings.classLoaded))) {
            if(that.$(this).index() >= 0) that.set(that.$(this).index());
            return;
          }
        });
      }
    }
    this.html.$node.on("click", this.click);

    if(this.timeline) {
      this.animationend = () => {
        if(this.settings.loop || (!this.settings.loop && this.index.value !== this.len - 1)) (this.settings.load) ? this.factory(this.$(this.$slider[this.index.next])).load(() => {this.set(this.index.next)}, "next", this.index.next, "timeline") : this.set(this.index.value + 1);
      };
      this.timeline.$node.on("animationend", this.animationend);
    }

    this.ontouchstart = (event) => {
      this.touchstart = event.touches[0].screenX;
    };
    this.slider.$node.on("touchstart", this.ontouchstart);

    this.ontouchend = (event) => {
      if(!this.lock && (this.touchstart - event.changedTouches[0].screenX < -40) && ((!this.settings.loop && this.index.value !== 0) || this.settings.loop) && (!this.settings.load || (this.settings.load && this.prev.$node.hasClass(this.settings.classLoaded)))) this.set(this.index.value - 1);
      if(!this.lock && (this.touchstart - event.changedTouches[0].screenX > 40) && ((!this.settings.loop && this.index.value !== this.len - 1) || this.settings.loop) && (!this.settings.load || (this.settings.load && this.next.$node.hasClass(this.settings.classLoaded)))) this.set(this.index.value + 1);
    };
    this.slider.$node.on("touchend", this.ontouchend);

    this.unlock = (event) => {
      if((event.target === this.active.element || event.target === this.active.element.querySelector(this.settings.animationend)) && this.past) this.past.done();
    }

  };

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

  remove() {
    if(this.html && this.click) this.html.$node.off("click", this.click);
    if(this.timeline) this.timeline.$node.off("animationend", this.animationend);
    if(this.ontouchstart) this.slider.$node.off("touchstart", this.ontouchstart);
    if(this.ontouchend) this.slider.$node.off("touchend", this.ontouchend);
  }

  update(settings) {
    if(settings) this.options(settings);
    if(!this.factory(this.$(this.settings.selector)).element) return;
    this.remove();
    this.boot();
    this.root();
    this.event();
    this.reload();//Ściągamy klasową flagę w celu ponownego wczytania
    this.set((this.index) ? this.index.value : this.first);//Uruchamiany gdyż może zaistnieć możliwość zmiany zdjęcia
    this.load((this.index) ? this.index.value : this.first);//Uruchamiany gdyż może zaistnieć możliwość zmiany zdjęcia
    this.slider.done();//Podczas zmiany rozmiaru zdjęcia uruchomiona zostaje procedura set, bez możliwości uruchomienia done. Temu umieszczam done w update
  }

  rwd() {
    this.resize = compsoul.debounce(() => {//Tworzenie metody przypisywanej do zdarzenia odpowiedzialnego za wykonanie szeregu funkcji podczas zmiany rozmiaru okna
      this.responsive();//Metoda zawierająca szereg funkcji wykonywanych w momencie zmiany rozmiaru okna
    }, 200);//Funkcja odpowiedzialna za ograniczenie wykonywania się działań w niej zawartych, funkcja będzie wykonywała się co 200ms

    window.addEventListener("resize", this.resize);//Deklaracja zdarzenia uruchamianego podczas zmiany szerokości okna
  }

  compsoul() {
    window.compsoul = window.compsoul || {};

    compsoul.throttle = compsoul.throttle || ((callback, delay) => {
      let throttle;
      return (...args) => {
        if (!throttle) {
          callback(...args);
          throttle = setTimeout(() => throttle = false, delay)
        }
      };
    });

    compsoul.debounce = compsoul.debounce || ((callback, delay) => {
      let timeout;
      return (...args) => {
        const that = this;
        clearTimeout(timeout);
        timeout = setTimeout(() => callback.apply(that, args), delay);
      };
    });
  }

  boot(query) {//Metoda odpowiedzialna za wyszukanie elementów na stronie spełniających wymagania selektora zdeklarowanego podczas tworzenia instancji, bądź przekazanego zapytania
    this.$slider = new Compsoul(query || this.settings.selector);//Właściwość przechowująca listę zdjęć uruchamianej galerii
    this.slider = this.factory(this.$slider);
    this.len = this.$slider.length;//Właściwość przechowuje ilość zdjęć uruchomionej galerii

    this.$parent = new Compsoul(this.settings.parent || ((this.slider.element) ? this.slider.element.parentNode : false));
    this.parent = this.factory(this.$parent);

    this.first = (this.settings.first === "random") ? Math.floor(Math.random() * this.len) : this.settings.first;
    this.timeline = (this.settings.timeline && this.len > 1) ? this.factory(this.$(this.settings.timeline)) : false;
  }

  options(settings) {//Metoda odpowiedzialna za połączanie ustawień domyślnych i tych przekazanych podczas tworzenia instancji
    if(!this.default) this.default = Object.assign({}, Object.assign(this.settings, settings));//Właściwość przechowująca domyślne ustawienia strony
    Object.assign(this.settings, settings);//Ustawienia galerii zostają nadpisane przez przekazane ustawiania
    return this;
  }

  init() {//Metoda uruchamiana podczas wywołania instancji
    this.compsoul();//Metoda deklarująca pomocniczy zbiór compsoul
    this.rwd();
    this.responsive();
    return this;
  }

}
