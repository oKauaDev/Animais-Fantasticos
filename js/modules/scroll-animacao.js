export default class AnimacaoScroll {
  constructor(selector, className) {
    this.sections = document.querySelectorAll(selector);
    this.windowMetade = window.innerHeight * 0.6;

    this.classList = className;

    this.animaScroll = this.animaScroll.bind(this);
  }

  animaScroll() {
    this.sections.forEach((section) => {
      const sectionTop = section.getBoundingClientRect().top;
      const isSectionVisible = sectionTop - this.windowMetade < 0;
      if (isSectionVisible) section.classList.add(this.classList);
      else if (section.classList.contains(this.classList)) {
        section.classList.remove(this.classList);
      }
    });
  }

  addEventScroll() {
    if (this.sections.length) {
      this.animaScroll();
      window.addEventListener("scroll", this.animaScroll);
    }
  }

  init() {
    this.addEventScroll();
    return this;
  }
}
