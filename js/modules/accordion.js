export default class Accordion {
  constructor(selector, className) {
    this.accordionList = document.querySelectorAll(selector);
    this.activeClass = className;

    this.activeAccordion = this.activeAccordion.bind(this);
  }

  activeAccordion(event) {
    event.currentTarget.classList.toggle(this.activeClass);
    event.currentTarget.nextElementSibling.classList.toggle(this.activeClass);
  }

  init() {
    if (this.accordionList.length) {
      this.accordionList[0].classList.add(this.activeClass);
      this.accordionList[0].nextElementSibling.classList.add(this.activeClass);

      this.accordionList.forEach((item) => {
        item.addEventListener("click", this.activeAccordion);
      });
    }
  }
}
