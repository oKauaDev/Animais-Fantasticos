import setDebounce from "./debounce.js";

export default class AnimacaoScroll {
  constructor(selector, className) {
    this.sections = document.querySelectorAll(selector);
    this.windowMetade = window.innerHeight * 0.6;
    this.distances = this.getDistances();

    this.classList = className;

    this.checkDistances = this.checkDistances.bind(this);
  }

  getDistances() {
    return [...this.sections].map((element) => {
      const offset = element.offsetTop;
      return {
        element,
        offset,
      };
    });
  }

  checkDistances() {
    console.log("aaa");
    this.distances.forEach((el) => {
      if (window.scrollY > el.offset - this.windowMetade) {
        el.element.classList.add(this.classList);
      } else if (el.element.classList.contains(this.classList)) {
        el.element.classList.remove(this.classList);
      }
    });
  }

  addEventScroll() {
    if (this.sections.length) {
      window.addEventListener("scroll", () => {
        setDebounce(this.checkDistances, 100);
      });
    }
  }

  init() {
    this.checkDistances();
    this.addEventScroll();
    return this;
  }
}
